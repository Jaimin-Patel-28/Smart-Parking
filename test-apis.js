const http = require('http');

function makeRequest(method, path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: data.substring(0, 200) // First 200 chars
        });
      });
    });

    req.on('error', (error) => {
      reject(error.message);
    });

    req.end();
  });
}

async function runTests() {
  const tests = [
    { name: 'GET /api/parkings', method: 'GET', path: '/api/parkings' },
    { name: 'GET /api/super-admin/parking', method: 'GET', path: '/api/super-admin/parking' },
    { name: 'GET /api/super-admin/slots', method: 'GET', path: '/api/super-admin/slots' },
    { name: 'GET /api/super-admin/users', method: 'GET', path: '/api/super-admin/users' },
    { name: 'GET /api/super-admin/bookings', method: 'GET', path: '/api/super-admin/bookings' },
    { name: 'GET /api/wallet', method: 'GET', path: '/api/wallet' },
    { name: 'GET /api/notifications', method: 'GET', path: '/api/notifications' },
    { name: 'GET /api/profile', method: 'GET', path: '/api/profile' },
    { name: 'GET /api/support/tickets', method: 'GET', path: '/api/support/tickets' },
  ];

  console.log('=' .repeat(80));
  console.log('TESTING SMART PARKING APIs');
  console.log('=' .repeat(80));

  for (const test of tests) {
    try {
      const result = await makeRequest(test.method, test.path);
      const status = result.status >= 400 ? '⚠️' : '✅';
      console.log(`${status} ${test.name}: HTTP ${result.status}`);
    } catch (error) {
      console.log(`❌ ${test.name}: ${error}`);
    }
  }
  console.log('=' .repeat(80));
}

runTests();
