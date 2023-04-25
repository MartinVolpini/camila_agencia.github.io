"use strict";
/*FUNCIONAMIENTO DEL MENU */
const header = document.querySelector(".header");

const navToggle = document.querySelector(".nav-toggle").addEventListener("click",()=>{
    
    menu.classList.toggle("nav-menu_visible")
    header.classList.toggle("header_solucion")
    if(menu.classList.contains("nav-menu_visible")){ navToggle.setAttribute("aria-label","Cerrar menu") }//ES PARA LA GENTE CON DISCAPACIDAD
    else { navToggle.setAttribute("Cerrar menu","Abrir menu") }
})
const menu = document.querySelector(".menu")
menu.childNodes.forEach(elemento =>{ 
    elemento.addEventListener("click",()=>{   
        menu.classList.toggle("nav-menu_visible") 
        header.classList.toggle("header_solucion")
    })
})
// ---------------            ------------------             -----------------             -------------
let logo = document.querySelector(".logo")
let atajo = document.querySelector(".whatsapp")

function callback(entries){

    entries.forEach( entry=>{
        if(entry.isIntersecting){  
            //console.log(entry.target + " Es intersectado") 
            atajo.style.visibility= "hidden"; 
        } else if( !entry.isIntersecting ){ atajo.style.visibility= "visible";  }
    })
    
}

const mirar = new IntersectionObserver(callback)
mirar.observe(logo)

/* ANIMACIONES DE LOS SERVICIOS*/

const servicios = document.querySelectorAll(".box")


function aparece (entries){
    let a = window.innerHeight/3.5;
    // console.log(a)
    entries.forEach( entry => {
        if(entry.isIntersecting){  

            // console.log(entry.target + " Es intersectado")
            // console.log( entry ) 
            entry.target.firstElementChild.style.animation = "apareceRandL 1s ease-out";
            
            entry.target.lastElementChild.style.animation = "apareceLandR 1s ease-out";
            entry.target.firstElementChild.style.visibility = "visible";
            entry.target.lastElementChild.style.visibility = "visible";

            
        } else if( !entry.isIntersecting ){ 
            // entry.target.firstElementChild.style.animation = "";
            // entry.target.lastElementChild.style.animation = "";
            // entry.target.firstElementChild.style.visibility = "hidden";
            // entry.target.lastElementChild.style.visibility= "hidden";
        }
    })
}
const options = {
    threshold:0.7
    // rootmargin: "100%"
}
const mirarServicios = new IntersectionObserver( aparece, options );

servicios.forEach( ( servicio ) => {  
    mirarServicios.observe( servicio )
})
//! LA ANIMACION CSS ME GENERA UN SCROLL ORIZONTAL QUE HACE QUE LA PAG SE COMPORTE RARA
//OTRA FORMA DE HACER LO MISMO

// window.addEventListener("scroll",()=>{
    
//         let positionObj0 = servicios[0].children[0].getBoundingClientRect().top;
//         let positionObj1 = servicios[1].children[0].getBoundingClientRect().top;
//         let positionObj2 = servicios[2].children[0].getBoundingClientRect().top;
      

//         let tamañoDePantalla = window.innerHeight/2;

//         // console.log(positionObj0, tamañoDePantalla)

//         if( positionObj0 < tamañoDePantalla ){
//             // console.log( servicio  )
//             servicios[0].children[0].style.animation = "apareceRandL 1s ease-out";
//             servicios[0].children[1].style.animation = "apareceLandR 1s ease-out";
//             servicios[0].children[0].style.visibility = "visible";
//             servicios[0].children[1].style.visibility = "visible";
//         } else {
//             servicios[0].children[0].style.animation = "";
//             servicios[0].children[1].style.animation = "";
//             servicios[0].children[0].style.visibility = "hidden";
//             servicios[0].children[1].style.visibility= "hidden";
//         }

//         if( positionObj1 < tamañoDePantalla ){
//             // console.log( servicio  )
//             servicios[1].children[0].style.animation = "apareceRandL 1s ease-out";
//             servicios[1].children[1].style.animation = "apareceLandR 1s ease-out";
//             servicios[1].children[0].style.visibility = "visible";
//             servicios[1].children[1].style.visibility = "visible";
//         } else {
//             servicios[1].children[0].style.animation = "";
//             servicios[1].children[1].style.animation = "";
//             servicios[1].children[0].style.visibility = "hidden";
//             servicios[1].children[1].style.visibility= "hidden";
//         }

//         if( positionObj2 < tamañoDePantalla ){
//             // console.log( servicio  )
//             servicios[2].children[0].style.animation = "apareceRandL 1s ease-out";
//             servicios[2].children[1].style.animation = "apareceLandR 1s ease-out";
//             servicios[2].children[0].style.visibility = "visible";
//             servicios[2].children[1].style.visibility = "visible";
//         } else {
//             servicios[2].children[0].style.animation = "";
//             servicios[2].children[1].style.animation = "";
//             servicios[2].children[0].style.visibility = "hidden";
//             servicios[2].children[1].style.visibility= "hidden";
//         }
        
        
    
// })

/*-------------     ----------------   FORM   -------------------         -------- */

let enviar = document.getElementById("btn-submit");

let sendForm = async()=>{
    let _nombre = document.getElementById("name");
    let _email = document.getElementById("mail");
    let _message = document.getElementById("message");

    let options = {
        method: "POST", 
        body: JSON.stringify({
            "_nombre": `${_nombre.value}`,
            "_email": `${_email.value}`,
            "_message": `${_message.value}`
        }),
        headers: {"Content-Type":"application/json"}
    }

    // console.log("btn alcanzado", options.body);
    
    let peticion  = await fetch(`http://localhost:4250/email`, options)
    let resultado = await peticion.json()
  
}

enviar.addEventListener("click", (e)=>{
    e.preventDefault();
    sendForm();
    
    let _nombre = document.getElementById("name"); let _email = document.getElementById("mail");
    let _message = document.getElementById("message");

    // console.log("btn alcanzado" );

    setTimeout(()=>{  _nombre.value=""; _email.value= ""; _message.value=""; },500) 
    
})