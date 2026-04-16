const http = require('http');

function makeRequest(method, path, body = null) {
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
    
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function test() {
  console.log('\n=== TESTING CONTACT ENDPOINT ===\n');

  // Test 1: Missing subject
  console.log('1. POST /api/contact (Missing subject field)');
  const res1 = await makeRequest('POST', '/api/contact', {
    name: 'Test User',
    email: 'test@example.com',
    message: 'Test message'
  });
  console.log(`Status: ${res1.status}`);
  console.log(`Response:`, res1.data);

  // Test 2: With all required fields
  console.log('\n2. POST /api/contact (With subject)');
  const res2 = await makeRequest('POST', '/api/contact', {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Subject',
    message: 'Test message'
  });
  console.log(`Status: ${res2.status}`);
  console.log(`Response:`, res2.data);

  // Test 3: With optional fields
  console.log('\n3. POST /api/contact (With optional fields)');
  const res3 = await makeRequest('POST', '/api/contact', {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Bug Report',
    message: 'Found a bug',
    category: 'Bug',
    phone: '9876543210'
  });
  console.log(`Status: ${res3.status}`);
  console.log(`Response:`, res3.data);

  console.log('\n=== END TEST ===\n');
}

test().catch(e => console.error(e));
