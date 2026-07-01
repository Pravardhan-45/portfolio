function createPrompt(portfolio, jd) {
    return `
Portfolio Data:
${JSON.stringify(portfolio, null, 2)}

Job Description:
${jd}

Analyze this portfolio for the given job description.

Return ONLY JSON in this format:

{
  "highlightSkills": [],
  "missingSkills": [],
  "recommendedProjects": [],
  "generatedSummary": ""
}
`;
}

module.exports = createPrompt;