function createPrompt(portfolio, jd) {
  return `
Portfolio Data:
${JSON.stringify(portfolio, null, 2)}

Job Description:
${jd}

Analyze this portfolio comprehensively for the given job description.

CRITICAL INSTRUCTION: Return ONLY valid JSON. No markdown, no extra text, no explanation.
All array fields MUST contain arrays of plain strings.

--- SKILL MATCHING GUIDELINES ---
When identifying "highlightSkills", consider ALL categories of technical skills:
- Programming Languages: Java, Python, C++, JavaScript, TypeScript, Go, Kotlin, Swift, etc.
- Frameworks & Libraries: Spring Boot, React, Angular, Node.js, Django, Flask, Hibernate, etc.
- Databases: MySQL, PostgreSQL, MongoDB, Redis, Oracle, MS SQL Server, Cassandra, etc.
- Cloud & DevOps: AWS, Azure, GCP, Docker, Kubernetes, Jenkins, CI/CD, Terraform, etc.
- Tools & Platforms: Git, Maven, Gradle, Postman, Jira, Linux, REST APIs, GraphQL, etc.
- Data Structures & Algorithms: DSA, competitive programming, problem solving, LeetCode, etc.
- Security: OAuth2, JWT, Spring Security, SSL/TLS, authentication, authorization, etc.
- Architecture: Microservices, MVC, REST, SOAP, Event-driven, Design Patterns, SOLID, etc.
- Testing: JUnit, Mockito, Selenium, Jest, Cypress, unit testing, integration testing, etc.
- Other Technical: Agile, Scrum, OOP, multithreading, concurrency, system design, etc.

For "missingSkills": List skills mentioned in the JD that are NOT found in the portfolio at all.

For "recommendedProjects": Suggest 2 practical projects that would help demonstrate missing skills.

For "learningResources": For EACH skill listed in "missingSkills", provide 2-3 real, well-known learning links to help the candidate learn it. Prefer famous, reputable sources: official documentation, MDN, freeCodeCamp, popular YouTube tutorials, or well-known course platforms (Coursera, Udemy, etc.). Each link MUST be a real, working URL. Structure it as an array of objects, one object per missing skill, each with a "skill" string and a "resources" array of { "title", "url" } objects. Return an empty array [] if there are no missing skills.

For "relevantAchievements": Review the portfolio achievements field and include:
- Competitive programming achievements (LeetCode rating/badges, HackerRank, Codeforces, etc.)
- Hackathon wins or rankings
- Open source contributions
- Certifications relevant to the JD
- Academic honors or rankings that imply technical aptitude
- Any professional recognition
Return an empty array [] if no achievements field exists or none are relevant.

For "generatedSummary": Write in FIRST PERSON as the candidate themselves.
- Start with "I am [name]" or "As a [role], I..."
- Highlight their STRONGEST skills that directly match the JD
- Sound confident, professional, and genuine
- NEVER say "The candidate" or use third-person
- Keep it to 2-3 impactful sentences

{
  "highlightSkills": ["skill1", "skill2"],
  "missingSkills": ["skill3"],
  "learningResources": [
    { "skill": "skill3", "resources": [{ "title": "Official Docs", "url": "https://example.com/docs" }, { "title": "freeCodeCamp Tutorial", "url": "https://youtube.com/watch?v=xxxx" }] }
  ],
  "recommendedProjects": ["Project description 1"],
  "relevantAchievements": ["Achievement relevant to JD"],
  "generatedSummary": "I am a passionate [role] with expertise in [skills]..."
}
`;
}

module.exports = createPrompt;
