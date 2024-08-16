let zoomLevel = 1; // Initial zoom level (100%)
let originalDevicePixelRatio = window.devicePixelRatio; // Store the original device pixel ratio

document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the saved zoom level from localStorage
    const savedZoomLevel = localStorage.getItem('zoomLevel');
    console.log('Saved Zoom Level on Load:', savedZoomLevel);

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

    // Initialize Earth images and styles
    initializeEarthImages();
    setMaxScale();
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
    console.log('Applying Zoom Level:', level);
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
        console.log('Browser zoom changed, resetting zoom level.');
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
    const rect = element.getBoundingClientRect(); // Get the element's dimensions

    const maxWidth = window.innerWidth;  // Viewport width
    const maxHeight = window.innerHeight; // Viewport height

    const scaleX = maxWidth / rect.width;  // Calculate horizontal scale
    const scaleY = maxHeight / rect.height; // Calculate vertical scale

    const maxScale = Math.min(scaleX, scaleY);  // Choose the smaller scale to fit both dimensions

    // Apply the maximum scale as a CSS variable
    document.documentElement.style.setProperty('--max-scale', maxScale);
}

// Function to set random heights for Earth images
function setRandomHeights() {
    const elements = document.querySelectorAll('.earth-image, .earth-image-2, .earth-image-3, .earth-image-4, .earth-image-5, .earth-image-6');

    elements.forEach(element => {
        const randomHeight = Math.floor(Math.random() * 300) + 40; // Random height between 50px and 150px
        element.style.height = randomHeight + 'px';
    });
}

// Initial setup
setRandomHeights();