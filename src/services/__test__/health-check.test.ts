import elasticSearchHealthCheckCpuUsageFixture from '@test/fixtures/elastic_search_health_check_cpu_usage_fixture.json';
import elasticSearchHealthCheckMemoryUsageFixture from '@test/fixtures/elastic_search_health_check_memory_usage_fixture.json';
import elasticSearchHealthCheckClusterStatusInfoFixture from '@test/fixtures/elastic_search_health_check_cluster_status_info_fixture.json';
import healthNormalizedFixture from '@test/fixtures/health_normalized_fixture.json';

import { ElasticSearchHealthCheck } from '@src/clients/elasticSearchHealthCheck';
import { HealthCheck } from '@src/services/health-check';

jest.mock('@src/clients/elasticSearchHealthCheck');

describe('Health Check Service', () => {
  const mockedElasticSearchHealthCheck =
    new ElasticSearchHealthCheck() as jest.Mocked<ElasticSearchHealthCheck>;

  it('should return health metrics', async () => {
    mockedElasticSearchHealthCheck.fetchCpuUsage.mockResolvedValue(
      elasticSearchHealthCheckCpuUsageFixture
    );

    mockedElasticSearchHealthCheck.fetchMemoryUsage.mockResolvedValue(
      elasticSearchHealthCheckMemoryUsageFixture
    );

    mockedElasticSearchHealthCheck.fetchClusterStatus.mockResolvedValue(
      elasticSearchHealthCheckClusterStatusInfoFixture
    );

    const healthCheck = new HealthCheck(mockedElasticSearchHealthCheck);

    const healthMetrics = await healthCheck.getHealthMetrics();

    expect(healthMetrics).toEqual(healthNormalizedFixture);
  });
});
