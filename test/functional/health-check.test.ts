import elasticSearchHealthCheckCpuUsageFixture from '@test/fixtures/elastic_search_health_check_cpu_usage_fixture.json';
import elasticSearchHealthCheckMemoryUsageFixture from '@test/fixtures/elastic_search_health_check_memory_usage_fixture.json';
import elasticSearchHealthCheckClusterStatusInfoFixture from '@test/fixtures/elastic_search_health_check_cluster_status_info_fixture.json';

describe('ElasticSearch health check functional tests', () => {
  it('should return a cpu usage data', async () => {
    const { body, status } = await global.testRequest.get(
      '/health-check/cpu-usage'
    );
    expect(status).toBe(200);
    expect(body).toEqual(elasticSearchHealthCheckCpuUsageFixture);
  });

  it('should return a memory usage data', async () => {
    const { body, status } = await global.testRequest.get(
      '/health-check/memory-usage'
    );
    expect(status).toBe(200);
    expect(body).toEqual(elasticSearchHealthCheckMemoryUsageFixture);
  });

  it('should return a cluster status info', async () => {
    const { body, status } = await global.testRequest.get(
      '/health-check/cluster-status'
    );
    expect(status).toBe(200);
    expect(body).toEqual(elasticSearchHealthCheckClusterStatusInfoFixture);
  });
});
