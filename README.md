# 🚀 Aakash Verma's Personal Portfolio

A modern, interactive portfolio website showcasing real projects and professional experience of Aakash Verma, Software Engineer and AI/ML enthusiast from NIT Jalandhar. Built with React, Three.js, and cutting-edge web technologies.

## 👨‍💻 About Aakash Verma

**Software Development Intern** with experience at **Bluestock Fintech** and **Afame Technologies**  
**B.Tech Student** in Industrial and Production Engineering at **NIT Jalandhar**  
**Full-Stack Developer** specializing in Java Spring Boot, React.js, and AI/ML applications

### 🏆 Key Achievements:
- **95% Code Coverage** achieved in IPO web application
- **30% Increase** in system stability through bug resolution
- **35% User Engagement** boost via ML recommendation system
- **20% Performance Optimization** leading teams of 5+ engineers

## ✨ Features

- **Interactive 3D Models** - GLTF computer model with orbit controls and optimized rendering
- **Smooth Animations** - Framer Motion powered transitions and micro-interactions
- **Custom Mouse Effects** - Colorful trailing circles that follow cursor
- **Responsive Design** - Optimized for all devices and screen sizes
- **Contact Integration** - EmailJS powered contact form with validation
- **Modern UI/UX** - Tailwind CSS with custom gradients and glassmorphism
- **Theme Toggle** - Dark/Light mode switcher (Coming Soon)
- **Scroll Progress** - Visual progress indicator while scrolling
- **Experience Timeline** - Interactive vertical timeline for work history
- **Project Showcase** - Portfolio gallery with live demos and source links
- **Performance Optimized** - Lazy loading, code splitting, and WebGL optimization
- **Accessibility First** - WCAG 2.1 compliant with full keyboard navigation
- **Performance Monitor** - Real-time FPS, memory usage, and network stats
- **Error Boundaries** - Graceful fallbacks for 3D components
- **Tech Stack Visualization** - Interactive 3D tech balls with proficiency levels
- **Advanced Filtering** - Category-based technology filtering
- **WebGL Optimization** - Device-specific rendering optimizations
- **Screen Reader Support** - Full compatibility with assistive technologies

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Deployment**: Vercel

### ✅ New Features Added:
- **Advanced Tech Component** - Interactive 3D tech balls with proficiency indicators
- **Performance Monitoring** - Real-time FPS and memory usage tracking
- **Accessibility Suite** - Complete WCAG 2.1 compliance with keyboard navigation
- **Error Boundaries** - Graceful fallbacks for 3D components
- **WebGL Optimization** - Device-specific rendering optimizations
- **Enhanced Animations** - Smooth micro-interactions and loading states
- **Professional Tooltips** - Detailed tech information with progress bars
- **Category Filtering** - Frontend, Backend, and Tools categorization
- **Performance Metrics** - Battery level, network status, and load times
- **Print Optimization** - Professional print styles for resumes
- **Complete Experience Section** - Interactive timeline with work history
- **Projects Portfolio** - Showcase with live demos and GitHub links  
- **Enhanced Navigation** - All sections properly linked
- **Scroll Progress Indicator** - Visual feedback while browsing
- **Theme Toggle Button** - Modern UI enhancement
- **Improved Animations** - Better micro-interactions and transitions
- **Enhanced Hero Section** - Call-to-action buttons and better content
- **Code Organization** - Separated concerns and cleaner architecture

### 🚀 Recent Improvements:
- Fixed App.jsx structure by extracting mouse animation
- Added missing Experience and Projects sections
- Enhanced navigation with all portfolio sections
- Improved content structure and user experience
- Added performance optimizations and better CSS
- Enhanced Tailwind configuration with custom animations

### 🎯 Next Phase Upgrades:
- TypeScript migration for better type safety
- Advanced 3D scenes and interactions
- Blog section for sharing knowledge
- Admin dashboard for content management
- SEO optimization and meta tags
- Performance monitoring and analytics

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/personal-portfolio.git
   cd personal-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your EmailJS credentials:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

### 📁 Project Structure
```
src/
├── components/          # React components
│   ├── canvas/         # Three.js 3D components
│   ├── About.jsx       # About section
│   ├── Contact.jsx     # Contact form
│   ├── Experience.jsx  # Work experience timeline
│   ├── Hero.jsx        # Hero/landing section
│   ├── Navbar.jsx      # Navigation component
│   ├── Tech.jsx        # Technology stack
│   ├── Works.jsx       # Projects showcase
│   └── ...
├── assets/             # Images and static files
├── hoc/               # Higher-order components
├── utils/             # Utility functions
├── constants.js       # App constants and data
└── App.jsx           # Main application component
```

## 🌐 Live Demo

[Portfolio Website](http://crafted-canvas.vercel.app)

## 📧 Contact & Support

- **Email**: kumawataksh112@gmail.com
- **Portfolio**: [crafted-canvas.vercel.app](http://crafted-canvas.vercel.app)
- **GitHub**: [github.com/dvlaks](https://github.com/dvlaks)
- **Featured Project**: [Medical Dashboard](https://medical-dashboard-rho.vercel.app)
- **Total Projects**: 15+ Public Repositories
- **Domains**: Healthcare, Fintech, AI/ML, Data Science

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Three.js](https://threejs.org/) for 3D graphics
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber) for React integration
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [EmailJS](https://www.emailjs.com/) for contact form functionality

## 🛠️ Troubleshooting

### Common Issues

**1. Module Import Errors**
```bash
# If you see "does not provide an export named..." errors
# Make sure all assets are properly exported in src/assets/index.js
```

**2. 3D Model Loading Issues**
```bash
# Ensure GLTF files are in the public folder
# Check that the paths in components match the actual file locations
```

**3. Development Server Issues**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Or clear cache
npm run dev -- --force
```

**4. Build Errors**
```bash
# Update browserslist database
npx update-browserslist-db@latest

# Check for TypeScript errors (if using TS)
npm run build -- --mode development
```

### Performance Tips

- **3D Models**: Keep GLTF files under 5MB for better loading
- **Images**: Use WebP format when possible
- **Animations**: Reduce motion for users who prefer reduced motion
- **Mobile**: Test on various devices for responsive behavior

---

## 📞 Contact Aakash Verma

**Let's connect and build something amazing together!**

### 🌐 Professional Links
- 💼 **LinkedIn**: [Aakash Verma](https://www.linkedin.com/in/aakash-verma-669062269)
- 🐱 **GitHub**: [dvlaks](https://github.com/dvlaks)
- 📸 **Instagram**: [@a._a._k._a._s._h](https://www.instagram.com/a._a._k._a._s._h?igsh=MWVmbnV4YzVvaHE5Ng==)
- 🌍 **Portfolio**: [aakash-verma-portfolio.vercel.app](https://aakash-verma-portfolio.vercel.app)

### 💼 Professional Background
- 🎓 **B.Tech** in Industrial and Production Engineering, **NIT Jalandhar**
- 💻 **Software Development Intern** at **Bluestock Fintech**
- 🚀 **Full-Stack Developer** with expertise in React.js, Java Spring Boot, AI/ML
- 📊 **Experience** in fintech applications, data analysis, and machine learning

### 🛠️ Technical Expertise
- **Frontend**: React.js, Three.js, Tailwind CSS, TypeScript
- **Backend**: Java Spring Boot, Node.js, RESTful APIs
- **AI/ML**: Python, TensorFlow, Data Analysis, Recommendation Systems
- **Database**: MySQL, MongoDB, Database Optimization
- **DevOps**: Git, CI/CD, Docker, Deployment Automation

---

⭐ **Star this repo if you found it helpful!** ⭐
