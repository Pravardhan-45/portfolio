function createPrompt(portfolio, jd) {
    return `
Portfolio Data:
${JSON.stringify(portfolio, null, 2)}

Job Description:
${jd}

Analyze this portfolio for the given job description.

CRITICAL INSTRUCTION: You MUST return ONLY valid JSON matching this exact structure. 
Do not include any extra text, markdown blocks, or explanation. 
"highlightSkills", "missingSkills", and "recommendedProjects" MUST be arrays of strings.

{
  "highlightSkills": ["skill1", "skill2"],
  "missingSkills": ["skill3"],
  "recommendedProjects": ["Project description 1"],
  "generatedSummary": "A brief summary"
}
`;
}

module.exports = createPrompt;