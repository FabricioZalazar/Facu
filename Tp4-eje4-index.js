import { getMovie } from './getMovie.js';
import { getLocation } from './getLocation.js';
import { saveAllFiles } from './saveFile.js';

async function main() {
    try {
        const movies = await getMovie();
        const locations = await getLocation();

        let csvContent = 'Title,Release Date\n';
        let csvContent2011 = 'Title,Release Date\n';
        const jsonCont = [];

        movies.forEach(movie => {
            csvContent += `"${movie.title}","${movie.release_date}"\n`;
            if (movie.release_date == 2011) {
                csvContent2011 += `"${movie.title}","${movie.release_date}"\n`;
            }

            movies.filter(movie => parseInt(movie.release_date) > 2000)
            .forEach(movie => {
                const movieUrl = movie.url;
                const locs = locations.filter(loc => loc.films.includes(movieUrl));
                jsonCont.push({
                    nombrePelicula: movie.title,
                    nombreLocalidad: locs.map(loc => loc.name)
                });
            })
        });

        await saveAllFiles(jsonCont, csvContent, csvContent2011);
        console.log("✅ Todo generado con éxito");

    } catch (err) {
        console.error('❌ Error en el programa:', err.message);
    }
}

main();
