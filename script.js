function getCountryInfo(menuRef)
{
    //alert("Hello Visitor!!"); 
    //declare a reference to the form 
    let formRef = document.querySelector("#countryInfoForm");
    let selectedCountry = formRef["countryselection"].value;
    alert(selectedCountry);
}