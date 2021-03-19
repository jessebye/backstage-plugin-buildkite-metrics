import { InfoCard, Progress } from "@backstage/core";
import Alert from "@material-ui/lab/Alert";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Entity } from "@backstage/catalog-model";
import SpeedIcon from "@material-ui/icons/Speed";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import TimelineIcon from "@material-ui/icons/Timeline";
import { useBuildkiteMetrics } from "../../../hooks/useBuildkiteMetrics";
import * as React from "react";

const useStyles = makeStyles((theme) => ({
  infoCard: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    "& + .MuiAlert-root": {
      marginTop: theme.spacing(3),
    },
  },
  listMainText: {
    width: "16px",
  },
}));

type Props = {
  entity: Entity;
};

const PipelineMetricsCard = ({ entity }: Props) => {
  const classes = useStyles();
  const hostname = `https://buildkite.com/${entity.spec.owner}`;
  const { value, loading, error } = useBuildkiteMetrics(
    entity.metadata.name,
    entity.spec.owner as string
  );
  let deepLink;
  if (value?.Slug) {
    deepLink = {
      link: `${hostname}/${value?.Slug}`,
      title: "Build Metrics",
      onClick: (e: { preventDefault: () => void }) => {
        e.preventDefault();
        window.open(`${hostname}/${value?.Slug}`);
      },
    };
  }

  if (loading) {
    return <Progress />;
  } else if (error) {
    return (
      <Alert severity="error" className={classes.infoCard}>
        {error.message}
      </Alert>
    );
  }

  return (
    <InfoCard
      title="Build Metrics"
      className={classes.infoCard}
      deepLink={deepLink}
    >
      {value?.Slug ? (
        <List>
          <ListItem>
            <ListItemIcon>
              <SpeedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Build Time"
              className={classes.listMainText}
            />
            <ListItemText primary={value?.Speed || "-"} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon />
            </ListItemIcon>
            <ListItemText
              primary="Reliability"
              className={classes.listMainText}
            />
            <ListItemText primary={value?.Reliability || "-"} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText
              primary="Frequency"
              className={classes.listMainText}
            />
            <ListItemText primary={value?.Builds || "-"} />
          </ListItem>
        </List>
      ) : (
        <Alert severity="error" className={classes.infoCard}>
          No Buildkite pipeline found for this component. Please add a pipeline
          to see build metrics here.
        </Alert>
      )}
    </InfoCard>
  );
};

export default PipelineMetricsCard;
