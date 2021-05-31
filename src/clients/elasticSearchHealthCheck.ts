import { AxiosStatic } from 'axios';
import {InternalError} from "@src/utils/errors/internal-error";
import {UserInfo} from "os";

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

export class ClientRequestError extends InternalError {
  constructor(message: string) {
    const internalMessage = 'Unexpected error when trying to communicate to ElasticSearch health check service';
    super(`${internalMessage}${message ? ': ' + message : ''}`);
  }
}

export class InvalidElasticSearchHealthCheckResponseError extends InternalError {
  constructor(message: string = '') {
    const internalMessage = 'Invalid response data returned by the ElasticSearch health check service';
    super(`${internalMessage}${message ? ': ' + message : ''}`);
  }
}

export class ElasticSearchHealthCheckResponseError extends InternalError {
  constructor(message: string = '') {
    const internalMessage = 'Unexpected error returned by the ElasticSearch health check service';
    super(`${internalMessage}${message ? ': ' + message : ''}`);
  }
}

export class ElasticSearchHealthCheck {
  constructor(protected request: AxiosStatic) {}

  public fetchCpuUsage = async (): Promise<UsageGraph> => {
    try {
      const response = await this.request.get<UsageGraphResponse>(
        fetchCpuUsageDataEndpoint
      );
      return this.normalizeUsageGraphResponse(response.data);
    } catch (e) {
      if (e.response && e.response.status) {
        throw new ElasticSearchHealthCheckResponseError(`Error ${JSON.stringify(e.response.data)} Code: ${e.response.status}`);
      }
      throw new ClientRequestError(e.message);
    }
  };

  public fetchMemoryUsage = async (): Promise<UsageGraph> => {
    try {
    const response = await this.request.get<UsageGraphResponse>(
      fetchMemoryUsageDataEndpoint
    );
    return this.normalizeUsageGraphResponse(response.data);
    } catch (e) {
      if (e.response && e.response.status) {
        throw new ElasticSearchHealthCheckResponseError(`Error ${JSON.stringify(e.response.data)} Code: ${e.response.status}`);
      }
      throw new ClientRequestError(e.message);
    }
  };

  public fetchClusterStatus = async (): Promise<ClusterStatus> => {
    try {
      const response = await this.request.get<ClusterStatusResponse>(
        fetchClusterStatusInfoEndpoint
      );
      return this.normalizeClusterStatusResponse(response.data);
    } catch (e) {
      if (e.response && e.response.status) {
        throw new ElasticSearchHealthCheckResponseError(`Error ${JSON.stringify(e.response.data)} Code: ${e.response.status}`);
      }
      throw new ClientRequestError(e.message);
    }
  };

  private normalizeUsageGraphResponse = (
    response: UsageGraphResponse
  ): UsageGraph => {
    if (!this.isValidUsageGraph(response)) {
      throw new InvalidElasticSearchHealthCheckResponseError();
    }
    return {
      labels: response.labels,
      data: response.data,
    };
  };

  private isValidUsageGraph = (graph: Partial<UsageGraph>) => {
    return !!(graph.labels && graph.data);
  };

  private normalizeClusterStatusResponse = (
    response: ClusterStatusResponse
  ): ClusterStatus => {
    if (!this.isValidClusterStatus(response)) {
      throw new InvalidElasticSearchHealthCheckResponseError();
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
