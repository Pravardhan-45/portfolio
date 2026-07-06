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

For "generatedSummary": Write it in FIRST PERSON as if the candidate wrote it themselves.
- Start with "I am [name]" or "As a [role], I..."
- Highlight their strongest skills that match the JD
- Sound confident, professional, and personal - like a real cover letter summary
- Do NOT say "The candidate" or "Aare Pravardhan" in third person
- Keep it to 2-3 sentences maximum

{
  "highlightSkills": ["skill1", "skill2"],
  "missingSkills": ["skill3"],
  "recommendedProjects": ["Project description 1"],
  "generatedSummary": "I am a passionate [role] with expertise in [skills], experienced in building [relevant work]..."
}
`;
}

module.exports = createPrompt;