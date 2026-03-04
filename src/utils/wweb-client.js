const { Client, LocalAuth } = require('whatsapp-web.js');
const path = require('path');
const fs = require('fs');

/**
 * Automáticamente busca el ejecutable de Chrome dentro de src/chrome
 * @returns {string|null}
 */
function getLocalChromePath() {
    const chromeDir = path.join(__dirname, '..', 'chrome', 'chrome');
    if (!fs.existsSync(chromeDir)) return null;

    // Buscamos recursivamente el .exe (en Windows)
    const files = fs.readdirSync(chromeDir, { recursive: true });
    const chromeExe = files.find(f => f.endsWith('chrome.exe'));

    return chromeExe ? path.join(chromeDir, chromeExe) : null;
}

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        // Usar el chrome que descargamos en src
        executablePath: getLocalChromePath() || undefined,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
});

module.exports = client;
