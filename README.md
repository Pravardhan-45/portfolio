# Portfolio Builder

A web application that enables users to create professional portfolio websites with minimal effort, featuring AI-based job description customization.

## Team Contributions

### Member 1: User Information Form & UI
- **State Management**: Implemented centralized React context for Personal Info, About Me, Education, Skills, Projects, Experience, and Social Links.
- **Dynamic Forms**: Created intuitive forms with "Add Another" functionality for dynamic lists like Education and Projects.
- **Premium Aesthetics**: Designed a professional, gradient-styled landing page UI with a sticky "Save & Continue" action bar.
- **Image Processing**: Handled profile image uploads and automatic Base64 conversion for seamless JSON storage.

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
- **Gemini AI Integration**: Created a secure backend endpoint (`/api/ai/analyze`) that feeds portfolio data and JD text into Google's Gemini 2.5 AI.
- **Smart Suggestions**: Generated tailored summaries, highlighted matching skills, and identified missing skills.
- **Crash Protection**: Implemented ultra-safe React rendering wrappers (`safeString`) to guarantee the AI output never crashes the UI.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, React Router, Axios.
- **Backend**: Node.js, Express, Google Gen AI SDK, CORS, Multer, PDF-Parse.

## How to Run Locally

You will need two terminals running simultaneously.

### 1. Start the Backend Server (Port 5000)
```bash
cd backend
npm install
node server.js
```
*(Ensure you have a `.env` file in the `backend` directory containing your `GEMINI_API_KEY=your_key`)*

### 2. Start the Frontend Server (Port 5173)
```bash
cd frontend
npm install
npm run dev
```
Open your browser to `http://localhost:5173` to interact with the application.