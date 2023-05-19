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
      name: 'testName',
      age: 'testName',
      gender: 'testName',
      readyForTransfer: 'testName',
      notes: 'testName',
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    method: 'GET', 
    url: '/koalas',
  }).then(response => {
    console.log('this is the response we are getting', response);
    for (let koala of response) {
      let gender = '';
      let ready = '';
      if(ready) {
        ready = 'Yes'
      } else {
        ready = "No"
      }
      if(koala.gender) {
        gender = 'male';
      } else {
        gender = 'female'
      }
      $('#viewKoalas').append(`
      <tr>
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${gender}</td>
        <td>${ready}</td>
        <td>${koala.notes}</td>
        <td><button class="mark-as-read">Mark As Ready</button</td>
        <td><button class="delete-button">Remove</button></td>
        <td><button class="edit">Edit</button></td>
      </tr>`)
    }
  }).catch(err => {
    console.log('error!', err)
  })
  
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
 
}


