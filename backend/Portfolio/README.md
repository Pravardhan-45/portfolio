# Portfolio API

CRUD endpoints for saving and fetching a user's portfolio form data
(Personal Info, About Me, Education, Skills, Projects, Experience,
Certifications, Achievements, Social Links).

The module follows the same factory / dependency-injection pattern as the
`auth` module and reuses the existing JWT auth middleware, so **every route
requires a valid Bearer token** obtained from `POST /api/auth/login`.

Each user has exactly one portfolio (enforced by a unique index on `user`).

## Endpoints

Base path: `/api/portfolio`

| Method   | Path              | Description                                         |
| -------- | ----------------- | --------------------------------------------------- |
| `POST`   | `/api/portfolio`  | Create or overwrite the current user's portfolio.   |
| `GET`    | `/api/portfolio`  | Fetch the current user's portfolio.                 |
| `PUT`    | `/api/portfolio`  | Partially update (merge) the provided sections.     |
| `DELETE` | `/api/portfolio`  | Delete the current user's portfolio.                |

### Headers

```
Authorization: Bearer <token>
Content-Type: application/json
```

### Request body (POST / PUT)

```json
{
  "personalInfo": {
    "fullName": "Jane Doe",
    "email": "jane@example.com",
    "phone": "9876543210",
    "location": "Bengaluru, India",
    "profilePhoto": ""
  },
  "aboutMe": "Final year CS student and full-stack developer.",
  "education": [
    {
      "institute": "ABC University",
      "degree": "B.Tech",
      "branch": "Computer Science",
      "grade": "8.9 CGPA",
      "startYear": "2022",
      "endYear": "2026"
    }
  ],
  "skills": ["Java", "React", "Node.js", "MongoDB"],
  "projects": [
    {
      "name": "Portfolio Builder",
      "description": "AI powered portfolio generator.",
      "technologies": "React, Node, Gemini",
      "githubLink": "https://github.com/...",
      "liveLink": "https://..."
    }
  ],
  "experience": [
    {
      "company": "Acme Corp",
      "role": "Software Developer Intern",
      "startDate": "2025-05-01",
      "endDate": "2025-07-31",
      "responsibilities": "Built internal tools."
    }
  ],
  "certifications": "AWS Certified Cloud Practitioner",
  "achievements": "Winner - National Hackathon 2025",
  "socialLinks": {
    "github": "https://github.com/janedoe",
    "linkedin": "https://linkedin.com/in/janedoe",
    "portfolio": "https://janedoe.dev",
    "twitter": "https://x.com/janedoe"
  }
}
```

`skills` also accepts a single comma-separated string (`"Java, React"`) or an
array of `{ "name": "Java" }` objects — it is normalized to a string array.

### Success response

```json
{
  "success": true,
  "message": "Portfolio saved successfully",
  "portfolio": { "id": "...", "user": "...", "personalInfo": { }, "...": "..." }
}
```

### Error responses

| Status | When                                             |
| ------ | ------------------------------------------------ |
| `400`  | Body is not a valid object / no fields to update |
| `401`  | Missing or invalid auth token                    |
| `404`  | No portfolio exists for the user (GET/PUT/DELETE) |
| `500`  | Unexpected server error                          |
