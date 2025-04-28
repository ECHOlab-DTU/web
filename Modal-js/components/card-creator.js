import { openModal } from './modal.js';

// Function to create a lab note card
export function createLabNoteCard(noteData) {
    // Create a wrapper for the entire card section
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.marginBottom = '3rem'; // Space for links

    const card = document.createElement('div');
    card.className = 'research-card';
    card.style.position = 'relative';
    card.style.height = '710px';
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    
    // Create card header with image
    const header = document.createElement('div');
    header.className = 'card-header';
    
    const img = document.createElement('img');
    img.src = noteData.image;
    img.alt = noteData.title;
    header.appendChild(img);
    
    // Add date
    const date = document.createElement('div');
    date.className = 'card-date';
    date.textContent = noteData.date;
    header.appendChild(date);
    
    card.appendChild(header);
    
    // Create card content
    const content = document.createElement('div');
    content.className = 'card-content';
    content.style.display = 'flex';
    content.style.flexDirection = 'row';
    content.style.flex = '1';
    content.style.overflow = 'hidden';
    content.style.gap = '1rem';
    
    // Left column
    const leftColumn = document.createElement('div');
    leftColumn.className = 'card-left';
    leftColumn.style.flex = window.innerWidth <= 768 ? '1' : '1.1';
    leftColumn.style.overflow = 'hidden';
    
    // Add title with word count check
    const title = document.createElement('h2');
    title.className = 'project-title';
    title.textContent = noteData.title;
    
    // Count words and adjust font size if 6 or more words
    const wordCount = noteData.title.split(/\s+/).length;
    if (wordCount >= 5) {
        title.classList.add('long-title');
    }
    
    leftColumn.appendChild(title);
    
    // Add preview text
    const preview = document.createElement('div');
    preview.className = 'card-preview';
    preview.innerHTML = noteData.preview;
    leftColumn.appendChild(preview);
    
    // Right column
    const rightColumn = document.createElement('div');
    rightColumn.className = 'card-right';
    rightColumn.style.flex = '1';
    rightColumn.style.overflow = 'hidden';
    rightColumn.style.maxHeight = '610px';
    
    // Hide right column on mobile
    if (window.innerWidth <= 768) {
        rightColumn.style.display = 'none';
    }
    
    // Add sections to right column
    const topicsSection = createSection(noteData.sectionTitles.topics, noteData.researchTopics, 'text', false);
    rightColumn.appendChild(topicsSection);
    
    const objectivesSection = createSection('Objectives', [noteData.objectives], 'text', false);
    rightColumn.appendChild(objectivesSection);
    
    const methodologySection = createSection('Methodology', noteData.methodology, 'list', false);
    rightColumn.appendChild(methodologySection);
    
    const lessonsSection = createSection(noteData.sectionTitles.lessons, noteData.lessons, 'list', false);
    rightColumn.appendChild(lessonsSection);
    
    const collaboratorsSection = createSection(noteData.sectionTitles.collaborators, noteData.collaborators, 'list', true);
    rightColumn.appendChild(collaboratorsSection);

    content.appendChild(leftColumn);
    content.appendChild(rightColumn);
    card.appendChild(content);

    // Check if content overflows and adjust if needed - only for desktop
    setTimeout(() => {
        if (window.innerWidth > 768) {
            const leftOverflows = leftColumn.scrollHeight > leftColumn.clientHeight;
            const rightOverflows = rightColumn.scrollHeight > rightColumn.clientHeight;
            
            if (leftOverflows) {
                preview.classList.add('overflow');
            }
            
            if (rightOverflows) {
                rightColumn.classList.add('overflow');
            }
        }
    }, 0);

    // Add links section
    const links = document.createElement('div');
    links.className = 'card-links';
    links.style.position = 'absolute';
    links.style.bottom = '-3rem';
    links.style.left = '1.5rem';
    
    if (noteData.projectLink) {
        const projectLink = document.createElement('a');
        projectLink.href = noteData.projectLink;
        projectLink.textContent = noteData.projectLinkText;
        projectLink.target = '_blank';
        links.appendChild(projectLink);
    }
    
    if (noteData.publicationLink) {
        const publicationLink = document.createElement('a');
        publicationLink.href = noteData.publicationLink;
        publicationLink.textContent = noteData.publicationLinkText;
        publicationLink.target = '_blank';
        links.appendChild(publicationLink);
    }

    wrapper.appendChild(card);
    wrapper.appendChild(links);
    
    // Add resize listener to handle responsive layout
    window.addEventListener('resize', () => {
        const isMobile = window.innerWidth <= 768;
        leftColumn.style.flex = isMobile ? '1' : '1.1';
        rightColumn.style.display = isMobile ? 'none' : 'block';
        
        // Re-check overflow for desktop view
        if (!isMobile) {
            const leftOverflows = leftColumn.scrollHeight > leftColumn.clientHeight;
            const rightOverflows = rightColumn.scrollHeight > rightColumn.clientHeight;
            
            if (leftOverflows) {
                preview.classList.add('overflow');
            } else {
                preview.classList.remove('overflow');
            }
            
            if (rightOverflows) {
                rightColumn.classList.add('overflow');
            } else {
                rightColumn.classList.remove('overflow');
            }
        }
    });
    
    // Add click event to open modal
    card.addEventListener('click', (e) => {
        if (!e.target.closest('a')) {
            const modalCard = card.cloneNode(true);
            // Reset all styles for modal view
            modalCard.style.height = 'auto';
            modalCard.style.overflow = 'visible';
            modalCard.querySelector('.card-content').style.overflow = 'visible';
            modalCard.querySelector('.card-right').style.maxHeight = 'none';
            modalCard.querySelector('.card-right').style.overflow = 'visible';
            modalCard.querySelector('.card-left').style.overflow = 'visible';
            
            // Set fixed sizes for modal view
            const modalTitle = modalCard.querySelector('.project-title');
            if (modalTitle) {
                modalTitle.style.setProperty('font-size', '2.5rem', 'important');
            }

            // Set fixed section title size for modal
            const sectionTitles = modalCard.querySelectorAll('.section-title');
            sectionTitles.forEach(title => {
                title.removeAttribute('style');
                title.style.setProperty('font-size', '1rem', 'important');
                title.style.setProperty('margin-bottom', '1rem', 'important');
                title.style.setProperty('font-weight', '700', 'important');
            });
            
            // Reset all text elements to fixed modal sizes
            modalCard.querySelectorAll('.topic-content, .topic-content p, .topic-content li, .topic-content div').forEach(element => {
                element.style.setProperty('font-size', '0.85rem', 'important');
            });

            // Remove any inline styles from preview text to let CSS handle it
            modalCard.querySelectorAll('.card-preview, .card-preview p').forEach(element => {
                element.style.removeProperty('font-size');
            });

            // Adjust section spacing for modal view
            const sections = modalCard.querySelectorAll('.section');
            sections.forEach(section => {
                section.style.setProperty('margin-bottom', '1.5rem', 'important');
                section.style.setProperty('padding-bottom', '1rem', 'important');
            });

            openModal(modalCard);
        }
    });
    
    return wrapper;
}

// Helper function to create a section with title and content
function createSection(title, content, format = 'text', isLast = false) {
    const section = document.createElement('div');
    section.className = 'section';
    section.style.marginBottom = '0.5rem';
    section.style.paddingBottom = '0.5rem';
    if (!isLast) {
        section.style.borderBottom = '1px solid rgba(3, 15, 79, 0.2)';
    }

    const titleElement = document.createElement('h3');
    titleElement.className = 'section-title';
    titleElement.textContent = title;

    const contentElement = document.createElement('div');
    contentElement.className = 'topic-content';

    if (format === 'list' && Array.isArray(content)) {
        const list = document.createElement('ul');
        list.className = 'lessons-list';
        content.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            list.appendChild(listItem);
        });
        contentElement.appendChild(list);
    } else if (Array.isArray(content)) {
        // Handle array of HTML content
        content.forEach(item => {
            const div = document.createElement('div');
            div.innerHTML = item;
            contentElement.appendChild(div);
        });
    } else {
        // Handle single HTML content
        const div = document.createElement('div');
        div.innerHTML = content;
        contentElement.appendChild(div);
    }

    section.appendChild(titleElement);
    section.appendChild(contentElement);

    return section;
} 
