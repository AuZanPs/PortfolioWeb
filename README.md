# Portfolio Website

A modern, minimalistic portfolio website built with React, TypeScript, and Tailwind CSS. This portfolio showcases professional experience, projects, skills, and provides an integrated contact form powered by EmailJS.

## 🎨 Design Philosophy

The website features a clean, minimalistic design with a sophisticated navy blue color palette:
- Primary: `#070F2B`
- Secondary: `#1B1A55`
- Tertiary: `#535C91`
- Quaternary: `#9290C3`

## ✨ Features

- **Fully Responsive Design** - Optimized for all devices from mobile (320px) to desktop (1920px+)
- **Modern UI/UX** - Clean, minimalistic interface with smooth animations and transitions
- **Performance Optimized** - Lazy loading of sections for optimal performance
- **Accessibility Compliant** - WCAG-compliant with proper ARIA labels and semantic HTML
- **Contact Form** - Integrated EmailJS for seamless email communication with environment variable configuration
- **Smooth Navigation** - CSS-based smooth scrolling between sections with fixed navigation bar
- **Project Showcase** - Dedicated section highlighting key projects with live demos and GitHub links
- **Skills Display** - Interactive skills section with categorized technologies and Database icon for State Management
- **Professional Experience** - Detailed work experience with key contributions
- **Downloadable Resume** - One-click resume download functionality
- **Mobile-First Approach** - All sections optimized for touch interactions and small screens

## 🛠️ Technologies Used

### Core
- **React 19** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework

### Libraries & Tools
- **Lucide React** - Beautiful, consistent icon set
- **EmailJS** - Email service integration for contact form
- **ESLint** - Code linting and quality assurance

### Performance Features
- Lazy loading of sections
- Optimized bundle size
- GPU-accelerated animations
- Efficient re-rendering with React memoization

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 18.0 or higher)
- **npm** (version 9.0 or higher) or **yarn**

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/AuZanPs/PortfolioWeb.git
cd PortfolioWeb
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory and configure your EmailJS credentials:

```bash
cp .env.example .env
```

Then edit the `.env` file with your EmailJS credentials:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

**How to get EmailJS credentials:**
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a new email service
3. Create an email template
4. Copy your Service ID, Template ID, and Public Key
5. Paste them into your `.env` file

### 4. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### 5. Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### 6. Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
webPorto/
├── public/                          # Static assets
│   └── Auzan Putra Siregar Resume 2025.pdf
├── src/
│   ├── components/                  # Reusable components
│   │   ├── Footer.tsx              # Footer with social links
│   │   └── Navbar.tsx              # Navigation bar
│   ├── sections/                    # Page sections
│   │   ├── AboutSection.tsx        # About me section
│   │   ├── ContactSection.tsx      # Contact form
│   │   ├── ExperienceSection.tsx   # Work experience
│   │   ├── HeroSection.tsx         # Landing section
│   │   ├── ProjectsSection.tsx     # Projects showcase
│   │   └── SkillsSection.tsx       # Skills & technologies
│   ├── utils/                       # Utility functions
│   │   └── performance.ts          # Performance monitoring hooks
│   ├── App.tsx                      # Main app component
│   ├── index.css                    # Global styles & Tailwind
│   ├── main.tsx                     # App entry point
│   └── vite-env.d.ts               # Vite type definitions
├── .env                             # Environment variables (not in git)
├── .env.example                     # Environment variables template
├── .gitignore                       # Git ignore rules
├── eslint.config.js                 # ESLint configuration
├── index.html                       # HTML entry point
├── package.json                     # Dependencies & scripts
├── postcss.config.js                # PostCSS configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
├── tsconfig.app.json                # TypeScript app configuration
├── tsconfig.node.json               # TypeScript node configuration
└── vite.config.ts                   # Vite configuration
```

## 🎯 Recent Updates

### Latest Improvements (2025)
- ✅ **Updated Project Links**: All project URLs updated to reflect current deployments
  - FitMatch: [https://fitmatch-project-silk.vercel.app/](https://fitmatch-project-silk.vercel.app/)
  - Recipe Discovery: [https://auzanps.github.io/recipe-discovery-app-98-/](https://auzanps.github.io/recipe-discovery-app-98-/)
  - Vue Weather Terminal: [https://auzanps.github.io/vue-weather-project/](https://auzanps.github.io/vue-weather-project/)
- ✅ **Enhanced Mobile Responsiveness**: Comprehensive mobile optimization across all sections
  - Hero section with responsive text sizing and full-width buttons on mobile
  - Skills section with wrapping category buttons and optimized card layouts
  - Projects section with stacked buttons and proper spacing on small screens
  - Experience section with responsive contribution cards
  - Contact section with mobile-optimized form and information cards
  - Footer with responsive grid layout and properly sized social icons
- ✅ **State Management Icon Update**: Changed from generic Code icon to Database icon for better representation
- ✅ **Simplified Navigation**: Removed custom smooth scroll handler in favor of CSS-based scrolling
- ✅ **Environment Variables**: Secure EmailJS configuration using environment variables
- ✅ **Code Cleanup**: Removed unused Three.js components, performance monitoring code, and CSS classes

### Mobile Responsiveness Highlights
- **Touch-Friendly**: All interactive elements meet minimum 44x44px touch target size
- **Readable Text**: Font sizes scale appropriately from 320px to 1920px+ screens
- **Proper Stacking**: All grid layouts stack correctly on mobile devices
- **No Overflow**: Careful padding and margin adjustments prevent horizontal scrolling
- **Optimized Icons**: Icons scale responsively across different screen sizes

## 📧 Contact

**Muhammad Auzan Putra Siregar**
- Email: [mauzanps@gmail.com](mailto:mauzanps@gmail.com)
- GitHub: [@AuZanPs](https://github.com/AuZanPs)
- LinkedIn: [Auzan Putra Siregar](https://www.linkedin.com/in/auzan-putra-siregar/)
- Portfolio: [Live Demo](https://portfolio-web-auzan.vercel.app/)

## 📄 License

This project is open source and available for personal and educational use.
