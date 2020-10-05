
// put your own value below!
const apiKey ='lEnfJZyyouZvZigH1NA8XwuaiRlnurqxdK7vbYju';
const searchURL= 'https://developer.nps.gov/api/v1/parks?';

function getNationalParks(stateName, maxResults){
  // "https://developer.nps.gov/api/v1/parks?parkCode=&stateCode=CA&limit=10&api_key=lEnfJZyyouZvZigH1NA8XwuaiRlnurqxdK7vbYju"
  var finalURL = searchURL + "parkCode=&stateCode=" + stateName + "&limit=" + maxResults + "&api_key=" + apiKey

var  url = encodeURI(finalURL)
console.log(url)

fetch(finalURL)
.then(response => {
  if (response.ok){
    return response.json();
  }
  else console.log("Error")
})
.then(responseJson => {displayCandidateGit(responseJson)})
  .catch(error => alert(`Something went wrong. Try again later.`))
}

function displayCandidateGit(responseJson){

  // if there are previous results, remove them
  $('#results-list').empty();
  // iterate through the park list
  for(let i= 0; i < responseJson.data.length; i++){
    //for each candidate array, add a list item to the result, list description and name.
    $('#results-list').append(
      `<li><a href="${responseJson.data[i].url}"><h3>${responseJson.data[i].fullName}</h3></a>
      <p>${responseJson.data[i].description}</p>
      <a href="${responseJson.data[i].directionsUrl}">Directions to the park</a>
      
      </li>`
    )};
    $('#result').removeClass('hidden');
};

//This function looks out for submit events on the Form
function watchForm(){
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm=$('#js-searchState').val();
    const maxResults =$('#js-max').val();
    getNationalParks(searchTerm, maxResults);
    $('.state').text(`Search results for ${searchTerm}`);
  });
}

//function that uns when the DOM Is loaded
$(watchForm);