var nameInput =document.getElementById( "nameInput")
var urlInput =document.getElementById("urlInput")
var tbody =document.getElementById("tbody")
var sitesList = JSON.parse (localStorage.getItem("site"))|| [];
var nameRegex =/^[A-Za-z]{3,}$/
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/
 

displayALLSites();

function addSite() {
   if (validate(urlRegex,urlInput)) {
    var site = {
        websiteName: nameInput.value ,
        websiteUrl : urlInput.value ,
 };
    sitesList.push(site);
    localStorage.setItem("site",JSON.stringify(sitesList));
    displaySite(sitesList.length-1);
    clearInputs();

   }
   else{
    alert("url is invalid");
   }
}
function displaySite(index) {
   var table =  ` 
    <table class="table mt-4 ">
            <tbody>
              <tr class="text-center">
                <td>${index+1}</td>
                <td>${sitesList[index].websiteName}</td>
                <td> <button type="button" class=" btn  btn-visit " onclick = "visit()"> <i class="fa-solid fa-eye"></i>Visit</button></td>
                <td> <button type="button" class=" btn  btn-delete px-2" onclick="deleteSite(${index})"> <i class="fa-solid fa-trash-can"></i> Delete </button> </td>
              </tr>
            </tbody>
    </table>` ;
    tbody.innerHTML += table ;  
}
function displayALLSites(){
    for(var i=1;i<sitesList.length ; i++) {
        displaySite(i);
      
    }
    
};
function validate(regex,element) {
    if (regex.test(element.value)){
        element.classList.add("is-valid")
        element.classList.remove("is-invalid");
        return true;
    }
    {
        element.classList.add("is-invalid")
        element.classList.remove("is-valid");
        return false;
    }
}
function visit() {
open(`${sitesList[index].websiteUrl}`);
}
function clearInputs() {
    nameInput.value =" ";
    urlInput.value = " ";
}
function deleteSite(index) {
    sitesList.splice(index,1);
    localStorage.setItem("site",JSON.stringify(sitesList));
    tbody.innerHTML=" ";
    displayALLSites();

}