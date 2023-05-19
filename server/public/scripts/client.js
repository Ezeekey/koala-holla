console.log('js');

// Variable to tell submit button whether it is edit mode or not.
let editMode = false;
let selectedKoalaId = 0;

$(document).ready(function () {
  console.log('JQ');
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $('#addButton').on('click', function () {
    console.log('in addButton on click');
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
    saveKoala(koalaToSend);
  });
  // Click handler for ready buttons.
  $("#viewKoalas").on('click', ".mark-as-read", markAsReady);

  // Click handler for delete buttons.
  $('#viewKoalas').on('click', '.delete-button', deleteKoala);

  // click handler for edit button
  $('#viewKoalas').on('click', '.edit', editKoala)
}

function markAsReady(event) {
  const koalaId = $(event.target).closest('tr').data('id');

  console.log(event);
  console.log(koalaId);

  $.ajax({
    method: 'PUT',
    url: `/koalas/ready/${koalaId}`
  }).then((res) => getKoalas()).catch((err) => alert(err));
}

function getKoalas() {
  console.log('in getKoalas');
  $('#viewKoalas').empty();
  // ajax call to server to get koalas
  $.ajax({
    method: 'GET',
    url: '/koalas',
  }).then(response => {
    console.log('this is the response we are getting', response);
    for (let koala of response) {
      let gender = '';
      let ready = '';
      let readyButton = '';

      // Turning boolean values into something more human readable.
      if (koala.ready) {
        ready = 'Yes'
        readyButton = 'Mark Not ready'
      } else {
        ready = "No"
        readyButton = 'Mark As Ready'
      }
      if (koala.gender) {
        gender = 'male';
      } else {
        gender = 'female'
      }
      $('#viewKoalas').append(`
      <tr data-id="${koala.id}">
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${gender}</td>
        <td>${ready}</td>
        <td>${koala.notes}</td>
        <td><button class="mark-as-read">${readyButton}</button</td>
        <td><button class="delete-button">Remove</button></td>
        <td><button class="edit">Edit</button></td>
      </tr>`)
    }
  }).catch(err => {
    console.log('error!', err)
  })

} // end getKoalas

// Function to handle adding a new Koala to the database
function saveKoala(newKoala) {
  console.log('in saveKoala', newKoala);
  $.ajax({
    method: 'POST',
    url: '/koalas',
    data: newKoala
  }).then(function (response) {
    console.log('Response from server:', response);
    getKoalas();
    clearInputs();
  }).catch(function (err) {
    console.log('Error in POST', err);
    alert('Unable to add Koala at this time.');
  })

}

// ajax request to put koala edit into input values
function editKoala(event) {
  // target the row on click
  selectedKoalaId = $(event.target).closest('tr').data("id");
  // send an ajax request that will get the targeted book. 
  $.ajax({
    method: 'GET',
    url: `/koalas/edit/${selectedKoalaId}`
  }).then(response => {
    selcetedKoala = response[0];
    console.log('should have the selected koala properties', selcetedKoala);
    $('#nameIn').val(selcetedKoala.name);
    $('#ageIn').val(selcetedKoala.age);
    $('#genderIn').val(selcetedKoala.gender);
    $('#readyForTransferIn').prop('checked');
    $('#')
  }).catch(err => {
    console.log('got an error getting the selected id', err)
  })

}

// Reusable function to clear the input fields
function clearInputs() {
  $('#nameIn').val('');
  $('#ageIn').val('');
  $('#genderIn').val('true');
  $('#readyForTransferIn').val('');
  $('#notesIn').val('');
}

function deleteKoala(event) {
  const koalaId = $(event.target).closest('tr').data('id');

  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this koala!",
    icon: "warning",
    buttons: true,
    dangerMode: true
  }).then((willDelete) => {
    if (willDelete){
      $.ajax({
        method: 'DELETE',
        url: `/koalas/${koalaId}`
      }).then((res) => {
        getKoalas()
        swal("Poof! Your koala has been yeeted!",{
        icon: "success",
        });
      }).catch((err) => {
        swal('What did you do d00d?', err);
        console.log(err);
      });
    } else {
      swal("Your imaginary koala is safe!")
    }
  });
}


