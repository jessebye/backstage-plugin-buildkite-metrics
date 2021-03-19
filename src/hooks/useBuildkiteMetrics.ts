import { useAsync } from 'react-use';
import { configApiRef, useApi } from '@backstage/core';

import { PipelineData } from '../components/types';
import * as _ from 'lodash';

export const useBuildkiteMetrics = (name: string, owner: string) => {
  const config = useApi(configApiRef);
  const backendUrl = config.getString('backend.baseUrl');
  const { value, loading, error } = useAsync(async (): Promise<
    PipelineData
  > => {
    const response = await fetch(`${backendUrl}/api/proxy/buildkite/graphql/`, {
      method: 'POST',
      body: JSON.stringify({
        query: `
{
  organization(slug: "${owner}") {
    id
    name
    pipelines(first: 1, repository: {url:"git@github.com:${owner}/${name}.git"}) {
      edges {
        node {
          slug
          metrics {
            edges {
              node {
                label
                value
              }
            }
          }
        }
      }
    }
  }
}
        `,
      }),
    });
    const data = await response.json();
    const metrics = _.chain(data)
      .get('data.organization.pipelines.edges[0].node.metrics.edges', [])
      // @ts-ignore
      .map((node: { node: any }) => node.node)
      .keyBy('label')
      .mapValues((metric: { value: string }) => metric.value)
      .value();
    return {
      ...metrics,
      Slug: _.get(data, 'data.organization.pipelines.edges[0].node.slug', ''),
    };
  }, []);

  return {
    value,
    loading,
    error,
  };
};
