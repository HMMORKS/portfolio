document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Profile image upload functionality
    const profileImage = document.getElementById('profileImage');
    const imagePlaceholder = document.getElementById('imagePlaceholder');
    const imageUpload = document.getElementById('imageUpload');
    const profileImageContainer = document.querySelector('.profile-image-container');

    // Click to upload image
    profileImageContainer.addEventListener('click', () => {
        imageUpload.click();
    });

    // Handle image upload
    imageUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profileImage.src = e.target.result;
                profileImage.style.display = 'block';
                imagePlaceholder.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    });

    // Smooth scrolling for any internal links (if added later)
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

    // Add loading animation for tabs
    function showLoadingAnimation(tabId) {
        const tabContent = document.getElementById(tabId);
        tabContent.style.opacity = '0.5';
        setTimeout(() => {
            tabContent.style.opacity = '1';
        }, 200);
    }

    // Enhanced tab switching with loading effect
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            showLoadingAnimation(targetTab);
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe skill items for animation
    document.querySelectorAll('.skill-item, .project-item, .certification-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Add hover effects for interactive elements
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Dynamic typing effect for the main title (optional enhancement)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Add click ripple effect to buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    // Add ripple effect CSS
    const style = document.createElement('style');
    style.textContent = `
        .tab-btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Add ripple effect to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Progressive enhancement for contact links
    document.querySelectorAll('.contact-item').forEach(item => {
        const span = item.querySelector('span');
        const text = span.textContent;
        
        // Make email clickable
        if (text.includes('@')) {
            span.innerHTML = `<a href="mailto:${text}" style="color: inherit; text-decoration: none;">${text}</a>`;
        }
        // Make LinkedIn clickable
        else if (text.includes('linkedin.com')) {
            span.innerHTML = `<a href="https://${text}" target="_blank" style="color: inherit; text-decoration: none;">${text}</a>`;
        }
        // Make GitHub clickable
        else if (text.includes('github.com')) {
            span.innerHTML = `<a href="https://${text}" target="_blank" style="color: inherit; text-decoration: none;">${text}</a>`;
        }
    });

    // Add keyboard navigation for tabs
    document.addEventListener('keydown', (event) => {
        if (event.key >= '1' && event.key <= '5') {
            const tabIndex = parseInt(event.key) - 1;
            const tabButton = tabButtons[tabIndex];
            if (tabButton) {
                tabButton.click();
            }
        }
    });

    // Add print styles
    const printStyle = document.createElement('style');
    printStyle.textContent = `
        @media print {
            .tab-navigation { display: none; }
            .tab-content { display: block !important; page-break-before: always; }
            .tab-content:first-child { page-break-before: avoid; }
            body { background: white !important; color: black !important; }
            .container { box-shadow: none !important; }
        }
    `;
    document.head.appendChild(printStyle);

    console.log('Portfolio website loaded successfully!');
    console.log('Keyboard shortcuts: Press 1-5 to navigate between tabs');
});