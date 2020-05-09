$( "#btnPlay" ).prop( "disabled", true ); 
$( "#btnPause" ).prop( "disabled", true );
$( "#btnStep" ).prop( "disabled", true );
$( "#btnStop" ).prop( "disabled", true );
// variables globales
var stepController = true;
var state= "q1";
var stateprevius="q1";
var cadena = "";
var smove;
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

function pause(){
  clearInterval(smove);
  $( "#btnPlay" ).prop( "disabled", false );
}

function stop(){
  load();
}


function step(){
    $('.newSlider').slick('slickSetOption', 'speed', 1);
    clearInterval(smove);
    nuevoEstado();
    play();  
    $('.newSlider').slick('slickSetOption', 'speed', 250);
}


function load() 
{

  if(document.getElementById("fcadena").value != ""){
    $( "#btnPlay" ).prop( "disabled", false );
    $( "#btnPause" ).prop( "disabled", true );
    $( "#btnStep" ).prop( "disabled", true );
    $( "#btnStop" ).prop( "disabled", true );
    state = "q1";
    stateprevius = "q1";
    cadena = "";
    i = 1;
    clearInterval(smove);
  
    cadena = Array.from("B" + document.getElementById("fcadena").value + "B");
    loadcinta(newslider);
    botonNext = boton1[0];
    botonNext.click();
    setTimeout(function () {
      // cadena = Array.from("B" + document.getElementById("fcadena").value + "B");
      llenarceldas(cadena);
  
    }, 250);
  }
  else{
    Swal.fire(
      'Campo vacio',
      'Por favor, Ingrese una cadena',
      'error'
    )
  }
 

}

function nuevoEstado()
{
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
      $( "#btnStep" ).prop( "disabled", true );
      $( "#btnPause" ).prop( "disabled", true );
      $( "#btnStop" ).prop( "disabled", true);
      clearInterval(smove);
      break;
  }
}

function transition(){
  if(state != "q3")
  {
    console.log(cadena[i])
    if(cadena[i] != 'a' && cadena[i] != 'b' && cadena[i] != "B"){
      Swal.fire(
        'Palabra NO aceptada',
        '',
        'error'
      )
      stop();
    }
    else{
      condicion = state + "," + cadena[i];
      newaccion = trans[condicion];
      state = newaccion.NewState;
      newvalue = newaccion.NewValue;
      dir = newaccion.move;
      if(state == "q3"){
        Swal.fire(
          'Palabra aceptada',
          '',
          'success'
        )
      }
    }
  }
}

function play() {
  $( "#btnPlay" ).prop( "disabled", true );
  $( "#btnStep" ).prop( "disabled", false );
  $( "#btnPause" ).prop( "disabled", false );
  $( "#btnStop" ).prop( "disabled", false);
  botonNext = boton1[0];
  botonPrevius = boton2[0];

  smove = setInterval(function () {
     nuevoEstado();
  }, 1200);


}

function movercinta(_callback) {
  if(stateprevius != "q3")
  {
    if (dir == "R") {
      botonNext.click();
    } else if (dir == "L") {
      botonPrevius.click();
    }
    _callback();
}
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
      // efectoGrafo(cadena[i]+"->"+newvalue+","+dir); 
    }
    //  nodo anterior,valor que encuentra,nuevo nodo,nuevo valor,direcion
    efectoGrafo(stateprevius,cadena[i],state,newvalue,dir);
    //  ----------------------------------------
    stateprevius=state;
    cadena[i] = newvalue;
  });
 
}

//-------- jquery----------------//
 function loadNewSlider(){
  $('.newSlider').slick({

    slidesToShow: 13,
    slidesToScroll: 1,
    speed: 250,
  
  });
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

var slider=document.getElementById("myRange");
// var output=document.getElementById("value");
slider.oninput=function(){
   
}
slider.addEventListener("mousemove",function(){
   var x=slider.value;
   var color='linear-gradient(90deg,rgb(3, 121, 168)'+x+'%,rgb(255, 255, 255)'+x+'%)'
   slider.style.background=color;
})