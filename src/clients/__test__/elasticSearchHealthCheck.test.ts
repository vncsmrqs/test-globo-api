import ElasticSearchHealthCheck from '@src/clients/elasticSearchHealthCheck';
import axios from 'axios';

import elasticSearchHealthCheckCpuUsageFixture from '@test/fixtures/elastic_search_health_check_cpu_usage_fixture.json';
import elasticSearchHealthCheckMemoryUsageFixture from '@test/fixtures/elastic_search_health_check_memory_usage_fixture.json';
import elasticSearchHealthCheckClusterStatusInfoFixture from '@test/fixtures/elastic_search_health_check_cluster_status_info_fixture.json';

jest.mock('axios');

describe('ElasticSearch health check client', () => {
  it('should return the normalized cpu usage data from the ElasticSearch health check service', async () => {
    axios.get = jest
      .fn()
      .mockResolvedValue({ data: elasticSearchHealthCheckCpuUsageFixture });

    const elasticSearch = new ElasticSearchHealthCheck(axios);
    const response = await elasticSearch.fetchCpuUsage();

    expect(response).toEqual(elasticSearchHealthCheckCpuUsageFixture);
  });

  it('should return the normalized memory usage data from the ElasticSearch health check service', async () => {
    axios.get = jest
      .fn()
      .mockResolvedValue({ data: elasticSearchHealthCheckMemoryUsageFixture });

    const elasticSearch = new ElasticSearchHealthCheck(axios);
    const response = await elasticSearch.fetchMemoryUsage();

    expect(response).toEqual(elasticSearchHealthCheckMemoryUsageFixture);
  });

  it('should return the normalized cluster status info from the ElasticSearch health check service', async () => {
    axios.get = jest.fn().mockResolvedValue({
      data: elasticSearchHealthCheckClusterStatusInfoFixture,
    });

    const elasticSearch = new ElasticSearchHealthCheck(axios);
    const response = await elasticSearch.fetchClusterStatus();

    expect(response).toEqual(elasticSearchHealthCheckClusterStatusInfoFixture);
  });
});
