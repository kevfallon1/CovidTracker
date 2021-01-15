const globalHeader = document.getElementById('globalHeader');
const globalCasesText = document.getElementById('globalCasesText');
const globalDeathsText = document.getElementById('globalDeathsText');
const globalActivesText = document.getElementById('globalActivesText');
const globalRecoveriesText = document.getElementById('globalRecoveriesText');

fetch('https://covid-api.mmediagroup.fr/v1/cases?country=Global', {
    method: 'GET',
    mode: 'cors',
    headers: {
        Accept: 'application/json',
    }
})
  .then(function(response) { 
    return response.json();
  }).then(function(data) {
      console.log(data);
      const globalCases = data.All.confirmed;
      const globalDeaths = data.All.deaths;
      const globalRecovered = data.All.recovered;
      const globalPopulation = data.All.globalPopulation;
      const globalMortalityRate = globalCases / globalDeaths;
      const globalInfectionRate = globalPopulation / globalCases;
      const globalActives = (globalCases - globalRecovered) - globalDeaths;

      globalCasesText.textContent = globalCases.toLocaleString();
      globalDeathsText.textContent = globalDeaths.toLocaleString();
      globalActivesText.textContent = globalActives.toLocaleString();
      globalRecoveriesText.textContent = globalRecovered.toLocaleString();
      //globalHeader.innerHTML = "<strong style='color: red'>" + globalCases.toLocaleString() + "</strong> total confirmed cases"
      console.log(globalCases);
  })
  .catch(function(err) {
    console.log(err);
  });

