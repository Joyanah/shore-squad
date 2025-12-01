/**
 * ShoreSquad - Interactive JavaScript Features
 * =============================================
 * 
 * This file contains all the interactive features for the ShoreSquad website,
 * focusing on performance, accessibility, and engaging user experience for
 * young eco-activists.
 * 
 * WEATHER INTEGRATION:
 * - Real-time Singapore NEA weather data from data.gov.sg
 * - 2-hour forecast for current conditions
 * - Air temperature from Pasir Ris/Changi stations
 * - 4-day extended forecast with cleanup suitability ratings
 * - Automatic 30-minute refresh intervals
 * - Graceful fallback for API unavailability
 * 
 * APIs Used:
 * - https://api.data.gov.sg/v1/environment/2-hour-weather-forecast
 * - https://api.data.gov.sg/v1/environment/air-temperature
 * - https://api.data.gov.sg/v1/environment/4-day-weather-forecast
 */

// ============================================
// Utility Functions
// ============================================

/**
 * Debounce function to optimize performance
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Smooth scroll to element with offset for fixed header
 */
function smoothScrollTo(target) {
  const element = document.querySelector(target);
  if (element) {
    const headerHeight = 70;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// ============================================
// Navigation & Mobile Menu
// ============================================

class Navigation {
  constructor() {
    this.navToggle = document.querySelector('.nav-toggle');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.header = document.querySelector('.header');
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.handleScrollEffect();
  }

  bindEvents() {
    // Mobile menu toggle
    if (this.navToggle) {
      this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
    }

    // Close mobile menu when clicking on links
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        if (link.getAttribute('href').startsWith('#')) {
          e.preventDefault();
          const target = link.getAttribute('href');
          smoothScrollTo(target);
          this.closeMobileMenu();
        }
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.navToggle.contains(e.target) && !this.navMenu.contains(e.target)) {
        this.closeMobileMenu();
      }
    });

    // Scroll effects
    window.addEventListener('scroll', debounce(() => this.handleScrollEffect(), 10));
  }

  toggleMobileMenu() {
    this.navMenu.classList.toggle('active');
    this.navToggle.classList.toggle('active');
    this.navToggle.setAttribute(
      'aria-expanded', 
      this.navMenu.classList.contains('active')
    );
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
  }

  closeMobileMenu() {
    this.navMenu.classList.remove('active');
    this.navToggle.classList.remove('active');
    this.navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  handleScrollEffect() {
    const scrollTop = window.pageYOffset;
    
    // Add shadow to header when scrolling
    if (scrollTop > 10) {
      this.header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
      this.header.style.backgroundColor = 'rgba(255,255,255,0.98)';
    } else {
      this.header.style.boxShadow = 'none';
      this.header.style.backgroundColor = 'rgba(255,255,255,0.95)';
    }
  }
}

// ============================================
// Animated Counters
// ============================================

class AnimatedCounters {
  constructor() {
    this.counters = document.querySelectorAll('.stat-number');
    this.hasAnimated = false;
    this.init();
  }

  init() {
    this.observeCounters();
  }

  observeCounters() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.animateCounters();
          this.hasAnimated = true;
        }
      });
    }, { threshold: 0.5 });

    this.counters.forEach(counter => {
      observer.observe(counter);
    });
  }

  animateCounters() {
    this.counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current).toLocaleString();
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString();
        }
      };

      updateCounter();
    });
  }
}

// ============================================
// Form Handling
// ============================================

class FormHandler {
  constructor() {
    this.signupForm = document.querySelector('.signup-form');
    this.emailInput = document.querySelector('#email');
    this.emailError = document.querySelector('#email-error');
    
    this.init();
  }

  init() {
    if (this.signupForm) {
      this.bindEvents();
    }
  }

  bindEvents() {
    this.signupForm.addEventListener('submit', (e) => this.handleSubmit(e));
    this.emailInput.addEventListener('blur', () => this.validateEmail());
    this.emailInput.addEventListener('input', () => this.clearError());
  }

  validateEmail() {
    const email = this.emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      this.showError('Email is required');
      return false;
    } else if (!emailRegex.test(email)) {
      this.showError('Please enter a valid email address');
      return false;
    } else {
      this.clearError();
      return true;
    }
  }

  showError(message) {
    this.emailError.textContent = message;
    this.emailInput.style.borderColor = 'var(--coral-accent)';
    this.emailError.setAttribute('aria-live', 'polite');
  }

  clearError() {
    this.emailError.textContent = '';
    this.emailInput.style.borderColor = 'var(--gray-300)';
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    if (!this.validateEmail()) {
      return;
    }

    const submitButton = this.signupForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Joining...';
    submitButton.disabled = true;

    try {
      // Simulate API call
      await this.simulateSignup();
      
      // Success state
      submitButton.innerHTML = '<i class="fas fa-check"></i> Welcome to the Squad!';
      submitButton.style.background = 'var(--seaweed-green)';
      
      // Reset form
      setTimeout(() => {
        this.signupForm.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        submitButton.style.background = 'var(--ocean-primary)';
        this.showSuccessMessage();
      }, 2000);
      
    } catch (error) {
      // Error state
      submitButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Try Again';
      submitButton.style.background = 'var(--coral-accent)';
      
      setTimeout(() => {
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        submitButton.style.background = 'var(--ocean-primary)';
      }, 2000);
    }
  }

  simulateSignup() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 90% success rate for demo
        if (Math.random() > 0.1) {
          resolve();
        } else {
          reject(new Error('Network error'));
        }
      }, 1500);
    });
  }

  showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-notification';
    message.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-check-circle"></i>
        <span>Thanks for joining! Welcome to ShoreSquad! 🌊</span>
        <button class="notification-close" aria-label="Close notification">&times;</button>
      </div>
    `;
    
    // Add styles
    message.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--seaweed-green);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      z-index: 1000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;

    document.body.appendChild(message);
    
    // Animate in
    setTimeout(() => {
      message.style.transform = 'translateX(0)';
    }, 100);

    // Close button
    const closeButton = message.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
      message.style.transform = 'translateX(100%)';
      setTimeout(() => message.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (document.body.contains(message)) {
        message.style.transform = 'translateX(100%)';
        setTimeout(() => message.remove(), 300);
      }
    }, 5000);
  }
}

// ============================================
// Interactive Features
// ============================================

class InteractiveFeatures {
  constructor() {
    this.init();
  }

  init() {
    this.addFeatureCardHover();
    this.addWeatherAnimation();
    this.addScrollAnimations();
    this.addKeyboardNavigation();
  }

  addFeatureCardHover() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });

      // Keyboard support
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.style.transform = 'translateY(-8px) scale(1.02)';
          setTimeout(() => {
            card.style.transform = 'translateY(0) scale(1)';
          }, 200);
        }
      });
    });
  }

  addWeatherAnimation() {
    const weatherIcon = document.querySelector('.weather-icon');
    if (weatherIcon) {
      // Change weather icon randomly every 10 seconds
      const weatherIcons = ['fa-sun', 'fa-cloud-sun', 'fa-cloud', 'fa-wind'];
      const weatherDescs = ['Perfect for cleanup!', 'Great conditions!', 'Still good to go!', 'Breezy but doable!'];
      let currentIndex = 0;

      setInterval(() => {
        currentIndex = (currentIndex + 1) % weatherIcons.length;
        weatherIcon.className = `fas ${weatherIcons[currentIndex]} weather-icon`;
        
        const weatherDesc = document.querySelector('.weather-desc');
        if (weatherDesc) {
          weatherDesc.textContent = weatherDescs[currentIndex];
        }
      }, 10000);
    }
  }

  addScrollAnimations() {
    const animateElements = document.querySelectorAll('.feature-card, .step, .stat-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
        }
      });
    }, { threshold: 0.1 });

    animateElements.forEach(el => {
      observer.observe(el);
    });
  }

  addKeyboardNavigation() {
    // Enhanced keyboard navigation for better accessibility
    document.addEventListener('keydown', (e) => {
      // ESC to close mobile menu
      if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && navMenu.classList.contains('active')) {
          const navigation = new Navigation();
          navigation.closeMobileMenu();
        }
      }

      // Quick navigation with Alt + number keys
      if (e.altKey && e.key >= '1' && e.key <= '4') {
        e.preventDefault();
        const sections = ['#features', '#how-it-works', '#community', '#join'];
        const index = parseInt(e.key) - 1;
        if (sections[index]) {
          smoothScrollTo(sections[index]);
        }
      }
    });
  }
}

// ============================================
// Performance Optimizations
// ============================================

class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.lazyLoadImages();
    this.preloadCriticalResources();
    this.optimizeScrollPerformance();
  }

  lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  preloadCriticalResources() {
    // Preload important fonts
    const fontLinks = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
      'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap'
    ];

    fontLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      document.head.appendChild(link);
    });
  }

  optimizeScrollPerformance() {
    // Use passive event listeners for better scroll performance
    let ticking = false;

    function updateScrollEffects() {
      // Parallax effect for hero section
      const hero = document.querySelector('.hero');
      if (hero && isInViewport(hero)) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
      }
      
      ticking = false;
    }

    function requestScrollUpdate() {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  }
}

// ============================================
// Accessibility Enhancements
// ============================================

class AccessibilityManager {
  constructor() {
    this.init();
  }

  init() {
    this.manageAnnouncements();
    this.enhanceKeyboardNavigation();
    this.addSkipLinks();
    this.manageReducedMotion();
  }

  manageAnnouncements() {
    // Create live region for dynamic content announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'live-region';
    document.body.appendChild(liveRegion);
  }

  enhanceKeyboardNavigation() {
    // Add visible focus indicators
    const focusableElements = document.querySelectorAll(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach(element => {
      element.addEventListener('focus', () => {
        element.style.outline = '2px solid var(--ocean-primary)';
        element.style.outlineOffset = '2px';
      });

      element.addEventListener('blur', () => {
        element.style.outline = '';
        element.style.outlineOffset = '';
      });
    });
  }

  addSkipLinks() {
    // Additional skip links for complex navigation
    const skipLinks = [
      { href: '#main-content', text: 'Skip to main content' },
      { href: '#features', text: 'Skip to features' },
      { href: '#contact', text: 'Skip to contact' }
    ];

    const skipContainer = document.createElement('div');
    skipContainer.className = 'skip-links';
    
    skipLinks.forEach(link => {
      const skipLink = document.createElement('a');
      skipLink.href = link.href;
      skipLink.textContent = link.text;
      skipLink.className = 'skip-link';
      skipContainer.appendChild(skipLink);
    });

    document.body.insertBefore(skipContainer, document.body.firstChild);
  }

  manageReducedMotion() {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    function handleReducedMotion() {
      if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--transition-fast', '0s');
        document.documentElement.style.setProperty('--transition-normal', '0s');
        document.documentElement.style.setProperty('--transition-slow', '0s');
        
        // Disable animations
        const animatedElements = document.querySelectorAll('[style*="animation"]');
        animatedElements.forEach(el => {
          el.style.animation = 'none';
        });
      }
    }

    handleReducedMotion();
    prefersReducedMotion.addListener(handleReducedMotion);
  }

  announceToScreenReader(message) {
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
      liveRegion.textContent = message;
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    }
  }
}

// ============================================
// Singapore Weather Service (NEA Data.gov.sg API)
// ============================================

class SingaporeWeatherService {
  constructor() {
    this.apiBase = 'https://api.data.gov.sg/v1';
    this.init();
  }

  init() {
    this.updateWeatherDisplay();
    // Update weather every 30 minutes
    setInterval(() => this.updateWeatherDisplay(), 30 * 60 * 1000);
  }

  async updateWeatherDisplay() {
    try {
      const weatherData = await this.getCurrentWeather();
      const forecastData = await this.getWeatherForecast();
      this.renderWeather(weatherData);
      this.renderForecast(forecastData);
    } catch (error) {
      console.warn('Weather service unavailable:', error);
      this.renderFallbackWeather();
    }
  }

  async getCurrentWeather() {
    try {
      // Get current weather conditions
      const response = await fetch(`${this.apiBase}/environment/2-hour-weather-forecast`);
      if (!response.ok) throw new Error('Weather API unavailable');
      
      const data = await response.json();
      const currentTime = new Date().toISOString();
      
      // Find the most recent forecast
      const latestForecast = data.items.find(item => item.timestamp <= currentTime) || data.items[0];
      
      // Get Pasir Ris area forecast (East region)
      const pasirRisForecast = latestForecast.forecasts.find(
        forecast => forecast.area.toLowerCase().includes('pasir ris') || 
                   forecast.area.toLowerCase().includes('east')
      ) || latestForecast.forecasts[0];

      // Get temperature data
      const tempResponse = await fetch(`${this.apiBase}/environment/air-temperature`);
      let temperature = '28°C'; // Default Singapore temperature
      
      if (tempResponse.ok) {
        const tempData = await tempResponse.json();
        const latestTemp = tempData.items[0];
        const eastTemp = latestTemp.readings.find(reading => 
          reading.station_id === 'S07' || // Changi
          reading.station_id === 'S43'    // Pasir Ris
        );
        if (eastTemp) {
          temperature = `${Math.round(eastTemp.value)}°C`;
        }
      }

      return this.processWeatherData(pasirRisForecast.forecast, temperature);
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw error;
    }
  }

  async getWeatherForecast() {
    try {
      const response = await fetch(`${this.apiBase}/environment/4-day-weather-forecast`);
      if (!response.ok) throw new Error('Forecast API unavailable');
      
      const data = await response.json();
      const forecast = data.items[0].forecasts;
      
      return forecast.slice(0, 5).map(day => ({
        date: new Date(day.date).toLocaleDateString('en-SG', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        }),
        weather: day.forecast,
        tempHigh: `${day.temperature.high}°C`,
        tempLow: `${day.temperature.low}°C`,
        humidity: `${day.relative_humidity.high}%`,
        wind: day.wind ? `${day.wind.speed.high} km/h` : 'Light',
        icon: this.getWeatherIcon(day.forecast),
        cleanupSuitability: this.getCleanupSuitability(day.forecast, day.temperature.high, day.relative_humidity.high)
      }));
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
      return [];
    }
  }

  processWeatherData(forecast, temperature) {
    const icon = this.getWeatherIcon(forecast);
    const desc = this.getCleanupRecommendation(forecast);
    
    return {
      temp: temperature,
      icon: icon,
      desc: desc,
      condition: forecast.toLowerCase().replace(/\s+/g, '-')
    };
  }

  getWeatherIcon(forecast) {
    const weatherLower = forecast.toLowerCase();
    
    if (weatherLower.includes('thundery') || weatherLower.includes('thunder')) {
      return 'fa-bolt';
    } else if (weatherLower.includes('heavy rain') || weatherLower.includes('heavy shower')) {
      return 'fa-cloud-rain';
    } else if (weatherLower.includes('rain') || weatherLower.includes('shower')) {
      return 'fa-cloud-drizzle';
    } else if (weatherLower.includes('cloudy')) {
      return 'fa-cloud';
    } else if (weatherLower.includes('partly cloudy') || weatherLower.includes('fair')) {
      return 'fa-cloud-sun';
    } else if (weatherLower.includes('hazy') || weatherLower.includes('mist')) {
      return 'fa-smog';
    } else {
      return 'fa-sun';
    }
  }

  getCleanupRecommendation(forecast) {
    const weatherLower = forecast.toLowerCase();
    
    if (weatherLower.includes('thundery') || weatherLower.includes('heavy rain')) {
      return 'Not ideal for cleanup';
    } else if (weatherLower.includes('rain') || weatherLower.includes('shower')) {
      return 'Consider postponing';
    } else if (weatherLower.includes('fair') || weatherLower.includes('sunny')) {
      return 'Perfect for cleanup!';
    } else if (weatherLower.includes('partly cloudy')) {
      return 'Great conditions!';
    } else if (weatherLower.includes('cloudy')) {
      return 'Good for cleanup!';
    } else if (weatherLower.includes('hazy')) {
      return 'Okay, but stay hydrated';
    } else {
      return 'Check conditions!';
    }
  }

  getCleanupSuitability(forecast, tempHigh, humidity) {
    const weatherLower = forecast.toLowerCase();
    const score = this.calculateSuitabilityScore(weatherLower, tempHigh, humidity);
    
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    if (score >= 4) return 'Fair';
    return 'Poor';
  }

  calculateSuitabilityScore(weather, temp, humidity) {
    let score = 5; // Base score
    
    // Weather conditions
    if (weather.includes('fair') || weather.includes('sunny')) score += 3;
    else if (weather.includes('partly cloudy')) score += 2;
    else if (weather.includes('cloudy')) score += 1;
    else if (weather.includes('rain') || weather.includes('shower')) score -= 3;
    else if (weather.includes('thundery')) score -= 5;
    
    // Temperature (ideal range 24-32°C)
    if (temp >= 24 && temp <= 32) score += 1;
    else if (temp > 32) score -= 1;
    
    // Humidity (lower is better for outdoor activities)
    if (humidity < 70) score += 1;
    else if (humidity > 85) score -= 1;
    
    return Math.max(0, Math.min(10, score));
  }

  renderWeather(data) {
    const weatherTemp = document.querySelector('.weather-temp');
    const weatherIcon = document.querySelector('.weather-icon');
    const weatherDesc = document.querySelector('.weather-desc');

    if (weatherTemp) weatherTemp.textContent = data.temp;
    if (weatherIcon) {
      weatherIcon.className = `fas ${data.icon} weather-icon`;
    }
    if (weatherDesc) weatherDesc.textContent = data.desc;
  }

  renderForecast(forecastData) {
    // Create forecast display if it doesn't exist
    let forecastContainer = document.querySelector('.weather-forecast');
    if (!forecastContainer && forecastData.length > 0) {
      forecastContainer = this.createForecastContainer();
    }

    if (forecastContainer && forecastData.length > 0) {
      const forecastHTML = forecastData.map(day => `
        <div class="forecast-day">
          <div class="forecast-date">${day.date}</div>
          <div class="forecast-icon">
            <i class="fas ${day.icon}"></i>
          </div>
          <div class="forecast-temps">
            <span class="temp-high">${day.tempHigh}</span>
            <span class="temp-low">${day.tempLow}</span>
          </div>
          <div class="forecast-weather">${day.weather}</div>
          <div class="cleanup-rating ${day.cleanupSuitability.toLowerCase()}">
            ${day.cleanupSuitability}
          </div>
        </div>
      `).join('');
      
      forecastContainer.innerHTML = `
        <h3>5-Day Beach Cleanup Forecast</h3>
        <div class="forecast-grid">
          ${forecastHTML}
        </div>
      `;
    }
  }

  createForecastContainer() {
    const weatherWidget = document.querySelector('.weather-widget');
    if (weatherWidget) {
      const forecastContainer = document.createElement('div');
      forecastContainer.className = 'weather-forecast';
      weatherWidget.appendChild(forecastContainer);
      return forecastContainer;
    }
    return null;
  }

  renderFallbackWeather() {
    this.renderWeather({
      temp: '28°C',
      icon: 'fa-sun',
      desc: 'Check local weather!'
    });
  }
}

// ============================================
// Main Application
// ============================================

class ShoreSquadApp {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
    } else {
      this.initializeComponents();
    }
  }

  initializeComponents() {
    try {
      // Initialize all components
      this.navigation = new Navigation();
      this.counters = new AnimatedCounters();
      this.formHandler = new FormHandler();
      this.interactiveFeatures = new InteractiveFeatures();
      this.performanceOptimizer = new PerformanceOptimizer();
      this.accessibilityManager = new AccessibilityManager();
      this.weatherService = new SingaporeWeatherService();      // Add hero button interactions
      this.initHeroButtons();
      this.initCleanupButtons();
      
      console.log('🌊 ShoreSquad app initialized successfully!');
    } catch (error) {
      console.error('Error initializing ShoreSquad app:', error);
    }
  }

  initHeroButtons() {
    const getStartedBtn = document.getElementById('get-started-btn');
    const watchDemoBtn = document.getElementById('watch-demo-btn');

    if (getStartedBtn) {
      getStartedBtn.addEventListener('click', () => {
        smoothScrollTo('#join');
        this.accessibilityManager.announceToScreenReader('Navigated to signup section');
      });
    }

    if (watchDemoBtn) {
      watchDemoBtn.addEventListener('click', () => {
        // In a real app, this would open a video modal
        alert('🎬 Demo video coming soon! For now, scroll down to explore our features.');
      });
    }
  }
}

// ============================================
// Initialize Application
// ============================================

// Create global app instance
window.ShoreSquadApp = new ShoreSquadApp();

// Add some fun easter eggs for developers
console.log(`
🌊 Welcome to ShoreSquad! 🌊
Thanks for checking out our code.
Ready to make some waves for the environment?

Features included:
✅ Responsive design
✅ Accessibility optimized
✅ Performance optimized
✅ Mobile-first approach
✅ Modern JavaScript (ES6+)
✅ Progressive enhancement

Built with 💚 for the planet!
`);

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ShoreSquadApp };
}
