function displayAboutInfo(data) {
    const aboutSection = document.getElementById('about-section');

    for (const key in data) {
        const keyElement = document.createElement('h4');
        keyElement.textContent = key;
        aboutSection.appendChild(keyElement);

        const valueElement = document.createElement('p');
        valueElement.textContent = data[key];
        aboutSection.appendChild(valueElement);
    }
}

// Check for injected data
if (window.appData) {
    // Process your data here
    displayAboutInfo(window.appData);
} else {
    console.log("Waiting for appData...");
    // Add a small delay and check again if needed
    setTimeout(() => {
        if (window.appData) {
            displayAboutInfo(window.appData);
        }
    }, 300);
}

loadAboutInfo();
