// Executor Modal Functions
function openExecutor() {
    const modal = document.getElementById('executorModal');
    modal.style.display = 'block';
    addConsoleMessage('R3Hudson Executor opened', 'info');
    addConsoleMessage('Ready to execute scripts', 'success');
}

function closeExecutor() {
    const modal = document.getElementById('executorModal');
    modal.style.display = 'none';
}

function minimizeExecutor() {
    const window = document.querySelector('.executor-window');
    window.classList.toggle('minimized');
}

function maximizeExecutor() {
    const window = document.querySelector('.executor-window');
    window.classList.toggle('maximized');
}

function switchTab(tab) {
    // Remove active class from all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked tab
    event.target.classList.add('active');
    
    addConsoleMessage(`Switched to ${tab} tab`, 'info');
}

// Predefined scripts
const scripts = {
    fe_kill_all: `-- FE Kill All Script
local Players = game:GetService("Players")
for _, player in pairs(Players:GetPlayers()) do
    if player ~= Players.LocalPlayer then
        local character = player.Character
        if character and character:FindFirstChild("Humanoid") then
            character.Humanoid.Health = 0
        end
    end
end
print("FE Kill All executed!")`,
    
    fly: `-- Fly Script
local player = game.Players.LocalPlayer
local mouse = player:GetMouse()
local character = player.Character or player.CharacterAdded:Wait()

local flySpeed = 50
local flying = false
local flyPart = Instance.new("Part")
flyPart.Name = "FlyPart"
flyPart.Anchored = true
flyPart.CanCollide = false
flyPart.Size = Vector3.new(1, 1, 1)
flyPart.Parent = workspace

mouse.KeyDown:Connect(function(key)
    if key == "f" then
        flying = not flying
        if flying then
            print("Fly enabled!")
        else
            print("Fly disabled!")
        end
    end
end)

game:GetService("RunService").Heartbeat:Connect(function()
    if flying then
        local cam = workspace.CurrentCamera
        flyPart.Position = character.Head.Position
        character.Humanoid:ChangeState("Freefall")
        character:MoveTo(cam.CFrame.Position + cam.CFrame.LookVector * flySpeed * 0.1)
    end
end)`,
    
    esp: `-- ESP Script
local players = game:GetService("Players")
local localPlayer = players.LocalPlayer

local function createESP(player)
    local character = player.Character
    if not character then return end
    
    local highlight = Instance.new("Highlight")
    highlight.FillColor = Color3.new(1, 0, 0)
    highlight.FillTransparency = 0.5
    highlight.OutlineColor = Color3.new(1, 1, 1)
    highlight.Adornee = character
    highlight.Parent = character
    
    local nameTag = Instance.new("BillboardGui")
    nameTag.Name = "ESP_Name"
    nameTag.Size = UDim2.new(0, 100, 0, 50)
    nameTag.StudsOffset = Vector3.new(0, 3, 0)
    nameTag.Parent = character.Head
    
    local nameLabel = Instance.new("TextLabel")
    nameLabel.Size = UDim2.new(1, 0, 1, 0)
    nameLabel.BackgroundTransparency = 1
    nameLabel.Text = player.Name
    nameLabel.TextColor3 = Color3.new(1, 1, 1)
    nameLabel.TextStrokeTransparency = 0
    nameLabel.Font = Enum.Font.SourceSansBold
    nameLabel.TextSize = 14
    nameLabel.Parent = nameTag
end

for _, player in pairs(players:GetPlayers()) do
    if player ~= localPlayer then
        createESP(player)
    end
end

players.PlayerAdded:Connect(function(player)
    if player ~= localPlayer then
        createESP(player)
    end
end)

print("ESP enabled!")`,
    
    speed: `-- Speed Script
local player = game.Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()
local humanoid = character:WaitForChild("Humanoid")

humanoid.WalkSpeed = 50
humanoid.JumpPower = 100

print("Speed boost enabled!")`,
    
    teleport: `-- Teleport Script
local player = game.Players.LocalPlayer
local mouse = player:GetMouse()
local character = player.Character or player.CharacterAdded:Wait()

mouse.KeyDown:Connect(function(key)
    if key == "t" then
        local targetPos = mouse.Hit.Position
        character:MoveTo(targetPos)
        print("Teleported to cursor position!")
    end
end)

print("Teleport script loaded! Press T to teleport to cursor position.")`
};

function loadScript(scriptName) {
    const scriptInput = document.getElementById('scriptInput');
    if (scripts[scriptName]) {
        scriptInput.value = scripts[scriptName];
        addConsoleMessage(`Loaded script: ${scriptName}`, 'success');
    } else {
        addConsoleMessage(`Script not found: ${scriptName}`, 'error');
    }
}

function executeScript() {
    const scriptInput = document.getElementById('scriptInput');
    const script = scriptInput.value.trim();
    
    if (!script) {
        addConsoleMessage('No script to execute!', 'error');
        return;
    }
    
    // Simulate script execution
    addConsoleMessage('Executing script...', 'info');
    
    setTimeout(() => {
        addConsoleMessage('Script executed successfully!', 'success');
        
        // Parse script for simulated output
        if (script.includes('print(')) {
            const printMatches = script.match(/print\("([^"]+)"\)/g);
            if (printMatches) {
                printMatches.forEach(match => {
                    const message = match.match(/print\("([^"]+)"\)/)[1];
                    addConsoleMessage(`[OUTPUT] ${message}`, 'info');
                });
            }
        }
        
        // Simulate different script types
        if (script.includes('Kill All')) {
            addConsoleMessage('Eliminated all players', 'success');
        } else if (script.includes('Fly')) {
            addConsoleMessage('Fly mode activated', 'success');
        } else if (script.includes('ESP')) {
            addConsoleMessage('ESP enabled for all players', 'success');
        } else if (script.includes('Speed')) {
            addConsoleMessage('Speed boost activated', 'success');
        } else if (script.includes('Teleport')) {
            addConsoleMessage('Teleport script loaded', 'success');
        }
    }, 1000);
}

function injectScript() {
    addConsoleMessage('Injecting into Roblox process...', 'warning');
    
    setTimeout(() => {
        addConsoleMessage('Roblox process found', 'success');
        addConsoleMessage('Injecting DLL...', 'info');
        
        setTimeout(() => {
            addConsoleMessage('Injection successful!', 'success');
            document.querySelector('.injection-status').textContent = 'Injected';
            document.querySelector('.injection-status').style.color = 'var(--success-color)';
            addConsoleMessage('Ready to execute scripts', 'success');
        }, 1500);
    }, 1000);
}

function clearScript() {
    const scriptInput = document.getElementById('scriptInput');
    scriptInput.value = '';
    addConsoleMessage('Script editor cleared', 'info');
}

function saveScript() {
    const scriptInput = document.getElementById('scriptInput');
    const script = scriptInput.value.trim();
    
    if (!script) {
        addConsoleMessage('No script to save!', 'error');
        return;
    }
    
    // Simulate saving to local storage
    const scriptName = prompt('Enter script name:');
    if (scriptName) {
        localStorage.setItem(`script_${scriptName}`, script);
        addConsoleMessage(`Script "${scriptName}" saved successfully`, 'success');
    }
}

function clearOutput() {
    const outputConsole = document.getElementById('outputConsole');
    outputConsole.innerHTML = `
        <div class="console-line">
            <span class="console-timestamp">[${getCurrentTime()}]</span>
            <span class="console-info">Console cleared</span>
        </div>
    `;
}

function addConsoleMessage(message, type = 'info') {
    const outputConsole = document.getElementById('outputConsole');
    const timestamp = getCurrentTime();
    
    const messageClass = type === 'error' ? 'console-error' : 
                        type === 'success' ? 'console-success' : 
                        type === 'warning' ? 'console-warning' : 'console-info';
    
    const messageLine = document.createElement('div');
    messageLine.className = 'console-line';
    messageLine.innerHTML = `
        <span class="console-timestamp">[${timestamp}]</span>
        <span class="${messageClass}">${message}</span>
    `;
    
    outputConsole.appendChild(messageLine);
    outputConsole.scrollTop = outputConsole.scrollHeight;
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });
}

// Close executor when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('executorModal');
    const window = document.querySelector('.executor-window');
    
    if (modal.style.display === 'block' && 
        !window.contains(e.target) && 
        !e.target.closest('button[onclick="openExecutor()"]')) {
        // Don't close if clicking outside - this keeps it modal-like
    }
});

// Keyboard shortcuts for executor
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('executorModal');
    
    if (modal.style.display === 'block') {
        // Ctrl+Enter to execute
        if (e.ctrlKey && e.key === 'Enter') {
            executeScript();
        }
        // Escape to close
        else if (e.key === 'Escape') {
            closeExecutor();
        }
    }
});

// Subscribe Modal Functions
function openChannel(url) {
    window.open(url, '_blank');
}

function grantAccess() {
    const modal = document.getElementById('subscribeModal');
    const pageContent = document.getElementById('pageContent');
    const accessBtn = document.getElementById('accessBtn');
    
    // Clear any existing countdown
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    // Start 15 second countdown
    let timeLeft = 15;
    
    accessBtn.disabled = true;
    accessBtn.innerHTML = `<i class="fas fa-lock"></i> Processing...`;
    
    countdownInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
            accessBtn.innerHTML = `<i class="fas fa-lock"></i> Processing...`;
        } else {
            clearInterval(countdownInterval);
            
            // Hide modal with animation
            modal.style.animation = 'fadeOut 0.5s ease';
            
            setTimeout(() => {
                modal.style.display = 'none';
                pageContent.style.display = 'block';
                
                // Show success notification
                showNotification('Welcome to R3Hudson Executor!');
                
                // Store access in localStorage
                localStorage.setItem('r3hudson_access_granted', 'true');
            }, 500);
        }
    }, 1000);
}

let countdownInterval;

// Check if user already has access
function checkExistingAccess() {
    const accessGranted = localStorage.getItem('r3hudson_access_granted');
    if (accessGranted === 'true') {
        document.getElementById('subscribeModal').style.display = 'none';
        document.getElementById('pageContent').style.display = 'block';
    }
}

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
                    <i class="fab fa-apple"></i>
                    <h4>iOS Version</h4>
                    <p>Version: v3.0.1</p>
                    <p>Size: 52.8 MB</p>
                </div>
                <div class="modal-actions">
                    <button class="btn-primary" onclick="startDownload('${platform}')">
                        <i class="fas fa-download"></i> Start Download
                    </button>
                    <button id="accessBtn" class="btn-access" onclick="grantAccess()">
                        <i class="fas fa-lock"></i> Access Site
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
            transition: all 0.3s ease;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 300;
            line-height: 1;
        }

        .modal-close:hover {
            background: rgba(255, 255, 255, 0.1);
            color: var(--error-color);
            transform: rotate(90deg);
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
    const downloadModal = document.querySelector('.download-modal');
    const unavailableModal = document.querySelector('.unavailable-modal');
    
    if (downloadModal) {
        downloadModal.remove();
    }
    if (unavailableModal) {
        unavailableModal.remove();
    }
}

function startDownload(platform) {
    // Simulate download start
    closeModal();
    showNotification('Download started for iOS version!');
    
    // In a real application, you would initiate the actual download here
    console.log('Starting download for iOS...');
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

function showUnavailableNotice() {
    // Create unavailable notice modal
    const modal = document.createElement('div');
    modal.className = 'unavailable-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-exclamation-triangle"></i> Currently Unavailable</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>R3Hudson Executor is currently unavailable for download.</p>
                <p>We're working on updates and will be back soon!</p>
                <div class="alternative-options">
                    <h4>Alternative Executors:</h4>
                    <button class="btn-external" onclick="window.open('https://delta-roblox.com', '_blank'); closeModal();">
                        <i class="fas fa-external-link-alt"></i> Try Delta Executor
                    </button>
                    <button class="btn-external" onclick="window.open('https://codex.lol', '_blank'); closeModal();">
                        <i class="fas fa-external-link-alt"></i> Try Codex Executor
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .unavailable-modal {
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

        .unavailable-modal .modal-content {
            background: var(--light-bg);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            max-width: 400px;
            width: 90%;
            overflow: hidden;
            animation: slideUp 0.3s ease;
        }

        .unavailable-modal .modal-header {
            background: var(--warning-color);
            padding: 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: white;
        }

        .unavailable-modal .modal-header h3 {
            margin: 0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .unavailable-modal .modal-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            font-weight: 300;
            line-height: 1;
        }

        .unavailable-modal .modal-close:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: rotate(90deg);
        }

        .unavailable-modal .modal-body {
            padding: 2rem;
        }

        .unavailable-modal .modal-body p {
            color: var(--text-secondary);
            margin-bottom: 1rem;
        }

        .alternative-options {
            margin-top: 1.5rem;
        }

        .alternative-options h4 {
            color: var(--text-primary);
            margin-bottom: 1rem;
        }

        .alternative-options button {
            width: 100%;
            margin-bottom: 0.5rem;
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
    if (!document.querySelector('style[data-unavailable-styles]')) {
        style.setAttribute('data-unavailable-styles', 'true');
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

// Add hover effect to download buttons
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize subscribe modal check on page load
document.addEventListener('DOMContentLoaded', () => {
    checkExistingAccess();
    
    const featureCards = document.querySelectorAll('.feature-card');
    const stats = document.querySelectorAll('.stat');
    
    featureCards.forEach(card => observer.observe(card));
    stats.forEach(stat => observer.observe(stat));
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
