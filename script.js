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
        countrySelectRef.innerHTML += `<option value="${countryInfo[i].Name}" data-flag="${countryInfo[i].Name.toLowerCase()}.png">${countryInfo[i].Name}</option>`;
    }
    // add event listener to the select element 
    const flagImageElement = document.querySelector("#flagImage"); 
    countrySelectRef.addEventListener("change", function() {
        const selectedCountry = this.value; 
        const flagFilename = this.options[this.selectedIndex].getAttribute("data-flag"); 
        const flagImagePath = `./flags/${flagFilename}`;
        flagImageElement.setAttribute("src", flagImagePath);
        flagImageElement.setAttribute("alt", selectedCountry + " Flag Image"); 
    });
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

   


    
    //call 'getCountryInfo()' function after retrieving the selected country and its population data
    getPopulationPercentage();   

}


function getPopulationPercentage(){

    //Get a reference to the form
    let formRef = document.querySelector("#countryInfoForm");

    //Get the selected country and its population
    let selectedCountry = formRef["countrySelection"].value.replace(" "," ");
    let population =0; // created population as a variable to determine the population of the selected country
    let area=0; // created area as a new variable to determine the area of  the selected country
    for (let i = 0; i < countryInfo.length; i++)  {
        if (countryInfo[i].Name === selectedCountry) {
            population = countryInfo[i].Population;
            area = countryInfo[i].Area; 
            break; 
        }
    } // created a for loop to determine country population and country area

    //Display country population
    formRef["populationDisplay"].value= `${population}`;



    //Get world population
    const worldPopulation = countryInfo.reduce((total, c) => total + c.Population,0); //this line is based off 'Array.prototype.reduce method 
    //calculate population %
    const populationPercentage =((population / worldPopulation) * 100).toFixed(2); 

    //Display the population percentage 
    formRef["pPercentDisplay"].value = `${populationPercentage}%`;




    //calculate population density in sq kilometers and later convert it to sq miles
    const populationDensityKm = (population/area).toFixed(2);  // created variable calculating population density in sq km. 
    const populationDensityMi = (populationDensityKm * 0.386).toFixed(2); // created variable calculating population density converted from sq km to sq miles. 

    //create variable which makes reference to html input "pUnitSelection"
    const pUnitSelected = formRef["pUnitSelection"].value; 
    let populationDensity =0; 
    if (pUnitSelected === "Per Sq. Miles"){
        populationDensity = populationDensityMi; 
    }else{
        populationDensity = populationDensityKm; 
    }//create an if else statement to specify a new condition if the first condition is false. In this case I want the value displayed in the 'pDensityDisplay' input field to change based on the user's selection either Sq. miles or Sq. Km 

    //Display population density (per sq. km or per sq. mi)
    formRef["pDensityDisplay"].value = populationDensity; 



    //Calculate Area sq. miles from Area sq. Km
    const areaInKm = area.toFixed(2); 
    const areaInMiles = (areaInKm * 0.386).toFixed(2);

    //create variable making reference to html label "aUnitSelection" 
    const aUnitSelected = formRef['aUnitSelection'].value

    let countryAreaIn =0; 
    if (aUnitSelected === "miles"){
        countryAreaIn = areaInMiles;

    }else{
        countryAreaIn = areaInKm;
    }//created an if else statement to specify a new condition if the first condition is false. In this case I want the value displayed in the 'areaDisplay' input field to change based on the user's selection either sq. miles or Sq. Km. 

    //Display Area in sq.km and sq.Miles
    formRef["areaDisplay"].value = countryAreaIn; 
}




