import axios, { AxiosInstance } from 'axios';

export interface N8nWorkflow {
  id: string;
  name: string;
  active: boolean;
  nodes: any[];
  connections: any;
}

export interface N8nExecution {
  id: string;
  finished: boolean;
  mode: string;
  startedAt: string;
  stoppedAt?: string;
  workflowId: string;
  data: {
    resultData: {
      runData: any;
    };
  };
}

export class N8nClient {
  private client: AxiosInstance;

  constructor(
    baseURL: string = process.env.N8N_API_URL || 'http://localhost:5678',
    apiKey: string = process.env.N8N_API_KEY || ''
  ) {
    this.client = axios.create({
      baseURL: `${baseURL}/api/v1`,
      headers: {
        'X-N8N-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * List all workflows
   */
  async listWorkflows(): Promise<N8nWorkflow[]> {
    const response = await this.client.get('/workflows');
    return response.data.data;
  }

  /**
   * Get workflow by ID
   */
  async getWorkflow(id: string): Promise<N8nWorkflow> {
    const response = await this.client.get(`/workflows/${id}`);
    return response.data;
  }

  /**
   * Create new workflow
   */
  async createWorkflow(workflow: Partial<N8nWorkflow>): Promise<N8nWorkflow> {
    const response = await this.client.post('/workflows', workflow);
    return response.data;
  }

  /**
   * Update workflow
   */
  async updateWorkflow(
    id: string,
    workflow: Partial<N8nWorkflow>
  ): Promise<N8nWorkflow> {
    const response = await this.client.patch(`/workflows/${id}`, workflow);
    return response.data;
  }

  /**
   * Delete workflow
   */
  async deleteWorkflow(id: string): Promise<void> {
    await this.client.delete(`/workflows/${id}`);
  }

  /**
   * Execute workflow
   */
  async executeWorkflow(
    id: string,
    data?: Record<string, any>
  ): Promise<N8nExecution> {
    const response = await this.client.post(`/workflows/${id}/execute`, {
      data,
    });
    return response.data;
  }

  /**
   * Get execution details
   */
  async getExecution(id: string): Promise<N8nExecution> {
    const response = await this.client.get(`/executions/${id}`);
    return response.data;
  }

  /**
   * List executions for workflow
   */
  async listExecutions(workflowId: string): Promise<N8nExecution[]> {
    const response = await this.client.get('/executions', {
      params: { workflowId },
    });
    return response.data.data;
  }
}

export const n8nClient = new N8nClient();


