export async function getMovie(){
    const movies = await fetch('https://ghibliapi.vercel.app/films');
    if(!movies.ok){throw new Error('Error obteniendo películas')};
    return movies.json();
};