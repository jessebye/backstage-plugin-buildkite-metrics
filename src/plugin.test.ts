import { buildkiteMetricsPlugin } from './plugin';

describe('buildkite-metrics', () => {
  it('should export plugin', () => {
    expect(buildkiteMetricsPlugin).toBeDefined();
  });
});
