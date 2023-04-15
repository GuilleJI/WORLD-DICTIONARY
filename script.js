alert("Greetings! And Welcome to World Encyclopedia!!");

// read data from csv file

logJSONData();
let countryInfo;

async function logJSONData() {
    const response = await fetch("http://127.0.0.1:5500/countries.json");
    const jsonData = await response.json();
    countryInfo = jsonData;
    createMenuOptions(); 

}

function createMenuOptions(){

    //<option value="Canada">Canada</option>
    const countrySelectRef = document.querySelector 
    ("#countrySelection"); 
    countrySelectRef.innerHTML=""; 

    //start inserting options for this menu 
    for (let i=0; i<countryInfo.length; i++)
    {
        countrySelectRef.innerHTML+= `<option value="${countryInfo[i].Name}">${countryInfo[i].Name}</option>`;
    }
}



function getCountryInfo()
{

    //declare a reference to the form 
    let formRef = document.querySelector("#countryInfoForm");
    let selectedCountry = formRef["countrySelection"].value.replace(" "," ");
    alert(selectedCountry);
    let pUnitSelected = formRef["pUnitSelection"].value; 
    alert(pUnitSelected);

    //change the href of the wikipage link/button 
    let wikiLink = document.querySelector("#wikiPageLink");
    wikiLink.setAttribute("href", "https://en.wikipedia.org/wiki/"+selectedCountry);

    // Get country population

    
    //call 'getCountryInfo()' function after retrieving the selected country and its population data
    getPopulationPercentage(); 
    
     

}

function getPopulationPercentage(){

    //Get a reference to the form
    let formRef = document.querySelector("#countryInfoForm");

    //Get the selected country and its population
    let selectedCountry = formRef["countrySelection"].value.replace(" "," ");
    let population =0; 
    for (let i = 0; i < countryInfo.length; i++)  {
        if (countryInfo[i].Name === selectedCountry) {
            population = countryInfo[i].Population;
            break; 
        }
    }

    //Get world population
    const worldPopulation = countryInfo.reduce((total, c) => total + c.Population,0); //this line is based off 'Array.prototype.reduce method 

    //calculate population %
    const populationPercentage =((population / worldPopulation) * 100).toFixed(2); 

    //Display the population percentage 
    formRef["pPercentDisplay"].value = `${populationPercentage}% of the world population`;

    //Display country population
    formRef["populationDisplay"].value= `Total population: ${population}`;
}


//calculate population density 

//convert sq miles km / vice versa 

//convert per sq miles to per sq km / vice versa