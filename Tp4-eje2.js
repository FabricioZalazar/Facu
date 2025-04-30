const os = require('os');
const fs = require('fs');


const datosCPU = os.cpus();


const datosComoTexto = JSON.stringify(datosCPU, null, 2); // el "2" es para que quede lindo con identación

// 3. Guardar en un archivo
fs.writeFile('cpu-info.txt', datosComoTexto, (err) => {
  if (err) {
    console.error('Error al guardar el archivo:', err);
  } else {
    console.log('✅ Archivo cpu-info.txt guardado correctamente.');
  }
});