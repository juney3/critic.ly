//sanity check
console.log('Sanity check');

$(document).ready(function() {
  console.log('testapp.js loaded');



$('#registerForm').on('submit', function(event){
  event.preventDefaul();
  $.ajax({
    method: 'POST',
    url: '/user',
    data: $(this).serialize(),
    success: handleSuccess(user),
    error: handleError
  });
  this.reset();
})

  function handleSuccess(user) {
    console.log('new user created');
    let userTemplate =
    `<div>
      <h4>User created</h4>
      <p>Name: ${user.firstName} ${user.lastName}</p>
      <p>Email: ${user.email}</p>
      </div>`;

    $('.results').prepend(userTemplate);
  }

  function handleError(err) {
    console.log(`O noes! The following error occurred: ${err}`);
    sendStatus(500);
  }
})
