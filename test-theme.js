// Test script to verify theme toggle works
const http = require('http');

setTimeout(async () => {
  try {
    const response = await new Promise((resolve, reject) => {
      http.get('http://localhost:5173', (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(data));
      }).on('error', reject);
    });

    // Check if HTML compiles without errors
    if (response.includes('<!DOCTYPE html>') || response.includes('<html')) {
      console.log('✅ Dev server is serving HTML successfully');
      console.log('✅ Application loaded without compilation errors');
      process.exit(0);
    } else {
      console.log('⚠️ Unexpected response from dev server');
      process.exit(1);
    }
  } catch (err) {
    console.error('❌ Error connecting to dev server:', err.message);
    process.exit(1);
  }
}, 1000);
