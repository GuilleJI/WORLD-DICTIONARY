alert("Greetings! And Welcome to World Encyclopedia!!");

// read data from csv file

logJSONData();
let countryInfo;

async function logJSONData() {
    const response = await fetch("http://127.0.0.1:5500/countries.json");
    const jsonData = await response.json();
    countryInfo = jsonData; 

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
}

//calculate population %

//calculate population density 

//convert sq miles km / vice versa 

//convert per sq miles to per sq km / vice versa