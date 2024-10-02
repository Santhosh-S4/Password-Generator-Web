//CryptoJS library
const script = document.createElement('script');
script.src = "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js";
document.head.appendChild(script);


//Slider values
const slider = document.getElementById('lenrange');
const sliderValue = document.getElementById('lennum');

slider.oninput = function () {
    sliderValue.textContent = this.value;
}



//Password Strings
const upcase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const locase = "abcdefghijklmnopqrstuvwxyz";
const numbs = "1234567890";
const symbs = "!@#$%^&*()_+-=[]{};':?></.,*-+`~";

const allChars = upcase + locase + numbs + symbs;


//Password Generator
function createpwd() {
    let password = "";
    const length = parseInt(slider.value);

    while (length > password.length) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    document.getElementById("pwd").value = password;
}


//Encryption
function encryptPassword() {
    const algorithm = document.getElementById('algs').value;

    // Function for NO Encryption
    if (algorithm == "1") {
        document.getElementById('encryptedPassword').value = "Encryption NOT Implemented (Select a Encryption)";
    }


    // Function to encrypt the password using AES
    else if (algorithm == "2") {
        const password = document.getElementById('pwd').value;
        const key = CryptoJS.enc.Utf8.parse('F5BLofpaFZxkmLhayj3hFg==');
        const encrypted = CryptoJS.AES.encrypt(password, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        document.getElementById('encryptedPassword').value = encrypted.toString();

    }

    // Function to encrypt the password using DES
    else if (algorithm == "3") {
        const password = document.getElementById('pwd').value;
        const key = CryptoJS.enc.Utf8.parse('F5BLofpaFZxkmLhayj3hFg==');
        const encrypted = CryptoJS.DES.encrypt(password, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        document.getElementById('encryptedPassword').value = encrypted.toString();
    }

    // Function to encrypt the password using ROT13
    else if (algorithm == "4") {
        const password = document.getElementById('pwd').value;
        const encrypted = rot13(password);
        document.getElementById('encryptedPassword').value = encrypted;    
    }

    // Function to encrypt the password using Caesar Cipher
    else if (algorithm == "5") {
        const password = document.getElementById('pwd').value;
        const shift = parseInt(document.getElementById('shiftlen').value, 10);
        const encrypted = caesarCipher(password, shift);
        document.getElementById('encryptedPassword').value = encrypted;
    }

}


//ROT13 Function
function rot13(str) {
    return str.replace(/[A-Za-z]/g, function(c) {
        return String.fromCharCode(
            ((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13)) ? c : c - 26
        );
    });
}


//Caesar Cipher Function
function caesarCipher(str, shift) {
    return str.replace(/[A-Za-z]/g, function (c) {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) {
            return String.fromCharCode(((code - 65 + shift) % 26) + 65);
        } else if (code >= 97 && code <= 122) {
            return String.fromCharCode(((code - 97 + shift) % 26) + 97);
        }
        return c;
    });
}

