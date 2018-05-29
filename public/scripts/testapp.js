//sanity check
console.log('Sanity check');

$(document).ready(function() {
  console.log('testapp.js loaded');

  $.ajax({
    method: 'GET',
    url: '/api/users',
    success: handleSuccess,
    error: handleError
  });

  function handleSuccess(users) {
    users.forEach(function(user){
      let userTemplate =
      `<div>
        <h4>User created</h4>
        <p>Name: ${user.firstName} ${user.lastName}</p>
        <p>Email: ${user.email}</p>
        </div>`;

      $('.results').prepend(userTemplate);
    })

  }


  function handleCreate(users) {
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

  $('#registerForm').on('submit', function(event){
    event.preventDefault();
    console.log(this.firstName);
    $.ajax({
      method: 'POST',
      url: '/api/users',
      data: $(this).serialize(),
      success: function(user){
        console.log(user);
        handleCreate(user);
      },
      error: handleError
    });
    this.reset();
  })


})
