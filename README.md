# Teacher Management System

A comprehensive, modern teacher management system built with Next.js, TypeScript, and Tailwind CSS. This application provides a complete solution for educational institutions to manage teachers, meetings, leaves, and analytics with enterprise-grade authentication.

![Teacher Management System](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)
![Clerk Auth](https://img.shields.io/badge/Clerk-Authentication-purple?style=for-the-badge)

## ✨ Features

### 🎯 Core Management Features
- **Teacher Management** - Full CRUD operations for teacher profiles with search and filtering
- **Meeting Scheduling** - Comprehensive meeting management with HR and senior staff
- **Leave Management** - Leave request system with approval/rejection workflow
- **Dashboard & Analytics** - Real-time analytics with charts and performance metrics
- **Student Management** - Enhanced student tracking with grade distribution analytics

### 🔐 Authentication & Security
- **Clerk Integration** - Enterprise-grade authentication with social login
- **Protected Routes** - Secure access control for all application features
- **User Profiles** - Complete user account management with settings

### 🎨 Professional UI/UX
- **Classic Design** - Professional, timeless design with clean lines
- **Two-Color Scheme** - Consistent dark blue and burgundy (#B43F3F) palette
- **Mobile Responsive** - Perfect mobile experience with touch-friendly interactions
- **Accessibility** - WCAG compliant with proper ARIA labels and keyboard navigation
- **Smooth Animations** - Micro-interactions and transitions for enhanced UX
- **Accessibility** - WCAG compliant with proper ARIA labels and keyboard navigation

### 🛠️ Technical Features
- **TypeScript Integration** - Full type safety with comprehensive interfaces
- **Centralized State Management** - Context-based data management with real-time updates
- **localStorage Persistence** - Automatic data persistence with hydration-safe loading
- **Component Architecture** - Modular, reusable components with proper separation of concerns
- **Performance Optimized** - Fast loading with Next.js 15 optimizations and efficient re-renders
- **Scalable Structure** - Well-organized codebase with proper TypeScript interfaces

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd teacher-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```bash
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```
   
   Get your Clerk keys from [https://clerk.com](https://clerk.com) after creating an account.

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with Clerk provider
│   ├── page.tsx           # Protected home page
│   ├── sign-in/           # Authentication pages
│   └── sign-up/           # User registration
├── components/            # React components
│   ├── Dashboard.tsx      # Main dashboard component
│   ├── DashboardReports.tsx # Analytics and reports
│   ├── ManageTeachers.tsx # Teacher CRUD operations
│   ├── TeacherMeetings.tsx # Meeting management
│   ├── TeacherLeaves.tsx  # Leave management
│   ├── Settings.tsx       # User account settings
│   ├── Sidebar.tsx        # Navigation sidebar
│   └── MainLayout.tsx     # Main application layout
├── contexts/              # React contexts
│   └── DataContext.tsx    # Centralized state management
├── data/                  # Mock data and constants
│   └── allMockData.js     # Complete mock dataset
├── types/                 # TypeScript type definitions
│   ├── teacher.ts         # Teacher-related interfaces
│   └── common.ts          # Common type definitions
└── middleware.ts          # Clerk authentication middleware
```

## 🎨 Design System

### Color Palette
- **Primary**: Dark Blue (`slate-800`, `slate-900`)
- **Secondary**: Burgundy Red (`#B43F3F`)
- **Success**: Green (`green-500`)
- **Warning**: Orange (`orange-500`)
- **Error**: Red (`red-500`)
- **Neutral**: Gray shades for backgrounds and text

### Typography
- **Font Family**: Inter (primary), system fonts fallback
- **Headings**: Bold weights with proper hierarchy
- **Body**: Regular weight with optimal line height
- **Professional**: Clean, readable typography throughout

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Clean inputs with focus states
- **Charts**: Interactive visualizations with legends

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS for styling with custom configurations in `tailwind.config.ts`.

### TypeScript
Strict TypeScript configuration with comprehensive type checking enabled.

### ESLint
Code quality maintained with Next.js ESLint configuration.

## 📱 Responsive Design

- **Mobile**: Optimized for touch interactions and small screens
- **Tablet**: Balanced layout with collapsible navigation
- **Desktop**: Full-featured interface with multi-column layouts

## 🧪 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Code Quality
- **TypeScript**: Strict type checking
- **ESLint**: Code linting and formatting
- **Component Structure**: Modular and reusable components
- **Performance**: Optimized rendering and lazy loading

## 🚀 Live Deployment


#### **Netlify**
```bash
# Build settings
Build command: npm run build
Publish directory: out
```


```

### 🔐 Environment Variables Setup

**Required for all deployments:**

1. **Get Clerk Keys**
   - Visit [clerk.com](https://clerk.com)
   - Create an account and application
   - Copy your publishable and secret keys

2. **Set Environment Variables**
   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   CLERK_SECRET_KEY=sk_test_your_secret_key_here
   ```



### 📊 Performance Optimization

**The application is optimized for:**
- ⚡ **Fast Loading**: Next.js 15 optimizations
- 📱 **Mobile Performance**: Responsive design
- 🔄 **Efficient Updates**: Optimized re-renders
- 💾 **Smart Caching**: localStorage with SSR safety

Open a Pull Request



## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Netlify** - For the deployment platform and fonts
- **Architecture** - https://app.eraser.io/workspace/btCk6wKpEXng1eBr5AOF

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
