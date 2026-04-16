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
        try {
          resolve({
            status: res.statusCode,
            data: JSON.parse(data)
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: data
          });
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function test() {
  console.log('\n=== TESTING SPECIFIC ROUTES ===\n');

  const tests = [
    'GET /api/admin/dashboard (Correct path for dashboard)',
    'GET /api/super-admin/parking (Public listing)',
    'GET /api/super-admin/slots/test123 (Requires parkingId)',
    'GET /api/super-admin/reports/revenue (With /revenue suffix)',
    'GET /api/super-admin/reports/occupancy (With /occupancy suffix)',
  ];

  // Actually test them
  const paths = [
    '/api/admin/dashboard',
    '/api/super-admin/parking',
    '/api/super-admin/slots/test123',
    '/api/super-admin/reports/revenue',
    '/api/super-admin/reports/occupancy',
  ];

  for (let i = 0; i < paths.length; i++) {
    const result = await makeRequest('GET', paths[i]);
    console.log(`${tests[i]}`);
    console.log(`  Status: ${result.status}`);
    if (result.status === 401 || result.status === 403) {
      console.log(`  ✅ Correctly protected (Requires auth)`);
    } else if (result.status === 404) {
      console.log(`  ❌ Route not found`);
    } else if (result.status === 500) {
      console.log(`  ❌ Server error`);
    } else {
      console.log(`  ✅ Responding normally`);
    }
    console.log();
  }

  console.log('=== END TEST ===\n');
}

test().catch(e => console.error(e));
