//Project tile
const noteData = {
  title: "Mapping the 2026 Danish General Election on Social Media",
  date: "26.03.2026", // Use this date format
  image: "Assets/fv26-map.png", 
  preview: `
  <p>This project maps publicly available social media posts from parliamentary candidates during the lead-up to Denmark's general election on 24 March 2026. By analyzing candidates’ public posts, the project captures how technology-related issues are discussed during the election campaign. It contributes to ECHO's broader mission to establish an observatory for technology questions in society.</p>
  <p>The posts are organized according to semantic similarity and visualized as a thematic landscape, where texts addressing related topics are placed close to one another. This makes it possible to identify clusters of recurring themes and debates across the election campaign.</p>
  <p>The map is interactive, allowing users to explore individual posts in detail and to filter the dataset using parameters such as time, party affiliation and social media platform. Through a set of thematic headlines, the map provides an overview of different issues shaping the election campaign.</p>
`,

//Sections -> Right column 
  researchTopics: [
    "Technology in Electoral Campaigns",
    "Data Visualization"
  ],
  objectives: "Mapping how technology is articulated or excluded in the Danish election campaign. The focus is on identifying political discussions of key technological domains such as agriculture, energy, health, and artificial intelligence.",
  methodology: "The map is developed by collecting public social media posts from candidates running for parliament. The texts are analyzed using embeddings and clustering algorithm to identify groups of thematically similar posts, which are subsequently read and annotated manually.",
  lessons: [
    "Interactive mapping and visualization of parliamentary candidates’ social media posts",
    "Report and articles are currently in development"
  ],
  collaborators: [
    "Johan Irving Søltoft, Lasse Uhrskov Kristensen, Daniel Nordstrand Frantzen, William Kristian Krogh Vergo, Frederik Bay Jørgensen, Andreas Rattenborg Holm-Hansen, Amanda Obitz Mogensen, Anders Kristian Munk, Mathieu Jacomy"
  ],

// Add your links
projectLink: "https://echolab-dtu.github.io/web/Maps/Folketingsvalget2026.html", // Source link 1
projectLinkText:  "Project Website", // Button text 1

// OPTIONAL: Change section titles (right column)
sectionTitles: {
researchTopics: "Research areas",
lessons: "Deliverables",
collaborators: "Project team"
  }
};
