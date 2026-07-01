# Portfolio Builder

A web application that enables users to create professional portfolio websites with minimal effort, featuring AI-based job description customization.

## Features Developed So Far

### 1. User Information Form (Member 1)
- React context state management for Personal Information, Education, Skills, Projects, and Experience.
- Interactive form fields linked to centralized global state.
- "Save & Continue" functionality to seamlessly transition to the AI analysis phase.

### 2. AI Job Analysis Integration (Member 5)
- **Job Description Upload**: Dedicated page to paste a Job Description (`/jd-upload`).
- **Gemini AI Integration**: A secure backend endpoint (`/api/ai/analyze`) that feeds the user's current portfolio data and the target JD into Google's Gemini AI.
- **Customized Portfolio Suggestions**: Extracts highlight skills, identifies missing skills, generates a professional summary, and recommends relevant projects to emphasize.

### 3. Dashboard Hub
- A centralized dashboard linking out to the completed member features, with placeholders for future member tasks (Templates, Database Sync, and Source Download).

## Tech Stack
- **Frontend**: React, Vite, TailwindCSS (setup pending), React Router, Axios.
- **Backend**: Node.js, Express, Google Gen AI SDK, CORS.

## How to Run the Application Locally

You will need two terminals running simultaneously.

### 1. Start the Backend Server (Port 5000)
Navigate to the AI Integration directory and start the Node server:
\`\`\`bash
cd backend/AI-Integration
npm install
node server.js
\`\`\`
*(Ensure you have a `.env` file in the `backend/AI-Integration` directory containing your `GEMINI_API_KEY=your_key`)*

### 2. Start the Frontend Server (Port 5173)
Navigate to the frontend directory and start the Vite development server:
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

Open your browser to `http://localhost:5173` to interact with the application.