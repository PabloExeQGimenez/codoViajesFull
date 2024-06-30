//import destinos from './lista.js';

const destinos = [
    {
        id: 0,
        titulo: "Mar del Plata",
        precio: 500,
        dias: 3,
        noches: 4,
        transporte: "Micro",
        src: "../img/mdp.jpg"
    },
    {
        id: 1,
        titulo: "Córdoba",
        precio: 700,
        dias: 3,
        noches: 4,
        transporte: "Micro",
        src: "../img/cba.jpg"
    },
    {
        id: 2,
        titulo: "Buzios",
        precio: 1500,
        dias: 8,
        noches: 7,
        transporte: "Avión",
        src: "../img/buzios.jpeg"
    },
    {
        id: 3,
        titulo: "San Carlos de Bariloche",
        precio: 900,
        dias: 4,
        noches: 4,
        transporte: "Avión",
        src: "../img/bariloche.jpeg"
    },
    {
        id: 4,
        titulo: "Iguazú",
        precio: 1000,
        dias: 3,
        noches: 3,
        transporte: "Avión",
        src: "../img/iguazu.jpeg"
    },
    {
        id: 5,
        titulo: "Tandil",
        precio: 700,
        dias: 3,
        noches: 3,
        transporte: "Micro",
        src: "../img/tandil.jpg"
    },    
];

/*función creacartas*/
function creaCartas(objeto,parent,clase) {
    let card = document.createElement("div");
        card.classList.add(clase);

        let imagen = document.createElement("img");
            imagen.src = objeto.src;
            imagen.alt = objeto.titulo;
        card.appendChild(imagen);

        let infobox = document.createElement("div");
        infobox.classList.add("infobox");

            let h2 = document.createElement("h2");
            h2.textContent = objeto.titulo;

            let ul = document.createElement("ul");

                let li1 = document.createElement("li");
                let li2 = document.createElement("li");
                let li3 = document.createElement("li");

                li1.textContent = objeto.dias+" días "+objeto.noches+" noches";
                li2.textContent = "$"+objeto.precio;
                li3.textContent = objeto.transporte;
            
            ul.appendChild(li1);
            ul.appendChild(li2);
            ul.appendChild(li3);

        infobox.appendChild(h2);
        infobox.appendChild(ul);
        card.appendChild(infobox);

        parent.appendChild(card);
}
/*recomendados*/

const seccionRecomendados = document.getElementById("recsection");

let h1 = document.createElement("h1");
h1.textContent = "Recomendaciones";
seccionRecomendados.appendChild(h1);

let a = [];
let indice = Math.floor(Math.random()*destinos.length);

while (a.length<2) {
    if (!a.includes(indice)) {
        a.push(indice);
        creaCartas(destinos[indice],seccionRecomendados,"cardrec")
    };
    indice = Math.floor(Math.random()*destinos.length);
};


/* todos los destinos */

const seccionCards = document.getElementById("cardssection");

h1 = document.createElement("h1");
h1.textContent = "Nuestros planes";
seccionCards.appendChild(h1);

destinos.forEach((d) => {
    creaCartas(d,seccionCards,"card")
})