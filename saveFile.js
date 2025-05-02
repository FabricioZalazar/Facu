import { writeFile } from 'fs/promises';

export async function saveAllFiles(jsonCont, csvContent, csvContent2011) {
    await Promise.all([
        writeFile('callbackMoviesLocations.json', JSON.stringify(jsonCont, null, 2)),
        writeFile('callbackMovies.csv', csvContent),
        writeFile('callbackMovies2011.csv', csvContent2011),
    ]);
}