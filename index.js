let themeButton = document.getElementById("theme-button");

// TODO: Complete the toggleDarkMode function
const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
}

themeButton.addEventListener("click", toggleDarkMode);

// -------------------------------------

document.addEventListener("DOMContentLoaded", function() {
  let count = 3; // Starting count of signatures
  const modalImage = document.querySelector('#thanks-modal img');
  const modal = document.getElementById('thanks-modal');
  const closeModalButton = document.getElementById('close-modal');

  // Function to add a signature
  function addSignature(person) {
    const newSignature = document.createElement("p");
    newSignature.textContent = `🖊️ ${person.name} from ${person.hometown} supports this.`;
    const signaturesSection = document.querySelector(".signatures");
    signaturesSection.appendChild(newSignature);
    count++;
    updateCounter(signaturesSection);
  }

  // Function to update the counter
  function updateCounter(signaturesSection) {
    let counter = document.getElementById("counter") || document.createElement("p");
    counter.id = "counter";
    counter.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;
    signaturesSection.appendChild(counter);
  }

  // Validation and handling form submission
  const signNowButton = document.getElementById("sign-now-button");
  signNowButton.addEventListener('click', validateForm);

  function validateForm() {
    let containsErrors = false;
    const petitionInputs = document.getElementById("sign-petition").elements;
    Array.from(petitionInputs).forEach(input => {
      if (input.value.length < 2) {
        input.classList.add('error');
        containsErrors = true;
      } else {
        input.classList.remove('error');
      }
    });

    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      email.classList.add('error');
      containsErrors = true;
    } else {
      email.classList.remove('error');
    }

    if (!containsErrors) {
      const person = {
        name: document.getElementById('name').value,
        hometown: document.getElementById('hometown').value
      };
      addSignature(person);
      toggleModal(person);
      Array.from(petitionInputs).forEach(input => input.value = "");
      alert("Signature added successfully!");
    } else {
      alert("Please fill out all fields correctly.");
    }
  }

  // Modal display and animation
  function toggleModal(person) {
    const modalContent = document.getElementById('thanks-modal-content');
    modal.style.display = "flex";
    modalContent.textContent = `Thank you so much, ${person.name}! Your support is greatly appreciated!`;
    let scaleFactor = 1;
    const intervalId = setInterval(() => {
      scaleFactor = (scaleFactor === 1) ? 0.8 : 1;
      modalImage.style.transform = `scale(${scaleFactor})`;
    }, 500);

    setTimeout(() => {
      modal.style.display = "none";
      clearInterval(intervalId);
    }, 10000);
  }

  // When the user clicks on the close button, close the modal immediately
  closeModalButton.onclick = function() {
    modal.style.display = "none";
  }

  // Close the modal when clicking outside of it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
});


// -------------------------------------

document.addEventListener("DOMContentLoaded", function() {
  // Get the button using its ID
  const startButton = document.getElementById('button start');

  // Add a click event listener to the button
  startButton.addEventListener('click', function(event) {
    // Prevent any default action
    event.preventDefault();

    // Get the petition section element
    const petitionSection = document.getElementById('petition');

    // Scroll to the petition section smoothly
    petitionSection.scrollIntoView({ behavior: 'smooth' });
  });
});

// -------------------------------------

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting via the browser

    var contactSection = document.getElementById('contact');
    contactSection.innerHTML = 
      '<div class="thank-you-message"><h2>Thank you for contacting oWellnez. </h2> <p>We appreciate your interest and look forward to assisting you on your health and wellness journey.</p></div>';
});

// -------------------------------------

let animation = {
    revealDistance: 150,
    initialOpacity: 0,
    transitionDelay: 0,
    transitionDuration: '2s',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease'
};

// -------------------------------------

// Function to handle the reveal of sections
function reveal() {
  let windowHeight = window.innerHeight;
  let revealableContainers = document.querySelectorAll('.revealable');

  for (let i = 0; i < revealableContainers.length; i++) {
    let element = revealableContainers[i];
    let topOfElement = element.getBoundingClientRect().top;
    let bottomOfElement = element.getBoundingClientRect().bottom;

    if (topOfElement < windowHeight - animation.revealDistance && bottomOfElement > 0) {
      // Element is within the reveal distance from the bottom and still visible in the viewport
      element.classList.add('active');
    } else {
      // Element is outside the reveal distance or not visible in the viewport
      element.classList.remove('active');
    }
  }
}

// Attach the reveal function to the scroll event
window.addEventListener('scroll', reveal);


// -------------------------------------

// Toggle for motion reduction
let motionReduced = false;

function reduceMotion() {
  if (!motionReduced) {
    // Reduce motion settings
    animation.transitionDuration = '0s'; // No animation
    animation.transitionDelay = '0s';
    animation.transitionProperty = 'none';
    animation.revealDistance = 0; // No move
  } else {
    // Reset to normal animation settings
    animation.transitionDuration = '2s';
    animation.transitionProperty = 'all';
    animation.revealDistance = 150;
  }

  // Apply the new settings to all revealable containers
  let revealableContainers = document.querySelectorAll('.revealable');
  revealableContainers.forEach(container => {
    container.style.transitionDuration = animation.transitionDuration;
    container.style.transitionDelay = animation.transitionDelay;
    container.style.transitionProperty = animation.transitionProperty;
    // Optionally, adjust the transform property if you modified revealDistance
    container.style.transform = `translateY(${motionReduced ? '0px' : '150px'})`;
  });

  // Toggle the motionReduced flag
  motionReduced = !motionReduced;
}

document.getElementById('reduce-motion-btn').addEventListener('click', reduceMotion);

// -------------------------------------
