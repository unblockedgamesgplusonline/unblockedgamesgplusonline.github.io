
const fs = require('fs');
const path = require('path');

const searchText = '<h2 class="my-4 text-center">Description</h2>';
const replaceText = '';

function replaceInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(searchText)) {
      content = content.split(searchText).join(replaceText);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${filePath}`);
    }
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.html')) {
      replaceInFile(filePath);
    }
  });
}

// Start processing from current directory
processDirectory('.');
