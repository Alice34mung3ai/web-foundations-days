let notes = require('./notes.js');

function searchNotes(query) {
  const lowerQuery = query.toLowerCase();
  return notes.filter(note => note.text.toLowerCase().includes(lowerQuery));
}

function longestNote() {
  if (notes.length === 0) {
    return null;
  }
  
  let longest = notes[0];
  for (let i = 1; i < notes.length; i++) {
    if (notes[i].text.length > longest.text.length) {
      longest = notes[i];
    }
  }
  return longest;
}

function countByCategory() {
  const counts = {};
  for (const note of notes) {
    const cat = note.category;
    counts[cat] = (counts[cat] || 0) + 1;
  }
  return counts;
}

function getSummary() {
  const counts = countByCategory();
  const summaryParts = [];
  
  for (const [category, count] of Object.entries(counts)) {
    const label = count === 1 ? "note" : "notes";
    summaryParts.push(`${category}: ${count} ${label}`);
  }
  
  return `Summary - ${summaryParts.join(', ')}`;
}

function isDuplicate(text) {
  const cleanText = text.trim().toLowerCase();
  return notes.some(note => note.text.trim().toLowerCase() === cleanText);
}

function addNote(text, category) {
  if (!text || text.trim().length === 0) {
    return "Error: Note text cannot be empty.";
  }
  if (!category || category.trim().length === 0) {
    return "Error: Category cannot be empty.";
  }
  if (isDuplicate(text)) {
    return "Error: Duplicate note detected.";
  }
  
  const nextId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1;
  
  notes.push({ 
    id: nextId, 
    text: text.trim(), 
    category: category.trim().toLowerCase() 
  });
  return "Success: Note added.";
}

console.log("--- Testing searchNotes ---");
console.log(searchNotes("JavaScript")); 
console.log(searchNotes("Python"));    

console.log("\n--- Testing longestNote ---");
console.log(longestNote()); 
const savedNotes = [...notes];
notes = []; 
console.log(longestNote()); 
notes = savedNotes;

console.log("\n--- Testing countByCategory ---");
console.log(countByCategory()); 
notes.push({ id: 6, text: "Go for a run", category: "fitness" });
console.log(countByCategory()); 
notes.pop(); 

console.log("\n--- Testing getSummary ---");
console.log(getSummary()); 
const preservedNotes = [...notes];
notes = [];
console.log(getSummary()); 
notes = preservedNotes;

console.log("\n--- Testing isDuplicate ---");
console.log(isDuplicate("  BUY milk and BREAD  ")); 
console.log(isDuplicate("Walk the dog"));           

console.log("\n--- Testing addNote ---");
console.log(addNote("Attend standup meeting", "work")); 
console.log(addNote("Call mum", "personal"));           
console.log(addNote("", "study"));                    
