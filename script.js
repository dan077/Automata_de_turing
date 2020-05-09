
// variables globales
var state= "q1";
var stateprevius="q1";
var cadena = "";

var slider=document.getElementById("myRange");
var x=parseInt(slider.value);
var velocidad;

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
  var k=0,num=-5,adds=0;
  if(size>10){
     adds=(size-10);
   }
  while(k<(15+adds)){
     var elemento= document.createElement("div");
     elemento.className="items";
     elemento.id="cinta"+num;
     document.getElementById("slip").appendChild(elemento);
    k++;num++;
  }
}

function loadcinta(_callback){
     
    $("#slip").removeClass("sliderinicio");
    $("#slip").removeClass("slick-initialized");
    $("#slip").removeClass("slick-slider");
    $("#slip").empty();
    _callback();

}
function newslider(){
  loadcinta(function () {
    // loadSlider();
    crearCeldas(cadena.length);
    $("#slip").addClass("newSlider");
    loadNewSlider();  
  });

 
}
function load() {

  cadena = Array.from("B" + document.getElementById("fcadena").value + "B");
  loadcinta(newslider);
  botonNext = boton1[0];
  botonNext.click();
  setTimeout(function () {
    x=parseInt(slider.value);
    velocidad=parseInt(x)*10+500;
    $('.newSlider').slick("setOption", "speed",velocidad);
    llenarceldas(cadena);
  }, velocidad);

}

function transition(){
  condicion = state + "," + cadena[i];
  newaccion = trans[condicion];
  state = newaccion.NewState;
  newvalue = newaccion.NewValue;
  dir = newaccion.move;
}

var smove=null;
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


  }, (velocidad+200));
  

}

var changeSpeed=false;
function movercinta(_callback) {
  moviendocinta=true;
  if (dir == "R") {
    botonNext.click();
  } else if (dir == "L") {
    botonPrevius.click();
  }
  _callback();
}
//Función del grafo
function efectoGrafo(prevState, oldValue, newState, newValue, dir){
  //console.log("#"+newState + oldValue + newValue);
  $("#q1aa,#q1ba,#q2aa,#q2BB,#q3BB").css({"fill":"none"});
  $(".nodo").css({"fill":"aquamarine"});

  $("#"+newState + oldValue + newValue).css({"fill":"chartreuse"});
  //$("#g"+prevState).css({"fill":"none"});
  $("#g"+newState).css({"fill":"chartreuse"});
  if(newState == "q3"){
    $("#q1aa,#q1ba,#q2aa,#q2BB,#q3BB").css({"fill":"black"});
    $("#"+newState + oldValue + newValue).css({"fill":"chartreuse"});
  }
}

function accion() {

  movercinta(function () {
    if (newvalue != "B" && state != "q3") {
      document.getElementById("cinta" + (i + 1)).innerHTML = "<h3>" + newvalue + "</h3>";
    }
     efectoGrafo(stateprevius,cadena[i],state,newvalue,dir);
     stateprevius=state;
    cadena[i] = newvalue;
  });
 
}

//-------- jquery----------------//

 var runSlider=false;
 function loadNewSlider(){
  $('.newSlider').slick({

    slidesToShow: 13,
    slidesToScroll: 1,
    speed: 1000,
  });
   runSlider=true;
 }

 function loadSliderInicio(){
    $('.sliderinicio').slick({ 
      slidesToShow: 13,
      slidesToScroll: 1,
      speed: 1000, 
    });
 }
 
 window.onload=loadSliderInicio();
// --------------------------------//
var k;
var xpre=x;

slider.addEventListener("mousemove",function(){
   x=parseInt(slider.value);
    if(runSlider==true && (x-xpre)!=0){
      if(x<50){
        k=51-x;
        velocidad=(1000+k*10)+250;
        
      }else{
          k=x-50;
          velocidad=(1000-k*10);
          
      }
      slider.onmouseup = function(){
          
          $('.newSlider').slick("setOption", "speed",velocidad);
          clearInterval(smove);
          play();
          xpre=x; 
          
      };
      
    }
    var color='linear-gradient(90deg,rgb(3, 121, 168)'+x+'%,rgb(255, 255, 255)'+x+'%)'
    slider.style.background=color;
 });
