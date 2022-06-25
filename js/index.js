 const cargarPeliculas = async() => {
    try{
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=276e470698d68800db5697223acb8a64&language=es-ES`);

        console.log(respuesta);
        
        //si la respuesta es correcta:
        if(respuesta.status === 200){
            const datos = await respuesta.json();

            datos.results.forEach(pelicula => {

                arry_themoviedb.push(new informacion_peliculas(pelicula.title, pelicula.vote_average, pelicula.vote_count));

            });

            
            
            // tipos de errores:
        }else if(respuesta.status === 401){
            console.log ("llave erronea");
            
        }else if(respuesta.status === 404){
            console.log("La peli no existe")
        }else{
            console.log("WTF?")
        }

    }catch(error){
        console.log(error)
    }
}
cargarPeliculas();

class informacion_peliculas {
    
    constructor (nombre, voto_promedio, recuento_votos ){
        this.nombre = nombre;
        this.voto_promedio = voto_promedio;
        this.recuento_votos = recuento_votos;
    }
}
const arry_themoviedb = [ ];


// Boton del modo OSCURO/CLARO:
const modo = document.querySelector("#switch");
modo.onclick =function(){
    document.body.classList.toggle("modo_claro");
    modo.classList.toggle("activo")

} 
