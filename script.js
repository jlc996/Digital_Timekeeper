// ===============================
// 1. GLOBAL STATE
// Controls app-wide settings
// ===============================

let is24HourFormat = true;   // toggles 12h / 24h clock mode
let themeMode = "auto";      // "auto" | "light" | "dark"

const timeBtn = document.querySelector("#time-toggle");
const themeBtn = document.querySelector("#theme-toggle");


// ===============================
// 2. CLOCK OBJECT
// Handles all time formatting + display updates
// ===============================

let clockApp = {

    // Adds leading zero to numbers under 10 (e.g. 7 → 07)
    formatNumber: function (num) {
        return num < 10 ? "0" + num : num;
    },

    // Builds the formatted time string
    getTimeString: function () {

        let now = new Date();

        let h = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();

        // Default suffix spacing (prevents layout shift)
        let suffix = "   ";

        // Convert to 12-hour format if needed
        if (!is24HourFormat) {
            suffix = h >= 12 ? " PM" : " AM";
            h = h % 12;
            if (h === 0) h = 12;
        }

        // Format minutes and seconds
        m = this.formatNumber(m);
        s = this.formatNumber(s);

        // Use HTML spans so CSS can animate separators
        return h +
            "<span class='separator'>:</span>" +
            m +
            "<span class='separator'>:</span>" +
            s +
            suffix;
    },

    // Updates the DOM with current time
    updateDisplay: function () {
        document.getElementById("clock-display").innerHTML =
            this.getTimeString();
    }
};


// ===============================
// 3. THEME SYSTEM
// Handles auto / light / dark mode switching
// ===============================

function applyTheme() {

    // Reset theme first
    document.body.classList.remove("dark-theme");

    // Manual dark mode
    if (themeMode === "dark") {
        document.body.classList.add("dark-theme");
        return;
    }

    // Manual light mode (default already light)
    if (themeMode === "light") {
        return;
    }

    // AUTO MODE: switch based on time of day
    let hour = new Date().getHours();

    if (hour >= 18 || hour < 6) {
        document.body.classList.add("dark-theme");
    }
}


// ===============================
// 4. UI BUTTON LABEL UPDATES
// Keeps button text in sync with state
// ===============================

function updateButtonLabels() {

    // Time format button text
    timeBtn.textContent = is24HourFormat
        ? "Switch to 12 Hour"
        : "Switch to 24 Hour";

    // Theme button text
    if (themeMode === "auto") {
        themeBtn.textContent = "Auto Theme";
    } else if (themeMode === "light") {
        themeBtn.textContent = "Light Theme";
    } else {
        themeBtn.textContent = "Dark Theme";
    }
}


// ===============================
// 5. EVENT HANDLERS
// Handles user interactions
// ===============================

// Toggle between 12h and 24h time
function handleTimeToggle() {
    is24HourFormat = !is24HourFormat;
    updateButtonLabels();
}

// Cycle through theme modes
function handleThemeToggle() {

    if (themeMode === "auto") {
        themeMode = "light";
    } else if (themeMode === "light") {
        themeMode = "dark";
    } else {
        themeMode = "auto";
    }

    applyTheme();
    updateButtonLabels();
}


// ===============================
// 6. EVENT LISTENERS
// Connect buttons to functionality
// ===============================

timeBtn.addEventListener("click", handleTimeToggle);
themeBtn.addEventListener("click", handleThemeToggle);


// ===============================
// 7. CLOCK INITIALIZATION
// Starts clock updates
// ===============================

// Initial render
clockApp.updateDisplay();
updateButtonLabels();

// Update time every second
setInterval(() => {
    clockApp.updateDisplay();
}, 1000);


// ===============================
// 8. THEME AUTO UPDATE LOOP
// Keeps auto theme in sync with time of day
// ===============================

applyTheme();

// Check theme every minute (efficient, not every second)
setInterval(applyTheme, 60000);