# Echo Lab Website

This is ECHO Lab's digital archive. Each project is featured as a LAB note and includes a picture and a brief description of the project. Notes are meant to be short and concise, you can include links to documents or publications that are relevant to it.

---

# How to add a lab note? 📝

## 1. Create a New Project File
   - Go to the `Projects` folder
   - Create a new file clicking add file on the top Right corner and named after your project. Use simple words with hyphens, like `my-new-project.js`)
   - Remember to use the ending (.js) to your project file
   - Copy and paste this text template into your new file and edit the text:

   ```javascript
   //Project tile
   const noteData = {
     title: "YOUR PROJECT TITLE",
     date: "DD.MM.YYYY", // Use this date format
     image: "assets/placeholder.png", // Put your image in the Assets folder
     preview: "A brief description of your project...",

   //Sections -> Right column 
     researchTopics: [
       "Topic 1",
       "Topic 2",
       "Topic 3"
     ],
     objectives: "What you want to achieve with this project",
     methodology: "How you plan to do it or how you did it",
     lessons: [
       "What you learned 1",
       "What you learned 2",
       "What you learned 3"
     ],
     collaborators: [
       "Person 1",
       "Person 2",
       "Person 3"
     ],

// Add your links
   projectLink: "https://www.linkedin.com/feed/", // Source link 1
   projectLinkText: "Framework Documentation", // Button text 1
   publicationLink: "https://www.linkedin.com/feed/", // Source link 2
   publicationLinkText: "Download Guidelines", // Button text 2

// OPTIONAL: Change section titles (right column)
  sectionTitles: {
   researchTopics: "Custom title here",
   lessons: "Custom title here",
   collaborators: "Custom title here"
     }
   };
   ```

## **2. Add Your Project Image**
   - Put your project image in the `Assets` folder. You can go to the folder assets and click upload new.
   - Remember that the file name assets/ must remain, so GitHub knows where to find the picture
   - Make sure to use the correct image path in your project file:
     
```javascript
     image: "assets/Test.png", // Put your image in the Assets folder and copy the name here
```

## **3. Add links to the lab note**:
   - You can add links to the lab notes and change the text of the link button.

```javascript
// Add your links
      Link1: "https://your-project-link.com",
      LinkText1: "View Project",
      Link2: "https://your-publication-link.com",
      LinkText2: "Read Publication",
```

## **4. Save your project by clicking the green button - Commit changes**
   -Your project file should now appear under the project folder.

## **5. Update the Project List**
   - Open `projects/project-list.json`
   - Add your project name (without the .js) to the list
   - Example: `"projects": ["existing-project-1", "existing-project-2", "my-new-project"]`
   - The order of the list will determine how the lab notes apear in the main website.

---

### **Optional: Editing Style the Text of the Section Headings**

This is not essential for your project to appear, but you might want to edit how the text appears:

*For Bullet points: Use an array*

   ```javascript
   lessons: [
  "What you learned 1",
  "What you learned 2"
]
  ```
   
*For Paragraphs: Use a string with p tags*

   ```javascript
  objectives: `
  <p>This is parragraph 1.</p>
  <p>This is parragraph 2.</p>
`,
  ```

*For Single-line text: Use a plain string*

   ```javascript   
title: "My Project Title"
 ```

*For long texts with line breaks use back ticks*

   ```javascript   
objectives: `This is a long piece of text
with a line break.`,
 ```


*Optional: Change Section Titles*: To customize the section titles in the right column, you need to adjust the default titles provided in the sectionTitles object. However, you can’t remove these sections entirely, you can only change their titles.

For example, if you want to rename a section like "Research Topics" to something else like "Research Areas," you would change the code like this:

   ```javascript
sectionTitles: {
   researchTopics: "Research Areas",// Custom title for the "topics" section
   lessons:  "Key Learnings" // Custom title for the "lessons" section
   collaborators: "Team Members",   // Custom title for the "collaborators" section
}
 ```

REMEMBER that incorrect JS syntax inside your project file will not display your LAB note.

## ✅ Final Checklist for uploading projects:

 - Create a new project file in the projects/ folder?
 - Use a clear and simple filename (like my-new-project.js)?
 - Fill in all the fields in the noteData object (title, date, image, etc.)?
 - Do you have the correct syntax? Missing comas, etc? 
 - Upload your image to the assets/ folder?
 - Use the correct path to the image in your project file (assets/your-image.png)?
 - Add your project name (without .js) to the project-list.json file?

If you have any problems try asking Johan, Sarah or Ainoa. 
Your LAB note should now be on the Echo Lab website :) 

### PLEASE NOTE: It might take 5 minutes for GitHub to process your edit. 
Do not be confused if it takes a bit of time until your lab note appears on the website.


---

# Adding a New Event

Events are shown on the **Events** page as poster cards. Clicking a card opens the image (or PDF) full screen.
Events are sorted automatically: anything dated today or later appears under "Upcoming Events", and it moves to "Past Events" the day after it happens.

To add an event to the website:

1. Upload the poster (image or PDF) to the `Assets` folder
2. Open `events/events.json`
3. Add your event to the `events` list using this format (order does not matter, and remember the comma between entries):
 
   ```javascript
   {
     "date": "DD.MM.YYYY",
     "title": "Your Event Title",
     "image": "assets/your-event-poster.png"
   }
   ```

---

# Website Structure - here you can see how the github folders have been organised.

```
Echo Lab Website/
├── index.html               # Home / About page (managed by admin)
├── lab-notes/index.html     # Lab notes page
├── events/                  # Events page
│   ├── index.html           # Events page (managed by admin)
│   ├── events-loader.js     # Builds the upcoming/past event cards (managed by admin)
│   └── events.json          # List of all events - add new events here
├── people/                  # People page (index.html, loader, committee/affiliates/collaborators JSON)
├── maps/                    # Standalone map pages
├── carousel/                # Projects shown in the home page carousel
├── projects/                # LAB NOTES - NEW CONTENT GOES HERE 🗂📝
│   ├── project-list.json    # List of all projects - needs to be updated
│   └── *.js                 # Individual project files - Using template you can create a new project
├── js/                      # JavaScript modules (managed by admin)
│   ├── about-carousel.js    # Home page carousel
│   ├── components/          # UI components
│   │   ├── card-creator.js  # creates the UI of the lab note
│   │   └── modal.js
│   └── loader.js            # Loads the lab notes into the lab notes page
├── css/                     # CSS styles of the website (managed by admin)
└── assets/                  # Static assets (images, logos)
```
