 const cargarPeliculas = async() => {
    try{
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=276e470698d68800db5697223acb8a64&language=es-ES`);

        console.log(respuesta);
        
        //si la respuesta es correcta:
        if(respuesta.status === 200){
            const datos = await respuesta.json();

            datos.results.forEach(pelicula => {

                arry_themoviedb.push(new informacion_peliculas(pelicula.title, pelicula.vote_average, pelicula.vote_count, pelicula.poster_path));

            });

            // subiendo datos al html:
            
/*

 <td>  ${arry_themoviedb[i].nombre}  </td>
                <td>  ${arry_themoviedb[i].voto_promedio}  </td>
                <td>  ${arry_themoviedb[i].recuento_votos}  </td>

*/
            const carrusel_peliculas_api = document.querySelector("#carrusel_peliculas_api");
            for(let i = 0; i < 3; i++ ){

                let div = document.createElement("div");               

                if(i === 0){
                    div.classList.add("active");
                }
                
                    div.classList.add("carousel-item");
                
                

                carrusel_peliculas_api.appendChild(div);

                div.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500/${arry_themoviedb[i].poster}" class="d-block w-100" alt="#">

                <div class="carousel-caption d-none d-md-block">
                    <h5>${arry_themoviedb[i].nombre}</h5>
                    <p>${arry_themoviedb[i].voto_promedio}</p>
                </div>
                `;
}

            
            
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
    
    constructor (nombre, voto_promedio, recuento_votos, poster ){
        this.nombre = nombre;
        this.voto_promedio = voto_promedio;
        this.recuento_votos = recuento_votos;
        this.poster = poster;
    }
}
const arry_themoviedb = [ ];



// Boton del modo OSCURO/CLARO:
const modo = document.querySelector("#switch");
modo.onclick =function(){
    document.body.classList.toggle("modo_claro");
    modo.classList.toggle("activo")
} 





