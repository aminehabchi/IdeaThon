# i did init the shadcn in the project so you dont have to.
- npx shadcn@latest init
### if you need to add a compo you have to install it first:
- npx shadcn@latest add button

##### in the front i did something like this tree :

```
.
├── app/                     # Route-based pages and layouts
│   ├── (public)/            # Public routes (e.g., homepage, about)
│   │   ├── page.js
│   │   └── about/
│   │       └── page.js
│   ├── (dashboard)/         # Private (authenticated) routes
│   │   ├── layout.js
│   │   ├── page.js
│   │   └── projects/
│   │       └── [id]/
│   │           └── page.js
│   ├── api/                 # API routes (Next.js built-in)
│   │   └── auth/route.js
│   ├── layout.js            # Root layout
│   └── globals.css          # Global styles
├── components/              # Reusable UI components (buttons, nav, cards)
│   ├── ui/                  # Shadcn or UI primitives
│   ├── layout/              # Navbar, Sidebar, Footer, etc.
│   └── shared/              # Icons, widgets, modals
├── features/                # Feature-based components + logic
│   ├── auth/
│   │   ├── LoginForm.js
│   │   └── useAuth.js
│   └── project/
│       ├── ProjectCard.js
│       └── useProjects.js
├── lib/                     # Utility functions, API clients, DB
│   ├── db.js
│   ├── auth.js
│   └── helpers.js
├── hooks/                   # Custom React hooks
│   └── useToggle.js
├── constants/               # Static values (routes, configs, roles)
│   └── routes.js
├── public/                  # Static assets (images, favicon, etc.)
├── styles/                  # CSS/Tailwind files
│   └── globals.css
├── middleware.js            # Middleware (auth, redirects)
├── tailwind.config.js       # Tailwind setup
├── jsconfig.json            # Path alias config
└── next.config.js
```