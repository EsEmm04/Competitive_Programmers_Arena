const { exec } = require('child_process');
const port = 3000;

const command =
  process.platform === 'win32'
    ? `for /f "tokens=5" %a in ('netstat -ano ^| findstr :${port} ^| findstr LISTENING') do taskkill /PID %a /F`
    : `kill -9 $(lsof -ti:${port})`;

exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error: ${err.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`✅ Port ${port} process killed successfully`);
});
