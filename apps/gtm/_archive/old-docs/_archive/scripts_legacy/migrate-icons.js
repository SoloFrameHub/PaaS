const fs = require('fs');
const path = require('path');

const viewsDir = path.join(__dirname, '../views');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(file => {
        const filepath = path.join(dir, file);
        const stats = fs.statSync(filepath);
        if (stats.isDirectory()) walk(filepath, callback);
        else if (stats.isFile() && file.endsWith('.ejs')) callback(filepath);
    });
}

walk(viewsDir, (filepath) => {
    let content = fs.readFileSync(filepath, 'utf8');

    // Pattern 1: <span class="...iconify..." data-icon="lucide:[name]" ...></span>
    // Use [^>]* instead of dots for multiline compatibility
    const pattern = /<span class="([^"]*iconify[^"]*)"[^>]*data-icon="lucide:([a-zA-Z0-9-]+)"([^>]*)><\/span>/gs;

    content = content.replace(pattern, (match, classes, name, extra) => {
        let width = '20';
        let height = '20';

        const widthMatch = extra.match(/data-width="(\d+)"/);
        if (widthMatch) {
            width = widthMatch[1];
            height = width;
        }

        // Remove 'iconify' from classes and keep the rest
        const cleanClasses = classes.replace('iconify', '').trim() + ' icon-local';

        return `<svg class="${cleanClasses.trim()}" width="${width}" height="${height}"><use href="/assets/icons/sprite.svg#${name}"></use></svg>`;
    });

    // Pattern 2: dynamic icon names in ejs
    // <span class="...iconify..." data-icon="lucide:<%= iconName %>" ...></span>
    const dynamicPattern = /<span class="([^"]*iconify[^"]*)"[^>]*data-icon="lucide:<%= ([^%]+) %>"([^>]*)><\/span>/gs;
    content = content.replace(dynamicPattern, (match, classes, expr, extra) => {
        let width = '20';
        const widthMatch = extra.match(/data-width="(\d+)"/);
        if (widthMatch) width = widthMatch[1];

        const cleanClasses = classes.replace('iconify', '').trim() + ' icon-local';

        return `<svg class="${cleanClasses.trim()}" width="${width}" height="${width}"><use href="/assets/icons/sprite.svg#<%= ${expr} %>"></use></svg>`;
    });

    fs.writeFileSync(filepath, content);
});

console.log('Icon migration complete.');
