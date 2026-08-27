# Fitness Center Management System — Frontend

A modern, responsive, and production-ready frontend for a comprehensive Fitness Center Management System.

The application provides a centralized platform for managing members, memberships, payments, attendance, trainers, fitness classes, bookings, workouts, notifications, reports, and user access.

Built with a modern React ecosystem and designed to integrate with a Spring Boot REST API backend.

---

## 🚀 Features

### 🔐 Authentication & Authorization

- User registration and login
- JWT-based authentication
- Access token and refresh token handling
- Secure logout
- Persistent authentication state
- Automatic token refresh
- Protected routes
- Role-based access control
- Session expiration handling

### 📊 Dashboard

- Overview of fitness center activities
- Member statistics
- Membership statistics
- Payment summaries
- Attendance statistics
- Class and booking statistics
- Recent activities
- Quick actions
- Responsive dashboard layout

### 👥 User Management

- View users
- Create users
- Update users
- Delete users
- Search users
- Pagination
- Role management
- User status management

### 🧑‍🤝‍🧑 Member Management

- Member registration
- Member profiles
- Membership information
- Member status
- Search and filtering
- Member activity history

### 💳 Payment Management

- Payment records
- Payment history
- Payment status
- Payment details
- Payment summaries
- Transaction tracking

### 📅 Attendance Management

- Member check-in
- Member check-out
- Attendance history
- Attendance statistics
- Search and filtering

### 🏋️ Trainer Management

- Trainer profiles
- Trainer management
- Trainer availability
- Assigned classes
- Trainer information

### 🗓️ Class Management

- Create fitness classes
- Update classes
- Delete classes
- View class schedules
- Trainer assignment
- Class capacity management

### 🎟️ Class Booking

- Book fitness classes
- View bookings
- Cancel bookings
- Booking status
- Class availability

### 💪 Workout Management

- Workout plans
- Exercise information
- Workout tracking
- Member workout history

### 🔔 Notifications

- System notifications
- User notifications
- Notification status
- Read/unread management

### 📈 Reports

- Membership reports
- Payment reports
- Attendance reports
- Member statistics
- Business activity summaries

---

# 🛠️ Technology Stack

## Frontend

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Shadcn UI**
- **Lucide React**
- **Framer Motion**

## State & Data Management

- **Zustand**
- **TanStack Query**
- **Axios**

## Forms & Validation

- **React Hook Form**
- **Zod**
- **@hookform/resolvers**

## Routing

- **React Router**

## Notifications

- **Shadcn Sonner**

## Backend Integration

- Spring Boot REST API
- JWT Authentication
- RESTful API architecture
- JSON-based communication

---

# 🏗️ Architecture

The frontend follows a feature-based architecture designed for scalability and maintainability.

```text
src/
│
├── app/
│   ├── providers/
│   ├── routes/
│   └── config/
│
├── components/
│   ├── ui/
│   └── shared/
│
├── features/
│   ├── auth/
│   ├── dashboard/
│   ├── users/
│   ├── members/
│   ├── memberships/
│   ├── payments/
│   ├── attendance/
│   ├── trainers/
│   ├── classes/
│   ├── bookings/
│   ├── workouts/
│   ├── notifications/
│   └── reports/
│
├── hooks/
│
├── lib/
│   ├── api/
│   ├── auth/
│   └── utils/
│
├── stores/
│
├── types/
│
├── layouts/
│
├── pages/
│
└── main.tsx
Feature-Based Design

Each major business domain is isolated inside its own feature module.

For example:

features/
└── members/
    ├── components/
    ├── hooks/
    ├── services/
    ├── types/
    └── pages/

This makes the application easier to:

Maintain
Test
Scale
Debug
Extend
Refactor
🔗 Backend API

The frontend communicates with a Spring Boot backend through REST APIs.

Development API
http://localhost:8080/api/v1
Production

The production API URL should be configured through an environment variable.

VITE_API_BASE_URL=https://your-api-domain.com/api/v1

The frontend should never hard-code production API URLs directly into application code.

⚙️ Requirements

Before running the project, make sure you have:

Node.js 20+
npm 10+
Git
Running backend API

You can verify your installations:

node --version
npm --version
git --version
📦 Installation

Clone the repository:

git clone https://github.com/YOUR_USERNAME/fitness-management-system-frontend.git

Navigate into the project:

cd fitness-management-system-frontend

Install dependencies:

npm install
🔐 Environment Configuration

Create a .env file in the project root:

VITE_API_BASE_URL=http://localhost:8080/api/v1

For production, use your production API:

VITE_API_BASE_URL=https://api.yourdomain.com/api/v1
Environment File Example

Create:

.env.example

with:

VITE_API_BASE_URL=http://localhost:8080/api/v1

Never commit sensitive credentials or secrets to Git.

▶️ Development

Start the development server:

npm run dev

Vite will provide a local development URL, usually:

http://localhost:5173
🧪 Type Checking

Run TypeScript validation:

npx tsc -b

This checks the project for TypeScript errors without starting the application.

🔍 Linting

Run ESLint:

npm run lint

Fix automatically fixable issues:

npm run lint -- --fix
🏗️ Production Build

Before deploying, create a production build:

npm run build

The optimized production files will be generated in:

dist/

A successful build should complete without TypeScript or ESLint-related errors.

👀 Preview Production Build

After building the application:

npm run preview

This runs the generated production build locally so it can be tested before deployment.

📜 Available Scripts
Command	Description
npm run dev	Start development server
npm run build	Create production build
npm run preview	Preview production build
npm run lint	Run ESLint
npx tsc -b	Run TypeScript build/type checking
🔒 Security

The frontend follows several security practices:

JWT authentication
Protected routes
Role-based access control
Centralized Axios configuration
Automatic authentication handling
Environment-based configuration
No hard-coded credentials
No secrets committed to Git
Input validation using Zod
Form validation using React Hook Form

Frontend security does not replace backend authorization. All sensitive operations must also be validated by the Spring Boot backend.

👤 Supported Roles

The system supports role-based access for:

ADMIN
MANAGER
RECEPTIONIST
TRAINER
MEMBER

The UI and available functionality can be restricted according to the authenticated user's role.

🔄 Application Flow
User
 │
 ▼
React Frontend
 │
 ├── Authentication
 │      │
 │      ▼
 │   JWT Tokens
 │
 ├── Zustand
 │      │
 │      ▼
 │   Application State
 │
 ├── TanStack Query
 │      │
 │      ▼
 │   Server State
 │
 └── Axios
        │
        ▼
Spring Boot REST API
        │
        ▼
      MySQL
📁 Project Structure
fitness-management-frontend/
│
├── public/
│
├── src/
│   ├── app/
│   ├── components/
│   ├── features/
│   ├── hooks/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   ├── stores/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
│
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
🐳 Deployment

The frontend can be deployed to platforms such as:

Vercel
Netlify
Render
AWS
Azure
DigitalOcean
Nginx
Docker

For production deployment:

Configure the production API URL.
Install dependencies.
Run the production build.
Deploy the generated dist/ directory.
Configure SPA fallback routing.
Enable HTTPS.
Verify communication with the production backend.

Example:

npm install
npm run build

The resulting:

dist/

directory contains the production-ready frontend.

🌐 SPA Routing

Because the application uses client-side routing, the production server must redirect unknown application routes to:

/index.html

For example:

/dashboard
/members
/payments
/trainers
/classes

must be handled by the React application rather than returning a server 404.

🧹 Production Checklist

Before deploying:

 npm install completes successfully
 TypeScript compilation succeeds
 ESLint passes
 npm run build succeeds
 Production API URL is configured
 .env is not committed
 .env.example is committed
 Authentication works
 Refresh token flow works
 Protected routes work
 Role-based access works
 API error handling works
 Loading states work
 Empty states work
 Responsive layouts have been tested
 Production build has been previewed
 HTTPS is enabled in production
🧑‍💻 Development Workflow

Recommended workflow:

# Create a feature branch
git checkout -b feature/member-management

# Install dependencies
npm install

# Start development
npm run dev

# Check TypeScript
npx tsc -b

# Run linting
npm run lint

# Build production application
npm run build

# Preview production build
npm run preview

Commit changes using clear commit messages:

git add .
git commit -m "Add member management dashboard"
🤝 Contributing

Contributions are welcome.

Fork the repository.
Create a feature branch.
Make your changes.
Run type checking and linting.
Create a production build.
Commit your changes.
Push your branch.
Open a Pull Request.
📄 License

This project is currently developed as an academic and portfolio project.

If this project is released under a specific open-source license, update this section accordingly.

👨‍💻 Project

Fitness Center Management System

A full-stack fitness center management solution consisting of:

Frontend
React + TypeScript + Vite
        │
        │ REST API
        ▼
Backend
Spring Boot + Java
        │
        ▼
Database
MySQL
⭐ Project Goals

The system is designed to provide a centralized digital platform for fitness center operations, reducing manual processes and improving the management of:

Members
Memberships
Payments
Attendance
Trainers
Classes
Bookings
Workouts
Notifications
Reports
Users and roles

The frontend focuses on providing a fast, responsive, accessible, and maintainable user experience for administrators, managers, receptionists, trainers, and members.


### A couple of important changes I made

Your original README had the **default Vite documentation**, including links and explanations about Vite's example plugins. Those should be removed from your actual repository because they don't describe your application.

For your project, the README should communicate:

**What the system does → technology → architecture → features → setup → environment variables → API → development → testing → production build → deployment → security.**

Also, based on your current frontend setup, your most important commands before pushing to GitHub should be:

```powershell
npm install
npx tsc -b
npm run lint
npm run build
npm run previe
