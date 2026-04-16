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
  console.log('SMART PARKING - COMPREHENSIVE API TEST SUITE');
  console.log('='.repeat(80));

  let authToken = null;
  let testResults = {
    passed: [],
    failed: [],
    warnings: []
  };

  // Test 1: Authentication Tests
  console.log('\n📝 [AUTH ENDPOINTS]');
  try {
    // Send OTP
    const otpRes = await makeRequest('POST', '/api/auth/send-otp', {
      phone: '9876543210'
    });
    console.log(`${otpRes.status === 200 ? '✅' : '❌'} POST /api/auth/send-otp: HTTP ${otpRes.status}`);
    if (otpRes.status !== 200) testResults.failed.push('POST /api/auth/send-otp');
  } catch (e) {
    console.log(`❌ POST /api/auth/send-otp: ${e}`);
    testResults.failed.push('POST /api/auth/send-otp');
  }

  // Test 2: Public APIs
  console.log('\n🏢 [PUBLIC ENDPOINTS]');
  const publicTests = [
    { name: 'GET /api/parkings', path: '/api/parkings' },
  ];

  for (const test of publicTests) {
    try {
      const result = await makeRequest('GET', test.path);
      const status = result.status === 200 ? '✅' : '⚠️';
      console.log(`${status} ${test.name}: HTTP ${result.status}`);
      if (result.status === 200) testResults.passed.push(test.name);
      else testResults.warnings.push(test.name);
    } catch (error) {
      console.log(`❌ ${test.name}: ${error}`);
      testResults.failed.push(test.name);
    }
  }

  // Test 3: Protected endpoints (without token - should fail)
  console.log('\n🔐 [PROTECTED ENDPOINTS - No Token (Expected 401)]');
  const protectedTests = [
    { name: 'GET /api/wallet', path: '/api/wallet' },
    { name: 'GET /api/notifications', path: '/api/notifications' },
    { name: 'GET /api/profile', path: '/api/profile' },
    { name: 'GET /api/super-admin/parking', path: '/api/super-admin/parking' },
    { name: 'GET /api/super-admin/users', path: '/api/super-admin/users' },
    { name: 'GET /api/super-admin/bookings', path: '/api/super-admin/bookings' },
    { name: 'GET /api/support/my-tickets', path: '/api/support/my-tickets' },
  ];

  for (const test of protectedTests) {
    try {
      const result = await makeRequest('GET', test.path);
      if (result.status === 401 || result.status === 403) {
        console.log(`✅ ${test.name}: HTTP ${result.status} (Protected) - GOOD`);
        testResults.passed.push(test.name + ' (Auth Protected)');
      } else {
        console.log(`⚠️ ${test.name}: HTTP ${result.status} (Should be 401/403)`);
        testResults.warnings.push(test.name);
      }
    } catch (error) {
      console.log(`❌ ${test.name}: ${error}`);
      testResults.failed.push(test.name);
    }
  }

  // Test 4: Contact/Support endpoints
  console.log('\n💬 [SUPPORT/CONTACT ENDPOINTS]');
  const contactTests = [
    { 
      name: 'POST /api/contact', 
      path: '/api/contact',
      body: {
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message',
        phone: '1234567890'
      }
    },
  ];

  for (const test of contactTests) {
    try {
      const result = await makeRequest('POST', test.path, test.body);
      const status = result.status >= 200 && result.status < 300 ? '✅' : '⚠️';
      console.log(`${status} ${test.name}: HTTP ${result.status}`);
      if (result.status >= 200 && result.status < 300) testResults.passed.push(test.name);
      else testResults.warnings.push(test.name);
    } catch (error) {
      console.log(`❌ ${test.name}: ${error}`);
      testResults.failed.push(test.name);
    }
  }

  // Test 5: Admin routes
  console.log('\n👨‍💼 [ADMIN ROUTES]');
  const adminTests = [
    { name: 'GET /api/admin/gate/exceptions', path: '/api/admin/gate/exceptions' },
    { name: 'GET /api/admin/gate/entries', path: '/api/admin/gate/entries' },
  ];

  for (const test of adminTests) {
    try {
      const result = await makeRequest('GET', test.path);
      if (result.status === 401 || result.status === 403) {
        console.log(`✅ ${test.name}: HTTP ${result.status} (Protected)`);
        testResults.passed.push(test.name + ' (Auth Protected)');
      } else {
        console.log(`⚠️ ${test.name}: HTTP ${result.status}`);
        testResults.warnings.push(test.name);
      }
    } catch (error) {
      console.log(`❌ ${test.name}: ${error}`);
      testResults.failed.push(test.name);
    }
  }

  // Final Summary
  console.log('\n' + '='.repeat(80));
  console.log('TEST SUMMARY');
  console.log('='.repeat(80));
  console.log(`✅ Passed: ${testResults.passed.length}`);
  console.log(`⚠️  Warnings: ${testResults.warnings.length}`);
  console.log(`❌ Failed: ${testResults.failed.length}`);
  
  if (testResults.failed.length > 0) {
    console.log('\n❌ Failed Tests:');
    testResults.failed.forEach(t => console.log(`  - ${t}`));
  }
  
  if (testResults.warnings.length > 0) {
    console.log('\n⚠️  Test Warnings:');
    testResults.warnings.forEach(t => console.log(`  - ${t}`));
  }

  console.log('\n' + '='.repeat(80));
}

runTests();
