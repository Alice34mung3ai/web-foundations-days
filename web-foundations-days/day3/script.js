let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

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
  const totalNotes = notes.length;
  const label = totalNotes === 1 ? "note" : "notes";
  const counts = countByCategory();
  
  
  const personalCount = counts.personal || 0;
  const workCount = counts.work || 0;
  const studyCount = counts.study || 0;
  
  return `${totalNotes} ${label}: ${personalCount} personal, ${workCount} work, ${studyCount} study`;
}

function isDuplicate(text) {
  const cleanText = text.trim().toLowerCase();
  return notes.some(note => note.text.trim().toLowerCase() === cleanText);
}

function addNote(text, category) {
  if (!text || text.trim().length < 1 || text.trim().length > 200) {
    console.error("Error: Note text must be between 1 and 200 characters.");
    return false;
  }

  const cleanCategory = category.trim().toLowerCase();
  const allowedCategories = ["personal", "work", "study"];
  if (!allowedCategories.includes(cleanCategory)) {
    console.error("Error: Category must be personal, work, or study.");
    return false;
  }
  
  if (isDuplicate(text)) {
    console.error("Error: Duplicate note detected.");
    return false;
  }
  
  const nextId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1;
  
  notes.push({ 
    id: nextId, 
    text: text.trim(), 
    category: cleanCategory 
  });
  
  return true;
}

// ==========================================
// TESTING EACH FUNCTION
// ==========================================

console.log("--- Testing searchNotes ---");
console.log(searchNotes("JavaScript")); // expected: [ { id: 4, text: 'Revise JavaScript arrays', category: 'study' } ]
console.log(searchNotes("Python"));     // expected: []

console.log("\n--- Testing longestNote ---");
console.log(longestNote()); // expected: { id: 3, text: 'Email the project report to Grace', category: 'work' }
const savedNotes = [...notes];
notes = []; 
console.log(longestNote()); // expected: null
notes = savedNotes;

console.log("\n--- Testing countByCategory ---");
console.log(countByCategory()); // expected: { personal: 2, study: 2, work: 1 }
notes.push({ id: 6, text: "Temporary testing note", category: "work" });
console.log(countByCategory()); // expected: { personal: 2, study: 2, work: 2 }
notes.pop(); 

console.log("\n--- Testing getSummary ---");
console.log(getSummary()); // expected: 5 notes: 2 personal, 1 work, 2 study
const preservedNotes = [...notes];
notes = [];
console.log(getSummary()); // expected: 0 notes: 0 personal, 0 work, 0 study
notes = preservedNotes;

console.log("\n--- Testing isDuplicate ---");
console.log(isDuplicate("  BUY milk and BREAD  ")); // expected: true
console.log(isDuplicate("Walk the dog"));           // expected: false

console.log("\n--- Testing addNote ---");
console.log(addNote("Attend sync standup", "work")); // expected: true
console.log(addNote("Call mum", "personal"));           // expected: false
console.log(addNote("Invalid Category Note", "fitness")); // expected: false
console.log(addNote("", "study"));                     // expected: false
