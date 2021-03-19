# Buildkite Metrics

Plugin that provides a card to display Buildkite pipeline metrics.

![Screen Shot 2021-03-19 at 9 45 27 AM](https://user-images.githubusercontent.com/8467862/111814562-da5e8980-8897-11eb-9dfe-ec1537d03206.png)

## Usage
Add a proxy config like this to your `app-config.yaml`:

```yaml
proxy:
  /buildkite/graphql:
    target: https://graphql.buildkite.com/v1
    headers:
      Accept: 'application/json'
      Content-Type: 'application/json'
      Authorization:
        $env: BUILDKITE_TOKEN
```

Then, in your `packages/app/src/plugins.ts` add the plugin:

```ts
export { plugin as BuildkiteMetrics } from 'plugin-buildkite-metrics';
```

And finally, in the `components/catalog/EntityPage.tsx` add the card:

```ts
<PipelineMetricsCard entity={entity} />
```
