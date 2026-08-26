const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/app/admin.khorrum/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace constants at the top
content = content.replace(/const inp = ".*?";/, 'const inp = "w-full px-3 py-2 rounded-md bg-black border border-[#333] text-white text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-gray-500";');
content = content.replace(/const btnPrimary = ".*?";/, 'const btnPrimary = "px-4 py-2 rounded-md bg-white text-black font-medium text-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-2";');
content = content.replace(/const btnDanger = ".*?";/, 'const btnDanger = "px-4 py-2 rounded-md bg-transparent border border-red-900 text-red-500 text-sm font-medium hover:bg-red-950 transition-all flex items-center gap-2";');
content = content.replace(/const btnGhost = ".*?";/, 'const btnGhost = "px-4 py-2 rounded-md bg-transparent border border-[#333] text-sm font-medium text-gray-300 hover:border-gray-500 hover:text-white hover:bg-[#111] transition-all flex items-center gap-2";');
content = content.replace(/const cardClass = ".*?";/, 'const cardClass = "p-6 rounded-xl bg-[#0a0a0a] border border-[#333] hover:border-[#555] transition-all space-y-4 shadow-sm relative overflow-hidden group";');
content = content.replace(/const labelClass = ".*?";/, 'const labelClass = "block text-xs font-medium text-gray-400 mb-1.5";');

// Replace colors & fonts globally
const replacements = [
  // Layout backgrounds
  { from: /bg-\[#030712\]/g, to: 'bg-black' },
  { from: /bg-\[#0b1329\](\/\d+)?/g, to: 'bg-[#0a0a0a]' },
  { from: /bg-\[#070d1b\]/g, to: 'bg-black' },
  { from: /bg-\[#0d1833\]/g, to: 'bg-[#111]' },
  
  // Borders
  { from: /border-slate-700(\/\d+)?/g, to: 'border-[#333]' },
  { from: /border-slate-800(\/\d+)?/g, to: 'border-[#333]' },
  { from: /border-\[#10b981\](\/\d+)?/g, to: 'border-white/20' },
  
  // Text colors
  { from: /text-slate-400/g, to: 'text-gray-400' },
  { from: /text-slate-500/g, to: 'text-gray-500' },
  { from: /text-\[#10b981\]/g, to: 'text-white' },
  { from: /text-\[#06b6d4\]/g, to: 'text-gray-400' }, // secondary text
  
  // Fonts and Typography
  { from: /font-\['Anton'\]/g, to: 'font-sans font-semibold tracking-tight' },
  { from: /font-mono/g, to: 'font-sans' },
  { from: /uppercase tracking-widest/g, to: 'tracking-normal' },
  { from: /uppercase tracking-\[0\.3em\]/g, to: 'uppercase tracking-wider' },
  { from: /uppercase tracking-wider/g, to: 'tracking-normal' },
  
  // Radii
  { from: /rounded-3xl/g, to: 'rounded-xl' },
  { from: /rounded-\[32px\]/g, to: 'rounded-xl' },
  { from: /rounded-\[40px\]/g, to: 'rounded-xl' },
  { from: /rounded-2xl/g, to: 'rounded-lg' },
  
  // Cyberpunk glow artifacts
  { from: /shadow-2xl/g, to: 'shadow-lg' },
  { from: /shadow-lg shadow-emerald-500\/20/g, to: 'shadow-none' },
  { from: /glow-orb-emerald/g, to: 'hidden' },
  { from: /animate-ping/g, to: 'hidden' }
];

for (const {from, to} of replacements) {
  content = content.replace(from, to);
}

// Special fixes for the tabs/sidebar
content = content.replace(/bg-gradient-to-r from-\[#10b981\] to-\[#06b6d4\]/g, 'bg-white');
content = content.replace(/text-\[#030712\]/g, 'text-black');
content = content.replace(/bg-\[#10b981\]\/10/g, 'bg-[#333]');
content = content.replace(/border border-\[#10b981\]\/25/g, 'border border-[#444]');
content = content.replace(/bg-\[#10b981\]/g, 'bg-white');
content = content.replace(/text-[#10b981]/g, 'text-white');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully refactored admin panel to Vercel UI!');
