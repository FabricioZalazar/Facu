const nombre = "Fabricio";

function saludar(name){
    console.log("Hola "+name);
};

function despedir(name){
    console.log(`Chau ${name}`);
};

module.exports = {
    nombre,
    saludar,
    despedir
};