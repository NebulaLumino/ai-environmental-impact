import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { projectType, projectName, location, size, constructionTimeline, operationPhase, affectedEcosystems, mitigationMeasures, description } = await req.json();

    const prompt = `You are an AI expert in Environmental Impact Assessment (EIA) and NEPA compliance. Generate a comprehensive Environmental Impact Statement (EIS) draft based on the following project details.

Project Details:
- Project Name: ${projectName}
- Project Type: ${projectType}
- Location: ${location}
- Project Size: ${size}
- Construction Timeline: ${constructionTimeline}
- Operation Phase: ${operationPhase}
- Affected Ecosystems: ${affectedEcosystems}
- Proposed Mitigation Measures: ${mitigationMeasures}
- Additional Notes: ${description}

Please generate a structured Environmental Impact Statement draft including:

1. **Executive Summary** (2-3 paragraphs)
2. **Project Description** (purpose, need, alternatives considered)
3. **Affected Environment** (baseline environmental conditions)
4. **Environmental Consequences** (direct, indirect, and cumulative impacts on: air quality, water resources, soil, vegetation, wildlife, noise, cultural resources)
5. **Mitigation Measures** (specific actions to avoid, minimize, or compensate impacts)
6. **Monitoring Plan** (how mitigation effectiveness will be tracked)
7. **Conclusion & Recommendations**
8. **Regulatory Compliance Checklist** (NEPA, Clean Air Act, Clean Water Act, Endangered Species Act)

Use professional EIA language. Include placeholder data where site-specific information is unavailable (e.g., [SPECIFY TERRITORIES]).`;

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1800,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error: 'DeepSeek API error', details: error }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || 'No response generated.';

    return NextResponse.json({ result: content });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Server error', details: message }, { status: 500 });
  }
}
