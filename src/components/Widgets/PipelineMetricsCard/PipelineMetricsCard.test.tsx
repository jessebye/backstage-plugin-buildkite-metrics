import React from 'react';
import { render } from '@testing-library/react';
import PipelineMetricsCard from './PipelineMetricsCard';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { msw } from '@backstage/test-utils';
import { ApiProvider, ApiRegistry, configApiRef } from '@backstage/core';
import { ThemeProvider } from '@material-ui/core';
import { lightTheme } from '@backstage/theme';
import { entity } from '../../../mocks/mocks';

const config = {
  getString: (_: string) => 'http://localhost:7000',
};

const apis = ApiRegistry.from([[configApiRef, config]]);

describe('PipelineMetricsCard', () => {
  const server = setupServer();
  // Enable sane handlers for network requests
  msw.setupDefaultHandlers(server);

  // setup mock response
  beforeEach(() => {
    server.use(
      rest.post('http://localhost:7000/*', (_, res, ctx) =>
        res(ctx.status(200), ctx.delay(2000), ctx.json({})),
      ),
    );
  });
  it('should render', async () => {
    const rendered = render(
      <ThemeProvider theme={lightTheme}>
        <ApiProvider apis={apis}>
          <PipelineMetricsCard entity={entity} />
        </ApiProvider>
      </ThemeProvider>,
    );
    expect(await rendered.findByTestId('progress')).toBeInTheDocument();
  });
});
