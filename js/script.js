let searchBtn=document.querySelector('#search-btn');
let searchBar=document.querySelector('.search-bar-container');
let formBtn=document.querySelector('#login-btn');
let loginForm=document.querySelector('.login-form-container');
let formClose=document.querySelector('#form-close');
let menu=document.querySelector('#menu-bar');
let navbar=document.querySelector('.navbar');
let videoBtn=document.querySelectorAll('.vid-btn');
window.onscroll=()=>{
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
    searchBar.classList.remove('active');
}
menu.addEventListener('click',()=>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
})
searchBtn.addEventListener('click',()=>{
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
})
formBtn.addEventListener('click',()=>{
    loginForm.classList.add('active');
})
formClose.addEventListener('click',()=>{
    loginForm.classList.remove('active');
})
videoBtn.forEach(btn=>{
    btn.addEventListener('click',()=>{
        document.querySelector('.controls .active').classList.remove('active');
        btn.classList.add('active');
        let src=btn.getAttribute('data-src');
        document.querySelector('#video-slider').src=src;
    })
})
  var swiper = new Swiper(".review-slider", {
      slidesPerView: 3,
      spaceBetween: 30,
      loop:true,
      autoplay:{
        delay:2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
    var swiper = new Swiper(".brand-slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop:true,
        autoplay:{
          delay:2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });


      // document.addEventListener('DOMContentLoaded', () => {
      //   const contactForm = document.querySelector('.contact form');
      //   const successMessage = document.getElementById('success-message');
      
      //   contactForm.addEventListener('submit', async (e) => {
      //     e.preventDefault();
      
      //     const formData = new FormData(contactForm);
      //     const name = formData.get('name');
      //     const email = formData.get('email');
      //     const number = formData.get('number');
      //     const subject = formData.get('subject');
      //     const message = formData.get('message');
      
      //     try {
      //       const response = await fetch('/contact', {
      //         method: 'POST',
      //         headers: {
      //           'Content-Type': 'application/json',
      //         },
      //         body: JSON.stringify({ name, email, number, subject, message }),
      //       });
      
      //       const data = await response.json();
      
      //       if (response.ok) {
      //         successMessage.style.display = 'block'; // Display the success message
      //         setTimeout(() => {
      //           successMessage.style.display = 'none'; // Hide the success message after 3 seconds
      //         }, 3000);
      //       } else {
      //         console.error(data.message || 'Something went wrong');
      //       }
      //     } catch (error) {
      //       console.error('Error:', error);
      //     }
      //   });
      // });
      

      function sendMessage() {
        const token = localStorage.getItem('token');

        if (!token) {
            // If token exists, call the main function
            alert('Please login to proceed.');
            return;
        }
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const number = document.getElementById('number').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
      
        // Create a data object to send to the server
        const data = {
          name: name,
          email: email,
          number: number,
          subject: subject,
          message: message
        };
      
        // Make a POST request to the server
        fetch('/sendMessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(result => {
          if (result.success) {
            document.getElementById('messageBox').innerHTML = '<h2>Message sent successfully!</h2>';
          } else {
            document.getElementById('messageBox').innerHTML = '<h2>Message sending failed. Please try again.</h2>';
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          document.getElementById('messageBox').innerHTML = '<h2>There was an error sending your message.</h2>';
        });
      }
      

      function sendBooking(){
        const token = localStorage.getItem('token');

        if (!token) {
            // If token exists, call the main function
            alert('Please login to proceed.');
            return;
        }
        const place = document.getElementById('place').value;
        const guests = document.getElementById('guests').value;
        const arrival = document.getElementById('arrival').value;
        const leaving = document.getElementById('leaving').value;
      
        // Create a data object to send to the server
        const data = {
          place: place,
          guests: guests,
          arrival: arrival,
          leaving: leaving
        };
      
        // Make a POST request to the server
        fetch('/book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(result => {
          if (result.msg === 'Booking successful') {
            alert('Booking successful');
            document.getElementById('success-message').innerHTML = '<p>Booking successful!</p>';
          } else {
            alert('Booking unsuccessful');
            document.getElementById('success-message').innerHTML = '<h2>Booking failed. Please try again.</h2>';
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          document.getElementById('success-message').innerHTML = '<p>There was an error booking your stay.</p>';
        });
      }



      function registerUser() {
        const email = document.getElementById('emailInput').value;
        const password = document.getElementById('passwordInput').value;
        
        // Create a data object to send to the server
        const data = {
            email: email,
            password: password
        };
    
        // Make a POST request to the server
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(result => {
            const messageBox = document.getElementById('messageBox1');
            if (result.success) {
                messageBox.innerHTML = '<h2>User registered successfully</h2>';
                loginUser(email, password);
            } else {
                messageBox.innerHTML = '<h2>User already registered</h2>';
                loginUser(email, password);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            document.getElementById('messageBox1').innerHTML = '<h2>There was an error registering/logging in the user.</h2>';
        });
    }
    
    function loginUser(email, password) {
        const data = {
            email: email,
            password: password
        };
    
        // Make a POST request to login
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(result => {
          console.log(result)
            if (result.success && result.token) {
                // Save token to local storage
                localStorage.setItem('token', result.token);
                
                window.location.href = '/'; // Redirect to home page
            } else {
                document.getElementById('messageBox1').innerHTML = '<h2>Login failed. Please try again.</h2>';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            document.getElementById('messageBox1').innerHTML = '<h2>There was an error logging in the user.</h2>';
        });
    }
    
    
    function validateEmailAndPassword() {
        const emailInput = document.getElementById('emailInput');
        const passwordInput = document.getElementById('passwordInput');
        const registerBtn = document.getElementById('registerBtn');
        const warningDiv = document.createElement('div');
    
        document.getElementById('registerForm').insertBefore(warningDiv, registerBtn);
    
        let isEmailValid = false;
        let isPasswordValid = false;
    
        const validateEmail = () => {
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            isEmailValid = emailPattern.test(emailInput.value);
            toggleButton();
        };
    
        const validatePassword = () => {
            const passwordPattern = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            isPasswordValid = passwordPattern.test(passwordInput.value);
            toggleButton();
        };
    
        const toggleButton = () => {
            if (isEmailValid && isPasswordValid) {
              registerBtn.removeAttribute('disabled');
              warningDiv.textContent = '';
            } else {
              registerBtn.setAttribute('disabled', 'true');                warningDiv.textContent = 'Invalid email or password';
            }
        };
    
        emailInput.addEventListener('input', validateEmail);
        passwordInput.addEventListener('input', validatePassword);
    }
    
    // Call the validation function
    validateEmailAndPassword();
    
    // You can call the registerUser function when the form is submitted
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        registerUser();
    });
    


    function toggleLoginLogout() {
      const loginBtn = document.getElementById('login-btn');
      const logoutBtn = document.getElementById('logout-btn');
  
      // Check if token exists in local storage
      const token = localStorage.getItem('token');
  
      if (token) {
          // Show logout button and hide login button
          logoutBtn.style.display = 'inline-block';
          loginBtn.style.display = 'none';
      } else {
          // Show login button and hide logout button
          logoutBtn.style.display = 'none';
          loginBtn.style.display = 'inline-block';
      }
  }
  
  function logout() {
      // Remove token from local storage
      localStorage.removeItem('token');
      
      // Reload the page
      location.reload();
  }
  
  // Initial toggle on page load
  toggleLoginLogout();
  


  function checkTokenAndProceed(mainFunction) {
    // Check if token exists in local storage
   
}