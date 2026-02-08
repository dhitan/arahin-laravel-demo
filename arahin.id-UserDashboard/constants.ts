import { Course, Portfolio } from "./types";

export const COURSES: Course[] = [
  {
    id: "laravel-11",
    title: "Mastering Laravel 11: From Zero to Hero",
    instructor: "Ghufroon Academy",
    category: "Web Development",
    thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1000&auto=format&fit=crop",
    description: "Learn Laravel 11 from the ground up. This comprehensive course covers everything from installation to deployment, including Eloquent ORM, Blade templating, and API development. Perfect for beginners and intermediate developers looking to master the PHP framework.",
    modules: [
        {
            id: 1,
            title: "Introduction to Laravel",
            duration: "45 mins",
            isCompleted: false,
            lessons: [
                { id: 101, title: "Setting up Environment", duration: "15:00", type: "video" },
                { id: 102, title: "Directory Structure", duration: "10:00", type: "video" },
                { id: 103, title: "First Route & View", duration: "20:00", type: "video" }
            ]
        },
        {
            id: 2,
            title: "Database & Migrations",
            duration: "1h 20m",
            isCompleted: false,
             lessons: [
                { id: 201, title: "Database Configuration", duration: "10:00", type: "video" },
                { id: 202, title: "Creating Migrations", duration: "30:00", type: "video" },
                { id: 203, title: "Eloquent Models", duration: "40:00", type: "video" }
            ]
        }
    ]
  },
  {
    id: "fullstack-bootcamp",
    title: "Fullstack Web Developer Bootcamp 2026",
    instructor: "Udemy Pro",
    category: "Web Development",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop",
    description: "Become a fullstack developer with this intense bootcamp. We cover HTML, CSS, JavaScript, Node.js, Express, MongoDB, and React. Build real-world projects and get job-ready in 2026.",
    modules: [
        {
            id: 1,
            title: "Frontend Foundations",
            duration: "2h 30m",
            isCompleted: false,
            lessons: [
                { id: 101, title: "HTML5 Semantic Tags", duration: "45:00", type: "video" },
                { id: 102, title: "CSS Flexbox & Grid", duration: "1:00:00", type: "video" },
                { id: 103, title: "JavaScript ES6+", duration: "45:00", type: "video" }
            ]
        },
         {
            id: 2,
            title: "Backend Basics",
            duration: "3h",
            isCompleted: false,
            lessons: [
                { id: 201, title: "Node.js Runtime", duration: "50:00", type: "video" },
                { id: 202, title: "Express Server", duration: "1:10:00", type: "video" },
                { id: 203, title: "REST APIs", duration: "1:00:00", type: "video" }
            ]
        }
    ]
  },
  {
    id: "react-portfolio",
    title: "React JS & Tailwind CSS Portfolio Build",
    instructor: "Code with Me",
    category: "Web Development",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop",
    description: "Build a stunning developer portfolio using React 18 and Tailwind CSS. Learn about component design, responsive layouts, dark mode implementation, and deployment to Vercel.",
    modules: [
        {
            id: 1,
            title: "Project Setup",
            duration: "40 mins",
            isCompleted: false,
            lessons: [
                { id: 101, title: "Vite & Tailwind Setup", duration: "20:00", type: "video" },
                { id: 102, title: "Folder Structure", duration: "20:00", type: "video" }
            ]
        },
        {
            id: 2,
            title: "Building Components",
            duration: "1h 50m",
            isCompleted: false,
            lessons: [
                { id: 201, title: "Navbar & Hero Section", duration: "45:00", type: "video" },
                { id: 202, title: "Projects Grid", duration: "45:00", type: "video" },
                { id: 203, title: "Contact Form", duration: "20:00", type: "video" }
            ]
        }
    ]
  }
];

export const PORTFOLIOS: Portfolio[] = [
  {
    id: 1,
    student_id: 1,
    title: "E-Commerce Web Application",
    description: "A full-stack e-commerce solution built with Laravel and Vue.js.",
    file_path: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    category: "Web Development",
    status: "approved",
    created_at: "2026-01-15 10:30:00"
  },
  {
    id: 2,
    student_id: 1,
    title: "Mobile Banking UI Kit",
    description: "High fidelity UI design for a fintech mobile application.",
    file_path: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    category: "UI/UX",
    status: "pending",
    created_at: "2026-02-05 14:20:00"
  },
  {
    id: 3,
    student_id: 1,
    title: "Python Data Analysis Script",
    description: "Automated script for cleaning and analyzing sales data.",
    file_path: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    category: "Data Science",
    status: "declined",
    admin_feedback: "Please include a README file explaining how to run the script and sample output.",
    created_at: "2026-02-01 09:15:00"
  },
  {
    id: 4,
    student_id: 1,
    title: "Cyber Security Audit Report",
    description: "Vulnerability assessment report for a local business.",
    file_path: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    category: "Cyber Security",
    status: "approved",
    created_at: "2025-12-10 11:00:00"
  },
  {
    id: 5,
    student_id: 1,
    title: "Digital Marketing Campaign",
    description: "Social media strategy and analytics for Q1 2026.",
    file_path: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    category: "Digital Marketing",
    status: "pending",
    created_at: "2026-02-18 09:00:00"
  }
];