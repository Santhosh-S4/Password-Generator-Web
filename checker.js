const password = document.getElementById('password');
const strengthText = document.getElementById('strengthText');
const togglePassword = document.getElementById('togglePassword');

const suggestions = {
    len: document.getElementById('len'),
    upper: document.getElementById('upper'),
    num: document.getElementById('num'),
    special: document.getElementById('special')
};

password.addEventListener('input', () => {
    const val = password.value;
    let strength = 0;

    // === Strength logic ===
    if (val.length > 7) strength++;
    if (/[A-Z]/.test(val)) strength++;
    if (/[0-9]/.test(val)) strength++;
    if (/[^A-Za-z0-9]/.test(val)) strength++;

    strengthText.className = 'strength'; // reset

    if (val.length === 0) {
        strengthText.textContent = "Strength: 🤔";
    } else if (strength <= 1) {
        strengthText.textContent = "Strength: Weak 🥱";
        strengthText.classList.add('weak');
    } else if (strength === 2 || strength === 3) {
        strengthText.textContent = "Strength: Medium 😐";
        strengthText.classList.add('medium');
    } else {
        strengthText.textContent = "Strength: Strong 💪";
        strengthText.classList.add('strong', 'strongAF');
    }

    // === Suggestion logic with icons ===
    const isTyped = val.length > 0;

    updateSuggestion(suggestions.len, val.length >= 8, isTyped);
    updateSuggestion(suggestions.upper, /[A-Z]/.test(val), isTyped);
    updateSuggestion(suggestions.num, /[0-9]/.test(val), isTyped);
    updateSuggestion(suggestions.special, /[^A-Za-z0-9]/.test(val), isTyped);
});

// Show/hide password
togglePassword.addEventListener('change', () => {
    password.type = togglePassword.checked ? 'text' : 'password';
});

// === Suggestion update function ===
function updateSuggestion(element, condition, isTyped) {
    const icon = element.querySelector('.icon');
    element.classList.remove('valid', 'invalid');

    if (!isTyped) {
        icon.textContent = " • ";
    } else if (condition) {
        icon.textContent = " ✓ ";
        element.classList.add('valid');
    } else {
        icon.textContent = " ⨉ ";
        element.classList.add('invalid');
    }
}