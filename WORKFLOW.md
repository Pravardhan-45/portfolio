# PortfolioPro — Project Workflow

**Live URL:** https://portfolio-dun-alpha-56.vercel.app

---

## What is this project?

PortfolioPro is a web application that helps anyone — students, freshers, and professionals — **build a complete, professional portfolio website in under 5 minutes**, without writing a single line of code.

You just fill in your details, and the app generates a fully functional, beautiful portfolio for you. You can also use AI to tailor your portfolio to match a specific job you are applying for.

---

## Page-by-Page Workflow

---

### Page 1 — Landing Page (`/`)

This is the first page anyone sees when they visit the website.

**What it shows:**
- A headline: *"Build your portfolio in under 5 minutes"*
- Three key highlights of the app:
  - ⚡ **Lightning Fast** — No coding needed. Just fill a form and get your portfolio instantly.
  - 🤖 **AI Powered** — Upload a Job Description and AI will optimize your resume to match it.
  - ⬇️ **Download & Deploy** — Download your entire portfolio as a ZIP file. It's 100% yours to keep.
- Two buttons: **"Create Your Portfolio"** (goes to Register) and **"Login to Dashboard"** (goes to Login)

**Smart behaviour:**
- If you are already logged in and visit this page, the buttons automatically change to **"Go to Dashboard"** and **"Logout"** — so you never get confused.

---

### Page 2 — Register Page (`/register`)

This is where a new user creates their account.

**What you fill in:**
- Full Name
- Email address
- Password (minimum 8 characters)
- Confirm Password

After clicking **Register**, the account is created securely and you are taken to the Login page.

**Why we have this:**
Without accounts, two different people's data would get mixed up. Every user gets their own private, secure space to store their portfolio details.

---

### Page 3 — Login Page (`/login`)

This is where existing users sign back in.

**What you fill in:**
- Email
- Password

After clicking **Login**, the system checks your credentials. If you already have a saved portfolio, you go straight to the **Dashboard**. If you are logging in for the first time, you go to the **form** to fill your details.

**Smart behaviour:**
- Both the Login and Register pages have a **"← Back to Home"** button in the top-left corner, so you never get stuck.

---

### Page 4 — User Information Form (`/userinfo`)

This is the heart of the app — where you fill in all your details to build your portfolio.

**Sections you fill in:**
1. **Personal Information** — Name, Email, Phone, Location, Profile Photo
2. **About Me** — A short paragraph about yourself
3. **Education** — College, Degree, Year (you can add multiple)
4. **Skills** — Your technical and soft skills
5. **Projects** — Project name, description, tech used, links (you can add multiple)
6. **Experience** — Company, role, dates, what you did (you can add multiple)
7. **Certifications** — Any certificates you have earned
8. **Achievements** — Awards, competitions, or accomplishments
9. **Social Links** — GitHub, LinkedIn (required), Portfolio Website, Twitter

**Important things to know:**
- All fields marked with a red star (*) are required before saving.
- Your profile photo is uploaded and stored securely with your data.
- At the bottom, there is a **"Save & Continue"** button. Clicking it saves everything to the database and takes you to the Dashboard.
- **For returning users:** When you come back to edit your form, a green banner at the top says *"Welcome back! We've securely loaded your saved portfolio data."* — your previous data is auto-filled so you don't have to type everything again.

---

### Page 5 — Dashboard / Choose Flow (`/choose-flow`)

After saving, you land here. This page lets you decide what to do next with your portfolio.

**Three options:**

| Option | What it does |
|---|---|
| ✏️ **Update Details** | Go back to the form to edit or add new information |
| ⚡ **Direct Preview** | See your portfolio instantly, as-is, with no AI changes. Download it right away. |
| 🤖 **AI Tailoring** *(Recommended)* | Upload a Job Description and let AI optimize your portfolio for that specific job |

---

### Page 6 — AI Portfolio Analyzer (`/jd-upload`)

This is the most powerful feature of the app.

**How it works:**
1. You upload a **PDF of a Job Description** (JD) — for example, a Software Engineer job at Google.
2. You click **"Generate AI Optimized Portfolio"**.
3. Our AI (Google Gemini) reads both your portfolio data AND the job description together.
4. It then gives you a fully optimized portfolio tailored to that specific role.

**What the AI actually does:**

- ✅ **Rewrites your About Me** — Creates a professional first-person summary that matches what the job is looking for.
- ✅ **Highlights your matching skills** — Skills you already have that match the job are brought to the front.
- ✅ **Identifies skills you are missing** — Skills required by the job that you don't have yet are shown as *"(Learning)"* — so the recruiter knows you are aware of the gap and actively working on it.
  > **Example:** If the job needs Kubernetes but you don't know it, AI adds "Kubernetes (Learning)" to your skills. This is much better than leaving it blank — it shows self-awareness and initiative.
- ✅ **Recommends relevant projects** — The AI suggests projects from your list that are most relevant to the role, and even adds AI-recommended project ideas you could build to strengthen your application.

**Result:** Your portfolio is no longer generic. It is specifically crafted for that one job, making it significantly more likely to pass recruiter screening.

---

### Page 7 — Live Portfolio Preview (`/preview`)

This page shows you exactly how your portfolio will look to a recruiter or visitor.

**What you can do here:**
- **Switch between 3 themes:**
  - 🎨 Minimal Theme — Clean and simple. Great for designers.
  - 💼 Modern Theme — Bold and colorful. Great for developers.
  - 🏢 Professional Theme — Dark sidebar, formal layout. Great for corporate roles.
- **Download ZIP** — Click the purple "Download ZIP" button to download your entire portfolio as a ready-to-use project.

---

### After Downloading the ZIP — What happens next?

When you click "Download ZIP", you get a ZIP file on your computer. Here is what to do with it:

1. **Extract the ZIP** — Right-click and extract it to a folder.
2. **Open in VS Code** — Open the extracted folder in Visual Studio Code (or any code editor).
3. **Install dependencies** — Open a terminal and run:
   ```
   npm install
   ```
4. **Run the portfolio** — Then run:
   ```
   npm run dev
   ```
5. **See it live** — Open your browser to `http://localhost:5173` and your portfolio is running as a standalone website — completely independent, no internet needed.

> **The best part:** This is YOUR code, 100%. You can edit it, customize it further, add more sections, change colors — anything you want. You are not locked into any platform.

> **Without this feature:** Normally, building a portfolio website requires knowing HTML, CSS, React, and spending days or weeks. With PortfolioPro, you get a fully working React project in seconds.

---

## Technologies Used

| Area | Technologies |
|---|---|
| **Frontend UI** | React.js, Vite, Tailwind CSS |
| **Routing** | React Router DOM |
| **API Calls** | Axios |
| **Backend Server** | Node.js, Express.js |
| **Database** | MongoDB (Atlas Cloud) with Mongoose |
| **Authentication** | JSON Web Tokens (JWT), bcryptjs |
| **AI Integration** | Google Gemini 2.5 Flash AI |
| **PDF Processing** | Multer, PDF-Parse |
| **ZIP Generation** | Archiver, fs-extra |
| **Frontend Hosting** | Vercel |
| **Backend Hosting** | Render |

---

## Team Members & Their Roles

| Member | Role | What They Built |
|---|---|---|
| **Member 1** | UI & Form Development | Built all the input forms (Personal Info, Education, Skills, Projects, Experience, etc.), profile photo upload, and the overall page styling and layout. |
| **Member 2** | Portfolio Templates & Preview | Designed the 3 portfolio themes (Minimal, Modern, Professional) and built the live preview page with the theme switcher. |
| **Member 3** | Authentication & Security | Built the Login and Register pages, user account system, and ensured all data is private and secured with JWT tokens. |
| **Member 4** | ZIP Generator | Built the backend system that packages the user's portfolio data into a standalone React project and compresses it into a downloadable ZIP file. |
| **Member 5** | AI Integration | Integrated Google Gemini AI, built the Job Description upload feature, and implemented the smart portfolio optimization logic that rewrites the resume to match the job. |

---

*Built with ❤️ as a team project — PortfolioPro, 2026.*
