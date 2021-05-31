import { AxiosStatic } from 'axios';

const fetchCpuUsageDataEndpoint =
  'https://run.mocky.io/v3/b1bc5162-7cf2-4 599-b1f5-e3bd58fcf07f';
const fetchMemoryUsageDataEndpoint =
  'https://run.mocky.io/v3/d23c3262-967e-4567-b7f6-2fd263748811';
const fetchClusterStatusInfoEndpoint =
  'https://run.mocky.io/v3/cab2791c-7c85-4461-b95c-86bc1a12dc72';

export class ElasticSearchHealthCheck {
  constructor(protected request: AxiosStatic) {}

  public fetchCpuUsage = async (): Promise<{}> => {
    return this.request.get(fetchCpuUsageDataEndpoint);
  };

  public fetchMemoryUsage = async (): Promise<{}> => {
    return this.request.get(fetchMemoryUsageDataEndpoint);
  };

  public fetchClusterStatus = async (): Promise<{}> => {
    return this.request.get(fetchClusterStatusInfoEndpoint);
  };
}

export default ElasticSearchHealthCheck;
