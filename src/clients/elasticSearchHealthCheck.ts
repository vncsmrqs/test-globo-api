import { InternalError } from '@src/utils/errors/internal-error';
import * as HTTPUtil from '@src/utils/request';

import config, { IConfig } from 'config';

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
    const internalMessage =
      'Unexpected error when trying to communicate to ElasticSearch health check service';
    super(`${internalMessage}${message ? ': ' + message : ''}`);
  }
}

export class InvalidElasticSearchHealthCheckResponseError extends InternalError {
  constructor(message = '') {
    const internalMessage =
      'Invalid response data returned by the ElasticSearch health check service';
    super(`${internalMessage}${message ? ': ' + message : ''}`);
  }
}

export class ElasticSearchHealthCheckResponseError extends InternalError {
  constructor(message = '') {
    const internalMessage =
      'Unexpected error returned by the ElasticSearch health check service';
    super(`${internalMessage}${message ? ': ' + message : ''}`);
  }
}

const elasticSearchHealthCheckResourceConfig: IConfig = config.get(
  'App.resources.ElasticSearchHealthCheck'
);

export class ElasticSearchHealthCheck {
  constructor(protected request = new HTTPUtil.Request()) {}

  public async fetchCpuUsage(): Promise<UsageGraph> {
    try {
      const response = await this.request.get<UsageGraphResponse>(
        `${elasticSearchHealthCheckResourceConfig.get(
          'apiUrl'
        )}/b1bc5162-7cf2-4599-b1f5-e3bd58fcf07f`
      );
      return this.normalizeUsageGraphResponse(response.data);
    } catch (e) {
      /**
       * This is handling the Axios erros specifically
       */
      if (HTTPUtil.Request.isRequestError(e)) {
        throw new ElasticSearchHealthCheckResponseError(
          `Error ${JSON.stringify(e.response.data)} Code: ${e.response.status}`
        );
      }
      throw new ClientRequestError(e.message);
    }
  };

  public async fetchMemoryUsage(): Promise<UsageGraph> {
    try {
      const response = await this.request.get<UsageGraphResponse>(
        `${elasticSearchHealthCheckResourceConfig.get(
          'apiUrl'
        )}/d23c3262-967e-4567-b7f6-2fd263748811`
      );
      return this.normalizeUsageGraphResponse(response.data);
    } catch (e) {
      /**
       * This is handling the Axios erros specifically
       */
      if (HTTPUtil.Request.isRequestError(e)) {
        throw new ElasticSearchHealthCheckResponseError(
          `Error ${JSON.stringify(e.response.data)} Code: ${e.response.status}`
        );
      }
      throw new ClientRequestError(e.message);
    }
  };

  public async fetchClusterStatus(): Promise<ClusterStatus> {
    try {
      const response = await this.request.get<ClusterStatusResponse>(
        `${elasticSearchHealthCheckResourceConfig.get(
          'apiUrl'
        )}/cab2791c-7c85-4461-b95c-86bc1a12dc72`
      );
      return this.normalizeClusterStatusResponse(response.data);
    } catch (e) {
      /**
       * This is handling the Axios erros specifically
       */
      if (HTTPUtil.Request.isRequestError(e)) {
        throw new ElasticSearchHealthCheckResponseError(
          `Error ${JSON.stringify(e.response.data)} Code: ${e.response.status}`
        );
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
