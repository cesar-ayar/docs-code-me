import fs from 'fs/promises';
import path from 'path';

const docsDir = path.resolve('c:/Users/Landon/Downloads/code-me/docs/docs-code-me/docs');

async function processDirectory(dirName) {
  const dirPath = path.join(docsDir, dirName);
  
  // Recursively get all mdx files
  async function getFiles(dir) {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return Array.prototype.concat(...files).filter(f => f.endsWith('.mdx') && !f.endsWith('ai-context.mdx'));
  }

  const allFiles = await getFiles(dirPath);
  
  let combined = `---\nid: "ai-context"\ntitle: "Contexto para IA (${dirName})"\nunlisted: true\n---\n\n`;
  
  for (const file of allFiles) {
    let content = await fs.readFile(file, 'utf-8');
    
    // Remove frontmatter
    content = content.replace(/^---[\s\S]*?---\n*/, '');
    
    // Remove imports
    content = content.replace(/import .*?;\n*/g, '');
    
    // Remove TerminalText and other JSX components loosely
    content = content.replace(/<TerminalText[\s\S]*?\/>/g, '');
    content = content.replace(/<div[^>]*>/g, '');
    content = content.replace(/<\/div>/g, '');
    content = content.replace(/<p[^>]*>/g, '');
    content = content.replace(/<\/p>/g, '');
    content = content.replace(/<h\d[^>]*>.*?<\/h\d>/g, '');
    content = content.replace(/<a[^>]*>.*?<\/a>/g, '');
    content = content.replace(/:::tip.*?:::|:::info.*?:::/gs, '');
    
    // Add section header
    const fileName = path.basename(file, '.mdx');
    combined += `\n\n# ${fileName.toUpperCase()}\n\n${content.trim()}`;
  }

  const outPath = path.join(dirPath, 'ai-context.mdx');
  await fs.writeFile(outPath, combined.trim() + '\n');
  console.log(`Generated ${outPath}`);
}

async function main() {
  await processDirectory('lenguaje');
  await processDirectory('mascota');
  await processDirectory('visual');
}

main().catch(console.error);
