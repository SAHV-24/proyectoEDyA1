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

const input = document.getElementById("input")
const button = document.getElementById("button")
const results = document.getElementById("scoreboard");

button.addEventListener("click", function () {
  calcularScoreBoard(input);
});

function calcularScoreBoard(caso){

  caso =input.value.split(";").map(x => x.split(" "))

  let obj = {};
  
  caso.forEach(x => {

      const teamName = x[0];

      if (!obj.hasOwnProperty(teamName)) { //Verifica si se ha creado una propiedad con el nombre del equipo, ejemplo obj:{} (NO TIENE NADA!) entocnes se le agregará el equipo y quedará:
          obj[teamName] = {
              totalTime: 0,
              solvedProblems: 0
          };
      }

      const problem = x[1];

      if (!obj[teamName].hasOwnProperty(problem)) { //Verifica si en ese equipo no se ha creado ese problema 
                                                //y sino crea el problema con los siguientes parámetros:
          obj[teamName][problem] = {
              incorrects: 0,
              correctTime: 0,
              isCompleted: false
          };
      }



      if (x[3].toLowerCase() === 'i') { // si hay una incorrecta entonces que lo añ{ada}
          obj[teamName][problem]['incorrects']++;
      }

      if (x[3].toLowerCase() === 'c') { // apenas encuentre la correcta entonces que haga los calculos
          obj[teamName][problem]['correctTime'] = parseInt(x[2]);
          obj[teamName][problem]['isCompleted'] = true;

          // Calcular totalTime y aumentar solvedProblems
          let correctTime = parseInt(obj[teamName][problem]['correctTime']);
          let incorrects = parseInt(obj[teamName][problem]['incorrects']);

          obj[teamName]['totalTime'] += correctTime + (incorrects * 20);
          obj[teamName]['solvedProblems']++;
      }

  });

  let result = [];

  for (let team in obj) { // hacer el arreglo correspondiente para todos los teams que aparezcan O(teams)
      let solvedProblems = obj[team]['solvedProblems'];
      let totalTime = obj[team]['totalTime'];
      result.push([team, solvedProblems, totalTime]);
  }

  result.sort(compare); // método de ordenamiento

  let res=""
  
  result.forEach( // hacer que se vea en el html
      (x) =>
        (res += `<tr> <td class="col1"> ${x[0]}</td> <td class="col2"> ${x[1]}</td> <td class="col3"> ${x[2]}</td> </tr>`)
    );

  if (result.length===0){
      input.value="ERROR"
      results.textContent="ERROR";
  }else{
      input.value=""
      results.innerHTML = res;
  }
}

