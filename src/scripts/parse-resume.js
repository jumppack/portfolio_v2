
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const resumeName = process.argv[2];

if (!resumeName) {
  console.error('Please provide a resume filename (e.g., Karan_Mehta.pdf)');
  process.exit(1);
}

const resumePath = path.resolve(process.cwd(), 'data', 'raw', resumeName);

if (!fs.existsSync(resumePath)) {
  console.error(`Resume file not found: ${resumePath}`);
  process.exit(1);
}

const dataBuffer = fs.readFileSync(resumePath);

pdf(dataBuffer).then(function(data) {
  console.log('PDF Info:', data.info);
  console.log('Number of pages:', data.numpages);
  console.log('Text length:', data.text.length);
  console.log('Text content:', data.text);
}).catch(err => {
  console.error('Error parsing PDF:', err);
  process.exit(1);
});
