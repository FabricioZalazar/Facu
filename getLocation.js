export async function getLocation(){
    const locations = await fetch("https://ghibliapi.vercel.app/locations");
    if(!locations.ok){throw new Error('Error obteniendo Localidades')};
    return locations.json();
};