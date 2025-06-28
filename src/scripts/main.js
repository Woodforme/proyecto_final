import stays from './stays.js';

// --- DOM Elements ---
const staysContainer = document.getElementById('stays-container');
// CORRECTED: Use specific desktop header IDs as they are the main displays referenced.
const headerLocationDisplay = document.getElementById('desktop-header-location-display');
const headerGuestsDisplay = document.getElementById('desktop-header-guests-display');
const stayCountDisplay = document.getElementById('stay-count');

// Search bars (mobile and desktop)
const mobileSearchBar = document.getElementById('mobile-search-bar');
const desktopSearchBar = document.getElementById('desktop-search-bar');

// Mobile Modal Elements
const mobileModal = document.getElementById('mobile-modal');
const mobileLocationInput = document.getElementById('mobile-location-input');
const mobileGuestsDisplay = document.getElementById('mobile-guests-display');
const superhostCheckboxMobile = document.getElementById('superhost-checkbox-mobile');
const ratingCheckboxMobile = document.getElementById('high-rating-checkbox-mobile');
const mobileApplyBtn = document.getElementById('apply-mobile-filters');
const mobileCloseBtn = document.getElementById('mobile-close-btn');

// Desktop Modal Elements
const desktopModal = document.getElementById('desktop-modal');
const desktopLocationInput = document.getElementById('desktop-location-input');
const desktopGuestsDisplay = document.getElementById('desktop-guests-display');
const superhostCheckboxDesktop = document.getElementById('superhost-checkbox-desktop');
const ratingCheckboxDesktop = document.getElementById('high-rating-checkbox-desktop');
const desktopApplyBtn = document.getElementById('apply-desktop-filters');
const desktopCloseBtn = document.getElementById('desktop-close-btn');

// --- Global State ---
let currentAdults = 0;
let currentChildren = 0;
let currentSelectedLocation = "";

// --- Helper Functions ---

/**
 * Opens the appropriate modal (mobile or desktop) based on screen width.
 */
function openModal() {
    // Update modal inputs with current state
    mobileLocationInput.value = currentSelectedLocation;
    desktopLocationInput.value = currentSelectedLocation;
    updateGuestCountDisplayInModals();

    if (window.innerWidth < 768) {
        mobileModal.classList.remove('hidden');
        desktopModal.classList.add('hidden');
        // Add a class to body to prevent scrolling when mobile modal is open
        document.body.classList.add('overflow-hidden');
    } else {
        desktopModal.classList.remove('hidden');
        mobileModal.classList.add('hidden');
        // Add a class to body to prevent scrolling when desktop modal is open
        document.body.classList.add('overflow-hidden');
    }
}

/**
 * Closes all modals.
 */
function closeModal() {
    mobileModal.classList.add('hidden');
    desktopModal.classList.add('hidden');
    // Remove the class to re-enable scrolling
    document.body.classList.remove('overflow-hidden');
}

/**
 * Updates the displayed guest count in the header and within the modals.
 */
function updateGuestCountDisplayInModals() {
    const totalGuests = currentAdults + currentChildren;
    const guestText = totalGuests > 0 ? `${totalGuests} guests` : 'Add guests';

    // Update display in modals
    mobileGuestsDisplay.value = guestText;
    desktopGuestsDisplay.value = guestText;

    // Update counts in modal spans (these work for both mobile and desktop modals)
    document.querySelectorAll('.adults-count').forEach(span => span.textContent = currentAdults);
    document.querySelectorAll('.children-count').forEach(span => span.textContent = currentChildren);
}

/**
 * Updates the displayed guest count in the header.
 */
function updateHeaderGuestDisplay() {
    const totalGuests = currentAdults + currentChildren;
    const guestText = totalGuests > 0 ? `${totalGuests} guests` : 'Add guests';

    // Update desktop header display
    headerGuestsDisplay.textContent = guestText;
    // Update mobile header display
    document.getElementById('mobile-header-guests-display').textContent = guestText;
}

/**
 * Updates the displayed location in the header.
 * @param {string} location - The selected location string (city, country) or empty string.
 */
function updateHeaderLocationDisplay(location) {
    const displayText = location || 'Add location';
    // Update desktop header display
    headerLocationDisplay.textContent = displayText;
    // Update mobile header display
    document.getElementById('mobile-header-location-display').textContent = displayText;
}

// --- Render Stays ---

/**
 * Renders the list of stays into the container.
 * @param {Array<Object>} data - The array of stay objects to render.
 */
function renderStays(data) {
    staysContainer.innerHTML = ''; // Clear previous stays

    if (data.length === 0) {
        staysContainer.innerHTML = '<p class="text-center col-span-full text-gray-500">No stays found matching your criteria.</p>';
    } else {
        data.forEach(stay => {
            const card = document.createElement('div');
            card.className = 'bg-white rounded-xl shadow-md p-4 transition-all duration-200 hover:shadow-lg hover:scale-105';
            card.innerHTML = `
                <img src="${stay.photo}" alt="${stay.title}" class="rounded-lg w-full h-48 object-cover mb-4">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-sm text-gray-600 flex items-center">
                        ${stay.superHost ? '<span class="border border-gray-800 rounded-full px-2 py-1 text-xs font-semibold mr-2 flex-shrink-0">SUPER HOST</span>' : ''}
                        ${stay.type} ${stay.beds !== null && stay.beds > 0 ? `• ${stay.beds} bed${stay.beds > 1 ? 's' : ''}` : ''}
                    </span>
                    <span class="text-sm text-gray-600 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-red-500 mr-1">
                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.292-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007Z" clip-rule="evenodd" />
                        </svg>
                        ${stay.rating.toFixed(1)}
                    </span>
                </div>
                <p class="text-lg font-medium text-gray-800 mb-2">${stay.title}</p>
                <div class="flex justify-between items-center text-sm">
                    <h3 class="text-gray-400 dark:text-gray-300">City: ${stay.city}</h3>
                    <h3 class="text-gray-400 dark:text-gray-300">Max Guests: ${stay.maxGuests}</h3>
                </div>
            `;
            staysContainer.appendChild(card);
        });
    }
    stayCountDisplay.textContent = `${data.length}+ stays`;
}

// --- Filtering Logic ---

/**
 * Applies filters based on current modal selections and renders stays.
 */
function applyFilters() {
    // Determine which modal is active to get filter values
    const isMobileModalActive = !mobileModal.classList.contains('hidden');
    // const isDesktopModalActive = !desktopModal.classList.contains('hidden'); // This can be inferred, or we can assume applyFilters is called from the active modal

    let location = '';
    let guests = currentAdults + currentChildren; // Use current global guest counts
    let isSuperhost = false;
    let highRating = false;

    // Get filter values from whichever modal is currently visible or was just active
    // The previous logic assumed one *is* active. A more robust way might be to get from _both_
    // and let the `currentSelectedLocation` update via input listeners.
    // For simplicity, we'll ensure we get from the inputs regardless of modal visibility
    // as applyFilters is tied to the button click within the specific modal.
    // However, if the modal closes *before* applyFilters runs, the input values are lost.
    // So, this is fine:
    if (!mobileModal.classList.contains('hidden')) { // Mobile modal is the one being used
        location = mobileLocationInput.value.trim().toLowerCase();
        isSuperhost = superhostCheckboxMobile.checked;
        highRating = ratingCheckboxMobile.checked;
    } else if (!desktopModal.classList.contains('hidden')) { // Desktop modal is the one being used
        location = desktopLocationInput.value.trim().toLowerCase();
        isSuperhost = superhostCheckboxDesktop.checked;
        highRating = ratingCheckboxDesktop.checked;
    } else { // Fallback, e.g., if applyFilters is called without a modal being open (unlikely with current setup)
        location = currentSelectedLocation; // Use the last known location
        // Checkboxes would default to false if not explicitly set from a modal
    }


    // Update global selected location (redundant if input listeners handle it, but harmless)
    currentSelectedLocation = location;

    const filtered = stays.filter(stay => {
        const fullLocation = `${stay.city}, ${stay.country}`.toLowerCase();

        // Location filter: if location is empty, always match. Otherwise, match city or country
        const matchesLocation = !location ||
                                fullLocation.includes(location) ||
                                stay.city.toLowerCase().includes(location) ||
                                stay.country.toLowerCase().includes(location);

        // Guests filter: if guests is 0 (meaning "Add guests"), always match. Otherwise, maxGuests must be >= guests.
        const matchesGuests = guests === 0 || stay.maxGuests >= guests;

        // Superhost filter: if not checked, always match. Otherwise, superHost must be true.
        const matchesSuperhost = !isSuperhost || stay.superHost === true;

        // Rating filter: if not checked, always match. Otherwise, rating must be >= 4.0.
        const matchesRating = !highRating || stay.rating >= 4.0;

        return matchesLocation && matchesGuests && matchesSuperhost && matchesRating;
    });

    renderStays(filtered);
    updateHeaderLocationDisplay(location);
    updateHeaderGuestDisplay();
    closeModal();
}

// --- Event Listeners ---

// Open modal when search bar is clicked (both mobile and desktop)
mobileSearchBar.addEventListener('click', openModal);
desktopSearchBar.addEventListener('click', openModal);

// Close modals when clicking on close buttons
mobileCloseBtn.addEventListener('click', closeModal);
desktopCloseBtn.addEventListener('click', closeModal);

// Close desktop modal when clicking outside
desktopModal.addEventListener('click', (e) => {
    if (e.target === desktopModal) {
        closeModal();
    }
});

// Guest control buttons
document.querySelectorAll('.plus-adults').forEach(button => {
    button.addEventListener('click', () => {
        currentAdults++;
        updateGuestCountDisplayInModals();
    });
});

document.querySelectorAll('.minus-adults').forEach(button => {
    button.addEventListener('click', () => {
        if (currentAdults > 0) {
            currentAdults--;
            updateGuestCountDisplayInModals();
        }
    });
});

document.querySelectorAll('.plus-children').forEach(button => {
    button.addEventListener('click', () => {
        currentChildren++;
        updateGuestCountDisplayInModals();
    });
});

document.querySelectorAll('.minus-children').forEach(button => {
    button.addEventListener('click', () => {
        if (currentChildren > 0) {
            currentChildren--;
            updateGuestCountDisplayInModals();
        }
    });
});

// Apply filter buttons inside modals
mobileApplyBtn.addEventListener('click', applyFilters);
desktopApplyBtn.addEventListener('click', applyFilters);

// Location input change in modals
mobileLocationInput.addEventListener('input', (e) => {
    currentSelectedLocation = e.target.value;
});
desktopLocationInput.addEventListener('input', (e) => {
    currentSelectedLocation = e.target.value;
});

// Handle modal display on window resize
window.addEventListener('resize', () => {
    // If any modal is currently open, re-evaluate and display the correct one
    if (!mobileModal.classList.contains('hidden') || !desktopModal.classList.contains('hidden')) {
        openModal();
    }
});


// Initial render when the DOM is fully loaded
window.addEventListener('DOMContentLoaded', () => {
    renderStays(stays); // Render all stays initially
    updateHeaderGuestDisplay(); // Initialize header guest display
    updateHeaderLocationDisplay('Finland'); // Initialize header location display (can be set to '' or 'Add location' for dynamic default)
});


 