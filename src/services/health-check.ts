import ElasticSearchHealthCheck, {
  ClusterStatus,
  UsageGraph,
} from '@src/clients/elasticSearchHealthCheck';

export interface HealthMetrics {
  cpu: UsageGraph;
  memory: UsageGraph;
  cluster: ClusterStatus;
}

export class HealthCheck {
  constructor(
    protected elasticSearchHealthCheck = new ElasticSearchHealthCheck()
  ) {}

  public async getHealthMetrics(): Promise<HealthMetrics> {
    const cpu = await this.elasticSearchHealthCheck.fetchCpuUsage();
    const memory = await this.elasticSearchHealthCheck.fetchMemoryUsage();
    const cluster = await this.elasticSearchHealthCheck.fetchClusterStatus();

    return { cpu, memory, cluster };
  }
}
