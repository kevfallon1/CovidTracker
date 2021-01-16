//Global information DOM elements
const globalHeader = document.getElementById('globalHeader');
const globalCasesText = document.getElementById('globalCasesText');
const globalDeathsText = document.getElementById('globalDeathsText');
const globalActivesText = document.getElementById('globalActivesText');
const globalRecoveriesText = document.getElementById('globalRecoveriesText');
const countrySelect = document.getElementById('countrySelect');
countrySelect.addEventListener('change', getCountryData)

//Country specific information DOM elements
const countryContainer = document.getElementById('countryContainer');
const countryCasesText = document.getElementById('countryCasesText');
const countryDeathsText = document.getElementById('countryDeathsText');
const countryActivesText = document.getElementById('countryActivesText');
const countryRecoveriesText = document.getElementById('countryRecoveriesText');
const countryName = document.getElementById('countryName');



//Get global covid data from API
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

//Populate the select input with countries supported by the API
fetch('https://covid-api.mmediagroup.fr/v1/cases', {
    method: 'GET',
    mode: 'cors',
    headers: {
        Accept: 'application/json',
    }
}).then(function(response) {
    return response.json();
}).then(function(data) {
    for(country in data) {
        const selectVal = document.createElement('option');
        selectVal.text = country;
        selectVal.value = country;
        countrySelect.add(selectVal);
    }
}).catch(function(err) {
    console.log(err)
});


//Get country specific data for the country selected by the user
function getCountryData() {
    let selectedCountry = this.value;
    let url = 'https://covid-api.mmediagroup.fr/v1/cases?country=' + selectedCountry;
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
        }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        var countryCases = data.All.confirmed;
        var countryDeaths = data.All.deaths;
        var countryRecovered;
        var countryActives;
        if(data.All.recovered > 0) {
            countryRecovered = data.All.recovered;
            countryActives = ((countryCases - countryRecovered) - countryDeaths);
            countryRecovered = countryRecovered.toLocaleString();
            countryActives = countryActives.toLocaleString();
        } else {
            countryRecovered = 'No Data';
            countryActives = 'No Data';
        }
        

        countryCasesText.textContent = countryCases.toLocaleString();
        countryDeathsText.textContent = countryDeaths.toLocaleString();
        countryActivesText.textContent = countryActives;
        countryRecoveriesText.textContent = countryRecovered;

        countryName.textContent = selectedCountry;
        countryContainer.classList.remove('invisible');
    }).catch(function(err) {
        console.log(err)
    });
}


