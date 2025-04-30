const os = require('os');

const mostrarInfoSistema = () => {
  const cpus = os.cpus(); // Info de cada núcleo
  const sistemaOperativo = {
    tipo: os.type(), // Ej: 'Linux', 'Darwin', 'Windows_NT'
    plataforma: os.platform(), // Ej: 'linux', 'win32'
    version: os.release(), // Versión del SO
    arquitectura: os.arch(), // 'x64', 'arm', etc
  };

  const memoria = {
    total: (os.totalmem() / 1024 / 1024 / 1024).toFixed(2) + ' GB',
    libre: (os.freemem() / 1024 / 1024 / 1024).toFixed(2) + ' GB'
  };

  console.log('Información del CPU:');
  console.log(cpus);

  console.log('\nSistema Operativo:');
  console.log(sistemaOperativo);

  console.log('\nMemoria RAM:');
  console.log(memoria);
};

mostrarInfoSistema();