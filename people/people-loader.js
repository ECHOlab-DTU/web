// People Page Loader for ECHO LAB
// This script loads people data from JSON files and generates the page content

// Load Committee Members
async function loadCommittee() {
    try {
        const response = await fetch('committee.json');
        const committeeData = await response.json();
        
        const committeeGrid = document.querySelector('#committee-section .people-grid');
        if (!committeeGrid) return;
        
        committeeGrid.innerHTML = '';
        
        committeeData.forEach(person => {
            const card = document.createElement('div');
            card.className = 'person-card';
            card.innerHTML = `
                <img src="${person.image}" alt="${person.name}" class="person-image">
                <h3 class="person-name">${person.name}</h3>
                <p class="person-title">${person.title}</p>
            `;
            committeeGrid.appendChild(card);
        });
        
        return committeeData;
    } catch (error) {
        console.error('Error loading committee data:', error);
        return [];
    }
}

// Load Affiliates
async function loadAffiliates() {
    try {
        const response = await fetch('affiliates.json');
        const affiliatesData = await response.json();
        
        const affiliatesGrid = document.querySelector('#affiliates-section .people-grid');
        if (!affiliatesGrid) return;
        
        affiliatesGrid.innerHTML = '';
        
        affiliatesData.forEach(person => {
            const card = document.createElement('a');
            card.href = person.link;
            card.target = '_blank';
            card.className = 'person-card person-link';
            card.innerHTML = `
                <img src="${person.image}" alt="${person.name}" class="person-image">
                <h3 class="person-name">${person.name}</h3>
                <p class="person-title">Affiliation</p>
            `;
            affiliatesGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading affiliates data:', error);
    }
}

// Load Collaborators
async function loadCollaborators() {
    try {
        const response = await fetch('collaborators.json');
        const collaboratorsData = await response.json();
        
        const collaboratorsList = document.querySelector('.collaborators-list');
        if (!collaboratorsList) return;
        
        collaboratorsList.innerHTML = '';
        
        collaboratorsData.forEach(person => {
            const card = document.createElement('div');
            card.className = 'collaborator-item';
            card.setAttribute('data-category', person.category);
            card.innerHTML = `
                <h3 class="collaborator-name">${person.name}</h3>
                <p class="collaborator-affiliation">${person.affiliation}</p>
            `;
            collaboratorsList.appendChild(card);
        });
        
        // Sort after loading
        sortCollaborators();
    } catch (error) {
        console.error('Error loading collaborators data:', error);
    }
}

// Create and inject modal HTML
function createModal() {
    const modalHTML = `
        <div id="personModal" class="modal">
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close" aria-label="Close modal">&times;</button>
                <div class="modal-body">
                    <div class="modal-left">
                        <img id="modalImage" src="" alt="" class="modal-person-image">
                    </div>
                    <div class="modal-right">
                        <h2 id="modalName" class="modal-person-name"></h2>
                        <p id="modalTitle" class="modal-person-title"></p>
                        <div class="modal-section">
                            <h3 class="modal-section-title">About</h3>
                            <p id="modalBio" class="modal-bio"></p>
                        </div>
                        <div class="modal-section" id="modal-working-groups">
                            <h3 class="modal-section-title">Working Groups</h3>
                            <p id="modalWorkingGroups" class="modal-workinggroups"></p>
                        </div>
                        <div id="modalProjects" class="modal-section">
                            <h3 class="modal-section-title">Projects</h3>
                            <ul id="modalProjectsList" class="modal-projects-list"></ul>
                        </div>
                        <div class="modal-section">
                            <h3 class="modal-section-title">Connect</h3>
                            <div id="modalSocials" class="modal-socials"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Populate modal with person data
function populateModal(person) {
    if (!person) return;

    document.getElementById('modalImage').src = person.image;
    document.getElementById('modalImage').alt = person.name;
    document.getElementById('modalName').textContent = person.name;
    document.getElementById('modalTitle').textContent = person.title;
    document.getElementById('modalBio').textContent = person.bio;
    document.getElementById('modalWorkingGroups').textContent = person.workinggroups

    
    // Populate projects
    const projectsList = document.getElementById('modalProjectsList');
    const projectsSection = document.getElementById('modalProjects');
    
    if (person.projects && person.projects.length > 0) {
        projectsSection.style.display = 'block';
        projectsList.innerHTML = person.projects.map(project => 
            `<li><a href="${project.url}" target="_blank">${project.name}</a></li>`
        ).join('');
    } else {
        projectsSection.style.display = 'none';
    }

    // Populate socials
    const socialsContainer = document.getElementById('modalSocials');
    socialsContainer.innerHTML = '';
    
    if (person.socials) {
        if (person.socials.email) {
            socialsContainer.innerHTML += `
                <a href="mailto:${person.socials.email}" class="social-link" title="Email">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    Email
                </a>
            `;
        }
        if (person.socials.linkedin) {
            socialsContainer.innerHTML += `
                <a href="${person.socials.linkedin}" target="_blank" class="social-link" title="LinkedIn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn
                </a>
            `;
        }
        if (person.socials.twitter) {
            socialsContainer.innerHTML += `
                <a href="${person.socials.twitter}" target="_blank" class="social-link" title="Twitter">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                    </svg>
                    Twitter
                </a>
            `;
        }
        if (person.socials.bluesky) {
            socialsContainer.innerHTML += `
                <a href="${person.socials.bluesky}" target="_blank" class="social-link" title="Bluesky">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"/>
                    </svg>
                    Bluesky
                </a>
            `;
        }
        if (person.socials.website) {
            socialsContainer.innerHTML += `
                <a href="${person.socials.website}" target="_blank" class="social-link" title="Website">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="2" y1="12" x2="22" y2="12"/>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                    Website
                </a>
            `;
        }
    }
}

// Open modal
function openModal(personId, committeeData) {
    const person = committeeData.find(p => p.id === personId);
    const modal = document.getElementById('personModal');
    populateModal(person);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('personModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Convert name to ID format
function nameToId(name) {
    return name.toLowerCase()
        .replace(/å/g, 'a')
        .replace(/ä/g, 'a')
        .replace(/ö/g, 'o')
        .replace(/ø/g, 'o')
        .replace(/æ/g, 'ae')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// Initialize modal functionality
function initPeopleModal(committeeData) {
    // Create modal
    createModal();

    // Add click handlers to Committee members
    const committeeSection = document.querySelector('#committee-section');
    if (committeeSection) {
        const committeeCards = committeeSection.querySelectorAll('.person-card');
        
        committeeCards.forEach(card => {
            const name = card.querySelector('.person-name').textContent;
            const personId = nameToId(name);
            
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => openModal(personId, committeeData));
        });
    }

    // Close modal handlers
    document.querySelector('.modal-close').addEventListener('click', closeModal);
    document.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

// Sort collaborators alphabetically by last name
function sortCollaborators() {
    const collaboratorsList = document.querySelector('.collaborators-list');
    if (!collaboratorsList) return;
    
    // Get all collaborator items
    const collaborators = Array.from(collaboratorsList.querySelectorAll('.collaborator-item'));
    
    // Sort by last name
    collaborators.sort((a, b) => {
        const nameA = a.querySelector('.collaborator-name').textContent.trim();
        const nameB = b.querySelector('.collaborator-name').textContent.trim();
        
        // Extract last name (last word in the name)
        const lastNameA = nameA.split(' ').pop().toLowerCase();
        const lastNameB = nameB.split(' ').pop().toLowerCase();
        
        return lastNameA.localeCompare(lastNameB);
    });
    
    // Clear and re-append in sorted order
    collaboratorsList.innerHTML = '';
    collaborators.forEach(collaborator => {
        collaboratorsList.appendChild(collaborator);
    });
}

// Filter collaborators by category
function initCollaboratorFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const collaborators = document.querySelectorAll('.collaborator-item');
    
    if (!filterButtons.length || !collaborators.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filter collaborators
            collaborators.forEach(collaborator => {
                const category = collaborator.getAttribute('data-category');
                
                if (filter === 'all') {
                    collaborator.style.display = 'block';
                } else if (category === filter) {
                    collaborator.style.display = 'block';
                } else {
                    collaborator.style.display = 'none';
                }
            });
        });
    });
}

// Main initialization
async function initializePage() {
    // Load all data
    const committeeData = await loadCommittee();
    await loadAffiliates();
    await loadCollaborators();
    
    // Initialize interactions
    initPeopleModal(committeeData);
    initCollaboratorFilters();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}
