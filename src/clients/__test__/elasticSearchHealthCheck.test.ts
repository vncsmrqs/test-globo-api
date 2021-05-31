import ElasticSearchHealthCheck from '@src/clients/elasticSearchHealthCheck';
import axios from 'axios';

import elasticSearchHealthCheckCpuUsageFixture from '@test/fixtures/elastic_search_health_check_cpu_usage_fixture.json';
import elasticSearchHealthCheckMemoryUsageFixture from '@test/fixtures/elastic_search_health_check_memory_usage_fixture.json';
import elasticSearchHealthCheckClusterStatusInfoFixture from '@test/fixtures/elastic_search_health_check_cluster_status_info_fixture.json';

jest.mock('axios');

describe('ElasticSearch health check client', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  it('should return the normalized cpu usage data from the ElasticSearch health check service', async () => {
    mockedAxios.get.mockResolvedValue({
      data: elasticSearchHealthCheckCpuUsageFixture,
    });

    const elasticSearch = new ElasticSearchHealthCheck(axios);
    const response = await elasticSearch.fetchCpuUsage();

    expect(response).toEqual(elasticSearchHealthCheckCpuUsageFixture);
  });

  it('should return the normalized memory usage data from the ElasticSearch health check service', async () => {
    mockedAxios.get.mockResolvedValue({
      data: elasticSearchHealthCheckMemoryUsageFixture,
    });

    const elasticSearch = new ElasticSearchHealthCheck(axios);
    const response = await elasticSearch.fetchMemoryUsage();

    expect(response).toEqual(elasticSearchHealthCheckMemoryUsageFixture);
  });

  it('should return the normalized cluster status info from the ElasticSearch health check service', async () => {
    mockedAxios.get.mockResolvedValue({
      data: elasticSearchHealthCheckClusterStatusInfoFixture,
    });

    const elasticSearch = new ElasticSearchHealthCheck(axios);
    const response = await elasticSearch.fetchClusterStatus();

    expect(response).toEqual(elasticSearchHealthCheckClusterStatusInfoFixture);
  });

  it('should get a error when a invalid cpu usage data was return by service', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {},
    });

    const elasticSearch = new ElasticSearchHealthCheck(axios);
    const response = elasticSearch.fetchCpuUsage();

    await expect(response).rejects.toThrow(
      'Invalid response data returned by the ElasticSearch health check service'
    );
  });

  it('should get a error when a invalid memory usage data was return by service', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {},
    });

    const elasticSearch = new ElasticSearchHealthCheck(axios);
    const response = elasticSearch.fetchMemoryUsage();

    await expect(response).rejects.toThrow(
      'Invalid response data returned by the ElasticSearch health check service'
    );
  });

  it('should get a error when a invalid cluster status info was return by service', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {},
    });

    const elasticSearch = new ElasticSearchHealthCheck(axios);
    const response = elasticSearch.fetchClusterStatus();

    await expect(response).rejects.toThrow(
      'Invalid response data returned by the ElasticSearch health check service'
    );
  });

  it('should get a generic error from ElasticSearch health check service when the request to cpu usage data fail before reaching the service', async () => {
    mockedAxios.get.mockRejectedValue({
      message: 'Network Error',
    });

    const elasticSearch = new ElasticSearchHealthCheck(axios);
    const response = elasticSearch.fetchCpuUsage();

    await expect(response).rejects.toThrow(
      'Unexpected error when trying to communicate to ElasticSearch health check service: Network Error'
    );
  });

  it('should get a generic error from ElasticSearch health check service when the request to memory usage data fail before reaching the service', async () => {
    mockedAxios.get.mockRejectedValue({
      message: 'Network Error',
    });

    const elasticSearch = new ElasticSearchHealthCheck(axios);
    const response = elasticSearch.fetchMemoryUsage();

    await expect(response).rejects.toThrow(
      'Unexpected error when trying to communicate to ElasticSearch health check service: Network Error'
    );
  });

  it('should get a generic error from ElasticSearch health check service when the request to cluster status info fail before reaching the service', async () => {
    mockedAxios.get.mockRejectedValue({
      message: 'Network Error',
    });

    const elasticSearch = new ElasticSearchHealthCheck(axios);
    const response = elasticSearch.fetchClusterStatus();

    await expect(response).rejects.toThrow(
      'Unexpected error when trying to communicate to ElasticSearch health check service: Network Error'
    );
  });
});
