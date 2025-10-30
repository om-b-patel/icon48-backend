import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface OpenAITaskResult {
  success: boolean;
  output?: string;
  error?: string;
  tokensUsed: number;
  costUsd: number;
}

/**
 * Execute OpenAI task
 */
export async function executeOpenAITask(
  taskType: string,
  input: Record<string, any>
): Promise<OpenAITaskResult> {
  try {
    switch (taskType) {
      case 'summarize':
        return await summarizeText(input.text);
      case 'generate':
        return await generateText(input.prompt);
      case 'analyze':
        return await analyzeText(input.text);
      default:
        throw new Error(`Unknown task type: ${taskType}`);
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      tokensUsed: 0,
      costUsd: 0,
    };
  }
}

/**
 * Summarize text using OpenAI
 */
async function summarizeText(text: string): Promise<OpenAITaskResult> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant that summarizes text concisely.',
      },
      {
        role: 'user',
        content: `Please summarize the following text:\n\n${text}`,
      },
    ],
    temperature: 0.5,
    max_tokens: 500,
  });

  const output = response.choices[0]?.message?.content || '';
  const tokensUsed = response.usage?.total_tokens || 0;
  const costUsd = calculateOpenAICost('gpt-4', tokensUsed);

  return {
    success: true,
    output,
    tokensUsed,
    costUsd,
  };
}

/**
 * Generate text using OpenAI
 */
async function generateText(prompt: string): Promise<OpenAITaskResult> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 1000,
  });

  const output = response.choices[0]?.message?.content || '';
  const tokensUsed = response.usage?.total_tokens || 0;
  const costUsd = calculateOpenAICost('gpt-4', tokensUsed);

  return {
    success: true,
    output,
    tokensUsed,
    costUsd,
  };
}

/**
 * Analyze text using OpenAI
 */
async function analyzeText(text: string): Promise<OpenAITaskResult> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content:
          'You are an expert analyst. Analyze the following text and provide insights.',
      },
      {
        role: 'user',
        content: text,
      },
    ],
    temperature: 0.3,
    max_tokens: 800,
  });

  const output = response.choices[0]?.message?.content || '';
  const tokensUsed = response.usage?.total_tokens || 0;
  const costUsd = calculateOpenAICost('gpt-4', tokensUsed);

  return {
    success: true,
    output,
    tokensUsed,
    costUsd,
  };
}

/**
 * Calculate OpenAI API cost
 */
function calculateOpenAICost(model: string, tokens: number): number {
  // Pricing as of GPT-4 (adjust based on actual pricing)
  const pricing: Record<string, { input: number; output: number }> = {
    'gpt-4': { input: 0.03, output: 0.06 }, // per 1K tokens
    'gpt-3.5-turbo': { input: 0.0015, output: 0.002 },
  };

  const rate = pricing[model] || pricing['gpt-3.5-turbo'];
  // Simplified calculation (assuming 50/50 input/output)
  const avgRate = (rate.input + rate.output) / 2;
  const cost = (tokens / 1000) * avgRate;

  return parseFloat(cost.toFixed(4));
}


