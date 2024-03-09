
const fs = require('fs');
const path = require('path');

function generateTree(rootPath, regexPatterns) {
  const tree = {};

  function traverseFolder(currentPath, currentLevel) {
    const files = fs.readdirSync(currentPath);

    files.forEach((item) => {
      const itemPath = path.join(currentPath, item);
      const isDirectory = fs.statSync(itemPath).isDirectory();

      if (isDirectory) {
        const matchingPattern = regexPatterns.find(pattern => pattern.test(item));
        if (matchingPattern) {
          currentLevel[item] = {};
          traverseFolder(itemPath, currentLevel[item]);
        }
      } else {
        currentLevel[item] = null;
      }
    });
  }

  traverseFolder(rootPath, tree);
  return tree;
}
const rootPath = process.cwd(); // Current working directory
const regexPatterns = ['app', 'components',]; // Replace with your regex patterns

const tree = generateTree(rootPath, regexPatterns.map(pattern => new RegExp(pattern)));

fs.writeFileSync('folder_tree.json', JSON.stringify(tree, null, 2));

console.log("Folder tree has been generated and saved as 'folder_tree.json'.");
