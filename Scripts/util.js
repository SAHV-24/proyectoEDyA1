let button = document.getElementById("asd");
let input = document.getElementById("Entrada");
let results = document.getElementById("scoreboard");

function compare(a, b) {
  // Comparar los problemas
  if (a[1] > b[1]) return -1;
  if (a[1] < b[1]) return 1;
  else {
    // Si los problemas son iguales:
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
  calcularScoreBoard(input.value);
});

function calcularScoreBoard(caso) {
    caso = caso.split(";").map(entry => entry.split(" "));
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
      if (arregloFiltrado.length > 0) {
        let problemasTotales = 0;
        let tiempoTotal = 0;
        
        for (let i = 1; i < 10; i++) {
          const problemas = arregloFiltrado.filter(x => x[1] == i && x[3].toLowerCase() === 'c');
          if (problemas.length > 0) { // Si hay algún problema correcto para j equipo, se realiza el cálculo del puntaje entonces
            problemasTotales++;
            let tiempoCorrecto = parseInt(problemas[0][2]); // Se elige solo el primer problema correcto [0], y el tiempo [2]
            let incorrectos = arregloFiltrado.filter(y => y[1] == i && y[3].toLowerCase() === 'i').length; // Numero de problemas incorrectos por equipo
            tiempoTotal += incorrectos * 20 + tiempoCorrecto; // El tiempo total es el el tiempo correcto más 2o minutos por cada p. incorrecto.
          }
        }
        
        if (tiempoTotal > 0) {
          arr.push([`Team${equipos[j]}`, problemasTotales, tiempoTotal]);
        }
      }
    }

    let scoreboard = "";
  arr.sort(compare).forEach((x) => (scoreboard += x + "\n"));
  
    results.textContent = scoreboard;
  }