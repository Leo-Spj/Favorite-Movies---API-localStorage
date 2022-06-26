

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
    
                // OWL
                let princ_Div = document.createElement("div");
    
                princ_Div.classList.add("owl-carousel");
    
                princ_Div.classList.add("owl-theme");
    
                const contenedor_carrusel_owl = document.querySelector("#contenedor_carrusel_owl");
    
                contenedor_carrusel_owl.appendChild(princ_Div);
    
    
                for(let i = 0; i < 10; i++ ){
    
                    let div = document.createElement("div");               
    
                    div.classList.add("item");
                    
                    princ_Div.appendChild(div);
    
                    div.innerHTML = `
                        
                            <img src="https://image.tmdb.org/t/p/w500/${arry_themoviedb[i].poster}" alt="">
     
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
    
   
    
    setTimeout(() => {

        $(function(){ 
            var owl = $('.owl-carousel');
            owl.owlCarousel({
                
                loop:true,
                margin:10,
                autoplay:true,
                nav:true,
                autoplayTimeout:3000,

                responsive:{
                    0:{
                        items:1
                    },
                    280:{
                        items:2
                    },
                    
                    500:{
                        items:3
                    },
                    700:{
                        items:4
                    },
                    900:{
                        items:5
                    },
                    1100:{
                        items:6
                    },
                    1300:{
                        items:8
                    }
                    
                }
                
            });
            
        
        });

    }, 2000);
    










































































