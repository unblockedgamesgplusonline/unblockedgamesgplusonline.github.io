
const fs = require('fs');
const path = require('path');

const searchText = "FreezeNova Unblocked Game play at freezenova-unblockedgames.github.io online ⭐ Dive into ⚡ Unblocked the FreezeNova Games ❤️ high quality free unlocked games! No Waiting, Just Gaming!";
const replaceText = "Instant gaming fun awaits at Unblocked Games G+! No downloads, no signups, just visit GamesGPlus.gitlab.io and start playing immediately. ❤️ high quality free unlocked games!";

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
