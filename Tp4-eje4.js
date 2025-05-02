const fs = require('fs/promises');

async function leerArchivo() {

    try {
        const movies = await(await fetch('https://ghibliapi.vercel.app/films')).json();
        console.log('Processing our list of movies');

        // Encabezado del CSV
        let csvContent = 'Title,Release Date\n';
        let csvContent2011 = 'Title,Release Date\n';

        // Agregar películas
        movies.forEach(movie => {
            csvContent += `"${movie.title}","${movie.release_date}"\n`;
            if (movie.release_date == 2011) {
                csvContent2011 += `"${movie.title}","${movie.release_date}"\n`;
            }
        });

                const locations = await (await fetch("https://ghibliapi.vercel.app/locations")).json(); // Convierte la respuesta en JSON
                const jsonCont = [];

                movies.filter(movie => parseInt(movie.release_date) > 2000)
                    .forEach(movie => {
                        const movieUrl = movie.url;
                        const locationsXurl = locations.filter(loc => loc.films.includes(movieUrl));
                        jsonCont.push({
                            nombrePelicula: movie.title,
                            nombreLocalidad: locationsXurl.map(loc => loc.name)
                        });
                    });
                
                await Promise.all([
                    fs.writeFile('callbackMoviesLocations.json', JSON.stringify(jsonCont, null, 2)),
                    fs.writeFile('callbackMovies.csv', csvContent),
                    fs.writeFile('callbackMovies2011.csv', csvContent2011)
                ]);
                console.log('✅ Todos los archivos fueron creados exitosamente.')
    } catch (err) {
        console.error(`Could not send request to API: ${err.message}`);
    };}

    leerArchivo();


/* fetch('https://ghibliapi.vercel.app/films')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta: ' + response.status);
        }
        return response.json(); // Convierte la respuesta en JSON
    })
    .then(movies => {
        console.log('Processing our list of movies');

        // Encabezado del CSV
        let csvContent = 'Title,Release Date\n';
        let csvContent2011 = 'Title,Release Date\n';
        let jsonCont = [];

        // Agregar películas
        movies.forEach(movie => {
            csvContent += `"${movie.title}","${movie.release_date}"\n`;
            if (movie.release_date == 2011) {
                csvContent2011 += `"${movie.title}","${movie.release_date}"\n`;
            }
        });

        fetch("https://ghibliapi.vercel.app/locations")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta: ' + response.status);
                }
                return response.json(); // Convierte la respuesta en JSON
            })
            .then(locations => {
                const jsonCont = [];

                movies.filter(movie => parseInt(movie.release_date) > 2000)
                    .forEach(movie => {
                        const movieUrl = movie.url;
                        const locationsXurl = locations.filter(loc => loc.films.includes(movieUrl));
                        jsonCont.push({
                            nombrePelicula: movie.title,
                            nombreLocalidad: locationsXurl.map(loc => loc.name)
                        });
                    });



                return Promise.all([
                    fs.writeFile('callbackMoviesLocations.json', JSON.stringify(jsonCont, null, 2)),
                    fs.writeFile('callbackMovies.csv', csvContent),
                    fs.writeFile('callbackMovies2011.csv', csvContent2011)
                ]);

            }).then(() => {
                console.log('✅ Todos los archivos fueron creados exitosamente.');
            }).catch(err => {
                console.error(`Could not send request to API: ${err.message}`);
                return;
            });

    });


 */

/* 
const request = require('request');
request('https://ghibliapi.vercel.app/films', (error, response, body) => {
    if (error) {
        console.error(`Could not send request to API: ${error.message}`);
        return;
    }
    if (response.statusCode != 200) {
        console.error(`Expected status code 200 but received ${response.statusCode}.`);
        return;
    }

    console.log('Processing our list of movies');
    const movies = JSON.parse(body);

    // Encabezado del CSV
    let csvContent = 'Title,Release Date\n';
    let csvContent2011 = 'Title,Release Date\n';
    let jsonCont = [];

    // Agregar películas
    movies.forEach(movie => {
        csvContent += `"${movie.title}","${movie.release_date}"\n`;
        if (movie.release_date == 2011) {
            csvContent2011 += `"${movie.title}","${movie.release_date}"\n`;
        }
    });

    request("https://ghibliapi.vercel.app/locations", (err, response, data) => {
        if (err) {
            console.error(`Could not send request to API: ${err.message}`);
            return;
        }

        const locations = JSON.parse(data);
        const jsonCont = [];
        let i = 0;

        movies
            .filter(movie => parseInt(movie.release_date) > 2000)
            .forEach(movie => {
                const movieUrl = movie.url;
                const locationsXurl = locations.filter(loc => loc.films.includes(movieUrl));
                console.log(movie);
                console.log(movieUrl);
                console.log(locationsXurl);
                console.log(i++);
                console.log(locationsXurl);
                jsonCont.push({
                    nombrePelicula: movie.title,
                    nombreLocalidad: locationsXurl.map(loc => loc.name)
                });
            });

        fs.writeFile('callbackMoviesLocations.json', JSON.stringify(jsonCont, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
            console.log('✅ Archivo callbackMoviesLocations.json creado exitosamente');
        });
    });


    // Escribir archivo
    fs.writeFile('callbackMovies.csv', csvContent, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('✅ Archivo callbackMovies.csv creado exitosamente');
    });


    fs.writeFile('callbackMovies2011.csv', csvContent2011, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('✅ Archivo callbackMovies2011.csv creado exitosamente');
    }
    );

}); */

/* ¿Cuáles són los párametros del callback? 

Error(Que se usa para imprimir para ver el msg de error)
Response (Información sobre la respuesta HTTP como statusCode)
Body(Data en este caso un txt que se parsea a JSON)

¿Cual es el contenido de error y body si el request falla? 

Si falla la conexión:

error: tiene un objeto con el mensaje y código del error.

body: estará undefined o vacío.

Si el servidor responde con error (como 404 o 500):

error: es null

body: contiene texto de error (HTML o JSON) enviado por el servidor.

¿Dónde se encuentran almacenados los datos si el request es exitoso?
en body

¿En que formato vienen los datos recuperados?
vienen en formato JSON como texto plano (es decir, una cadena de texto que representa datos estructurados).
*/