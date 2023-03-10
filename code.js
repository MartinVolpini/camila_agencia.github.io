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
   // console.log("sdsdsd")

    entries.forEach( entry=>{
        if(entry.isIntersecting){  
            //console.log(entry.terget + " Es intersectado") 
            atajo.style.visibility= "hidden"; 
        } else if( !entry.isIntersecting ){ atajo.style.visibility= "visible";  }
    })
    
}

const mirar = new IntersectionObserver(callback)
mirar.observe(logo)


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