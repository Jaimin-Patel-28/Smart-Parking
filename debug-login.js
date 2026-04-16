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
          const parsed = JSON.parse(data);
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: parsed
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
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
  console.log('\n=== DEBUGGING LOGIN ENDPOINT ===\n');

  // First, register a user
  console.log('1. Registering test user...');
  const registerRes = await makeRequest('POST', '/api/auth/register', {
    fullName: 'Test Login User',
    email: 'login' + Date.now() + '@test.com',
    mobile: '9876543210',
    vehicleNumber: 'TEST123',
    password: 'Test@12345'
  });
  console.log(`Status: ${registerRes.status}`);
  console.log(`Message: ${registerRes.data.message}`);

  if (registerRes.status !== 200) {
    console.log('Registration failed!');
    return;
  }

  const testEmail = registerRes.data.email || 'login' + Date.now() + '@test.com';

  // Try to login (without OTP verification)
  console.log('\n2. Attempting login without OTP verification...');
  const loginRes = await makeRequest('POST', '/api/auth/login', {
    email: testEmail,
    password: 'Test@12345'
  });
  console.log(`Status: ${loginRes.status}`);
  console.log(`Response:`, JSON.stringify(loginRes.data, null, 2));

  // Test other auth endpoints
  console.log('\n3. Testing /api/auth/forgot-password...');
  const forgotRes = await makeRequest('POST', '/api/auth/forgot-password', {
    email: 'test@example.com'
  });
  console.log(`Status: ${forgotRes.status}`);

  console.log('\n4. Testing /api/auth/verify-otp...');
  const verifyRes = await makeRequest('POST', '/api/auth/verify-otp', {
    email: 'test@example.com',
    otp: '123456'
  });
  console.log(`Status: ${verifyRes.status}`);

  console.log('\n=== END DEBUG ===\n');
}

test().catch(e => console.error(e));
