// CUSTOM CURSOR
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0;
document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (cursor) cursor.style.left = mx - 6 + 'px';
    if (cursor) cursor.style.top = my - 6 + 'px';
    if (ring) ring.style.left = mx - 16 + 'px';
    if (ring) ring.style.top = my - 16 + 'px';
});
document.querySelectorAll('a, button, .card, .skill-card, .contact-link').forEach(el => {
    el.addEventListener('mouseenter', () => { 
        if (cursor) cursor.style.transform = 'scale(2)'; 
        if (ring) ring.style.transform = 'scale(1.5)'; 
    });
    el.addEventListener('mouseleave', () => { 
        if (cursor) cursor.style.transform = 'scale(1)'; 
        if (ring) ring.style.transform = 'scale(1)'; 
    });
});

// TYPING EFFECT
const phrases = [
    "I build systems. I analyze logs. I solve problems.",
    "Fix first. Then optimize.",
    "Every log tells a story.",
    "Backend is where the real magic happens."
];
let pi = 0, ci = 0, deleting = false;
const typingEl = document.getElementById('typing-text');
function type() {
    if (!typingEl) return;
    const phrase = phrases[pi];
    if (!deleting) {
        typingEl.innerHTML = phrase.slice(0, ci + 1) + '<span class="cursor-blink">_</span>';
        ci++;
        if (ci === phrase.length) { deleting = true; setTimeout(type, 2200); return; }
    } else {
        typingEl.innerHTML = phrase.slice(0, ci - 1) + '<span class="cursor-blink">_</span>';
        ci--;
        if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(type, 400); return; }
    }
    setTimeout(type, deleting ? 40 : 58);
}
if (typingEl) setTimeout(type, 1400);

// HAMBURGER
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.classList.toggle('open');
}

// SHOW HERO IMAGE
function showImg() {
    const img = document.getElementById('heroImg');
    const fallback = document.getElementById('heroAvatar');
    if (img && fallback) {
        img.style.display = 'block';
        fallback.style.display = 'none';
    }
}

const heroImg = document.getElementById('heroImg');
if (heroImg) {
    if (heroImg.complete) showImg();
    else heroImg.addEventListener('load', showImg);
}

// SCROLL ANIMATIONS
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.12 });

document.querySelectorAll('.section-header, [data-animate]').forEach(el => observer.observe(el));

// CONTACT SEND
async function handleSend() {
    const n = document.getElementById('fname').value;
    const e = document.getElementById('femail').value;
    const m = document.getElementById('fmsg').value;
    if (!n || !e || !m) { alert('$ error: all fields required'); return; }
    
    const btn = document.querySelector('.btn-send');
    const orig = btn.textContent;
    btn.textContent = '$ sending...';
    btn.disabled = true;

    try {
        const response = await fetch('http://localhost:8080/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: n, email: e, message: m })
        });

        if (response.ok) {
            btn.textContent = '$ message_sent ✓';
            btn.style.background = 'var(--primary)';
            btn.style.color = 'var(--bg)';
            document.getElementById('fname').value = '';
            document.getElementById('femail').value = '';
            document.getElementById('fmsg').value = '';
        } else {
            btn.textContent = '$ error_sending_message ✗';
            btn.style.background = '#ff5f56';
        }
    } catch (error) {
        btn.textContent = '$ connection_error ✗';
        btn.style.background = '#ff5f56';
    }

    setTimeout(() => { 
        btn.textContent = orig; 
        btn.style.background = ''; 
        btn.disabled = false;
    }, 3000);
}

// DYNAMIC LOADER
async function loadData(jsonFile, gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    try {
        const response = await fetch(jsonFile);
        if (!response.ok) throw new Error(`HTTP ${response.status}: Failed to load ${jsonFile}`);
        
        const data = await response.json();
        grid.innerHTML = ''; 

        data.forEach((item, index) => {
            const isExperience = gridId === 'experiences-grid';
            const card = document.createElement('div');
            card.className = 'exp-card animate';
            card.style.animationDelay = `${index * 0.15}s`;

            if (isExperience) {
                card.innerHTML = `
                    <div class="exp-left">
                        <img src="${item.image}" alt="${item.company}" class="exp-logo" onerror="this.style.display='none'">
                    </div>
                    <div class="exp-right">
                        <div class="exp-header">
                            <h3 class="exp-role">${item.role}</h3>
                            <p class="exp-company-info">${item.company} • ${item.duration}</p>
                        </div>
                        <p class="exp-desc">${item.description}</p>
                        ${item.media ? `
                            <div class="exp-media-gallery">
                                ${item.media.map(m => `
                                    <a href="${m}" target="_blank" class="exp-media-item">
                                        <img src="${m}" alt="Media" onerror="this.style.display='none'">
                                    </a>
                                `).join('')}
                            </div>
                        ` : ''}
                        ${item.skills ? `
                            <div class="exp-skills">
                                ${item.skills.map(s => `<span class="exp-skill-tag">${s}</span>`).join('')}
                            </div>
                        ` : ''}
                        ${item.certificate_url ? `
                            <a href="${item.certificate_url}" target="_blank" class="exp-cert-btn">
                                <i class="fas fa-certificate"></i> View Certificate
                            </a>
                        ` : ''}
                    </div>
                `;
            } else {
                card.innerHTML = `
                    <div class="exp-left">
                        <img src="${item.image}" alt="${item.title}" class="exp-logo" onerror="this.style.display='none'">
                    </div>
                    <div class="exp-right">
                        <div class="exp-header">
                            <h3 class="exp-role">${item.title}</h3>
                        </div>
                        <p class="exp-desc">${item.description}</p>
                        ${item.certificate_url ? `
                            <a href="${item.certificate_url}" target="_blank" class="exp-cert-btn">
                                <i class="fas fa-certificate"></i> View Certificate
                            </a>
                        ` : ''}
                    </div>
                `;
            }
            grid.appendChild(card);
        });
    } catch (err) {
        console.error(`Error loading ${jsonFile}:`, err);
        grid.innerHTML = `<p style="color:#ff6b6b; padding:20px;">[ERR] Unable to load data: ${err.message}</p>`;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadData('achievements.json', 'achievements-grid');
    loadData('experiences.json', 'experiences-grid');
});

// TERMINAL SIMULATION
const terminalBox = document.getElementById('terminalBox');
const terminalFlow = [
    { type: 'cmd', text: 'sudo apt-get update' },
    { type: 'output', text: 'Hit:1 http://archive.ubuntu.com/ubuntu focal InRelease' },
    { type: 'output', text: 'Get:2 http://security.ubuntu.com/ubuntu focal-security InRelease [114 kB]' },
    { type: 'output', text: 'Fetched 114 kB in 1s (114 kB/s)' },
    { type: 'ok', text: 'Reading package lists... Done' },
    { type: 'cmd', text: 'sudo apt-get upgrade -y' },
    { type: 'output', text: 'Calculating upgrade... Done' },
    { type: 'ok', text: '0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.' },
    { type: 'cmd', text: 'mkdir project_nexus && cd project_nexus' },
    { type: 'cmd', text: 'touch config.yml main.java' },
    { type: 'cmd', text: 'ping -c 3 8.8.8.8' },
    { type: 'output', text: 'PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.' },
    { type: 'output', text: '64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=14.2 ms' },
    { type: 'output', text: '64 bytes from 8.8.8.8: icmp_seq=2 ttl=117 time=12.1 ms' },
    { type: 'ok', text: '--- 8.8.8.8 ping statistics ---\n3 packets transmitted, 3 received, 0% packet loss' },
    { type: 'cmd', text: 'git init' },
    { type: 'output', text: 'Initialized empty Git repository in /home/vishnu/project_nexus/.git/' },
    { type: 'cmd', text: 'git add . && git commit -m "Initial commit"' },
    { type: 'output', text: '[master (root-commit) a1b2c3d] Initial commit\n 2 files changed, 0 insertions(+), 0 deletions(-)' },
    { type: 'comment', text: '# System ready. Rebooting terminal sequence...' }
];

let termIdx = 0;

function printTerminalLine() {
    if (!terminalBox) return;

    if (termIdx === 0) {
        terminalBox.innerHTML = '';
    }

    const lineData = terminalFlow[termIdx];
    const lineEl = document.createElement('div');
    lineEl.className = 't-line';

    if (lineData.type === 'cmd') {
        const prompt = document.createElement('span');
        prompt.className = 't-prompt';
        prompt.textContent = 'vishnu@linux:~$ ';
        
        const cmdText = document.createElement('span');
        cmdText.className = 't-cmd';
        
        const cursor = document.createElement('span');
        cursor.className = 't-cursor';
        
        lineEl.appendChild(prompt);
        lineEl.appendChild(cmdText);
        lineEl.appendChild(cursor);
        terminalBox.appendChild(lineEl);
        
        // Typewriter effect for command
        let charIdx = 0;
        function typeChar() {
            cmdText.textContent += lineData.text[charIdx];
            charIdx++;
            if (charIdx < lineData.text.length) {
                setTimeout(typeChar, 40 + Math.random() * 60);
            } else {
                cursor.remove();
                termIdx++;
                setTimeout(printTerminalLine, 400);
            }
            terminalBox.scrollTop = terminalBox.scrollHeight;
        }
        typeChar();
    } else {
        const textSpan = document.createElement('span');
        textSpan.className = `t-${lineData.type}`;
        // support multiline text
        textSpan.innerHTML = lineData.text.replace(/\n/g, '<br>');
        lineEl.appendChild(textSpan);
        terminalBox.appendChild(lineEl);
        
        terminalBox.scrollTop = terminalBox.scrollHeight;
        termIdx++;
        
        if (termIdx >= terminalFlow.length) {
            termIdx = 0;
            setTimeout(printTerminalLine, 3000); // loop after 3 seconds
        } else {
            setTimeout(printTerminalLine, 100 + Math.random() * 300);
        }
    }
}

if (terminalBox) {
    const termObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if(termIdx === 0 && terminalBox.innerHTML === '') {
                    setTimeout(printTerminalLine, 500);
                }
            }
        });
    }, { threshold: 0.1 });
    termObserver.observe(terminalBox);
}



