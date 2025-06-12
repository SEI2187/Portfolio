document.addEventListener('DOMContentLoaded', function() {
    // Terminal typing animation with click interaction
    const commands = [
        "whoami",
        "neofetch",
        "cat about.md",
        "npm start",
        "git push origin main"
    ];
    
    const responses = [
        "SEI2187 - Web Developer & Blahaj Enthusiast :3",
        "sei2187@nimburu.com<br>-------------<br>OS: EndeavourOS Linux x86_64<br>Kernel: 6.9.3-arch1-1<br>Uptime: 2 days, 5 hours, 13 mins<br>Packages: 2187 (pacman)<br>Shell: zsh 5.9<br>Resolution: 2560x1440<br>DE: Hyprland<br>WM: Hyprland<br>Terminal: Alacritty<br>CPU: AMD Ryzen 7 5800HS (16) @ 3.200GHz<br>GPU: NVIDIA RTX 3060<br>Memory: 6140MiB / 40960MiB",
        "# About Me<br><br>haiii :3 im SEI2187 im a random programmer and blahaj enthusiast<br><br>i love making pretty websites with cool animations and working with TypeScript and CSS!<br><br>when im not coding you can find me cuddling with my blahaj or exploring new tech~",
        "> starting development server...<br>> compiled successfully!<br><br>You can now view the application in the browser.<br><br>  Local:            http://localhost:3000<br>  On Your Network:  http://192.168.1.5:3000<br><br>yay! it works :3",
        "Enumerating objects: 12, done.<br>Counting objects: 100% (12/12), done.<br>Delta compression using up to 8 threads<br>Compressing objects: 100% (8/8), done.<br>Writing objects: 100% (8/8), 1.21 KiB | 1.21 MiB/s, done.<br>Total 8 (delta 4), reused 0 (delta 0), pack-reused 0<br>remote: Resolving deltas: 100% (4/4), completed with 4 local objects.<br>To github.com:sei2187/awesome-project.git<br>   e7d9abc..8e3e9f5  main -> main<br><br>pushed successfully~ uwu"
    ];
    
    const typingText = document.getElementById('typing-text');
    const terminalOutput = document.getElementById('terminal-output');
    const terminal = document.querySelector('.terminal');
    
    if (typingText && terminalOutput && terminal) {
        let commandIndex = 0;
        let charIndex = 0;
        let isTyping = false;
        
        // Add click instruction text
        const clickInstruction = document.createElement('div');
        clickInstruction.className = 'click-instruction';
        clickInstruction.textContent = 'Click terminal to continue...';
        terminal.appendChild(clickInstruction);
        
        function typeCommand() {
            if (isTyping) return;
            
            isTyping = true;
            clickInstruction.style.opacity = '0';
            
            function typeNextChar() {
                if (charIndex < commands[commandIndex].length) {
                    typingText.textContent += commands[commandIndex].charAt(charIndex);
                    charIndex++;
                    setTimeout(typeNextChar, Math.random() * 100 + 50);
                } else {
                    setTimeout(showResponse, 500);
                }
            }
            
            typeNextChar();
        }
        
        function showResponse() {
            terminalOutput.innerHTML = `<div class="response">${responses[commandIndex]}</div>`;
            
            // Show click instruction after response is shown
            setTimeout(() => {
                isTyping = false;
                clickInstruction.style.opacity = '1';
            }, 1000);
        }
        
        function nextCommand() {
            if (isTyping) return;
            
            commandIndex = (commandIndex + 1) % commands.length;
            charIndex = 0;
            typingText.textContent = '';
            terminalOutput.innerHTML = '';
            typeCommand();
        }
        
        // Start the first command automatically
        setTimeout(typeCommand, 1000);
        
        // Add click event to terminal
        terminal.addEventListener('click', () => {
            if (!isTyping) {
                if (typingText.textContent.length > 0) {
                    nextCommand();
                } else {
                    typeCommand();
                }
            }
        });
    }
    
    // Add animation to program cards
    const programCards = document.querySelectorAll('.program-card');
    
    if (programCards.length > 0) {
        programCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fade-in');
        });
    }
    
    // Add hover effect to skills
    const skills = document.querySelectorAll('.skill');
    
    if (skills.length > 0) {
        const colors = [
            'var(--mauve)',
            'var(--blue)',
            'var(--sapphire)',
            'var(--lavender)',
            'var(--pink)'
        ];
        
        skills.forEach((skill, index) => {
            // Add a slight initial animation to draw attention
            skill.style.animationDelay = `${index * 0.1}s`;
            skill.classList.add('skill-pulse');
            
            skill.addEventListener('mouseenter', () => {
                skill.style.backgroundColor = colors[index % colors.length];
                skill.style.color = 'var(--crust)';
                skill.style.boxShadow = `0 5px 15px rgba(203, 166, 247, 0.6)`;
                skill.style.transform = 'translateY(-5px) scale(1.05)';
            });
            
            skill.addEventListener('mouseleave', () => {
                skill.style.backgroundColor = 'var(--surface0)';
                skill.style.color = 'var(--mauve)';
                skill.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
                skill.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // Add scroll reveal animation
    const revealElements = document.querySelectorAll('.about, .program-card');
    
    function checkScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on initial load
    
    // Add custom cursor trail effect
    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'cursor-trail';
    document.body.appendChild(cursorTrail);
    
    let trailDots = [];
    const trailDotsCount = 10;
    
    for (let i = 0; i < trailDotsCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'trail-dot';
        dot.style.width = `${6 - (i * 0.5)}px`;
        dot.style.height = `${6 - (i * 0.5)}px`;
        dot.style.backgroundColor = `hsl(${270 + i * 5}, 80%, 70%)`;
        dot.style.opacity = 1 - (i / trailDotsCount);
        cursorTrail.appendChild(dot);
        trailDots.push({ dot, x: 0, y: 0 });
    }
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateTrail() {
        trailDots.forEach((item, index) => {
            if (index === 0) {
                item.x = mouseX;
                item.y = mouseY;
            } else {
                item.x += (trailDots[index - 1].x - item.x) * 0.3;
                item.y += (trailDots[index - 1].y - item.y) * 0.3;
            }
            
            item.dot.style.transform = `translate(${item.x}px, ${item.y}px)`;
        });
        
        requestAnimationFrame(updateTrail);
    }
    
    updateTrail();
    
    // Add CSS for cursor trail
    const style = document.createElement('style');
    style.textContent = `
        .cursor-trail {
            position: fixed;
            top: 0;
            left: 0;
            pointer-events: none;
            z-index: 9999;
        }
        
        .trail-dot {
            position: absolute;
            border-radius: 50%;
            transform: translate(-50%, -50%);
        }
        
        .revealed {
            animation: reveal 0.8s ease forwards;
        }
        
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeIn 0.5s ease forwards;
        }
        
        @keyframes reveal {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeIn {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .skill-pulse {
            animation: skillPulse 2s infinite alternate;
        }
        
        @keyframes skillPulse {
            0% {
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            }
            100% {
                box-shadow: 0 4px 8px rgba(203, 166, 247, 0.3);
            }
        }
    `;
    
    document.head.appendChild(style);
    
    // Add image loading handler for avatar
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        const img = new Image();
        img.src = 'avatar.png';
        img.onload = () => {
            console.log('Avatar image loaded successfully');
        };
        img.onerror = () => {
            console.log('Failed to load avatar image');
            avatar.classList.add('error');
        };
    }
});