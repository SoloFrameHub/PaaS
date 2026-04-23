const fs = require('fs');
const https = require('https');
const path = require('path');

const icons = [
    'activity', 'alert-circle', 'arrow-left', 'arrow-right', 'arrow-right-circle',
    'bar-chart-3', 'book-open', 'bot', 'calendar', 'check', 'check-circle',
    'check-circle-2', 'chevron-right', 'clock', 'construction', 'cpu',
    'database-backup', 'edit-3', 'file-question', 'file-text', 'git-branch',
    'handshake', 'history', 'info', 'layers', 'layout-grid', 'lock', 'log-out',
    'message-square', 'mic', 'phone-call', 'play', 'plus', 'presentation',
    'refresh-cw', 'rocket', 'shield', 'sparkles', 'terminal', 'trash-2',
    'trending-up', 'undo-2', 'upload-cloud', 'user', 'users', 'x', 'zap',
    'timer', 'search', 'send', 'gavel', 'party-popper', 'frown',
    'sun', 'moon', 'target', 'megaphone', 'trophy', 'award', 'file-check', 'file-edit', 'file', 'download', 'twitter', 'list', 'map', 'home', 'user-check', 'folder-open'
];

const outputDir = path.join(__dirname, '../public/assets/icons');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const spritePath = path.join(outputDir, 'sprite.svg');

async function fetchIcon(name) {
    const url = `https://unpkg.com/lucide-static/icons/${name}.svg`;
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 302) {
                // Follow redirect
                https.get(`https://unpkg.com${res.headers.location}`, (res2) => {
                    let data = '';
                    res2.on('data', hunk => data += hunk);
                    res2.on('end', () => resolve(data));
                });
                return;
            }
            if (res.statusCode !== 200) {
                console.error(`Failed to fetch ${name}: ${res.statusCode}`);
                resolve(null);
                return;
            }
            let data = '';
            res.on('data', hunk => data += hunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

async function buildSprite() {
    let symbols = '<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">\n';

    for (const name of icons) {
        console.log(`Fetching ${name}...`);
        const svg = await fetchIcon(name);
        if (svg) {
            // Convert <svg ...> content </svg> to <symbol id="[name]" viewBox="0 0 24 24"> content </symbol>
            const content = svg.replace(/<svg[^>]*>/, '').replace('</svg>', '').trim();
            symbols += `  <symbol id="${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n    ${content}\n  </symbol>\n`;
        }
    }

    symbols += '</svg>';
    fs.writeFileSync(spritePath, symbols);
    console.log(`Sprite created at ${spritePath}`);
}

buildSprite();
