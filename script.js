// 1. Global State
let is24HourFormat = true;
let themeMode = "auto"; // "auto" | "light" | "dark"

const timeBtn = document.querySelector("#time-toggle");
const themeBtn = document.querySelector("#theme-toggle");


// 2. Clock Object
let clockApp = {

    formatNumber: function (num) {
        return num < 10 ? "0" + num : num;
    },

    getTimeString: function () {

        let now = new Date();

        let h = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();

        let suffix = "";

        if (!is24HourFormat) {
            suffix = h >= 12 ? " PM" : " AM";
            h = h % 12;
            if (h === 0) h = 12;
        }

        m = this.formatNumber(m);
        s = this.formatNumber(s);

        let separator = s % 2 === 0 ? ":" : " ";

        return h + separator + m + separator + s + suffix;
    },

    updateDisplay: function () {
        document.getElementById("clock-display").textContent =
            this.getTimeString();
    }
};


// 3. Theme System (AUTO / LIGHT / DARK)
function applyTheme() {

    document.body.classList.remove("dark-theme");

    if (themeMode === "dark") {
        document.body.classList.add("dark-theme");
        return;
    }

    if (themeMode === "light") {
        return; // default light mode
    }

    // AUTO MODE
    let hour = new Date().getHours();

    if (hour >= 18 || hour < 6) {
        document.body.classList.add("dark-theme");
    }
}


// 4. Button Labels
function updateButtonLabels() {

    timeBtn.textContent = is24HourFormat
        ? "Switch to 12 Hour"
        : "Switch to 24 Hour";

    if (themeMode === "auto") {
        themeBtn.textContent = "Auto Theme";
    } else if (themeMode === "light") {
        themeBtn.textContent = "Light Theme";
    } else {
        themeBtn.textContent = "Dark Theme";
    }
}


// 5. Event Handlers
function handleTimeToggle() {
    is24HourFormat = !is24HourFormat;
    updateButtonLabels();
}

function handleThemeToggle() {

    // cycle theme modes
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


// 6. Event Listeners
timeBtn.addEventListener("click", handleTimeToggle);
themeBtn.addEventListener("click", handleThemeToggle);


// 7. Start Clock
clockApp.updateDisplay();
updateButtonLabels();

setInterval(() => {
    clockApp.updateDisplay();
}, 1000);


// 8. Start Theme System
applyTheme();
setInterval(applyTheme, 60000);