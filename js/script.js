

document.addEventListener('DOMContentLoaded', function() {
    // ========== Initialize EmailJS ==========
    emailjs.init('YOUR_EMAILJS_USER_ID'); // Ganti dengan User ID Anda
    
    
    // Rotating text animation
class TxtRotate {
  constructor(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  }
  
  tick() {
    const i = this.loopNum % this.toRotate.length;
    const fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    let delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(() => this.tick(), delta);
  }
}

// Initialize rotating text
window.onload = function() {
  const elements = document.getElementsByClassName('txt-rotate');
  for (let i = 0; i < elements.length; i++) {
    const toRotate = elements[i].getAttribute('data-rotate');
    const period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  
  // Add animation class to hero text
  const heroText = document.querySelector('.hero-text');
  heroText.classList.add('animate');
};

    
    // ========== Mobile NavigatiquerySelector('.)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        navItems.forEach((item, index) => {
            if (item.style.animation) {
                item.style.animation = '';
            } else {
                const animationName = document.body.classList.contains('dark-mode') 
                    ? 'darkNavLinkFade' 
                    : 'navLinkFade';
                item.style.animation = `${animationName} 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            navItems.forEach(item => {
                item.style.animation = '';
            });
        });
    });
    
    // ========== Sticky Header ==========
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        header.classList.toggle('scrolled', window.scrollY > 100);
    });
    
    // ========== Back to Top Button ==========
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        backToTopBtn.classList.toggle('active', window.scrollY > 300);
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ========== Smooth Scrolling ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== Portfolio Filter ==========
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.classList.add('animate__animated', 'animate__fadeIn');
                } else {
                    item.style.display = 'none';
                    item.classList.remove('animate__animated', 'animate__fadeIn');
                }
            });
        });
    });

    // ========== initialize email js ================
    emailjs.init('HW0Gy4NcM-BFghtXs'); 
    // ========== Contact Form with EmailJS ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value || 'No Subject',
                message: document.getElementById('message').value
            };
            
            if (!formData.name || !formData.email || !formData.message) {
                alert('Please fill in all required fields');
                return;
            }
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.classList.add('btn-loading');
            
            try {
                const response = await emailjs.send(
                    'service_t32glqm',  // Ganti dengan Service ID
                    'template_9l9fayl', // Ganti dengan Template ID
                    formData
                );
                
                if (response.status === 200) {
                    alert('Thank you! Your message has been sent successfully.');
                    contactForm.reset();
                }
            } catch (error) {
                console.error('Email Error:', {
                    status: error.status,
                    text: error.text,
                    fullError: error
                });
                alert(`Error: ${error.text || 'Failed to send message'}`);
            } finally {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('btn-loading');
            }
        });
    }
    
    // ========== Animate Elements on Scroll ==========
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .about-content, .contact-content');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    };
    
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
       
    // ========== Dark/Light Mode Toggle ==========
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        
        const hamburgerLines = document.querySelectorAll('.hamburger .line');
        hamburgerLines.forEach(line => {
            line.style.backgroundColor = isDarkMode ? '#f8fafc' : '';
        });
        
        this.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
    
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        const hamburgerLines = document.querySelectorAll('.hamburger .line');
        hamburgerLines.forEach(line => {
            line.style.backgroundColor = '#f8fafc';
        });
    }
    
    // ========== Dynamic CSS ==========
    const style = document.createElement('style');
    style.textContent = `
        @keyframes navLinkFade {
            from { opacity: 0; transform: translateX(50px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes darkNavLinkFade {
            from { opacity: 0; transform: translateX(50px); color: #f8fafc; }
            to { opacity: 1; transform: translateX(0); color: #f8fafc; }
        }
        
        .theme-toggle {
            position: fixed;
            bottom: 30px;
            left: 30px;
            width: 50px;
            height: 50px;
            background-color: var(--primary-color);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            z-index: 999;
            transition: all 0.3s ease;
        }
        
        .theme-toggle:hover { transform: scale(1.1); }
        
        /* Dark Mode Styles */
        .dark-mode { background-color: #0f172a; color: #f8fafc; }
        .dark-mode .hero { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%) !important; }
        .dark-mode .hero-text h1,
        .dark-mode .hero-text h3,
        .dark-mode .hero-text p { color: #f8fafc !important; }
        .dark-mode .hero-text h4 { color: var(--primary-color) !important; }
        .dark-mode .social-icons a { background-color: #1e293b; color: #f8fafc; }
        .dark-mode .social-icons a:hover { background-color: var(--primary-color); color: white; }
        .dark-mode header { background-color: rgba(15, 23, 42, 0.95) !important; }
        .dark-mode .logo a { color: #f8fafc !important; }
        .dark-mode .hamburger .line { background-color: #f8fafc !important; }
        .dark-mode .nav-links { background-color: #1e293b !important; }
        .dark-mode .nav-links a { color: #f8fafc !important; }
        .dark-mode .nav-links a:hover { color: var(--primary-color) !important; }
        .dark-mode .nav-links a::after { background-color: var(--primary-color) !important; }
        .dark-mode .service-card,
        .dark-mode .portfolio-item { background-color: #1e293b; color: #f8fafc; }
        .dark-mode .form-group input,
        .dark-mode .form-group textarea { background-color: #1e293b; border-color: #334155; color: #f8fafc; }
        
        /* Loading Button */
        .btn-loading { position: relative; pointer-events: none; }
        .btn-loading::after {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            top: 50%;
            left: 50%;
            margin: -10px 0 0 -10px;
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        
        /* Typing Animation */
        .typed-text { color: var(--primary-color); }
        .cursor {
            display: inline-block;
            width: 3px;
            background-color: var(--primary-color);
            margin-left: 4px;
            animation: blink 1s infinite;
        }
        .cursor.typing { animation: none; }
        @keyframes blink {
            0%, 49% { background-color: var(--primary-color); }
            50%, 99% { background-color: transparent; }
            100% { background-color: var(--primary-color); }
        }
    `;
    document.head.appendChild(style);
});