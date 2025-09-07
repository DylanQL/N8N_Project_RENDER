// Script para ejecutar n8n y enviar pings periódicamente
require('dotenv').config();
const { spawn } = require('child_process');
const https = require('https');
const http = require('http');
const { exec } = require('child_process');

// URL a la que enviar pings (desde .env)
const pingUrl = process.env.PING_URL || 'https://example.com';
// URL local de n8n
const n8nLocalUrl = 'http://localhost:5678';

// Función para abrir el navegador
function openBrowser(url) {
  console.log(`Abriendo navegador en ${url}...`);
  
  // Detectar el sistema operativo para usar el comando correcto
  const platform = process.platform;
  let command;
  
  if (platform === 'win32') {
    command = `start ${url}`;
  } else if (platform === 'darwin') {
    command = `open ${url}`;
  } else {
    // Linux y otros sistemas
    command = `xdg-open ${url}`;
  }
  
  exec(command, (error) => {
    if (error) {
      console.error(`No se pudo abrir el navegador: ${error.message}`);
    }
  });
}

// Inicia n8n como un proceso hijo
function startN8n() {
  console.log('Iniciando n8n...');
  const n8nProcess = spawn('n8n', [], { stdio: 'inherit' });
  
  n8nProcess.on('error', (err) => {
    console.error('Error al iniciar n8n:', err);
    process.exit(1);
  });
  
  n8nProcess.on('close', (code) => {
    console.log(`n8n se cerró con código: ${code}`);
    process.exit(code);
  });
  
  return n8nProcess;
}

// Función para enviar un ping
function sendPing() {
  console.log(`Enviando ping a ${pingUrl}...`);
  
  const httpModule = pingUrl.startsWith('https') ? https : http;
  
  const req = httpModule.get(pingUrl, (res) => {
    console.log(`Ping exitoso (${res.statusCode})`);
  });
  
  req.on('error', (error) => {
    console.error('Error al enviar ping:', error.message);
  });
  
  req.end();
}

// Inicia n8n
const n8nProcess = startN8n();

// Espera 5 segundos para que n8n se inicie antes de abrir el navegador
setTimeout(() => {
  openBrowser(n8nLocalUrl);
}, 5000);

// Envía un ping cada 5 segundos
const pingInterval = setInterval(sendPing, 5000);

// Manejo de señales para cerrar correctamente
process.on('SIGINT', () => {
  console.log('Deteniendo n8n y el envío de pings...');
  clearInterval(pingInterval);
  process.exit(0);
});
