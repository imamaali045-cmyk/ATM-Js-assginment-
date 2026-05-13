// 1. Initial State
let balance = 10000;
let correctPin = "1234";
let isLoggedIn = false;
let currentMode = "pin"; 

// 2. DOM Elements Selection
const inputField = document.getElementById('atm-input');
const statusMsg = document.getElementById('status-msg');
const balanceDisplay = document.getElementById('balance');
const loginScreen = document.getElementById('login-screen');
const mainScreen = document.getElementById('main-screen');

// 3. Screen Update Function (The Fix)
// Isse balance hamesha HTML par dikhega
function updateUI() {
    if (balanceDisplay) {
        balanceDisplay.innerText = balance;
    }
}

// 4. Keypad Buttons
function press(num) {
    inputField.value += num;
}

// 5. Cancel/Clear Button (Fixed)
function clearAll() {
    inputField.value = "";
    if (isLoggedIn) {
        statusMsg.innerText = "SELECT TRANSACTION";
    }
}

// 6. Enter Button Logic
function handleEnter() {
    let val = inputField.value;

    if (!isLoggedIn) {
        // Login Logic
        if (val === correctPin) {
            isLoggedIn = true;
            loginScreen.style.display = "none";
            mainScreen.style.display = "block";
            inputField.value = "";
            inputField.type = "number";
            inputField.placeholder = "0.00";
            updateUI(); // Login hote hi balance dikhao
        } else {
            document.getElementById('login-msg').innerText = "WRONG PIN!";
            inputField.value = "";
        }
    } else {
        // Transaction Logic
        processTransaction(val);
    }
}

// 7. Mode Set (Withdraw/Deposit)
function setMode(mode) {
    if (!isLoggedIn) return;
    currentMode = mode;
    statusMsg.innerText = "MODE: " + mode.toUpperCase();
    inputField.value = "";
}

// 8. Main Transaction Logic (Fixed for Value Update)
function processTransaction(val) {
    let amt = Number(val);
    
    if (isNaN(amt) || amt <= 0) {
        statusMsg.innerText = "ENTER VALID AMOUNT!";
        return;
    }

    if (currentMode === 'withdraw') {
        if (amt <= balance) {
            balance = balance - amt; // Value update in variable
            statusMsg.innerText = "WITHDRAW SUCCESS: $" + amt;
        } else {
            statusMsg.innerText = "INSUFFICIENT BALANCE!";
        }
    } else if (currentMode === 'deposit') {
        balance = balance + amt; // Value update in variable
        statusMsg.innerText = "DEPOSIT SUCCESS: $" + amt;
    } else {
        statusMsg.innerText = "CLICK WITHDRAW OR DEPOSIT";
    }

    // 🔥 CRITICAL FIX: Variable change hone ke baad UI ko batana
    updateUI(); 
    inputField.value = ""; // Input clear karo
}
