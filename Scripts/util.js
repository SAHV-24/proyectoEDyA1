let button = document.getElementById("button");
let input = document.getElementById("input");
let results = document.getElementById("scoreboard");



function compare(a, b) {// Comparar los problemas
  if (a[1] > b[1]) return -1;
  if (a[1] < b[1]) return 1;
  else {// Si los problemas son iguales:
    if (a[2] > b[2]) return 1;
    if (a[2] < b[2]) return -1;
    else {
      if (a[0] < b[0]) return 1;
      if (a[0] < b[0]) return -1;
      return 0;
    }
  }
}

button.addEventListener("click", function () {
  calcularScoreBoard(input);
});

function calcularScoreBoard(caso) {
  caso = input.value.split(";").map(x => x.split(" "));
    let arr = [];
    let equipos = [];

    caso.forEach(x => {
      let temp = parseInt(x[0].replace('Team', '')) // Se le quita a la cadena la palabra team para que quede solo el número de equipo. 
      equipos.push(temp)
    })

    equipos = new Set(equipos) // Set para que quite los equipos repetidos 
    equipos = Array.from(equipos) // Se convierte Set a Array de nuevo para poder recorrerlo.
    console.log(equipos)
    
    for (let j = 0; j < equipos.length; j++) { // Solo recorre por el número de equipos que se reciben de la cadena
      
      const arregloFiltrado = caso.filter(x => x[0] === `Team${equipos[j]}`); // Se accede a los equipos por su posición en el array
    
      let problemasTotales = 0;
      let tiempoTotal = 0;
      
      for (let i = 1; i < 10; i++) {

      let tiempoCorrecto = 0
      let incorrectos = 0
      let seCompleto = false
  
      arregloFiltrado.forEach(
      
          x => {
  
              if(!seCompleto){

                if(x[1] == i && x[3].toLowerCase() === 'c'){
              
                tiempoCorrecto = parseInt(x[2])
                seCompleto = true
  
                }

              }
                  
  
              if(x[1] == i && x[3].toLowerCase() === 'i'){
  
                  incorrectos++;
  
              }
  
      
          })
          
  
      if (seCompleto) { 

        problemasTotales++;
        tiempoTotal += incorrectos * 20 + tiempoCorrecto; // El tiempo total es el el tiempo correcto más 20 minutos por cada p. incorrecto.
        
      }
            
    }
      
    if (tiempoTotal > 0) {
      arr.push([`Team${equipos[j]}`, problemasTotales, tiempoTotal]);
    }
      
  }


  let scoreboard = "";
  arr
    .sort(compare)
  arr.forEach(
      (x) =>
        (scoreboard += `<tr> <td class="col1"> ${x[0]}</td> <td class="col2"> ${x[1]}</td> <td class="col3"> ${x[2]}</td> </tr>`)
    );

  if (arr.length===0){
    scoreboard="ERROR"
    input.value="ERROR"
    results.textContent="ERROR";
  }else{
    results.innerHTML = scoreboard;
    input.value=""
  }

  
}


