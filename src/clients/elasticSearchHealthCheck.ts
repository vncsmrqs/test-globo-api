import { AxiosStatic } from 'axios';

const fetchCpuUsageDataEndpoint =
  'https://run.mocky.io/v3/b1bc5162-7cf2-4 599-b1f5-e3bd58fcf07f';
const fetchMemoryUsageDataEndpoint =
  'https://run.mocky.io/v3/d23c3262-967e-4567-b7f6-2fd263748811';
const fetchClusterStatusInfoEndpoint =
  'https://run.mocky.io/v3/cab2791c-7c85-4461-b95c-86bc1a12dc72';

export interface UsageGraphResponse {
  labels: string[];
  data: number[];
}

export interface ClusterStatusResponse {
  status: string;
}

export interface UsageGraph {
  labels: string[];
  data: number[];
}

export interface ClusterStatus {
  status: string;
}

export class ElasticSearchHealthCheck {
  constructor(protected request: AxiosStatic) {}

  public fetchCpuUsage = async (): Promise<UsageGraph> => {
    const response = await this.request.get<UsageGraphResponse>(
      fetchCpuUsageDataEndpoint
    );
    return this.normalizeUsageGraphResponse(response.data);
  };

  public fetchMemoryUsage = async (): Promise<UsageGraph> => {
    const response = await this.request.get<UsageGraphResponse>(
      fetchMemoryUsageDataEndpoint
    );
    return this.normalizeUsageGraphResponse(response.data);
  };

  public fetchClusterStatus = async (): Promise<ClusterStatus> => {
    const response = await this.request.get<ClusterStatusResponse>(
      fetchClusterStatusInfoEndpoint
    );
    return this.normalizeClusterStatusResponse(response.data);
  };

  private normalizeUsageGraphResponse = (
    response: UsageGraphResponse
  ): UsageGraph => {
    if (!this.isValidUsageGraph(response)) {
      throw Error();
    }
    return {
      labels: response.labels || [],
      data: response.data || [],
    };
  };

  private isValidUsageGraph = (graph: Partial<UsageGraph>) => {
    return !!(graph.labels && graph.data);
  };

  private normalizeClusterStatusResponse = (
    response: ClusterStatusResponse
  ): ClusterStatus => {
    if (!this.isValidClusterStatus(response)) {
      throw Error();
    }
    return {
      status: response.status,
    };
  };

  private isValidClusterStatus = (graph: Partial<ClusterStatus>) => {
    return !!graph.status;
  };
}

export default ElasticSearchHealthCheck;
