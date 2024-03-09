// generateTreeScript.js

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

module.exports = generateTree;
