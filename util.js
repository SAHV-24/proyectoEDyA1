let button = document.getElementById("asd");
let input = document.getElementById("Entrada");
let results = document.getElementById("scoreboard");

button.addEventListener("click", function () {
  calcularScoreBoard(input);
});

function calcularScoreBoard(caso) {
  console.time("a");
  caso = caso.value.split(";").map((x) => x.trim().split(" "));
  let scoreboard = "";

  //Busca entre los 100 equipos
  for (let j = 1; j <= 100; j++) {
    // Filtra todos los arreglos que sean del equipo J
    let FilteredArray = caso.filter((x) => x[0] === `Team${j}`);

    let cantProblemas = 0; // Declaro la cantidad de problemas
    let times = 0;

    if (FilteredArray.length > 0) {
      for (let i = 1; i < 10; i++) {
        let problemas = FilteredArray.filter((x) => x[1] == i); // Filtrar los X que tengan ese problema

        if (problemas.length > 0) {
          let band = 0;
          // Si no encontró nada que no entre
          let incorrects = 0; // respuestas incorrectas
          let correctTime = 0; // tiempo de la respuesta correcta
          problemas.forEach((x) => {
            if (x[3].toLowerCase() == "i" && band == 0) {
              incorrects++;
            }
            if (x[3].toLowerCase() == "c" && band == 0) {
              band = 1;
              correctTime = parseInt(x[2]);
              cantProblemas++;
              return;
            }
          });
          if (correctTime != 0) {
            times += incorrects * 20 + correctTime;
            console.log(times + "\n" + cantProblemas);
          }
        }
      }
      if (times > 0) {
        scoreboard += `Team${j} ${cantProblemas} ${times}\n`;
      }
    }
  }

  // resultados:

  console.timeEnd("a");

  results.textContent = scoreboard;
}
