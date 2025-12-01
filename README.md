# 🌊 ShoreSquad

**Rally your crew, track weather, and hit the next beach cleanup with our dope map app!**

ShoreSquad creates value by mobilizing young people to clean beaches, using weather and maps for easy planning and social features to make eco-action fun and connected.

![ShoreSquad Hero](https://img.shields.io/badge/Status-Active-brightgreen) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

- **🌤️ Smart Weather Tracking**: Real-time Singapore NEA weather data with 5-day forecasts and cleanup suitability ratings
- **🗺️ Interactive Maps**: Discover cleanup hotspots and navigate to beaches that need you most  
- **👥 Squad Goals**: Rally friends, track group progress, and celebrate eco-wins together
- **📱 Mobile-First**: Optimized for on-the-go beach cleanup coordination
- **♿ Accessible**: Full keyboard navigation and screen reader support
- **🎨 Modern Design**: Ocean-inspired color palette with smooth animations

## 🌦️ Live Weather Integration

### Singapore NEA Weather API
ShoreSquad features real-time weather data from Singapore's National Environment Agency (NEA) via data.gov.sg:

- **Current Conditions**: 2-hour weather forecast specifically for Pasir Ris Beach area
- **Live Temperature**: Real-time air temperature from Pasir Ris and Changi weather stations
- **5-Day Forecast**: Extended weather outlook with detailed daily conditions
- **Smart Recommendations**: AI-powered cleanup suitability ratings based on weather, temperature, and humidity
- **Auto-Updates**: Weather data refreshes every 30 minutes for accuracy

### Weather Features
- 🌡️ **Real-time Temperature**: Live readings in Celsius from Singapore weather stations
- 🌤️ **Dynamic Icons**: Weather icons automatically update based on current conditions
- 📊 **Cleanup Ratings**: Excellent/Good/Fair/Poor suitability for outdoor beach activities
- 📅 **Extended Forecast**: 5-day outlook for planning upcoming cleanup events
- 🎯 **Location-Specific**: Weather data focused on Pasir Ris Beach cleanup location
- 💧 **Humidity Tracking**: Relative humidity data for comfort planning
- 💨 **Wind Information**: Wind speed data for safety considerations

### API Data Sources
- **2-Hour Weather Forecast**: `https://api.data.gov.sg/v1/environment/2-hour-weather-forecast`
- **Air Temperature**: `https://api.data.gov.sg/v1/environment/air-temperature`
- **4-Day Forecast**: `https://api.data.gov.sg/v1/environment/4-day-weather-forecast`

### Intelligent Cleanup Recommendations
The weather system provides smart recommendations by analyzing:
- **Weather Conditions**: Sunny, cloudy, rainy, thundery conditions
- **Temperature Range**: Optimal range of 24-32°C for outdoor activities
- **Humidity Levels**: Lower humidity preferred for comfort during physical activity
- **Safety Factors**: Automatic warnings for severe weather conditions

### Fallback System
- Graceful degradation when API is unavailable
- Shows general Singapore weather conditions as backup
- Maintains user experience continuity

## 🎨 Design System

### Color Palette
Our ocean-inspired color palette creates an engaging, environmentally-focused aesthetic:

- **Ocean Deep**: `#0c4a6e` - Primary dark blue
- **Ocean Primary**: `#0284c7` - Main brand color  
- **Ocean Light**: `#38bdf8` - Accent blue
- **Ocean Foam**: `#e0f2fe` - Light backgrounds
- **Sand Warm**: `#fbbf24` - Call-to-action highlights
- **Coral Accent**: `#f97316` - Warning states
- **Seaweed Green**: `#059669` - Success states

### Typography
- **Primary**: Inter - Clean, readable font for body text and UI
- **Headings**: Poppins - Friendly, modern font for headings and brand elements

## 🚀 JavaScript Features

### Interactive Components
- **Responsive Navigation**: Mobile-friendly hamburger menu with smooth transitions
- **Animated Counters**: Intersection Observer-based number animations for community stats
- **Form Validation**: Real-time email validation with accessibility announcements
- **Weather Widget**: Singapore NEA weather integration with real-time data and 5-day forecasts
- **Scroll Animations**: Smooth reveal animations for sections and cards

### Performance Optimizations
- **Debounced Scroll Events**: Optimized scroll performance
- **Intersection Observers**: Efficient viewport detection for animations
- **Lazy Loading**: Image lazy loading for faster initial page load
- **Preloading**: Critical resource preloading for fonts and assets

### Accessibility Features
- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **Screen Reader Support**: ARIA labels, live regions, and semantic markup
- **Reduced Motion**: Respects `prefers-reduced-motion` user preferences
- **Skip Links**: Quick navigation for assistive technologies

## 🎯 UX Design Principles

### Usability
1. **Mobile-First Approach**: Designed primarily for mobile devices where users coordinate cleanups
2. **Clear Visual Hierarchy**: Important information (weather, location) prominently displayed
3. **Intuitive Navigation**: Simple, predictable navigation patterns
4. **Fast Loading**: Optimized for quick access on beach locations with varying connectivity

### Accessibility
1. **WCAG 2.1 AA Compliance**: Meets accessibility standards
2. **Keyboard Navigation**: All interactive elements accessible via keyboard
3. **Color Contrast**: High contrast ratios for text readability
4. **Alternative Text**: Descriptive alt text for images and icons
5. **Focus Management**: Clear focus indicators and logical tab order

### Engagement
1. **Gamification Elements**: Progress tracking and community stats
2. **Social Features**: Squad formation and group coordination
3. **Visual Feedback**: Smooth animations and micro-interactions
4. **Motivational Copy**: Energetic, youth-focused messaging

## 🛠️ Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- [Live Server VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (recommended)

### Installation

1. **Clone or download** this repository
2. **Open in VS Code** (recommended for Live Server support)
3. **Start Live Server**: Right-click on `index.html` and select "Open with Live Server"
4. **View in browser**: Navigate to `http://localhost:3000` (or the port shown in VS Code)

### Alternative Setup
```bash
# If you have Python installed
python -m http.server 3000

# If you have Node.js installed  
npx serve .
```

### File Structure
```
shoresquad/
├── index.html              # Main HTML file with semantic structure
├── css/
│   └── styles.css          # Ocean-inspired CSS with custom properties
├── js/
│   └── app.js              # Interactive JavaScript features
├── .vscode/
│   └── settings.json       # Live Server configuration
├── .github/
│   └── copilot-instructions.md  # Development guidelines
└── README.md              # This file
```

## 🌐 Browser Support

- **Chrome** 90+ ✅
- **Firefox** 88+ ✅  
- **Safari** 14+ ✅
- **Edge** 90+ ✅
- **Mobile browsers** ✅

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

## ♿ Accessibility Features

- **Semantic HTML5**: Proper heading hierarchy and landmark regions
- **ARIA Labels**: Comprehensive labeling for assistive technologies
- **Keyboard Navigation**: Tab, Enter, and Escape key support
- **Focus Management**: Visible focus indicators and logical tab order
- **Screen Reader**: Live regions for dynamic content announcements
- **Color Contrast**: WCAG AA compliant color combinations
- **Motion Preferences**: Respects `prefers-reduced-motion` settings

## 🎮 Interactive Features

### Navigation
- Smooth scrolling to sections
- Mobile hamburger menu with animation
- Fixed header with scroll effects
- Quick keyboard shortcuts (Alt + 1-4 for sections)

### Forms
- Real-time email validation
- Accessible error messaging
- Loading states with visual feedback
- Success notifications

### Animations
- Intersection Observer-based reveals
- Floating weather widget
- Counter animations for stats
- Hover effects on interactive elements

## 🔧 Customization

### Colors
Modify the CSS custom properties in `styles.css`:
```css
:root {
  --ocean-primary: #0284c7;  /* Change main brand color */
  --sand-warm: #fbbf24;      /* Change accent color */
  /* ... other color variables */
}
```

### Content
- Update hero text in `index.html`
- Modify feature descriptions and stats
- Replace placeholder social links in footer

### Functionality
- Weather data automatically pulls from Singapore NEA APIs
- Implement map functionality  
- Connect form to email service

## 🌍 Environmental Impact

This project promotes environmental awareness by:
- Making beach cleanups more accessible and fun
- Building community around environmental action
- Providing tools for effective cleanup coordination
- Inspiring young people to take environmental action

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for:
- Code style standards
- Accessibility requirements  
- Testing procedures
- Pull request process

## 📞 Contact

- **Project**: ShoreSquad Beach Cleanup Coordinator
- **Purpose**: Making environmental action accessible and fun for young people
- **Tech Stack**: HTML5, CSS3, Vanilla JavaScript
- **Focus**: Accessibility, Performance, Mobile-First Design

---

**Ready to make waves for a cleaner planet? 🌊**

*Built with 💚 for the environment and ♿ for everyone.*
