// const getCpuUsageData = 'https://run.mocky.io/v3/b1bc5162-7cf2-4 599-b1f5-e3bd58fcf07f';
// const getMemoryUsageData = 'https://run.mocky.io/v3/d23c3262-967e-4567-b7f6-2fd263748811';
// const GetClusterStatusInfo = 'https://run.mocky.io/v3/cab2791c-7c85-4461-b95c-86bc1a12dc72';

describe('ElasticSearch health check functional tests', () => {
  it('should return a cpu usage data', async () => {
    const { body, status } = await global.testRequest.get(
      '/health-check/cpu-usage'
    );
    expect(status).toBe(200);
    expect(body).toEqual({
      labels: [
        '13:24',
        '13:29',
        '13:34',
        '13:39',
        '13:44',
        '13:49',
        '13:54',
        '13:59',
        '14:04',
        '14:09',
        '14:14',
        '14:19',
      ],
      data: [30, 60, 30, 30, 50, 80, 60, 50, 30, 30, 50, 30],
    });
  });
  it('should return a memory usage data', async () => {
    const { body, status } = await global.testRequest.get(
      '/health-check/memory-usage'
    );
    expect(status).toBe(200);
    expect(body).toEqual({
      labels: [
        '13:24',
        '13:29',
        '13:34',
        '13:39',
        '13:44',
        '13:49',
        '13:54',
        '13:59',
        '14:04',
        '14:09',
        '14:14',
        '14:19',
      ],
      data: [
        59.5, 59.6, 59.7, 59.900000000000006, 60.2, 60.400000000000006, 60.5,
        60.7, 60.800000000000004, 60.900000000000006, 61, 61.2,
      ],
    });
  });
  it('should return a cluster status info', async () => {
    const { body, status } = await global.testRequest.get(
      '/health-check/cluster-status'
    );
    expect(status).toBe(200);
    expect(body).toEqual({
      status: 'green',
    });
  });
});
