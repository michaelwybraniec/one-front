let zoomLevel = 1; // Initial zoom level (100%)
let originalDevicePixelRatio = window.devicePixelRatio; // Store the original device pixel ratio

document.addEventListener("DOMContentLoaded", function () {
  // Retrieve the saved zoom level from localStorage
  const savedZoomLevel = localStorage.getItem('zoomLevel');
  if (savedZoomLevel) {
    zoomLevel = parseFloat(savedZoomLevel); // Parse the saved zoom level
    applyZoom(zoomLevel); // Apply the zoom level
  }
  const modeToggleBtn = document.getElementById('mode-toggle-btn');
  // Retrieve the saved mode from localStorage
  const savedMode = localStorage.getItem('mode');
  // Apply the saved mode or default to light mode
  if (savedMode) {
    switchMode(savedMode);
  } else {
    switchMode('light');
  }
  // Event listener to toggle modes
  modeToggleBtn.addEventListener('click', () => {
    const currentMode = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    const newMode = currentMode === 'dark' ? 'light' : 'dark';
    switchMode(newMode);
    localStorage.setItem('mode', newMode); // Save the new mode
  });
  initializeEarthImages();
  if (document.querySelector('.earth-image')) setMaxScale();
  setRandomHeights();
  // Listen for changes in the devicePixelRatio to handle browser zoom changes
  window.addEventListener('resize', handleZoomChange);
});

document.getElementById('zoom-in').addEventListener('click', function () {
  zoomLevel += 0.1; // Increase zoom level by 10%
  applyZoom(zoomLevel);
  localStorage.setItem('zoomLevel', zoomLevel); // Save zoom level to localStorage
});

document.getElementById('zoom-out').addEventListener('click', function () {
  if (zoomLevel > 0.1) { // Prevent zooming out too much
    zoomLevel -= 0.1; // Decrease zoom level by 10%
    applyZoom(zoomLevel);
    localStorage.setItem('zoomLevel', zoomLevel); // Save zoom level to localStorage
  }
});

// Function to apply the zoom level
function applyZoom(level) {
  document.body.style.zoom = level;
}

// Function to switch modes and update the icon and tooltip
function switchMode(mode) {
  document.body.classList.remove('dark-mode', 'light-mode');
  const modeToggleBtn = document.getElementById('mode-toggle-btn');
  if (mode === 'dark') {
    document.body.classList.add('dark-mode');
    modeToggleBtn.innerHTML = '🥷'; // Moon icon for dark mode
    modeToggleBtn.setAttribute('data-tooltip', 'Dark mode');
  } else if (mode === 'light') {
    document.body.classList.add('light-mode');
    modeToggleBtn.innerHTML = '⛱️'; // Sun icon for light mode
    modeToggleBtn.setAttribute('data-tooltip', 'Light mode');
  }
}

// Function to handle browser zoom changes
function handleZoomChange() {
  const newDevicePixelRatio = window.devicePixelRatio;
  if (newDevicePixelRatio !== originalDevicePixelRatio) {
    originalDevicePixelRatio = newDevicePixelRatio;
    zoomLevel = 1; // Reset to 100%
    applyZoom(zoomLevel); // Apply the zoom level
    localStorage.setItem('zoomLevel', zoomLevel); // Reset the zoom level in localStorage
  }
}

// Function to initialize Earth images and set the initial mode
function initializeEarthImages() {
  const earthContainer = document.querySelector('.earth-container');
  if (earthContainer) {
    if (!document.querySelector('.earth-image')) {
      earthContainer.innerHTML = `
                <div class="earth-image"></div>
                <div class="earth-image-2"></div>
                <div class="earth-image-3"></div>
                <div class="earth-image-4"></div>
                <div class="earth-image-5"></div>
                <div class="earth-image-6"></div>
            `;
    }
    const initialMode = localStorage.getItem('mode') || 'light';
    switchMode(initialMode); // Apply the last saved mode
  }
}

// Function to set maximum scale for Earth images
function setMaxScale() {
  const element = document.querySelector('.earth-image'); // Select your element
  if (element) {
    const rect = element.getBoundingClientRect(); // Get the element's dimensions
    const maxWidth = window.innerWidth;  // Viewport width
    const maxHeight = window.innerHeight; // Viewport height
    const scaleX = maxWidth / rect.width;  // Calculate horizontal scale
    const scaleY = maxHeight / rect.height; // Calculate vertical scale
    const maxScale = Math.min(scaleX, scaleY);  // Choose the smaller scale to fit both dimensions
    // Apply the maximum scale as a CSS variable
    document.documentElement.style.setProperty('--max-scale', maxScale);
  } else {
    console.error("Element with class '.earth-image' not found.");
  }
}

// Function to set random heights for Earth images
function setRandomHeights() {
  const elements = document.querySelectorAll('.earth-image, .earth-image-2, .earth-image-3, .earth-image-4, .earth-image-5, .earth-image-6');
  elements.forEach(element => {
    const randomHeight = Math.floor(Math.random() * 300) + 40; // Random height between 50px and 150px
    element.style.height = randomHeight + 'px';
  });
}

document.addEventListener('DOMContentLoaded', function () {
  // Check if the current page is the contact page
  if (window.location.pathname.includes('contact.html')) {
    // I know, I need a backend. If you want to help michaelwybraniec@me.com
    emailjs.init('eSK1hodAC-8aDEKXg');
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way
        // Use EmailJS to send the form data directly
        emailjs.sendForm('service_da3ev2c', 'template_vuwuq3q', this)
          .then(function (response) {
            showModal();
            document.getElementById('contact-form').reset(); // Reset the form
          }, function (error) {
            console.error('FAILED...', error);
            showModal("We are sorry, there was an error sending your message. Please try again.");
          });
      });
    } else {
      console.error("Element with ID 'contact-form' not found.");
    }
  }
});

// Function to display the modal
function showModal(message) {
  // Display the modal
  document.getElementById('custom-confirm-modal').style.display = 'block';
  // Add event listener to the OK button to close the modal
  document.getElementById('confirm-yes').addEventListener('click', function () {
    document.getElementById('custom-confirm-modal').style.display = 'none';
  });
}

// Initial setup
setRandomHeights();