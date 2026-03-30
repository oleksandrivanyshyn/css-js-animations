const fs = require('fs');
const path = require('path');

const categories = ['animations', 'buttons', 'cards', 'clip', 'images', 'menu', 'javascript','other cool effects'];

let htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My CSS/JS Animation Collection</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0f172a; color: #e2e8f0; margin: 0; padding: 20px; }
        h1 { text-align: center; margin-bottom: 30px; color: #38bdf8; }
        .nav { display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; margin-bottom: 40px; }
        .nav-btn { background: #1e293b; color: #e2e8f0; border: 1px solid #334155; padding: 10px 20px; border-radius: 8px; cursor: pointer; text-transform: capitalize; transition: 0.2s; font-size: 16px; }
        .nav-btn:hover, .nav-btn.active { background: #38bdf8; color: #0f172a; font-weight: bold; }
        .category-section { display: none; }
        .category-section.active { display: block; }
        h2 { border-bottom: 2px solid #334155; padding-bottom: 10px; margin-top: 20px; text-transform: capitalize; }
        .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px; margin-top: 20px; }
        .card { background: #1e293b; border-radius: 12px; padding: 10px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); transition: transform 0.2s; }
        .card:hover { transform: translateY(-5px); }
        .card h3 { font-size: 14px; margin: 0 0 10px 0; color: #94a3b8; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-transform: capitalize; }
        iframe { width: 100%; height: 600px; border: none; border-radius: 8px; background: #ffffff; }
        @media (max-width: 1024px) { .grid { grid-template-columns: 1fr; } }
    </style>
</head>
<body>
    <h1>UI and Animations Collection</h1>
    <div class="nav">
`;

categories.forEach((category, index) => {
    const categoryPath = path.join(__dirname, category);
    if (fs.existsSync(categoryPath)) {
        const isActive = index === 0 ? 'active' : '';
        htmlContent += `<button class="nav-btn ${isActive}" onclick="showCategory('${category}', this)">${category.replace(/-/g, ' ')}</button>\n`;
    }
});

htmlContent += `
    </div>
    <div id="content">
`;

categories.forEach((category, index) => {
    const categoryPath = path.join(__dirname, category);

    if (fs.existsSync(categoryPath)) {
        const isActive = index === 0 ? 'active' : '';
        htmlContent += `<div id="${category}" class="category-section ${isActive}">\n<h2>${category.replace(/-/g, ' ')}</h2>\n<div class="grid">\n`;

        const items = fs.readdirSync(categoryPath, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)
            .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

        items.forEach(item => {
            const srcPath = encodeURI(`./${category}/${item}/`);
            htmlContent += `
            <div class="card">
                <h3>${item.replace(/-/g, ' ')}</h3>
                <iframe src="${srcPath}" loading="lazy" sandbox="allow-scripts allow-same-origin"></iframe>
            </div>\n`;
        });

        htmlContent += `</div>\n</div>\n`;
    }
});

htmlContent += `
    </div>
    <script>
        function showCategory(categoryId, btnElement) {
            document.querySelectorAll('.category-section').forEach(section => {
                section.classList.remove('active');
            });
            
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            document.getElementById(categoryId).classList.add('active');
            btnElement.classList.add('active');
        }
    </script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'index.html'), htmlContent);
console.log('Success! The index.html file has been generated with automatic sorting.');