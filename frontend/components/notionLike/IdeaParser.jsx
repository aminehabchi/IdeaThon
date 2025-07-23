"use client";
import React from "react";
import { DocumentViewer } from "./ParserUtils/DocumentViewer";

const exampleData = {
  document: {
    id: "doc_12345",
    title: "Complete Guide to Modern Web Development",
    subtitle: "A comprehensive tutorial covering all aspects of modern web development",
    featuredImage: {
            url: "/belmaayo_avatar.png",
            alt: "A sample banner image",
            caption: "An inspirational banner."
   },
    author: {
      id: "user_001",
      name: "John Developer",
      avatar: "/sec.png",
      bio: "Senior Full-Stack Developer with 8+ years of experience"
    },
    slug: "complete-guide-modern-web-development",
    language: "en",
    version: "1.2.0"
  },
  
  banner: {
    url: "/belmaayo_avatar.png",
    alt: "banner",
    caption: "An inspirational banner."
  },
  
  publishedAt: "2025-07-20T10:00:00Z",
  updatedAt: "2025-07-22T14:30:00Z",
  createdAt: "2025-07-15T09:00:00Z",
  
  meta: {
    wordCount: 2847,
    readingTime: 12,
    characterCount: 15420,
    estimatedReadingSpeed: 250
  },
  
  categories: ["Web Development", "JavaScript", "React", "Node.js", "Tutorial"],
  tags: ["frontend", "backend", "fullstack", "beginner-friendly", "2025"],
  
  settings: {
    privacy: "public", // public, private, unlisted, password-protected
    password: null,
    allowComments: true,
    allowSharing: true,
    seoOptimized: true,
    showTableOfContents: true,
    enableAnalytics: true
  },
  
  pricing: {
    type: "free", // free, paid, subscription
    price: 0,
    currency: "USD",
    discount: null
  },
  
  schedule: {
    publishAt: "2025-07-20T10:00:00Z",
    unpublishAt: null,
    featured: {
      enabled: true,
      startDate: "2025-07-20T10:00:00Z",
      endDate: "2025-08-20T10:00:00Z"
    }
  },
  
  statistics: {
    blockCount: 15,
    wordCount: 2847,
    readingTime: 12,
    views: 1542,
    likes: 89,
    shares: 23,
    comments: 12
  },
  
  seo: {
    metaTitle: "Complete Guide to Modern Web Development - 2025 Tutorial",
    metaDescription: "Learn modern web development from scratch with this comprehensive guide covering React, Node.js, and full-stack development.",
    keywords: ["web development", "react", "nodejs", "javascript", "tutorial"],
    ogImage: "/og-image.jpg",
    canonicalUrl: "https://example.com/complete-guide-modern-web-development"
  },
  
  blocks: [
    // Header blocks - all levels
    {
      id: "header_1",
      type: "header",
      data: {
        text: "Introduction to Modern Web Development",
        level: 1,
        anchor: "introduction",
        alignment: "left"
      }
    },
    {
      id: "header_2",
      type: "header", 
      data: {
        text: "Getting Started with the Basics",
        level: 2,
        anchor: "getting-started",
        alignment: "left"
      }
    },
    {
      id: "header_3",
      type: "header",
      data: {
        text: "Setting Up Your Development Environment",
        level: 3,
        anchor: "dev-environment",
        alignment: "left"
      }
    },
    
    // Paragraph blocks with different alignments
    {
      id: "paragraph_1",
      type: "paragraph",
      data: {
        text: "Welcome to this comprehensive guide on modern web development. This tutorial will take you through <strong>everything you need to know</strong> to become a proficient web developer in 2025. We'll cover frontend technologies.",
        // alignment: "left"
      }
    },
    {
      id: "paragraph_2", 
      type: "paragraph",
      data: {
        text: "This paragraph is <strong>center-aligned</strong> to demonstrate different text alignment options available in our content management system.",
        // alignment: "center"
      }
    },
    {
      id: "paragraph_3",
      type: "paragraph", 
      data: {
        text: "And this paragraph is <strong>right-aligned</strong> for complete flexibility in content presentation.",
        // alignment: "right"
      }
    },
    
    // Image blocks with different configurations
    {
      id: "image_1",
      type: "image",
      data: {
        url: "/sec.png",
        alt: "Modern web development setup with multiple monitors",
        caption: "A typical modern web development workspace",
        alignment: "center",
        stretched: false,
        withBorder: true,
        withBackground: false
      }
    },
    {
      id: "image_2",
      type: "image",
      data: {
        url: "/sec.png", 
        alt: "VS Code editor with React project",
        caption: "VS Code with a React project setup",
        alignment: "center",
        stretched: true,
        withBorder: false,
        withBackground: true
      }
    },
    
    // List blocks - all types
    {
      id: "list_unordered",
      type: "list",
      data: {
        style: "unordered",
        items: [
          "HTML5 and semantic markup",
          "CSS3 and modern layout techniques",
          "JavaScript ES6+ features",
          "React.js for component-based development",
          "Node.js for backend development"
        ]
      }
    },
    {
      id: "list_ordered",
      type: "list", 
      data: {
        style: "ordered",
        items: [
          "Set up your development environment",
          "Learn HTML fundamentals",
          "Master CSS styling and layouts", 
          "Understand JavaScript programming",
          "Build your first React application",
          "Deploy your project to production"
        ]
      }
    },
    {
      id: "list_checklist",
      type: "list",
      data: {
        style: "checklist",
        items: [
          { content: "Install Node.js and npm", checked: true },
          { content: "Set up VS Code with extensions", checked: true },
          { content: "Create your first React app", checked: true },
          { content: "Learn React hooks and state management", checked: false },
          { content: "Build a full-stack application", checked: false },
          { content: "Deploy to production", checked: false }
        ]
      }
    },
    
    // Code blocks with different languages
    {
      id: "code_javascript",
      type: "code",
      data: {
        code: `// React functional component example
import React, { useState, useEffect } from 'react';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId)
      .then(userData => {
        setUser(userData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch user:', error);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};

export default UserProfile;`,
        language: "javascript"
      }
    },
    {
      id: "code_css",
      type: "code",
      data: {
        code: `/* Modern CSS with Grid and Flexbox */
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
}`,
        language: "css"
      }
    },
    {
      id: "code_bash",
      type: "code",
      data: {
        code: `# Project setup commands
npm create react-app my-web-app
cd my-web-app

# Install additional dependencies
npm install axios react-router-dom styled-components

# Install development dependencies
npm install --save-dev eslint prettier husky lint-staged

# Start development server
npm start

# Build for production
npm run build

# Deploy to Netlify
npm install -g netlify-cli
netlify deploy --prod --dir=build`,
        language: "bash"
      }
    },
    
    // Quote blocks
    {
      id: "quote_1",
      type: "quote",
      data: {
        text: "The best way to learn web development is by building real projects. Theory is important, but practice makes perfect.",
        caption: "Jane Developer, Senior Frontend Engineer"
      }
    },
    {
      id: "quote_2",
      type: "quote", 
      data: {
        text: "Code is like humor. When you have to explain it, it's bad.",
        caption: "Cory House"
      }
    },
    
    // Delimiter
    {
      id: "delimiter_1",
      type: "delimiter",
      data: {}
    },
    
    // Table blocks
    {
      id: "table_comparison",
      type: "table",
      data: {
        withHeadings: true,
        content: [
          ["Framework", "Learning Curve", "Performance", "Community", "Use Case"],
          ["React", "Medium", "High", "Very Large", "Complex UIs, SPAs"],
          ["Vue.js", "Easy", "High", "Large", "Progressive adoption"],
          ["Angular", "Hard", "High", "Large", "Enterprise applications"],
          ["Svelte", "Easy", "Very High", "Growing", "Small to medium apps"],
          ["Next.js", "Medium", "Very High", "Large", "Full-stack React apps"]
        ]
      }
    },
    {
      id: "table_tools",
      type: "table",
      data: {
        withHeadings: true,
        content: [
          ["Tool", "Category", "Price", "Platform"],
          ["VS Code", "Editor", "Free", "Cross-platform"],
          ["GitHub", "Version Control", "Free/Paid", "Web"],
          ["Figma", "Design", "Free/Paid", "Web"],
          ["Postman", "API Testing", "Free/Paid", "Cross-platform"],
          ["Vercel", "Deployment", "Free/Paid", "Web"]
        ]
      }
    },
    
    // Embed blocks
    {
      id: "embed_youtube",
      type: "embed",
      data: {
        service: "youtube",
        embed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        source: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        caption: "Introduction to React Hooks - Complete Tutorial",
        width: 560,
        height: 315
      }
    },
    {
      id: "embed_codepen",
      type: "embed", 
      data: {
        service: "codepen",
        embed: "https://codepen.io/chriscoyier/embed/gfdDu",
        source: "https://codepen.io/chriscoyier/pen/gfdDu",
        caption: "Interactive CSS Grid Example",
        width: 500,
        height: 400
      }
    },
    
    // Warning/Info blocks (custom types)
    {
      id: "warning_1",
      type: "warning",
      data: {
        title: "Important Security Note",
        text: "Never expose sensitive API keys or credentials in your frontend code. Always use environment variables and proxy sensitive requests through your backend.",
        level: "warning" // info, warning, error, success
      }
    },
    {
      id: "info_1", 
      type: "info",
      data: {
        title: "Pro Tip",
        text: "Use React Developer Tools browser extension to debug your React applications more effectively. It provides component inspection and performance profiling.",
        level: "info"
      }
    }
  ],
}

export  function MainParserIdea() {
  return <DocumentViewer data={exampleData} />;
}