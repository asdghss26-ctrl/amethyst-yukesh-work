/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');

const svgPath = 'c:\\Users\\acer\\OneDrive - ELCOT\\Documents\\AntiGravity\\logo without color.svg';
let svg = fs.readFileSync(svgPath, 'utf8');

// The dark colors that represent the actual logo lines
// removed darkColors variable as it is never used

// Let's replace the colors in the SVG.
// But we need to HIDE the light colors entirely (make them transparent or remove them)
// And make the dark colors #5A2A5D (or #F7F3EF).

const lightColors = ['#d4d4d4', '#fff', '#d4ffd4', '#ffffd4', '#d4d4ff', '#ffd4ff', '#aaa', '#d4aaaa', '#d4aad4', '#aa80aa', 'gray', '#ffd4d4'];

let darkSvg = svg;
let creamSvg = svg;

// Replace light colors with "none" to make them invisible
lightColors.forEach(color => {
    const regex = new RegExp(`fill="${color}"`, 'g');
    darkSvg = darkSvg.replace(regex, `fill="none"`);
    creamSvg = creamSvg.replace(regex, `fill="none"`);
});

// Replace dark colors with the brand colors
['#500', '#505', '#555', '#805580'].forEach(color => {
    const regex = new RegExp(`fill="${color}"`, 'g');
    darkSvg = darkSvg.replace(regex, `fill="#5A2A5D"`);
    creamSvg = creamSvg.replace(regex, `fill="#F7F3EF"`);
});

// Write to public folder
fs.writeFileSync('public/logo.svg', darkSvg);
fs.writeFileSync('public/logo-cream.svg', creamSvg);

console.log('SVGs generated successfully.');
