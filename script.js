
// variables globales
var state = "q1";
var cadena = "";

var boton1=document.getElementsByClassName("slick-next");
var boton2 = document.getElementsByClassName("slick-prev");
var i=1;

var trans = {
  "q1,a": { NewState: "q1", NewValue: "a",  move: "R" },
  "q1,b": { NewState: "q1", NewValue: "a",move: "R" },
  "q1,B": {NewState: "q2",NewValue: "B", move: "L" },
  "q2,a": {NewState: "q2",NewValue: "a",move: "L"},
  "q2,B": {NewState: "q3",NewValue: "B",move: "R"},
};
// ----------------------------------------------------------
function llenarceldas(cadena) {
  for (var i = 1; i < cadena.length - 1; i++) {
    document.getElementById("cinta" + (i + 1)).innerHTML = "<h3 id='letra" + (i + 1) + "'>" + cadena[i] + "</h3>";
  }
}
function crearCeldas(size){
  cinta=document.getElementById("slip");
  var k=0,num=10;
  // if(size>10){
    var adds=(size-10);
  // }
  while(k<adds){
     var elemento= document.createElement("div");
     elemento.className="items";
     elemento.id="cinta"+num;
     document.getElementById("slip").appendChild(elemento);
    k++;num++;
  }
  //  loadSlider();
}
function load() {
  cadena = Array.from("B" + document.getElementById("fcadena").value + "B");
  if(cadena.length>10){
   crearCeldas(cadena.length);
  }
  botonNext = boton1[0];
  botonNext.click();

  setTimeout(function () {
    // cadena = Array.from("B" + document.getElementById("fcadena").value + "B");
    llenarceldas(cadena);
  }, 1000);

}

function transition(){
  condicion = state + "," + cadena[i];
  newaccion = trans[condicion];
  state = newaccion.NewState;
  newvalue = newaccion.NewValue;
  dir = newaccion.move;
}

function play() {

  botonNext = boton1[0];
  botonPrevius = boton2[0];

  smove = setInterval(function () {
     transition();
    switch (state) {
      case "q1":
        movercinta(accion);
        i++;
        break;
      case "q2":
        movercinta(accion);
        i--;
        break;
      case "q3":
        movercinta(accion);
        clearInterval(smove);
        break;
    }

  }, 1200);


}

function movercinta(_callback) {
  if (dir == "R") {
    botonNext.click();
  } else if (dir == "L") {
    botonPrevius.click();
  }
  _callback();
}

function accion() {

  movercinta(function () {
    if (newvalue != "B" && state != "q3") {
      document.getElementById("cinta" + (i + 1)).innerHTML = "<h3>" + newvalue + "</h3>";
      cadena[i] = newvalue;
    }
  });
 
}

//-------- jquery----------------//
// function loadSlider(){
  $('.multiple-items').slick({

    slidesToShow: 13,
    slidesToScroll: 1,
    speed: 1000,
  
  });
// }

// --------------------------------//