import { createComponentExtension, createPlugin } from '@backstage/core';

import { rootRouteRef } from './routes';

export const buildkiteMetricsPlugin = createPlugin({
  id: 'buildkite-metrics',
  routes: {
    root: rootRouteRef,
  },
});

export const EntityPipelineMetricsCard = buildkiteMetricsPlugin.provide(
  createComponentExtension({
    component: {
      lazy: () =>
        import('./components/Widgets/index').then(m => m.PipelineMetricsCard),
    },
  }),
);
