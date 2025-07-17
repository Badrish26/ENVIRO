document.addEventListener('DOMContentLoaded', () => {
    const welcomeForm = document.getElementById('welcomeForm');
    const infoForm = document.getElementById('infoForm');

    // Function to display an error message
    function displayError(inputElement, message) {
        let errorDiv = inputElement.nextElementSibling;
        if (!errorDiv || !errorDiv.classList.contains('error-message')) {
            errorDiv = document.createElement('div');
            errorDiv.classList.add('error-message');
            inputElement.parentNode.insertBefore(errorDiv, inputElement.nextSibling);
        }
        errorDiv.textContent = message;
    }

    // Function to clear an error message
    function clearError(inputElement) {
        const errorDiv = inputElement.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.remove();
        }
    }

    if (welcomeForm) {
        welcomeForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');

            let isValid = true;

            // Validate Name
            if (nameInput.value.trim() === '') {
                displayError(nameInput, 'Name is required.');
                isValid = false;
            } else {
                clearError(nameInput);
            }

            // Validate Email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() === '') {
                displayError(emailInput, 'Email is required.');
                isValid = false;
            } else if (!emailPattern.test(emailInput.value.trim())) {
                displayError(emailInput, 'Please enter a valid email address.');
                isValid = false;
            } else {
                clearError(emailInput);
            }

            if (isValid) {
                // Store data in sessionStorage (or localStorage if you need persistence)
                sessionStorage.setItem('userName', nameInput.value.trim());
                sessionStorage.setItem('userEmail', emailInput.value.trim());
                window.location.href = 'info.html'; // Navigate to the next page
            }
        });
    }

    if (infoForm) {
        // Pre-fill fields if coming back from chatbot (optional)
        document.getElementById('domain').value = sessionStorage.getItem('userDomain') || '';
        document.getElementById('problem').value = sessionStorage.getItem('userProblem') || '';
        document.getElementById('targetAudience').value = sessionStorage.getItem('userTargetAudience') || '';
        document.getElementById('skills').value = sessionStorage.getItem('userSkills') || '';


        infoForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            const domainInput = document.getElementById('domain');
            let isValid = true;

            // Validate Domain (only required field here)
            if (domainInput.value.trim() === '') {
                displayError(domainInput, 'Domain/Industry is required.');
                isValid = false;
            } else {
                clearError(domainInput);
            }

            if (isValid) {
                // Store data in sessionStorage
                sessionStorage.setItem('userDomain', domainInput.value.trim());
                sessionStorage.setItem('userProblem', document.getElementById('problem').value.trim());
                sessionStorage.setItem('userTargetAudience', document.getElementById('targetAudience').value.trim());
                sessionStorage.setItem('userSkills', document.getElementById('skills').value.trim());

                window.location.href = 'chatbot.html'; // Navigate to the chatbot page
            }
        });
    }
});