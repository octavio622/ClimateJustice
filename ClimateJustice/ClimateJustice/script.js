// Main application functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
    
    // Set up event listeners
    setupEventListeners();
    
    // Start animations
    startAnimations();
});

// Initialize the application
function initializeApp() {
    console.log('🌍 Aplicación educativa iniciada');
    
    // Show the intro section by default
    showSection('intro');
    
    // Initialize interactive elements
    initializeInteractiveElements();
}

// Set up event listeners
function setupEventListeners() {
    // Navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            showSection(section);
            updateActiveNavButton(this);
        });
    });
    
    // Climate cards interaction
    const climateCards = document.querySelectorAll('.climate-card');
    climateCards.forEach(card => {
        card.addEventListener('click', function() {
            showClimateInfo(this.getAttribute('data-topic'));
        });
    });
    
    // Group cards interaction
    const groupCards = document.querySelectorAll('.group-card');
    groupCards.forEach(card => {
        card.addEventListener('click', function() {
            expandGroupInfo(this);
        });
    });
    
    // Example cards interaction
    const exampleCards = document.querySelectorAll('.example-card');
    exampleCards.forEach(card => {
        card.addEventListener('click', function() {
            animateExample(this);
        });
    });
    
    // Answer buttons for interactive question
    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            handleAnswer(this);
        });
    });
    
    // Help action items
    const actionItems = document.querySelectorAll('.action-item');
    actionItems.forEach(item => {
        item.addEventListener('click', function() {
            celebrateAction(this);
        });
    });
}

// Show specific section
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Trigger section-specific animations
        triggerSectionAnimations(sectionId);
        
        // Update URL hash without scrolling
        history.replaceState(null, null, `#${sectionId}`);
    }
}

// Update active navigation button
function updateActiveNavButton(activeBtn) {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    activeBtn.classList.add('active');
}

// Show climate information with animation
function showClimateInfo(topic) {
    const messages = {
        temperature: '🌡️ ¡Exacto! La Tierra tiene fiebre y necesita que la cuidemos. Cuando hace mucho calor, las personas que no tienen aire acondicionado lo pasan muy mal.',
        weather: '🌦️ ¡Muy bien! El clima loco significa que a veces llueve muchísimo y se inundan las casas, y otras veces no llueve nada y las plantas se secan.',
        effects: '🌊 ¡Correcto! Cuando los hielos se derriten, el mar sube y las familias que viven cerca del agua tienen que mudarse a lugares más seguros.'
    };
    
    // Create and show popup message
    const popup = createPopup(messages[topic] || '¡Muy interesante!');
    document.body.appendChild(popup);
    
    // Remove popup after 4 seconds
    setTimeout(() => {
        popup.remove();
    }, 4000);
}

// Expand group information with animation
function expandGroupInfo(card) {
    // Add pulse animation
    card.style.animation = 'pulse 0.6s ease-in-out';
    
    // Create floating hearts effect
    createFloatingHearts(card);
    
    // Reset animation after completion
    setTimeout(() => {
        card.style.animation = '';
    }, 600);
}

// Animate example stories
function animateExample(card) {
    const character = card.querySelector('.character');
    const steps = card.querySelectorAll('.step');
    
    // Animate character
    character.style.animation = 'bounce 1s ease-in-out 3';
    
    // Animate story steps with delay
    steps.forEach((step, index) => {
        setTimeout(() => {
            step.style.background = 'hsl(52 100% 80%)'; // Light yellow
            step.style.transform = 'scale(1.05)';
            step.style.transition = 'all 0.3s ease';
            
            // Reset after animation
            setTimeout(() => {
                step.style.background = '';
                step.style.transform = '';
            }, 1000);
        }, index * 500);
    });
    
    // Reset character animation
    setTimeout(() => {
        character.style.animation = '';
    }, 3000);
}

// Handle quiz answers
function handleAnswer(button) {
    const isCorrect = button.getAttribute('data-correct') === 'true';
    const answerButtons = document.querySelectorAll('.answer-btn');
    const feedback = document.querySelector('.answer-feedback');
    
    // Disable all buttons
    answerButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.getAttribute('data-correct') === 'true') {
            btn.classList.add('correct');
        } else {
            btn.classList.add('incorrect');
        }
    });
    
    // Show feedback
    if (isCorrect) {
        feedback.innerHTML = '🎉 ¡Excelente! Tienes razón. Todas estas personas necesitan más ayuda cuando el clima cambia porque no tienen los recursos para protegerse fácilmente.';
        feedback.className = 'answer-feedback correct';
        createConfetti();
    } else {
        feedback.innerHTML = '🤔 ¡Casi! La respuesta correcta es que todos necesitan más ayuda cuando el clima cambia. ¡Sigue intentando!';
        feedback.className = 'answer-feedback incorrect';
    }
    
    feedback.style.display = 'block';
    
    // Reset after 5 seconds
    setTimeout(() => {
        answerButtons.forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('correct', 'incorrect');
        });
        feedback.style.display = 'none';
    }, 5000);
}

// Celebrate action items
function celebrateAction(item) {
    const originalBg = item.style.background;
    const icon = item.querySelector('.action-icon');
    
    // Animate the item
    item.style.background = 'hsl(120 70% 70%)'; // Light green
    item.style.color = 'white';
    item.style.transform = 'scale(1.1)';
    
    // Animate the icon
    if (icon) {
        icon.style.animation = 'spin 1s ease-in-out';
    }
    
    // Create success message
    const message = createFloatingMessage('¡Excelente idea! 🌟', item);
    
    // Reset after animation
    setTimeout(() => {
        item.style.background = originalBg;
        item.style.color = '';
        item.style.transform = '';
        if (icon) {
            icon.style.animation = '';
        }
        if (message) {
            message.remove();
        }
    }, 2000);
}

// Make commitment function
function makeCommitment() {
    const checkboxes = document.querySelectorAll('.commitment-option input[type="checkbox"]');
    const result = document.querySelector('.commitment-result');
    const selectedCommitments = [];
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const label = checkbox.parentElement.textContent.trim();
            selectedCommitments.push(label);
        }
    });
    
    if (selectedCommitments.length === 0) {
        result.innerHTML = '¡Elige al menos una promesa para ayudar a nuestro planeta! 🌍';
        result.style.background = 'hsl(25 100% 60%)'; // Orange
    } else {
        result.innerHTML = `
            <div style="font-size: 1.5rem; margin-bottom: 1rem;">¡Felicidades! 🎉</div>
            <div>Has prometido:</div>
            <ul style="margin: 1rem 0; text-align: left;">
                ${selectedCommitments.map(commitment => `<li>• ${commitment}</li>`).join('')}
            </ul>
            <div style="font-size: 1.2rem;">¡Eres un verdadero héroe del planeta! 🦸‍♀️🦸‍♂️</div>
        `;
        result.style.background = 'hsl(120 70% 55%)'; // Green
        
        // Create celebration effects
        createConfetti();
        createFloatingHearts(result);
    }
    
    result.style.display = 'block';
    result.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Initialize interactive elements
function initializeInteractiveElements() {
    // Add hover sound effects (visual feedback)
    const interactiveElements = document.querySelectorAll('.nav-btn, .info-card, .cta-btn, .group-card, .example-card, .action-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
}

// Trigger section-specific animations
function triggerSectionAnimations(sectionId) {
    switch(sectionId) {
        case 'intro':
            animateEarth();
            break;
        case 'climate':
            animateThermometer();
            animateWeatherIcons();
            break;
        case 'affected':
            animateGroupCards();
            break;
        case 'examples':
            // Examples animate on click
            break;
        case 'help':
            animateActionItems();
            break;
        case 'elnino':
            animateElNinoElements();
            break;
        case 'credits':
            animateCreditsElements();
            break;
    }
}

// Start continuous animations
function startAnimations() {
    // Floating clouds animation
    const clouds = document.querySelector('.clouds');
    if (clouds) {
        setInterval(() => {
            clouds.style.animation = 'none';
            setTimeout(() => {
                clouds.style.animation = 'float 4s ease-in-out infinite';
            }, 10);
        }, 8000);
    }
}

// Animation functions
function animateEarth() {
    const earth = document.querySelector('.earth');
    if (earth) {
        earth.style.animation = 'spin 2s linear infinite';
    }
}

function animateThermometer() {
    const thermometerFill = document.querySelector('.thermometer-fill');
    if (thermometerFill) {
        thermometerFill.style.animation = 'thermometerFill 3s ease-in-out infinite';
    }
}

function animateWeatherIcons() {
    const weatherIcons = document.querySelectorAll('.weather-icon');
    weatherIcons.forEach((icon, index) => {
        icon.style.animation = `weatherCycle 3s ease-in-out infinite ${index}s`;
    });
}

function animateGroupCards() {
    const groupCards = document.querySelectorAll('.group-card');
    groupCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'fadeInUp 0.6s ease-out';
        }, index * 200);
    });
}

function animateActionItems() {
    const actionItems = document.querySelectorAll('.action-item');
    actionItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = 'fadeInUp 0.6s ease-out';
        }, index * 100);
    });
}

function animateElNinoElements() {
    const elninoCards = document.querySelectorAll('.elnino-card');
    const effectItems = document.querySelectorAll('.effect-item');
    
    // Animate info cards
    elninoCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'fadeInUp 0.6s ease-out';
        }, index * 200);
    });
    
    // Animate effect items with wave effect
    effectItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = 'fadeInUp 0.6s ease-out';
            item.style.background = 'hsl(52 100% 80%)'; // Light yellow highlight
            
            setTimeout(() => {
                item.style.background = '';
            }, 1000);
        }, index * 150);
    });
}

function animateCreditsElements() {
    const creditsCards = document.querySelectorAll('.credits-card');
    const creditsFooter = document.querySelector('.credits-footer');
    
    // Animate credit cards with stagger
    creditsCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'fadeInUp 0.8s ease-out';
            
            // Add celebration effect to each card
            setTimeout(() => {
                createFloatingHearts(card);
            }, 500);
        }, index * 300);
    });
    
    // Animate footer last
    if (creditsFooter) {
        setTimeout(() => {
            creditsFooter.style.animation = 'fadeInUp 0.8s ease-out';
            createConfetti();
        }, creditsCards.length * 300 + 500);
    }
}

// Utility functions for visual effects
function createPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'popup-message';
    popup.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: hsl(120 70% 55%);
            color: white;
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            z-index: 1000;
            text-align: center;
            max-width: 400px;
            font-size: 1.1rem;
            font-weight: 700;
            animation: fadeInUp 0.5s ease-out;
        ">
            ${message}
        </div>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 999;
        "></div>
    `;
    return popup;
}

function createFloatingMessage(message, targetElement) {
    const rect = targetElement.getBoundingClientRect();
    const floatingMsg = document.createElement('div');
    floatingMsg.innerHTML = message;
    floatingMsg.style.cssText = `
        position: fixed;
        top: ${rect.top - 40}px;
        left: ${rect.left + rect.width/2}px;
        transform: translateX(-50%);
        background: hsl(120 70% 55%);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 1rem;
        font-weight: 700;
        z-index: 1000;
        pointer-events: none;
        animation: floatUp 2s ease-out forwards;
    `;
    
    document.body.appendChild(floatingMsg);
    return floatingMsg;
}

function createFloatingHearts(targetElement) {
    const hearts = ['💚', '💛', '💙', '🧡', '💜'];
    const rect = targetElement.getBoundingClientRect();
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: fixed;
                top: ${rect.top + rect.height/2}px;
                left: ${rect.left + Math.random() * rect.width}px;
                font-size: 1.5rem;
                pointer-events: none;
                z-index: 1000;
                animation: floatUp 2s ease-out forwards;
            `;
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 2000);
        }, i * 200);
    }
}

function createConfetti() {
    const confettiColors = ['🎉', '🎊', '✨', '🌟', '💫'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.innerHTML = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            confetti.style.cssText = `
                position: fixed;
                top: -20px;
                left: ${Math.random() * 100}vw;
                font-size: 2rem;
                pointer-events: none;
                z-index: 1000;
                animation: confettiFall 3s linear forwards;
            `;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }, i * 100);
    }
}

// Add custom CSS animations for effects
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateX(-50%) translateY(-60px);
        }
    }
    
    @keyframes confettiFall {
        0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Handle browser back/forward navigation
window.addEventListener('popstate', function() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        showSection(hash);
    } else {
        showSection('intro');
    }
});

// Initialize section from URL hash
window.addEventListener('load', function() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        showSection(hash);
        const navBtn = document.querySelector(`[data-section="${hash}"]`);
        if (navBtn) {
            updateActiveNavButton(navBtn);
        }
    }
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    const sections = ['intro', 'climate', 'affected', 'examples', 'help'];
    const currentSection = document.querySelector('.section.active').id;
    const currentIndex = sections.indexOf(currentSection);
    
    if (e.key === 'ArrowRight' && currentIndex < sections.length - 1) {
        const nextSection = sections[currentIndex + 1];
        showSection(nextSection);
        const navBtn = document.querySelector(`[data-section="${nextSection}"]`);
        if (navBtn) {
            updateActiveNavButton(navBtn);
        }
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        const prevSection = sections[currentIndex - 1];
        showSection(prevSection);
        const navBtn = document.querySelector(`[data-section="${prevSection}"]`);
        if (navBtn) {
            updateActiveNavButton(navBtn);
        }
    }
});

// Accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels to interactive elements
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', btn.classList.contains('active'));
    });
    
    // Add focus management
    const focusableElements = document.querySelectorAll('button, [role="tab"], .info-card, .group-card, .example-card');
    focusableElements.forEach(element => {
        element.setAttribute('tabindex', '0');
    });
});

console.log('🌍 Aplicación educativa sobre cambio climático cargada completamente');
