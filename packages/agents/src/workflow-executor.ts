import { prisma } from '@icon48/db';
import { n8nClient } from './n8n-client';

export interface WorkflowExecutionResult {
  success: boolean;
  output?: any;
  error?: string;
  costUsd: number;
  durationMs: number;
}

/**
 * Execute workflow via n8n
 */
export async function executeWorkflow(
  workflow: any,
  runId: string,
  input?: Record<string, any>
): Promise<WorkflowExecutionResult> {
  const startTime = Date.now();

  try {
    // Update run status
    await prisma.workflowRun.update({
      where: { id: runId },
      data: { status: 'running' },
    });

    let result;

    if (workflow.n8nWorkflowId) {
      // Execute via n8n
      const execution = await n8nClient.executeWorkflow(
        workflow.n8nWorkflowId,
        input
      );

      // Wait for completion (simplified - in production use polling or webhooks)
      await new Promise(resolve => setTimeout(resolve, 2000));

      const executionDetails = await n8nClient.getExecution(execution.id);
      result = executionDetails.data.resultData;
    } else {
      // Execute built-in workflow logic
      result = await executeBuiltInWorkflow(workflow, input);
    }

    const durationMs = Date.now() - startTime;
    const costUsd = calculateWorkflowCost(workflow, durationMs);

    await prisma.workflowRun.update({
      where: { id: runId },
      data: {
        status: 'completed',
        output: result,
        costUsd,
        durationMs,
        completedAt: new Date(),
      },
    });

    return {
      success: true,
      output: result,
      costUsd,
      durationMs,
    };
  } catch (error) {
    const durationMs = Date.now() - startTime;
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';

    await prisma.workflowRun.update({
      where: { id: runId },
      data: {
        status: 'failed',
        error: errorMessage,
        durationMs,
        completedAt: new Date(),
      },
    });

    return {
      success: false,
      error: errorMessage,
      costUsd: 0,
      durationMs,
    };
  }
}

/**
 * Execute built-in workflow without n8n
 */
async function executeBuiltInWorkflow(
  workflow: any,
  input?: Record<string, any>
): Promise<any> {
  // This is a placeholder for built-in workflow execution
  // In production, implement specific workflow logic here
  
  console.log(`Executing built-in workflow: ${workflow.name}`);
  console.log('Input:', input);

  // Example: Simple data transformation
  return {
    status: 'success',
    message: `Workflow ${workflow.name} executed successfully`,
    input,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Calculate estimated cost for workflow execution
 */
function calculateWorkflowCost(workflow: any, durationMs: number): number {
  // Base cost per execution
  let cost = 0.001;

  // Add duration-based cost (per minute)
  const minutes = durationMs / 60000;
  cost += minutes * 0.0001;

  // Add complexity-based cost
  const config = workflow.config || {};
  if (config.complexity === 'high') {
    cost *= 2;
  }

  return parseFloat(cost.toFixed(4));
}

/**
 * Create example n8n workflow template
 */
export async function createExampleWorkflow(
  workspaceId: string
): Promise<any> {
  // Create workflow in database
  const workflow = await prisma.workflow.create({
    data: {
      workspaceId,
      name: 'Google Sheets → Summarize → Slack',
      description: 'Read data from Google Sheets, summarize with AI, send to Slack',
      triggerType: 'manual',
      config: {
        nodes: [
          {
            type: 'googleSheets',
            operation: 'read',
            sheetId: 'SHEET_ID',
          },
          {
            type: 'openai',
            operation: 'summarize',
            model: 'gpt-4',
          },
          {
            type: 'slack',
            operation: 'sendMessage',
            channel: '#general',
          },
        ],
      },
      active: false,
    },
  });

  // Optionally create in n8n
  try {
    const n8nWorkflow = await n8nClient.createWorkflow({
      name: workflow.name,
      active: false,
      nodes: [
        {
          parameters: {},
          name: 'Start',
          type: 'n8n-nodes-base.start',
          typeVersion: 1,
          position: [250, 300],
        },
        {
          parameters: {
            operation: 'read',
          },
          name: 'Google Sheets',
          type: 'n8n-nodes-base.googleSheets',
          typeVersion: 2,
          position: [450, 300],
        },
        {
          parameters: {
            operation: 'complete',
            model: 'gpt-4',
          },
          name: 'OpenAI',
          type: 'n8n-nodes-base.openAi',
          typeVersion: 1,
          position: [650, 300],
        },
        {
          parameters: {
            operation: 'postMessage',
          },
          name: 'Slack',
          type: 'n8n-nodes-base.slack',
          typeVersion: 1,
          position: [850, 300],
        },
      ],
      connections: {
        Start: {
          main: [[{ node: 'Google Sheets', type: 'main', index: 0 }]],
        },
        'Google Sheets': {
          main: [[{ node: 'OpenAI', type: 'main', index: 0 }]],
        },
        OpenAI: {
          main: [[{ node: 'Slack', type: 'main', index: 0 }]],
        },
      },
    });

    await prisma.workflow.update({
      where: { id: workflow.id },
      data: { n8nWorkflowId: n8nWorkflow.id },
    });
  } catch (error) {
    console.error('Failed to create n8n workflow:', error);
  }

  return workflow;
}


