// People Modal System for ECHO LAB
// This script adds interactive modal pop-ups for each person card

// Sample data structure - you'll need to populate this with actual data
const peopleData = {
    'anders-kristian-munk': {
        name: 'Anders Kristian Munk',
        title: 'Director',
        image: '../Assets/andersmunk.jpg',
        bio: 'Anders Kristian Munk is the director of ECHO LAB, specializing in computational social science and digital methods. His research focuses on controversy mapping and online communities.',
        projects: [
            { name: 'Project Alpha', url: '#' },
            { name: 'Digital Methods Initiative', url: '#' },
            { name: 'Controversy Mapping', url: '#' }
        ],
        socials: {
            email: 'akmu@dtu.dk',
            linkedin: 'https://www.linkedin.com/in/example',
            twitter: 'https://twitter.com/example',
            website: 'https://example.com'
        }
    },
    'anders-koed-madsen': {
        name: 'Anders Koed Madsen',
        title: 'Data, democracy, digital urbanism <3',
        image: '../Assets/anderskoed.jpg',
        bio: 'Anders Koed Madsen focuses on data, democracy, and digital urbanism, exploring the intersection of technology and social systems.',
        projects: [
            { name: 'Digital Democracy Study', url: '#' },
            { name: 'Urban Data Analysis', url: '#' }
        ],
        socials: {
            email: 'akma@dtu.dk',
            linkedin: 'https://www.linkedin.com/in/example'
        }
    },
    'tanja-schneider': {
        name: 'Tanja Schneider',
        title: 'Committee',
        image: '../Assets/tanja.jpg',
        bio: 'Tanja Schneider is a committee member at ECHO LAB, contributing to strategic decisions and research initiatives.',
        projects: [
            { name: 'Research Initiative Beta', url: '#' }
        ],
        socials: {
            email: 'tsch@dtu.dk'
        }
    },
    'johan-irving-soltoft': {
        name: 'Johan Irving Søltoft',
        title: 'Committee',
        image: '../Assets/johan1.jpg',
        bio: 'Johan Irving Søltoft is a committee member at ECHO LAB.',
        projects: [],
        socials: {
            email: 'jiso@dtu.dk'
        }
    },
    'lasse-uhrskov-kristensen': {
        name: 'Lasse Uhrskov Kristensen',
        title: 'Committee',
        image: '../Assets/lasse.jpg',
        bio: 'Lasse Uhrskov Kristensen serves on the ECHO LAB committee.',
        projects: [],
        socials: {
            email: 'lauk@dtu.dk'
        }
    },
    'csilla-duray': {
        name: 'Csilla Duray',
        title: 'Committee',
        image: '../Assets/csilla.jpg',
        bio: 'Csilla Duray is a committee member at ECHO LAB.',
        projects: [],
        socials: {
            email: 'csdu@dtu.dk'
        }
    },
    'frederik-bay-jorgensen': {
        name: 'Frederik Bay-Jørgensen',
        title: 'Committee',
        image: '../Assets/frederik.jpg',
        bio: 'Frederik Bay-Jørgensen serves on the ECHO LAB committee.',
        projects: [],
        socials: {
            email: 'frjo@dtu.dk'
        }
    },
    'emma-veland': {
        name: 'Emma Veland',
        title: 'Committee',
        image: '../Assets/emma.jpg',
        bio: 'Emma Veland is a committee member at ECHO LAB.',
        projects: [],
        socials: {
            email: 'emve@dtu.dk'
        }
    },
    'julia-kirch-kirkegaard': {
        name: 'Julia Kirch Kirkegaard',
        title: 'Affiliation',
        image: '../Assets/julia.jpg',
        bio: 'Julia Kirch Kirkegaard is affiliated with ECHO LAB.',
        projects: [],
        socials: {
            email: 'juki@dtu.dk'
        }
    },
    'daniel-nordstrand-frantzen': {
        name: 'Daniel Nordstrand Frantzen',
        title: 'Affiliation',
        image: '../Assets/daniel.jpg',
        bio: 'Daniel Nordstrand Frantzen is affiliated with ECHO LAB.',
        projects: [],
        socials: {
            email: 'danf@dtu.dk'
        }
    },
    'emil-nissen': {
        name: 'Emil Nissen',
        title: 'Affiliation',
        image: '../Assets/emil.jpg',
        bio: 'Emil Nissen is affiliated with ECHO LAB.',
        projects: [],
        socials: {
            email: 'emni@dtu.dk'
        }
    },
    'brit-ross-winthereik': {
        name: 'Brit Ross Winthereik',
        title: 'Affiliation',
        image: '../Assets/brit.jpg',
        bio: 'Brit Ross Winthereik is affiliated with ECHO LAB.',
        projects: [],
        socials: {
            email: 'brwi@dtu.dk'
        }
    },
    'benjamin-lipp': {
        name: 'Benjamin Lipp',
        title: 'Affiliation',
        image: '../Assets/benjamin.jpg',
        bio: 'Benjamin Lipp is affiliated with ECHO LAB.',
        projects: [],
        socials: {
            email: 'benl@dtu.dk'
        }
    }
};

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
function populateModal(personId) {
    const person = peopleData[personId];
    if (!person) return;

    document.getElementById('modalImage').src = person.image;
    document.getElementById('modalImage').alt = person.name;
    document.getElementById('modalName').textContent = person.name;
    document.getElementById('modalTitle').textContent = person.title;
    document.getElementById('modalBio').textContent = person.bio;

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
function openModal(personId) {
    const modal = document.getElementById('personModal');
    populateModal(personId);
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

// Initialize
function initPeopleModal() {
    // Create modal
    createModal();

    // Add click handlers to all person cards
    document.querySelectorAll('.person-card').forEach(card => {
        const name = card.querySelector('.person-name').textContent;
        const personId = nameToId(name);
        
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => openModal(personId));
    });

    // Close modal handlers
    document.querySelector('.modal-close').addEventListener('click', closeModal);
    document.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPeopleModal);
} else {
    initPeopleModal();
}
