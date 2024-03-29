// alerta:
setTimeout(()=>{
    if(localStorage.getItem("alerta")){
        console.log("no alerta")
    }else{
        let alerta = []
        let astring = JSON.stringify(alerta)
        localStorage.setItem("alerta", astring)
        
        Swal.fire('Agrega peliculas 👉🏽 ❤️')
    }
},3000)



const cargarPeliculas = async() => {
    try{

    // medidor 1 de tiempo de peticion al servidor
    var t0 = performance.now();

        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=276e470698d68800db5697223acb8a64&language=es-ES`);

    var t1 = performance.now();
    // medidor 2 de tiempo de peticion al servidor
    var tiempo = t1-t0; 
    console.log("Tiempo top-carrusel: "+tiempo+"ms")  

        console.log(respuesta);
        
        //si la respuesta es correcta:
        if(respuesta.status === 200){
            const datos = await respuesta.json();

            datos.results.forEach(pelicula => {

                top_carrusel_themoviedb.push(new informacion_peliculas(pelicula.title, pelicula.vote_average, pelicula.vote_count, pelicula.poster_path, pelicula.id));

            });

            // OWL
            let princ_Div = document.createElement("div");

            princ_Div.classList.add("owl-carousel");

            princ_Div.classList.add("owl-theme");

            const contenedor_carrusel_owl = document.querySelector("#contenedor_carrusel_owl");

            contenedor_carrusel_owl.appendChild(princ_Div);


            for(let i = 0; i < 20; i++ ){

                let div = document.createElement("div");               

                div.classList.add("item");
                
                princ_Div.appendChild(div);

                div.innerHTML = `
                    
                        <img src="https://image.tmdb.org/t/p/w500/${top_carrusel_themoviedb[i].poster}" alt="">
    
                `;
            }
        
        // funcion generada por OWL-carrusel con jquery para animar el carrusel:
        $(function(){ 
            var owl = $('.owl-carousel');
            owl.owlCarousel({
                
                loop:true,
                margin:10,
                autoplay:true,
                nav:true,
                autoplayTimeout:1700,
                
                // mediaQueries:
                responsive:{
                    0:{
                        items:2
                    },
                    280:{
                        items:4
                    },
                    
                    500:{
                        items:4
                    },
                    700:{
                        items:5
                    },
                    900:{
                        items:6
                    },
                    1100:{
                        items:7
                    },
                    1300:{
                        items:8
                    }                        
                }                    
            });
        });
        
        
        // progando grid bootstrap
        const peliculas_generales = document.querySelector("#peliculas_generales");
        for(let i = 0; i < 20; i++ ){
            let div_p_general = document.createElement("div");
                    div_p_general.classList.add("col-4");
                    div_p_general.classList.add("col-sm-3");
                    div_p_general.classList.add("col-md-3");
                    div_p_general.classList.add("col-lg-2");
                    div_p_general.classList.add("col-xl-2");

            peliculas_generales.appendChild(div_p_general)

            div_p_general.innerHTML = `
            
                <div class="caja-item pelicula_general_p" > 

                <div class=" foto_caratula_peli">
                    <i class='bx bxs-star'>${top_carrusel_themoviedb[i].voto_promedio}</i>
                    <img class="img_pelicula-general" src="https://image.tmdb.org/t/p/w500/${top_carrusel_themoviedb[i].poster}" alt="">
                </div>
                            
                    <div class="nombre_p_particular">${top_carrusel_themoviedb[i].nombre}</div>
                    <div 

                    <div class="d-flex justify-content-center">

                        <button id="${top_carrusel_themoviedb[i].id}" name="${top_carrusel_themoviedb[i].nombre}" class="boton_agregar" onClick="corazon_click(this.id, this.name)">

                            <i class='bx bx-heart corazon' ></i>
                            <i class='bx bxs-heart corazon corazon_pintado' ></i>

                        </button>

                    </div>
                
                </div>

            `;

        }


        actualizar_colores()



        // tipos de errores:
        }else if(respuesta.status === 401){
            console.log ("llave erronea");
            
        }else if(respuesta.status === 404){
            console.log("La peli no existe")
        }else{
            console.log("WTF?")
        }

    }catch(error){
        console.log(error);
        
    }
}

cargarPeliculas();



class informacion_peliculas {
    
    constructor (nombre, voto_promedio, recuento_votos, poster, id ){
        this.nombre = nombre;
        this.voto_promedio = voto_promedio;
        this.recuento_votos = recuento_votos;
        this.poster = poster;
        this.id = id;
    }
}
const top_carrusel_themoviedb = [ ];
  

// Boton del modo OSCURO/CLARO:
const modo = document.querySelector("#switch");
modo.onclick =function(){
   
    if(sessionStorage.getItem("modo_claro")){
        sessionStorage.removeItem("modo_claro")

        document.body.classList.toggle("modo_claro");
        modo.classList.toggle("activo");
        // tabla:
        let tabla = document.getElementById("tabla");
        tabla.classList.toggle("table-dark")

    }else{
        let modo_C_O = []
        let string_d = JSON.stringify(modo_C_O)
        sessionStorage.setItem("modo_claro", string_d)
        
        document.body.classList.toggle("modo_claro");
        modo.classList.toggle("activo");
        // tabla:
        let tabla = document.getElementById("tabla");
        tabla.classList.toggle("table-dark")

    }
} 
claro_oscuro()
function claro_oscuro(){
    if(sessionStorage.getItem("modo_claro")){
        

        document.body.classList.toggle("modo_claro");
        modo.classList.toggle("activo");
        // tabla:
        let tabla = document.getElementById("tabla");
        tabla.classList.toggle("table-dark")

    }else{

    }
}


// agregando condicion al storage:

  
// ------------------------------------------------
// Peliculas favoritas:

class contruc_lista_corazones {
        
    constructor (id, nombre){
        this.id = id;
        this.nombre = nombre;
    }
}



if(localStorage.getItem("lista_corazones")){
    console.log("lista_corazones: listo antes de la precarga")
    
    obtener_convertir_storage("lista_corazones")
    
} else{    
    lista_corazones = [];    
    
    subir_storage_actualizado(lista_corazones);
    function subir_storage_actualizado(lista_corazones){
        let asignar = JSON.stringify(lista_corazones)
        localStorage.setItem("lista_corazones", asignar)
    }
}
function obtener_convertir_storage(lista_corazones){
    let session_storage = localStorage.getItem(lista_corazones)
    let json_parse = JSON.parse(session_storage)

    lista_corazones = json_parse
    return lista_corazones
};
function subir_storage_actualizado(lista_corazones){
    let asignar = JSON.stringify(lista_corazones)
    localStorage.setItem("lista_corazones", asignar)
};



function corazon_click(id, nombre){
    
    console.log(id , nombre);
    document.getElementById(`${id}`).classList.add("estado_guardado")

    lista_corazones = obtener_convertir_storage("lista_corazones");

    let posicion = lista_corazones.indexOf(id) ; 

    if (posicion !== -1){
        
        document.getElementById(`${id}`).classList.toggle("estado_guardado");

        lista_corazones = obtener_convertir_storage("lista_corazones");        
        lista_corazones.splice(posicion , 1);
        console.log("Se eliminó");

        // actualizar storage, borrar lo antiguo:
        localStorage.removeItem("lista_corazones");
        // convertir a string con funcion:
        subir_storage_actualizado(lista_corazones);

  
        // eliminar particularmente del storage
        localStorage.removeItem(id)


        imprimir_tabla();
  

    }else{
        

        /*
        // se puede eliminar, solo para corroborar
        lista_corazones.push(new contruc_lista_corazones(id, nombre));
        */

        
        const ad_Peli = async(id) => {
            try{
                await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=276e470698d68800db5697223acb8a64&language=es-ES`).then( (resp)=>resp.json()).then(
                    (data)=>{
                        console.log(data)
                        const json = JSON.stringify(data);
                        localStorage.setItem(id, json);
                        console.log("Entró a lista");


                        lista_corazones = obtener_convertir_storage("lista_corazones");
                        lista_corazones.push(id);

                        // actualizar storage, borrar lo antiguo:
                        localStorage.removeItem("lista_corazones");
                        // actualizar, convertir a string con funcion:
                        subir_storage_actualizado(lista_corazones);

                        imprimir_tabla();

                    }
                )   
            }catch{
                console.log("no se encontro link")
            }
        };
        ad_Peli(id)

        
       
    }

    
}

// funcion que colorea los corazones de la peliculas guardadas en el storage:
function actualizar_colores(){    
    lista_corazones = obtener_convertir_storage("lista_corazones");
    lista_corazones.forEach(ID =>{
        let pintar = document.getElementById(ID)
        pintar.classList.add("estado_guardado")
    })        
    
}

// imprimiendo los favoritos en tabla:
const lista_impresa = document.querySelector(".lista_impresa");
const tabla = document.querySelector("#tabla");

imprimir_tabla();

function imprimir_tabla(){
    // setearlo:
    lista_impresa.innerHTML = " ";

   
    let tabla_c = obtener_convertir_storage("lista_corazones")
    console.log("id guardados:")
    
    tabla_c.forEach(x => {
        console.log(x)
        console.log(obtener_convertir_storage(x))
        let peli = obtener_convertir_storage(x)

        let tr = document.createElement("tr");
        tr.class
        tr.classList.add("id-"+x)

        lista_impresa.appendChild(tr);

        tr.innerHTML = `
        

        <td>
            <strong>${peli.title}</strong><br>
            <em>${peli.tagline}</em><br>
            Lanzamiento: ${peli.release_date}
        </td>


        `;

    })

    
    
}

// boton visualizar favoritos

let boton_favoritos = document.getElementById("boton_favoritos")
boton_favoritos.onclick = function(){
    tabla.classList.toggle("desaparecer")
}








































