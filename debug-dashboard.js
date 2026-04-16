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
  console.log('\n=== TESTING DASHBOARD SUBROUTES ===\n');

  const tests = [
    'GET /api/admin/dashboard/stats',
    'GET /api/admin/dashboard/recent-bookings',
    'GET /api/admin/dashboard/system-status',
  ];

  const paths = [
    '/api/admin/dashboard/stats',
    '/api/admin/dashboard/recent-bookings',
    '/api/admin/dashboard/system-status',
  ];

  for (let i = 0; i < paths.length; i++) {
    const result = await makeRequest('GET', paths[i]);
    console.log(`${tests[i]}`);
    console.log(`  Status: ${result.status}`);
    if (result.status === 401 || result.status === 403) {
      console.log(`  ✅ Correctly protected (Requires auth)`);
    } else if (result.status === 404) {
      console.log(`  ❌ Route not found`);
    } else {
      console.log(`  Status: ${result.status}`);
    }
    console.log();
  }

  console.log('=== END TEST ===\n');
}

test().catch(e => console.error(e));
