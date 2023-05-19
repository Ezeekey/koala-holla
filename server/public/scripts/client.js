console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      ready: $('#readyForTransferIn').prop('checked'),
      notes: $('#notesIn').val(),
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  
} // end getKoalas

// Function to handle adding a new Koala to the database
function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  $.ajax({
    method: 'POST',
    url: '/koalas',
    data: newKoala
  }).then(function(response){
    console.log('Response from server:', response);
    getKoalas();
    clearInputs();
  }).catch(function(err){
    console.log('Error in POST', err);
    alert('Unable to add Koala at this time.');
  })
 
}

// Reusable function to clear the input fields
function clearInputs(){
  $('#nameIn').val('');
  $('#ageIn').val('');
  $('#genderIn').val('true');
  $('#readyForTransferIn').val('');
  $('#notesIn').val('');
}