window.onload = function() {
    const signupForm = document.querySelector('.signup-form');
  
    signupForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the form from submitting normally
      alert('You have signed up!');
    });
  }