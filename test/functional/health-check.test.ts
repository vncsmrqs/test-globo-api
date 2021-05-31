import healthNormalizedFixture from '@test/fixtures/health_normalized_fixture.json';

describe('Health check functional tests', () => {
  it('should a health normalized data', async () => {
    const { body, status } = await global.testRequest.get('/health-check');
    expect(status).toBe(200);
    expect(body).toEqual(healthNormalizedFixture);
  });
});
