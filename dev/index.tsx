import * as React from "react";
import { createDevApp } from "@backstage/dev-utils";
import {
  buildkiteMetricsPlugin,
  EntityPipelineMetricsCard,
} from "../src/plugin";
import { entity } from "../src/mocks/mocks";

createDevApp()
  .registerPlugin(buildkiteMetricsPlugin)
  .addPage({
    element: <EntityPipelineMetricsCard entity={entity} />,
    title: "Root Page",
  })
  .render();
