// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to specific sections
function scrollToDownload() {
    const downloadSection = document.querySelector('#download');
    if (downloadSection) {
        downloadSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function scrollToFeatures() {
    const featuresSection = document.querySelector('#features');
    if (featuresSection) {
        featuresSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Handle download buttons
function handleDownload(platform) {
    // Create a modal or notification
    showDownloadModal(platform);
}

function showDownloadModal(platform) {
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'download-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Download R3Hudson Executor</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="download-info">
                    <i class="fab fa-${platform === 'windows' ? 'windows' : 'android'}"></i>
                    <h4>${platform === 'windows' ? 'Windows' : 'Android'} Version</h4>
                    <p>Version: ${platform === 'windows' ? 'v2.4.1' : 'v1.8.3'}</p>
                    <p>Size: ${platform === 'windows' ? '45.2 MB' : '28.7 MB'}</p>
                </div>
                <div class="modal-actions">
                    <button class="btn-primary" onclick="startDownload('${platform}')">
                        <i class="fas fa-download"></i> Start Download
                    </button>
                    <button class="btn-secondary" onclick="closeModal()">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .download-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease;
        }

        .modal-content {
            background: var(--light-bg);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            max-width: 400px;
            width: 90%;
            overflow: hidden;
            animation: slideUp 0.3s ease;
        }

        .modal-header {
            background: var(--dark-bg);
            padding: 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--border-color);
        }

        .modal-header h3 {
            color: var(--text-primary);
            margin: 0;
        }

        .modal-close {
            background: none;
            border: none;
            color: var(--text-secondary);
            font-size: 1.5rem;
            cursor: pointer;
            transition: color 0.3s ease;
        }

        .modal-close:hover {
            color: var(--error-color);
        }

        .modal-body {
            padding: 2rem;
        }

        .download-info {
            text-align: center;
            margin-bottom: 2rem;
        }

        .download-info i {
            font-size: 3rem;
            color: var(--primary-color);
            margin-bottom: 1rem;
        }

        .download-info h4 {
            color: var(--text-primary);
            margin-bottom: 0.5rem;
        }

        .download-info p {
            color: var(--text-secondary);
            margin: 0.25rem 0;
        }

        .modal-actions {
            display: flex;
            gap: 1rem;
        }

        .modal-actions button {
            flex: 1;
            padding: 0.75rem;
            border: none;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes slideUp {
            from { 
                transform: translateY(20px);
                opacity: 0;
            }
            to { 
                transform: translateY(0);
                opacity: 1;
            }
        }
    `;

    // Add styles to head if not already added
    if (!document.querySelector('style[data-modal-styles]')) {
        style.setAttribute('data-modal-styles', 'true');
        document.head.appendChild(style);
    }

    // Add modal to body
    document.body.appendChild(modal);

    // Add event listeners
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.querySelector('.download-modal');
    if (modal) {
        modal.remove();
    }
}

function startDownload(platform) {
    // Simulate download start
    closeModal();
    showNotification(`Download started for ${platform === 'windows' ? 'Windows' : 'Android'} version!`);
    
    // In a real application, you would initiate the actual download here
    console.log(`Starting download for ${platform}...`);
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;

    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--success-color);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            z-index: 3000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        }

        .notification i {
            font-size: 1.2rem;
        }

        @keyframes slideInRight {
            from { 
                transform: translateX(100%);
                opacity: 0;
            }
            to { 
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;

    // Add styles to head if not already added
    if (!document.querySelector('style[data-notification-styles]')) {
        style.setAttribute('data-notification-styles', 'true');
        document.head.appendChild(style);
    }

    // Add notification to body
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Terminal typing animation
function typeTerminalText() {
    const terminalLines = document.querySelectorAll('.terminal-line');
    terminalLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '0';
            line.style.transform = 'translateX(-20px)';
            line.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateX(0)';
            }, 100);
        }, index * 800);
    });
}

// Initialize terminal animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeTerminalText, 1000);
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}, observerOptions);

// Observe feature cards and other elements
document.addEventListener('DOMContentLoaded', () => {
    const featureCards = document.querySelectorAll('.feature-card');
    const stats = document.querySelectorAll('.stat');
    
    featureCards.forEach(card => observer.observe(card));
    stats.forEach(stat => observer.observe(stat));
});

// Add hover effect to download buttons
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Easter egg: Konami code
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    showNotification('🎉 Easter egg activated! You found the secret!');
    document.body.style.animation = 'rainbow 2s ease';
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 2000);
    
    // Add rainbow animation
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);
}
