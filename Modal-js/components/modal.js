function openEventModal(imagePath) {
    const modal = document.getElementById('eventModal');
    const image = document.getElementById('eventImage');
    image.src = imagePath;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeEventModal() {
    const modal = document.getElementById('eventModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close event modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeEventModal();
    }
});

export function openModal(card) {
    const modal = document.getElementById('cardModal');
    const modalContent = modal.querySelector('.modal-content');
    const cardClone = card.cloneNode(true);
    
    modalContent.innerHTML = '';
    modalContent.appendChild(cardClone);
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

export function closeModal() {
    const modal = document.getElementById('cardModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Add event listener for close button
document.querySelector('.close-modal').addEventListener('click', closeModal);

// Close modal when clicking outside the content
document.getElementById('cardModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
}); 