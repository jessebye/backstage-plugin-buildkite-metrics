import { ComponentEntity } from '@backstage/catalog-model';

export const entity: ComponentEntity = {
  apiVersion: 'backstage.io/v1alpha1',
  kind: 'Component',
  metadata: {
    name: 'artists',
    description: 'Everything about artists',
  },
  spec: {
    type: 'service',
    lifecycle: 'experimental',
    owner: 'test',
  },
};
