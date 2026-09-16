/**
 * Modern Interactive Script for Manoj Agrawal's Technical Profile
 * Handles: Theme toggle, sticky nav, mobile menu, scrollspy, smooth scrolling, back to top
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Dark / Light Mode)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check stored preference or OS preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  } else if (prefersDarkScheme.matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
  } else {
    // Default to dark for sleek 2026 tech portfolio
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      themeIcon.className = 'fa fa-moon-o';
      themeToggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
      themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
    } else {
      themeIcon.className = 'fa fa-sun-o';
      themeToggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
      themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  // 2. Sticky Navbar & Back-to-top scroll detection
  const siteHeader = document.querySelector('.site-header');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Header sticky shadow
    if (siteHeader) {
      if (scrollPos > 30) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollPos > 600) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 3. Mobile Navigation Menu
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const mobileIcon = mobileToggleBtn ? mobileToggleBtn.querySelector('i') : null;

  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggleBtn.setAttribute('aria-expanded', isOpen);
      if (mobileIcon) {
        mobileIcon.className = isOpen ? 'fa fa-times' : 'fa fa-bars';
      }
    });

    // Close when clicking nav links
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          mobileToggleBtn.setAttribute('aria-expanded', 'false');
          if (mobileIcon) mobileIcon.className = 'fa fa-bars';
        }
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && 
          !navMenu.contains(e.target) && 
          !mobileToggleBtn.contains(e.target)) {
        navMenu.classList.remove('open');
        mobileToggleBtn.setAttribute('aria-expanded', 'false');
        if (mobileIcon) mobileIcon.className = 'fa fa-bars';
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggleBtn.setAttribute('aria-expanded', 'false');
        if (mobileIcon) mobileIcon.className = 'fa fa-bars';
      }
    });
  }

  // 4. ScrollSpy Active Section Highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  function updateActiveSection() {
    let currentId = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveSection, { passive: true });
  updateActiveSection();

  // 5. Smooth Scroll for Internal Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 6. Interactive Node Highlights for AI Architecture Diagram
  const pipelineNodes = document.querySelectorAll('.pipeline-node');
  pipelineNodes.forEach((node, index) => {
    node.addEventListener('mouseenter', () => {
      node.style.borderColor = 'var(--accent-cyan)';
    });
    node.addEventListener('mouseleave', () => {
      if (!node.classList.contains('accent')) {
        node.style.borderColor = 'var(--bg-card-border)';
      }
    });
  });
});
