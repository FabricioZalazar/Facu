const fs = require('fs');

const contenido = fs.readFileSync('cpu-info.txt', 'utf8');
console.log(contenido);
console.log('Fin de contenido del archivo');
console.log('\n\n1. Usando readFileSync (sincrónico)\n\n');


fs.readFile('cpu-info.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo:', err);
    return;
  }
  console.log(data);
  console.log('Fin de contenido del archivo');
  console.log('\n\n2. Usando readFile con callback (asíncrono)\n\n');
});

const fsA = require('fs/promises');

fsA.readFile('cpu-info.txt', 'utf8')
  .then(data => {
    console.log(data);
    console.log('Fin de contenido del archivo');
    console.log('\n\n3. Usando readFile con promesas\n\n');
  })
  .catch(err => {
    console.error('Error al leer el archivo:', err);
  });


  async function leerArchivo() {
    try {
      const data = await fsA.readFile('cpu-info.txt', 'utf8');
      console.log(data);
      console.log('Fin de contenido del archivo');
      console.log('\n\n4. Usando readFile con async/await\n\n');
    } catch (err) {
      console.error('Error al leer el archivo:', err);
    }
  }
  
  leerArchivo();