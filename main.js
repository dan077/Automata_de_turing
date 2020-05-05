//$( "div.scroll" ).scrollLeft( 300 );
//Maquina de turing
class evento {
    constructor(estado, escribir, movimiento) {
      this.estado = estado;
      this.escribir = escribir;
      this.movimiento = movimiento;
    }
    
    getEscribir(){
        return this.escribir;
    }
  }
  
  eventos = [];
  velocidad = 50;
  input = "bbaabbbabbabbabbbabbababb"
  MaquinaDeTuringAB(input);

  crearCeldas(input);
  mostrarEventos(input);
  function MaquinaDeTuringAB(input) {
    input = " " + input + " ";
    i = 1;
    estado = "q1";
    //eventos.push(new evento(estado, "a", "R"));
    while (estado != "q3") {
      //
      if (estado == "q1") {
        if (input[i] == "a" || input[i] == "b") {
          eventos.push(new evento(estado, "a", "R"));
          input = replaceAt(input, i, "a");
        } else if (input[i] == " ") {
          estado = "q2";
          eventos.push(new evento(estado, " ", "L"));
          input = replaceAt(input, i, " ");
        }
      } else if (estado == "q2") {
        if (input[i] == "a") {
          eventos.push(new evento(estado, "a", "L"));
          input = replaceAt(input, i, "a");
        } else if (input[i] == " ") {
          estado = "q3";
          eventos.push(new evento(estado, " ", "R"));
          input = replaceAt(input, i, " ");
        }
      }
  
      i = eventos[eventos.length - 1].movimiento == "R" ? i + 1 : i - 1;
      //console.log(i);
    }
  }
  
  function mostrarEventos() {
    let i = 0
    let q = 1;

    $('#T'+q).addClass("bg-primary blanco")

    let cicleSincro = setInterval(()=>{
        $('#T'+q).removeClass()
        $('#T'+q).html(eventos[i].escribir)
         q = eventos[i].movimiento == "R" ? q + 1 : q - 1;
        $('#T'+q).addClass("bg-primary blanco") 
        i++
        if(i == eventos.length)
        {    
            clearInterval(cicleSincro)
            Swal.fire(
                '¡Enhorabuena!',
                'La palabra ha sido validada',
                'success'
              )
        }
    }, velocidad)

  }
  
  function replaceAt(str, index, ch) {
    return str.replace(/./g, (c, i) => (i == index ? ch : c));
  }
  
  function crearCeldas(input) {
    var a = document.getElementById("letras");
    a.innerHTML += `<td id="T0"> </td>`;
    var i = 0;
    for (; i < input.length; i++) {
      a.innerHTML += `<td id="T${i+1}">${input[i]}</td>`;
    }

    a.innerHTML += `<td id="T${i+1}"> </td>`;
    //$("#T1").addClass("bg-primary blanco");
  }
  