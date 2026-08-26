$filePath = "c:\khorrum\src\app\admin.khorrum\page.tsx"
$content = Get-Content $filePath -Raw

$content = $content -replace 'const inp = ".*?";', 'const inp = "w-full px-3 py-2 rounded-md bg-black border border-[#333] text-white text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-gray-500";'
$content = $content -replace 'const btnPrimary = ".*?";', 'const btnPrimary = "px-4 py-2 rounded-md bg-white text-black font-medium text-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-2";'
$content = $content -replace 'const btnDanger = ".*?";', 'const btnDanger = "px-4 py-2 rounded-md bg-transparent border border-red-900 text-red-500 text-sm font-medium hover:bg-red-950 transition-all flex items-center gap-2";'
$content = $content -replace 'const btnGhost = ".*?";', 'const btnGhost = "px-4 py-2 rounded-md bg-transparent border border-[#333] text-sm font-medium text-gray-300 hover:border-gray-500 hover:text-white hover:bg-[#111] transition-all flex items-center gap-2";'
$content = $content -replace 'const cardClass = ".*?";', 'const cardClass = "p-6 rounded-xl bg-[#0a0a0a] border border-[#333] hover:border-[#555] transition-all space-y-4 shadow-sm relative overflow-hidden group";'
$content = $content -replace 'const labelClass = ".*?";', 'const labelClass = "block text-xs font-medium text-gray-400 mb-1.5";'

# Layout backgrounds
$content = $content -replace 'bg-\[#030712\]', 'bg-black'
$content = $content -replace 'bg-\[#0b1329\](\/\d+)?', 'bg-[#0a0a0a]'
$content = $content -replace 'bg-\[#070d1b\]', 'bg-black'
$content = $content -replace 'bg-\[#0d1833\]', 'bg-[#111]'

# Borders
$content = $content -replace 'border-slate-700(\/\d+)?', 'border-[#333]'
$content = $content -replace 'border-slate-800(\/\d+)?', 'border-[#333]'
$content = $content -replace 'border-\[#10b981\](\/\d+)?', 'border-white/20'

# Text colors
$content = $content -replace 'text-slate-400', 'text-gray-400'
$content = $content -replace 'text-slate-500', 'text-gray-500'
$content = $content -replace 'text-\[#10b981\]', 'text-white'
$content = $content -replace 'text-\[#06b6d4\]', 'text-gray-400'

# Fonts and Typography
$content = $content -replace "font-\['Anton'\]", 'font-sans font-semibold tracking-tight'
$content = $content -replace 'font-mono', 'font-sans'
$content = $content -replace 'uppercase tracking-widest', 'tracking-normal'
$content = $content -replace 'uppercase tracking-\[0\.3em\]', 'uppercase tracking-wider'
$content = $content -replace 'uppercase tracking-wider', 'tracking-normal'

# Radii
$content = $content -replace 'rounded-3xl', 'rounded-xl'
$content = $content -replace 'rounded-\[32px\]', 'rounded-xl'
$content = $content -replace 'rounded-\[40px\]', 'rounded-xl'
$content = $content -replace 'rounded-2xl', 'rounded-lg'

# Cyberpunk glow artifacts
$content = $content -replace 'shadow-2xl', 'shadow-lg'
$content = $content -replace 'shadow-lg shadow-emerald-500\/20', 'shadow-none'
$content = $content -replace 'glow-orb-emerald', 'hidden'
$content = $content -replace 'animate-ping', 'hidden'

# Tabs/Sidebar fixes
$content = $content -replace 'bg-gradient-to-r from-\[#10b981\] to-\[#06b6d4\]', 'bg-white'
$content = $content -replace 'text-\[#030712\]', 'text-black'
$content = $content -replace 'bg-\[#10b981\]\/10', 'bg-[#333]'
$content = $content -replace 'border border-\[#10b981\]\/25', 'border border-[#444]'
$content = $content -replace 'bg-\[#10b981\]', 'bg-white'
$content = $content -replace 'text-[#10b981]', 'text-white'

$content | Set-Content $filePath
Write-Host "Replaced successfully!"
