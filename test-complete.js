const http = require('http');

function makeRequest(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = data ? JSON.parse(data) : {};
          resolve({
            status: res.statusCode,
            data: parsed
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: data.substring(0, 200)
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error.message);
    });

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('\n' + '='.repeat(80));
  console.log('SMART PARKING - FULL SYSTEM TEST REPORT');
  console.log('='.repeat(80));

  let testResults = {
    working: [],
    notWorking: [],
    needsAuth: []
  };

  // === AUTH ENDPOINTS ===
  console.log('\n📝 [AUTHENTICATION ENDPOINTS]');
  const authTests = [
    { 
      name: 'POST /api/auth/register', 
      path: '/api/auth/register',
      body: {
        fullName: 'Test User',
        email: 'test' + Date.now() + '@example.com',
        mobile: '9876543210',
        vehicleNumber: 'ABC123',
        password: 'Test@1234'
      }
    },
    { 
      name: 'POST /api/auth/login', 
      path: '/api/auth/login',
      body: {
        email: 'admin@smartpark.com',
        password: 'admin123'
      }
    },
    { 
      name: 'POST /api/auth/forgot-password', 
      path: '/api/auth/forgot-password',
      body: { email: 'test@example.com' }
    },
    { 
      name: 'POST /api/auth/verify-otp', 
      path: '/api/auth/verify-otp',
      body: {
        email: 'test@example.com',
        otp: '123456'
      }
    },
  ];

  for (const test of authTests) {
    try {
      const result = await makeRequest('POST', test.path, test.body);
      const isWorking = result.status >= 200 && result.status < 500;
      const symbol = result.status === 500 ? '❌' : (result.status < 400 || result.status === 400) ? '✅' : '⚠️';
      console.log(`${symbol} ${test.name}: HTTP ${result.status}`);
      
      if (result.status >= 200 && result.status < 400) testResults.working.push(test.name);
      else if (result.status >= 500) testResults.notWorking.push(test.name);
      else testResults.working.push(test.name + ' (Validation)');
    } catch (error) {
      console.log(`❌ ${test.name}: ${error}`);
      testResults.notWorking.push(test.name);
    }
  }

  // === PUBLIC ENDPOINTS ===
  console.log('\n🏢 [PUBLIC ENDPOINTS]');
  const publicTests = [
    { name: 'GET /api/parkings', path: '/api/parkings' },
  ];

  for (const test of publicTests) {
    try {
      const result = await makeRequest('GET', test.path);
      const symbol = result.status === 200 ? '✅' : '❌';
      console.log(`${symbol} ${test.name}: HTTP ${result.status}`);
      if (result.status === 200) testResults.working.push(test.name);
      else testResults.notWorking.push(test.name);
    } catch (error) {
      console.log(`❌ ${test.name}: ${error}`);
      testResults.notWorking.push(test.name);
    }
  }

  // === USER PROTECTED ENDPOINTS ===
  console.log('\n👤 [USER PROTECTED ENDPOINTS] (Require Auth)');
  const userProtectedTests = [
    { name: 'GET /api/wallet', path: '/api/wallet' },
    { name: 'GET /api/profile', path: '/api/profile' },
    { name: 'GET /api/notifications', path: '/api/notifications' },
    { name: 'GET /api/bookings', path: '/api/bookings' },
    { name: 'GET /api/support/my-tickets', path: '/api/support/my-tickets' },
  ];

  for (const test of userProtectedTests) {
    try {
      const result = await makeRequest('GET', test.path);
      if (result.status === 401 || result.status === 403) {
        console.log(`✅ ${test.name}: HTTP ${result.status} (Protected)`);
        testResults.needsAuth.push(test.name);
      } else {
        console.log(`❌ ${test.name}: HTTP ${result.status} (Should be 401/403)`);
        testResults.notWorking.push(test.name);
      }
    } catch (error) {
      console.log(`❌ ${test.name}: ${error}`);
      testResults.notWorking.push(test.name);
    }
  }

  // === ADMIN PROTECTED ENDPOINTS ===
  console.log('\n👨‍💼 [ADMIN PROTECTED ENDPOINTS] (Require Auth & Role)');
  const adminProtectedTests = [
    { name: 'GET /api/admin/bookings', path: '/api/admin/bookings' },
    { name: 'GET /api/admin/gate/logs', path: '/api/admin/gate/logs' },
    { name: 'GET /api/admin/gate/exceptions', path: '/api/admin/gate/exceptions' },
    { name: 'GET /api/admin/gate/alerts', path: '/api/admin/gate/alerts' },
    { name: 'GET /api/admin/profile', path: '/api/admin/profile' },
    { name: 'GET /api/admin/settings', path: '/api/admin/settings' },
  ];

  for (const test of adminProtectedTests) {
    try {
      const result = await makeRequest('GET', test.path);
      if (result.status === 401 || result.status === 403) {
        console.log(`✅ ${test.name}: HTTP ${result.status} (Protected)`);
        testResults.needsAuth.push(test.name);
      } else {
        console.log(`❌ ${test.name}: HTTP ${result.status} (Should be 401/403)`);
        testResults.notWorking.push(test.name);
      }
    } catch (error) {
      console.log(`❌ ${test.name}: ${error}`);
      testResults.notWorking.push(test.name);
    }
  }

  // === SUPER ADMIN PROTECTED ENDPOINTS ===
  console.log('\n🔐 [SUPER ADMIN PROTECTED ENDPOINTS] (Require Auth & Role)');
  const superAdminTests = [
    { name: 'GET /api/super-admin/parking', path: '/api/super-admin/parking' },
    { name: 'GET /api/super-admin/slots', path: '/api/super-admin/slots' },
    { name: 'GET /api/super-admin/users', path: '/api/super-admin/users' },
    { name: 'GET /api/super-admin/bookings', path: '/api/super-admin/bookings' },
    { name: 'GET /api/super-admin/wallet', path: '/api/super-admin/wallet' },
    { name: 'GET /api/super-admin/transactions', path: '/api/super-admin/transactions' },
    { name: 'GET /api/super-admin/reports', path: '/api/super-admin/reports' },
    { name: 'GET /api/super-admin/audit-trail', path: '/api/super-admin/audit-trail' },
    { name: 'GET /api/super-admin/dashboard', path: '/api/super-admin/dashboard' },
  ];

  for (const test of superAdminTests) {
    try {
      const result = await makeRequest('GET', test.path);
      if (result.status === 401 || result.status === 403) {
        console.log(`✅ ${test.name}: HTTP ${result.status} (Protected)`);
        testResults.needsAuth.push(test.name);
      } else if (result.status === 404) {
        console.log(`⚠️  ${test.name}: HTTP ${result.status} (Not Found)`);
        testResults.notWorking.push(test.name);
      } else {
        console.log(`❌ ${test.name}: HTTP ${result.status}`);
        testResults.notWorking.push(test.name);
      }
    } catch (error) {
      console.log(`❌ ${test.name}: ${error}`);
      testResults.notWorking.push(test.name);
    }
  }

  // === CONTACT/SUPPORT ENDPOINTS ===
  console.log('\n💬 [SUPPORT/CONTACT ENDPOINTS]');
  const contactTests = [
    { 
      name: 'POST /api/contact', 
      path: '/api/contact',
      body: {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test subject',
        message: 'Test message'
      }
    },
    { 
      name: 'GET /api/support/tickets', 
      path: '/api/support/tickets'
    },
  ];

  for (const test of contactTests) {
    try {
      const result = await makeRequest(test.path.includes('POST') ? 'POST' : 'GET', test.path, test.body);
      const symbol = (result.status >= 200 && result.status < 400) ? '✅' : (result.status === 401 || result.status === 403) ? '🔐' : '❌';
      console.log(`${symbol} ${test.name}: HTTP ${result.status}`);
      
      if (result.status >= 200 && result.status < 400) testResults.working.push(test.name);
      else if (result.status === 401 || result.status === 403) testResults.needsAuth.push(test.name);
      else testResults.notWorking.push(test.name);
    } catch (error) {
      console.log(`❌ ${test.name}: ${error}`);
      testResults.notWorking.push(test.name);
    }
  }

  // === FINAL SUMMARY ===
  console.log('\n' + '='.repeat(80));
  console.log('TEST SUMMARY REPORT');
  console.log('='.repeat(80));
  
  console.log(`\n✅ WORKING ENDPOINTS (${testResults.working.length}):`);
  testResults.working.forEach(t => console.log(`   • ${t}`));

  console.log(`\n🔐 REQUIRE AUTHENTICATION (${testResults.needsAuth.length}):`);
  testResults.needsAuth.forEach(t => console.log(`   • ${t}`));

  if (testResults.notWorking.length > 0) {
    console.log(`\n❌ NOT WORKING (${testResults.notWorking.length}):`);
    testResults.notWorking.forEach(t => console.log(`   • ${t}`));
  }

  console.log('\n' + '='.repeat(80));
  console.log(`OVERALL STATUS: ${testResults.notWorking.length === 0 ? '✅ ALL SYSTEMS OPERATIONAL' : '❌ ' + testResults.notWorking.length + ' ISSUES FOUND'}`);
  console.log('='.repeat(80) + '\n');
}

runTests().catch(e => console.error('Test failed:', e));
