function displayAboutInfo(data) {
    const aboutSection = document.getElementById('about-section');

    if (!aboutSection) {
        console.error("about-section element not found");
        return;
    }

    // Clear any existing content
    aboutSection.innerHTML = '';

    // Create a structured display
    const container = document.createElement('div');
    container.className = 'about-container';

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'about-item';

            const keyElement = document.createElement('h4');
            keyElement.textContent = key;
            keyElement.className = 'about-key';

            const valueElement = document.createElement('p');
            valueElement.textContent = data[key];
            valueElement.className = 'about-value';

            itemDiv.appendChild(keyElement);
            itemDiv.appendChild(valueElement);
            container.appendChild(itemDiv);
        }
    }

    aboutSection.appendChild(container);
}

function loadAboutData() {
    // Primary method: Use Android interface (most secure)
    if (window.AndroidInterface && typeof window.AndroidInterface.getAboutData === 'function') {
        try {
            const aboutDataString = window.AndroidInterface.getAboutData();

            if (aboutDataString && aboutDataString !== "{}") {
                const aboutData = JSON.parse(aboutDataString);
                displayAboutInfo(aboutData);
                return true;
            }
        } catch (e) {
            console.error("Error loading data from Android interface:", e);
        }
    }

    // Fallback method: Use injected window data
    if (window.appData && typeof window.appData === 'object') {
        try {
            console.log("Loading data from injected window data...");
            displayAboutInfo(window.appData);
            return true;
        } catch (e) {
            console.error("Error loading fallback data:", e);
        }
    }

    // Final fallback: Display error message
    console.error("No about data source available");
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
        aboutSection.innerHTML = `
            <div class="error-message">
                <h4>Data Loading Error</h4>
                <p>Unable to load application information. Please contact support.</p>
            </div>
        `;
    }
    return false;
}

// Enhanced loading with retry mechanism
function initializeAboutPage() {
    let attempts = 0;
    const maxAttempts = 3;
    const retryDelay = 300;

    function attemptLoad() {
        attempts++;

        if (loadAboutData()) {
            return;
        }

        if (attempts < maxAttempts) {
            setTimeout(attemptLoad, retryDelay);
        } else {
            console.error("Failed to load about data after maximum attempts");
        }
    }

    attemptLoad();
}

// Load about data when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initializeAboutPage, 200);
});

// Additional safety: Try loading again if Android interface becomes available later
window.addEventListener('load', () => {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection && (!aboutSection.innerHTML || aboutSection.innerHTML.includes('error-message'))) {
        setTimeout(initializeAboutPage, 500);
    }
});