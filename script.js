let performanceInterval;
let modeToggle = true; // Start with light mode
let zoomLevel = 1; // Initial zoom level (100%)

document.getElementById('zoom-in').addEventListener('click', function () {
  zoomLevel += 0.1; // Increase zoom level by 10%
  document.body.style.zoom = zoomLevel;
});

document.getElementById('zoom-out').addEventListener('click', function () {
  if (zoomLevel > 0.1) { // Prevent zooming out too much
    zoomLevel -= 0.1; // Decrease zoom level by 10%
    document.body.style.zoom = zoomLevel;
  }
});

// Event listener for the disco button to show the modal
document.getElementById('performance-mode').addEventListener('click', function () {
  showModal();
});

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

// Event listener for the mode toggle button
document.getElementById('mode-toggle-btn').addEventListener('click', function () {
  if (document.body.classList.contains('dark-mode')) {
    switchMode('light');
  } else {
    switchMode('dark');
  }
});

// Function to start performance mode
function startPerformanceMode() {
  const h1Element = document.querySelector('.one-front');
  h1Element.classList.add('zoom');

  performanceInterval = setInterval(() => {
    switchMode(modeToggle ? 'light' : 'dark');
    modeToggle = !modeToggle; // Toggle between dark and light modes
  }, 70); // Switch between modes every 70ms

  setTimeout(() => {
    h1Element.classList.remove('zoom');
    clearInterval(performanceInterval);
    switchMode('dark'); // Revert to dark mode after performance mode
  }, 3000); // Revert to dark mode after 3 seconds
}

// Function to show the modal
function showModal() {
  document.getElementById('custom-confirm-modal').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// Function to close the modal
function closeModal() {
  document.getElementById('custom-confirm-modal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Event listeners for the buttons in the modal
document.getElementById('confirm-yes').addEventListener('click', function () {
  closeModal();
  startPerformanceMode();
});

document.getElementById('confirm-no').addEventListener('click', function () {
  closeModal();
});

// Ensure that the images are initialized and visible on load
window.addEventListener('load', () => {
  initializeEarthImages(); // Initialize the earth images and set the default mode
  setMaxScale(); // Ensure proper scaling
  setRandomHeights(); // Set random heights for the earth images
});

function initializeEarthImages() {
  const earthContainer = document.querySelector('.earth-container');
  if (earthContainer) {
    // Ensure the earth images are present in the DOM
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
    switchMode('light'); // Set initial mode to light
  }
}

window.addEventListener('resize', setMaxScale); // Recalculate scale on window resize

function setMaxScale() {
  const element = document.querySelector('.earth-image'); // Select your element
  const rect = element.getBoundingClientRect(); // Get the element's dimensions

  const maxWidth = window.innerWidth;  // Viewport width
  const maxHeight = window.innerHeight; // Viewport height

  const scaleX = maxWidth / rect.width;  // Calculate horizontal scale
  const scaleY = maxHeight / rect.height; // Calculate vertical scale

  const maxScale = Math.min(scaleX, scaleY);  // Choose the smaller scale to fit both dimensions

  // Apply the maximum scale as a CSS variable
  document.documentElement.style.setProperty('--max-scale', maxScale);
}

function setRandomHeights() {
  const elements = document.querySelectorAll('.earth-image, .earth-image-2, .earth-image-3, .earth-image-4, .earth-image-5, .earth-image-6');

  elements.forEach(element => {
    const randomHeight = Math.floor(Math.random() * 300) + 40; // Random height between 50px and 150px
    element.style.height = randomHeight + 'px';
  });
}

// Initial setup
setRandomHeights();