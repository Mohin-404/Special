document.addEventListener('DOMContentLoaded', () => {

    // === Part 1: Letter and Music Elements ===
    const openButton = document.getElementById('open-letter-btn');
    const cover = document.getElementById('cover');
    const letter = document.getElementById('letter');
    const audioPlayer = document.getElementById('background-music');

    openButton.addEventListener('click', () => {
        cover.classList.add('fade-out');
        if (audioPlayer) {
            audioPlayer.play();
        }
        setTimeout(() => {
            cover.classList.add('hidden');
            letter.classList.remove('hidden');
        }, 800);
    });

    const fadeInElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    fadeInElements.forEach(el => {
        observer.observe(el);
    });

    // ======================================================
    // NEW SECTION: MODAL LOGIC
    // ======================================================

    // 1. Select all modal elements
    const heartTrigger = document.getElementById('heart-trigger');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalInitialContent = document.getElementById('modal-initial-content');
    const thankYouMessage = document.getElementById('thank-you-message');
    const btnMaafin = document.getElementById('btn-maafin');
    const btnGakMaafin = document.getElementById('btn-gak-maafin');
    const btnTutupModal = document.getElementById('btn-tutup-modal');

    // 2. Show the modal when the heart is clicked
    heartTrigger.addEventListener('click', () => {
        modalOverlay.classList.remove('hidden');
        modalOverlay.classList.add('overlay-flex');
    });

    // 3. "Forgive" button logic
    btnMaafin.addEventListener('click', () => {
        // Hide the gallery and buttons
        modalInitialContent.classList.add('hidden');
        // Show the thank-you message
        thankYouMessage.classList.remove('hidden');
    });

    // 4. Logic for the moving "Not Forgiving" button
    // Function to move the button
    function moveButton() {
        const modalContentRect = modalOverlay.getBoundingClientRect();
        const btnRect = btnGakMaafin.getBoundingClientRect();

        // Generate random X and Y positions inside the modal
        // Keep the button 50px away from the edges
        const newTop = Math.random() * (modalContentRect.height - btnRect.height - 50) + 25;
        const newLeft = Math.random() * (modalContentRect.width - btnRect.width - 50) + 25;
        
        // Apply the new position using absolute positioning
        btnGakMaafin.style.position = 'absolute';
        btnGakMaafin.style.top = `${newTop}px`;
        btnGakMaafin.style.left = `${newLeft}px`;
    }

    // Move the button when the mouse hovers over it
    btnGakMaafin.addEventListener('mouseover', moveButton);
    // Also move the button when clicked
    btnGakMaafin.addEventListener('click', moveButton);

    // 5. Logic to close the modal
    function closeModal() {
        modalOverlay.classList.add('hidden');
        modalOverlay.classList.remove('overlay-flex');
        
        // Reset the modal to its initial state when reopened
        setTimeout(() => { // Add a short delay for a smooth transition
            modalInitialContent.classList.remove('hidden');
            thankYouMessage.classList.add('hidden');
            // Kembalikan tombol 'gak maafin' ke posisi semula
            btnGakMaafin.style.position = 'relative';
            btnGakMaafin.style.top = 'auto';
            btnGakMaafin.style.left = 'auto';
        }, 500);
    }

    // Close the modal when the "Close" button is clicked
    btnTutupModal.addEventListener('click', closeModal);

    // Close the modal when clicking outside the content area
    modalOverlay.addEventListener('click', (event) => {
        // Check whether the overlay itself was clicked, not its content
        if (event.target === modalOverlay) {
            closeModal();
        }
    });
});