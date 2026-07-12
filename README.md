# Portfolio Builder

A web application that enables users to create professional portfolio websites with minimal effort, featuring AI-based job description customization.

## Team Contributions

### Member 1: User Information Form & UI
- **State Management**: Implemented centralized React context for Personal Info, About Me, Education, Skills, Projects, Experience, and Social Links.
- **Dynamic Forms**: Created intuitive forms with "Add Another" functionality for dynamic lists like Education and Projects.
- **Premium Aesthetics**: Designed a professional, gradient-styled landing page UI with a sticky "Save & Continue" action bar.
- **Image Processing**: Handled profile image uploads (`.jpg`, `.jpeg`, `.png`) with automatic Base64 conversion for seamless JSON storage.
- **Calendar Integration**: Added month/year date pickers for Education start and end dates.

### Member 2: Portfolio Templates & Live Preview
- **Multiple Themes**: Designed and developed three distinct, fully responsive portfolio templates (Minimal, Modern, and Professional) using React and Tailwind CSS.
- **Dynamic Integration**: Connected the templates with the centralized state to dynamically render user details and profile photos.
- **Live Preview Feature**: Implemented a dedicated preview interface (`/preview` route) with a theme switcher for instant visualization.
- **Responsive Layouts**: Ensured a seamless, mobile-first design across all templates using Tailwind grid and flexbox.

### Member 3: User Authentication & Security
- **Authentication Flow**: Implemented Login and Registration pages (`login.jsx`, `Register.jsx`).
- **API Integration**: Developed secure authentication API endpoints (`authApi.js`) to manage user sessions.
- **Protected Routes**: Ensured that user portfolio data is securely saved and retrieved based on authenticated user sessions.

### Member 4: Standalone Project Generator & ZIP Export
- **Dynamic Generation**: Developed the backend logic (`templateService.js`) to dynamically inject user JSON data into a standalone starter project.
- **Static Template Syncing**: Synchronized frontend templates to function independently in the downloaded project without relying on React Context.
- **ZIP Packaging**: Created the automated zipping process allowing users to download their entire React portfolio as a ready-to-run package (`npm install` & `npm run dev`).

### Member 5: AI Job Analysis Integration
- **Job Description Upload**: Built a dedicated professional UI (`/jd-upload`) to upload Job Descriptions as PDFs.
- **PDF Extraction**: Utilized `multer` and `pdf-parse` to securely process and extract text from uploaded documents.
- **Gemini AI Integration**: Created a secure backend endpoint (`/api/ai/analyze`) that feeds portfolio data and JD text into Google's Gemini 2.5 Flash AI.
- **Smart Suggestions**: Generated tailored first-person summaries, highlighted matching skills, identified missing skills, and recommended relevant projects.
- **AI-Optimized Portfolio Preview**: After AI analysis, the user can click "Preview AI-Optimized Portfolio" which intelligently merges:
  - Personal details, photo, education, and experience kept intact from the original.
  - AI's first-person `generatedSummary` replaces the About Me section.
  - AI's `highlightSkills` combined with original skills (only skills the candidate actually has; `missingSkills` are NOT added to the portfolio).
  - Missing skills are shown separately on the JD analysis page as a "Learning Resources" list with suggested links to learn them.
  - AI's `recommendedProjects` appended with smart, descriptive titles.
- **Optimized ZIP Download**: When downloading from the AI-Optimized preview, the ZIP contains the fully merged AI-optimized data.
- **Crash Protection**: Implemented `safeString` parser to guarantee the UI never crashes from unexpected AI output formats.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, React Router, Axios.
- **Backend**: Node.js, Express, Google Gen AI SDK (Gemini 2.5 Flash), CORS, Multer, PDF-Parse, Mongoose.

## How to Run Locally

You will need two terminals running simultaneously.

### 1. Start the Backend Server (Port 5000)
```bash
cd backend
npm install
node server.js
```
> [!IMPORTANT]  
> You must create a `.env` file in the `backend` directory containing your environment variables:
> - `GEMINI_API_KEY=your_gemini_api_key`
> - `MONGO_URI=mongodb://127.0.0.1:27017/portfolio` (or your MongoDB Atlas connection string)
> - `JWT_SECRET=your_super_secret_jwt_key`

### 2. Start the Frontend Server (Port 5173)
```bash
cd frontend
npm install
npm run dev
```
Open your browser to `http://localhost:5173` to interact with the application.

## Key Pages
| Route | Description |
|---|---|
| `/` | Landing Page |
| `/login` | Secure Login |
| `/register` | User Registration |
| `/choose-flow` | Dashboard (Choose Direct Download, AI Tailoring, or Edit Form) |
| `/userinfo` | Update Portfolio Details |
| `/jd-upload` | Upload JD & Get AI Suggestions |
| `/preview` | Live Portfolio Preview & Download |

## Recent Production Deployment & Style Refinement (July 2026)
- **Vercel-to-Render API proxying**: Added `vercel.json` rewrites to proxy all frontend `/api/*` endpoints directly to Render without manual environment variables setup.
- **Template Heading Standardization**: Converted non-standard headings across all 4 themes (Minimal, Modern, Professional, TechPro) to professional names: **Skills**, **Projects**, **Experience**, and **Education**.
- **TechPro Theme Restructuring**: Completely stripped command prompts (`$ whoami`, etc.) and terminal chrome decorations, swapping them for a premium dark mode developer card structure.
- **ZIP Download Exporter Fixes**: Resolved critical reference errors during standalone ZIP compilation.
- **Resilient AI Error Handling**: Integrated user-friendly fallback handlers for Gemini API quota limits and misconfigured keys.