import elasticSearchHealthCheckCpuUsageFixture from '@test/fixtures/elastic_search_health_check_cpu_usage_fixture.json';
import elasticSearchHealthCheckMemoryUsageFixture from '@test/fixtures/elastic_search_health_check_memory_usage_fixture.json';
import elasticSearchHealthCheckClusterStatusInfoFixture from '@test/fixtures/elastic_search_health_check_cluster_status_info_fixture.json';
import healthNormalizedFixture from '@test/fixtures/health_normalized_fixture.json';

import { ElasticSearchHealthCheck } from '@src/clients/elasticSearchHealthCheck';
import { HealthCheck } from '@src/services/health-check';

jest.mock('@src/clients/elasticSearchHealthCheck');

describe('Forecast Service', () => {
  it('should return health metrics', async () => {
    ElasticSearchHealthCheck.prototype.fetchCpuUsage = jest
      .fn()
      .mockResolvedValue(elasticSearchHealthCheckCpuUsageFixture);

    ElasticSearchHealthCheck.prototype.fetchMemoryUsage = jest
      .fn()
      .mockResolvedValue(elasticSearchHealthCheckMemoryUsageFixture);

    ElasticSearchHealthCheck.prototype.fetchClusterStatus = jest
      .fn()
      .mockResolvedValue(elasticSearchHealthCheckClusterStatusInfoFixture);

    const healthCheck = new HealthCheck(new ElasticSearchHealthCheck());

    const healthMetrics = await healthCheck.getHealthMetrics();

    expect(healthMetrics).toEqual(healthNormalizedFixture);
  });
});
