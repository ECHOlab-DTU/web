import { createLabNoteCard } from './components/card-creator.js';
import { loadEvents, createEventItem } from './components/events-handler.js';

// Function to load events
async function loadEventsData() {
    try {
        console.log('Fetching events data...');
        const response = await fetch('Events/events.json');
        if (!response.ok) {
            throw new Error(`Failed to load events: ${response.status} ${response.statusText}`);
        }
        const eventsData = await response.json();
        console.log('Events data loaded:', eventsData);
        loadEvents(eventsData.events);
    } catch (error) {
        console.error('Error loading events:', error);
    }
}

// Function to load lab notes from individual files
async function loadLabNotes() {
    try {
        console.log('Starting loadLabNotes function...');
        const gridContainer = document.querySelector('.grid-container');
        if (!gridContainer) {
            console.error('Grid container not found in the DOM');
            return;
        }
        console.log('Grid container found:', gridContainer);
        gridContainer.innerHTML = ''; // Clear existing content

        // Get all project files from the projects directory
        console.log('Fetching Projects/project-list.json...');
        const response = await fetch('Projects/project-list.json');
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`Failed to load project list: ${response.status} ${response.statusText}`);
        }
        
        const projectIndex = await response.json();
        console.log('Project index loaded:', projectIndex);
        
        if (!projectIndex.projects || !Array.isArray(projectIndex.projects)) {
            throw new Error('Invalid project list format');
        }
        
        console.log('Projects to load:', projectIndex.projects);
        
        // Load each project file
        for (const projectId of projectIndex.projects) {
            try {
                console.log(`Loading project: ${projectId}`);
                const projectUrl = `Projects/${projectId}.js`;
                console.log(`Fetching from URL: ${projectUrl}`);
                const projectResponse = await fetch(projectUrl);
                console.log(`Project response status for ${projectId}:`, projectResponse.status);
                
                if (!projectResponse.ok) {
                    console.error(`Failed to load project: ${projectId} - ${projectResponse.status} ${projectResponse.statusText}`);
                    continue;
                }
                
                // Execute the project file to get the note data
                const projectScript = await projectResponse.text();
                console.log(`Project script loaded for ${projectId}:`, projectScript.substring(0, 100) + '...');
                
                // Create a function to evaluate the script and return the note data
                console.log(`Evaluating script for ${projectId}...`);
                let noteData;
                try {
                    const getNoteData = new Function(`
                        try {
                            ${projectScript}
                            if (typeof noteData === 'undefined') {
                                console.error('noteData is undefined');
                                return null;
                            }
                            return noteData;
                        } catch (e) {
                            console.error('Error in script evaluation:', e);
                            return null;
                        }
                    `);
                    noteData = getNoteData();
                } catch (e) {
                    console.error(`Error creating evaluation function for ${projectId}:`, e);
                    continue;
                }
                
                console.log(`Note data for ${projectId}:`, noteData);
                
                if (noteData) {
                    console.log(`Creating card for ${projectId}...`);
                    const card = createLabNoteCard(noteData);
                    if (card) {
                        gridContainer.appendChild(card);
                        console.log(`Card for ${projectId} added to grid container`);
                    } else {
                        console.error(`Failed to create card for ${projectId}`);
                    }
                } else {
                    console.error(`No note data returned for ${projectId}`);
                }
            } catch (error) {
                console.error(`Error loading project ${projectId}:`, error);
            }
        }
    } catch (error) {
        console.error('Error loading lab notes:', error);
        const gridContainer = document.querySelector('.grid-container');
        if (gridContainer) {
            gridContainer.innerHTML = '<p>Error loading lab notes. Please try again later.</p>';
        }
    }
}

// Initialize the page
console.log('Adding DOMContentLoaded listener...');
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded, initializing...');
    loadLabNotes();
    loadEventsData();
}); 