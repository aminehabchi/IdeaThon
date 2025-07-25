"use client";

import { DashboardNavbar } from "@/components/navbarcomps/dashboardNavbar";
import { usePathname } from "next/navigation";
import { DocumentViewer } from "@/components/notionLike/ParserUtils/DocumentViewer"; 


const exampleData = {
  "id": "1732456789123",
  "title": "The Ultimate Guide to Modern Web Development",
  "subtitle": "Exploring cutting-edge technologies, best practices, and emerging trends in 2024",
  "slug": "ultimate-guide-modern-web-development",
  "language": "en",
  "version": "1.0.0",
    "avatar": "./belmaayo_avatar.png",
    "alt": "Modern web development workspace with multiple screens",
    "caption": "A developer's workspace showcasing modern tools and technologies",
    "privacy": "private",
    "name": "belmaayo",
    "bio": "Full-stack developer and technical writer with 8+ years of experience",
    "price": "466",


"publishedAt": "2024-07-24T10:30:00.000Z",
"updatedAt": "2024-07-24T15:45:00.000Z",
"createdAt": "2024-07-24T09:00:00.000Z",

"meta": {
  "wordCount": 2850,
  "readingTime": 12,
  "characterCount": 18450,
  "estimatedReadingSpeed": 250
},

"categories": ["Web Development", "JavaScript", "React", "Tutorial"],
"tags": ["frontend", "backend", "fullstack", "modern-web", "2024-trends"],

"schedule": {
  "publishAt": "2024-07-24T10:30:00.000Z",
  "unpublishAt": null,
  "featured": {
    "enabled": true,
    "startDate": "2024-07-24T10:30:00.000Z",
    "endDate": "2024-08-24T10:30:00.000Z"
  }
},

"statistics": {
  "blockCount": 22,
  "wordCount": 2850,
  "readingTime": 12,
  "views": 1247,
  "likes": 89,
  "shares": 23,
  "comments": 15,
  "blockTypes": {
    "paragraph": 8,
    "header": 5,
    "list": 2,
    "checklist": 1,
    "image": 2,
    "code": 2,
    "quote": 1,
    "table": 1,
    "warning": 1,
    "embed": 1,
    "delimiter": 1
  }
},

"seo": {
  "metaTitle": "The Ultimate Guide to Modern Web Development - 2024 Edition",
  "metaDescription": "Comprehensive guide covering cutting-edge web development technologies, best practices, and emerging trends for 2024. Perfect for developers of all levels.",
  "keywords": ["web development", "javascript", "react", "modern web", "2024 trends", "full stack"],
  "ogImage": "https://example.com/images/og-web-dev-guide.jpg",
  "canonicalUrl": "https://example.com/guides/modern-web-development"
},

"blocks": [
  {
    "id": "block_0",
    "type": "paragraph",
    "data": {
      "text": "Web development has evolved dramatically over the past few years. From simple static websites to complex, interactive applications, the landscape continues to shift with new technologies, frameworks, and methodologies emerging regularly.",
      "alignment": "left"
    },
    "meta": {
      "order": 0,
      "created": "2024-07-24T09:15:00.000Z"
    }
  },
  
  {
    "id": "block_1",
    "type": "header",
    "data": {
      "text": "Understanding Modern Frontend Frameworks",
      "level": 2,
      "anchor": "understanding-modern-frontend-frameworks",
      "alignment": "left"
    },
    "meta": {
      "order": 1,
      "created": "2024-07-24T09:20:00.000Z"
    }
  },
  
  {
    "id": "block_2",
    "type": "paragraph",
    "data": {
      "text": "The frontend ecosystem has been revolutionized by frameworks like <strong>React</strong>, <strong>Vue.js</strong>, and <strong>Angular</strong>. These tools have transformed how we build user interfaces, making them more modular, maintainable, and scalable.",
      "alignment": "left"
    },
    "meta": {
      "order": 2,
      "created": "2024-07-24T09:25:00.000Z"
    }
  },
  
  {
    "id": "block_3",
    "type": "image",
    "data": {
      "url": "https://example.com/images/frontend-frameworks-comparison.png",
      "caption": "Comparison of popular frontend frameworks by GitHub stars and npm downloads",
      "alt": "Chart showing React, Vue, and Angular popularity metrics",
      "alignment": "center",
      "stretched": false,
      "withBorder": true,
      "withBackground": false
    },
    "meta": {
      "order": 3,
      "created": "2024-07-24T09:30:00.000Z"
    }
  },
  
  {
    "id": "block_4",
    "type": "list",
    "data": {
      "style": "unordered",
      "items": [
        {
          "content": "<strong>React</strong>: Component-based library with a massive ecosystem and excellent performance",
          "items": []
        },
        {
          "content": "<strong>Vue.js</strong>: Progressive framework that's easy to learn and integrates well with existing projects",
          "items": []
        },
        {
          "content": "<strong>Angular</strong>: Full-featured framework with built-in tools for large-scale applications",
          "items": []
        },
        {
          "content": "<strong>Svelte</strong>: Compile-time framework that produces highly optimized vanilla JavaScript",
          "items": []
        }
      ]
    },
    "meta": {
      "order": 4,
      "created": "2024-07-24T09:35:00.000Z"
    }
  },
  
  {
    "id": "block_5",
    "type": "header",
    "data": {
      "text": "Backend Technologies and Architecture",
      "level": 2,
      "anchor": "backend-technologies-architecture",
      "alignment": "left"
    },
    "meta": {
      "order": 5,
      "created": "2024-07-24T09:40:00.000Z"
    }
  },
  
  {
    "id": "block_6",
    "type": "paragraph",
    "data": {
      "text": "The backend landscape has also seen significant changes with the rise of <em>microservices</em>, <em>serverless computing</em>, and <em>container orchestration</em>. Modern applications require robust, scalable backend solutions.",
      "alignment": "left"
    },
    "meta": {
      "order": 6,
      "created": "2024-07-24T09:45:00.000Z"
    }
  },
  
  {
    "id": "block_7",
    "type": "code",
    "data": {
      "code": "// Example of a modern Express.js API with middleware\nconst express = require('express');\nconst cors = require('cors');\nconst helmet = require('helmet');\nconst rateLimit = require('express-rate-limit');\n\nconst app = express();\n\n// Security middleware\napp.use(helmet());\napp.use(cors());\n\n// Rate limiting\nconst limiter = rateLimit({\n  windowMs: 15 * 60 * 1000, // 15 minutes\n  max: 100 // limit each IP to 100 requests per windowMs\n});\napp.use(limiter);\n\n// JSON parsing\napp.use(express.json({ limit: '10mb' }));\n\n// Routes\napp.get('/api/health', (req, res) => {\n  res.json({ status: 'OK', timestamp: new Date().toISOString() });\n});\n\napp.listen(3000, () => {\n  console.log('Server running on port 3000');\n});",
      "language": "javascript",
      "showLineNumbers": true
    },
    "meta": {
      "order": 7,
      "created": "2024-07-24T09:50:00.000Z"
    }
  },
  
  {
    "id": "block_8",
    "type": "quote",
    "data": {
      "text": "The best architecture is the one that evolves with your needs, not the one that tries to predict them all upfront.",
      "caption": "Martin Fowler, Software Architect",
      "alignment": "left",
      "style": "border-left"
    },
    "meta": {
      "order": 8,
      "created": "2024-07-24T09:55:00.000Z"
    }
  },
  
  {
    "id": "block_9",
    "type": "header",
    "data": {
      "text": "Development Tools and Workflow",
      "level": 3,
      "anchor": "development-tools-workflow",
      "alignment": "left"
    },
    "meta": {
      "order": 9,
      "created": "2024-07-24T10:00:00.000Z"
    }
  },
  
  {
    "id": "block_10",
    "type": "checklist",
    "data": {
      "items": [
        {
          "content": "Set up version control with Git and establish branching strategy",
          "checked": true
        },
        {
          "content": "Configure automated testing (unit, integration, e2e)",
          "checked": true
        },
        {
          "content": "Implement continuous integration/continuous deployment (CI/CD)",
          "checked": true
        },
        {
          "content": "Set up code quality tools (ESLint, Prettier, SonarQube)",
          "checked": false
        },
        {
          "content": "Configure monitoring and logging systems",
          "checked": false
        },
        {
          "content": "Establish security scanning and vulnerability assessment",
          "checked": false
        }
      ]
    },
    "meta": {
      "order": 10,
      "created": "2024-07-24T10:05:00.000Z"
    }
  },
  
  {
    "id": "block_11",
    "type": "table",
    "data": {
      "withHeadings": true,
      "content": [
        ["Tool Category", "Recommended Tools", "Use Case", "Difficulty"],
        ["Code Editors", "VS Code, WebStorm", "Development environment", "Easy"],
        ["Version Control", "Git, GitHub/GitLab", "Source code management", "Medium"],
        ["Build Tools", "Webpack, Vite, Parcel", "Asset bundling", "Medium"],
        ["Testing", "Jest, Cypress, Playwright", "Quality assurance", "Medium"],
        ["Deployment", "Docker, Kubernetes, Vercel", "Application hosting", "Hard"],
        ["Monitoring", "New Relic, DataDog, Sentry", "Performance tracking", "Medium"]
      ]
    },
    "meta": {
      "order": 11,
      "created": "2024-07-24T10:10:00.000Z"
    }
  },
  
  {
    "id": "block_12",
    "type": "warning",
    "data": {
      "title": "Performance Consideration",
      "message": "Always measure performance before optimizing. Premature optimization can lead to complex code that's harder to maintain without significant benefits.",
      "level": "warning"
    },
    "meta": {
      "order": 12,
      "created": "2024-07-24T10:15:00.000Z"
    }
  },
  
  {
    "id": "block_13",
    "type": "header",
    "data": {
      "text": "Emerging Trends in 2024",
      "level": 2,
      "anchor": "emerging-trends-2024",
      "alignment": "left"
    },
    "meta": {
      "order": 13,
      "created": "2024-07-24T10:20:00.000Z"
    }
  },
  
  {
    "id": "block_14",
    "type": "list",
    "data": {
      "style": "ordered",
      "items": [
        {
          "content": "<strong>AI-Powered Development Tools</strong>: GitHub Copilot, ChatGPT, and other AI assistants are revolutionizing how we write code",
          "items": []
        },
        {
          "content": "<strong>Edge Computing</strong>: Moving computation closer to users for better performance and reduced latency",
          "items": []
        },
        {
          "content": "<strong>WebAssembly (WASM)</strong>: Enabling high-performance applications in the browser with near-native speed",
          "items": []
        },
        {
          "content": "<strong>Jamstack Architecture</strong>: Static site generation with dynamic functionality for better performance and security",
          "items": []
        }
      ]
    },
    "meta": {
      "order": 14,
      "created": "2024-07-24T10:25:00.000Z"
    }
  },
  
  {
    "id": "block_15",
    "type": "embed",
    "data": {
      "service": "youtube",
      "source": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "embed": "https://www.youtube.com/embed/dQw4w9WgXcQ",
      "width": 560,
      "height": 315,
      "caption": "Conference talk: The Future of Web Development"
    },
    "meta": {
      "order": 15,
      "created": "2024-07-24T10:30:00.000Z"
    }
  },
  
  {
    "id": "block_16",
    "type": "delimiter",
    "data": {},
    "meta": {
      "order": 16,
      "created": "2024-07-24T10:35:00.000Z"
    }
  },
  
  {
    "id": "block_17",
    "type": "header",
    "data": {
      "text": "Code Example: Modern React Component",
      "level": 3,
      "anchor": "code-example-modern-react-component",
      "alignment": "left"
    },
    "meta": {
      "order": 17,
      "created": "2024-07-24T10:40:00.000Z"
    }
  },
  
  {
    "id": "block_18",
    "type": "code",
    "data": {
      "code": "import React, { useState, useEffect, useCallback } from 'react';\nimport { debounce } from 'lodash';\n\ninterface SearchProps {\n  onSearch: (query: string) => Promise<any[]>;\n  placeholder?: string;\n}\n\nconst SearchComponent: React.FC<SearchProps> = ({ \n  onSearch, \n  placeholder = \"Search...\" \n}) => {\n  const [query, setQuery] = useState('');\n  const [results, setResults] = useState([]);\n  const [loading, setLoading] = useState(false);\n  const [error, setError] = useState<string | null>(null);\n\n  // Debounced search function\n  const debouncedSearch = useCallback(\n    debounce(async (searchQuery: string) => {\n      if (!searchQuery.trim()) {\n        setResults([]);\n        return;\n      }\n\n      setLoading(true);\n      setError(null);\n\n      try {\n        const searchResults = await onSearch(searchQuery);\n        setResults(searchResults);\n      } catch (err) {\n        setError('Search failed. Please try again.');\n        setResults([]);\n      } finally {\n        setLoading(false);\n      }\n    }, 300),\n    [onSearch]\n  );\n\n  useEffect(() => {\n    debouncedSearch(query);\n    return () => debouncedSearch.cancel();\n  }, [query, debouncedSearch]);\n\n  return (\n    <div className=\"search-container\">\n      <input\n        type=\"text\"\n        value={query}\n        onChange={(e) => setQuery(e.target.value)}\n        placeholder={placeholder}\n        className=\"search-input\"\n        aria-label=\"Search\"\n      />\n      \n      {loading && <div className=\"loading\">Searching...</div>}\n      \n      {error && (\n        <div className=\"error\" role=\"alert\">\n          {error}\n        </div>\n      )}\n      \n      {results.length > 0 && (\n        <ul className=\"results-list\">\n          {results.map((result, index) => (\n            <li key={index} className=\"result-item\">\n              {result.title}\n            </li>\n          ))}\n        </ul>\n      )}\n    </div>\n  );\n};\n\nexport default SearchComponent;",
      "language": "typescript",
      "showLineNumbers": true
    },
    "meta": {
      "order": 18,
      "created": "2024-07-24T10:45:00.000Z"
    }
  },
  
  {
    "id": "block_19",
    "type": "paragraph",
    "data": {
      "text": "This component demonstrates modern React patterns including <mark>TypeScript integration</mark>, <mark>custom hooks</mark>, <mark>debounced API calls</mark>, and <mark>accessibility considerations</mark>.",
      "alignment": "left"
    },
    "meta": {
      "order": 19,
      "created": "2024-07-24T10:50:00.000Z"
    }
  },
  
  {
    "id": "block_20",
    "type": "raw",
    "data": {
      "html": "<div class=\"custom-callout\" style=\"background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;\">\n  <h4 style=\"margin: 0 0 10px 0; font-size: 18px;\">💡 Pro Tip</h4>\n  <p style=\"margin: 0; line-height: 1.6;\">Always keep your dependencies up to date and regularly audit your packages for security vulnerabilities using tools like <code style=\"background: rgba(255,255,255,0.2); padding: 2px 6px; border-radius: 4px;\">npm audit</code> or <code style=\"background: rgba(255,255,255,0.2); padding: 2px 6px; border-radius: 4px;\">yarn audit</code>.</p>\n</div>"
    },
    "meta": {
      "order": 20,
      "created": "2024-07-24T10:55:00.000Z"
    }
  },
  
  {
    "id": "block_21",
    "type": "paragraph",
    "data": {
      "text": "The web development landscape continues to evolve rapidly. Staying current with these trends and tools will help you build better, more maintainable, and more performant applications. Remember to focus on fundamentals while gradually adopting new technologies that provide clear value to your projects.",
      "alignment": "left"
    },
    "meta": {
      "order": 21,
      "created": "2024-07-24T11:00:00.000Z"
    }
  }
],

"tableOfContents": [
  {
    "id": "block_1",
    "text": "Understanding Modern Frontend Frameworks",
    "level": 2,
    "anchor": "understanding-modern-frontend-frameworks"
  },
  {
    "id": "block_5",
    "text": "Backend Technologies and Architecture",
    "level": 2,
    "anchor": "backend-technologies-architecture"
  },
  {
    "id": "block_9",
    "text": "Development Tools and Workflow",
    "level": 3,
    "anchor": "development-tools-workflow"
  },
  {
    "id": "block_13",
    "text": "Emerging Trends in 2024",
    "level": 2,
    "anchor": "emerging-trends-2024"
  },
  {
    "id": "block_17",
    "text": "Code Example: Modern React Component",
    "level": 3,
    "anchor": "code-example-modern-react-component"
  }
]
}

export default function Page() {
    const pathname = usePathname();
    let ideathon_id = Number(pathname.split("/")[2])
    console.log(ideathon_id);
    
    return (
        <>
            <DashboardNavbar />
            {/* <MainParserIdea data={exampleData} /> */}
            <DocumentViewer data={exampleData}/>
        </>
    );
}




// "use client"

// // app/idea/[id]/page.tsx
// import { DashboardNavbar } from "@/components/navbarcomps/dashboardNavbar";
// import { ProjectNavbar } from "@/components/ideasComponent/ideaTopbar";
// import { ProjectHeader } from "@/components/ideasComponent/ideabanner";
// import { useEffect, useState } from "react";
// import { useParams } from 'next/navigation';

// export default function IdeaPage() {
//   const params = useParams();
//   const id = params.id;

//   return (
//     <>
//       <DashboardNavbar />
//       <ProjectNavbar id={id} />
//       <ProjectHeader id={id} />
//       {/* <IdeaBody /> */}
//     </>
//   );
// }
