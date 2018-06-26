import React, { Component } from "react";
import { connect } from "react-redux";
import {
  List,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  withStyles
} from "@material-ui/core";
import NavBar from "../NavBar.js";
import type { ResultsState, EventValues } from "./types";
import { searchYelp, saveEvent } from "./actions";
import ErrorBoundary from "../Lib/ErrorBoundary";
import MapWithMarkers from "../Lib/MapWithMarkers";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: "100vh"
  },
  media: {
    height: 0,
    paddingTop: "110%"
  }
});

type Props = {
  history: Object,
  classes: {
    root: string,
    media: string
  },
  location: Object,
  match: Object,
  results: ResultsState,
  searchYelp: Function,
  saveEvent: Function
};

type State = {
  markers: Array<{
    id: number,
    latitude: number,
    longitude: number
  }>,
  zoomToMarker: number
};

class Results extends Component<Props, State> {
  state = {
    markers: [],
    zoomToMarker: -1
  };
  user = false;
  componentDidMount() {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
    const query = this.props.location.search;
    this.props.searchYelp(query);
  }
  static getDerivedStateFromProps(props, state) {
    const markers = props.results.results.map(result => {
      return {
        id: result.id,
        latitude: result.latitude,
        longitude: result.longitude
      };
    });
    return {
      markers: markers
    };
  }
  render() {
    const {
      classes,
      results: { results }
    } = this.props;
    const { markers, zoomToMarker } = this.state;
    return (
      <ErrorBoundary>
        <NavBar />
        <Grid container>
          <Grid item xs={12} sm={5}>
            <List className={classes.root}>
              {results.map(({ id, name, image_url, description }, index) => {
                return (
                  <li key={id}>
                    <Card>
                      <Grid container>
                        <Grid item xs={4}>
                          <CardMedia
                            className={classes.media}
                            image={image_url}
                            title="image"
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="headline"
                              component="h2"
                            >
                              {name}
                            </Typography>
                            <Typography component="p">{description}</Typography>
                          </CardContent>
                          <CardActions>
                            {this.user &&
                              this.user.token && (
                                <Button
                                  size="small"
                                  color="primary"
                                  onClick={() => {
                                    const event = results[index];
                                    if (this.user) {
                                      event["user"] = this.user.id;
                                    }
                                    this.props.saveEvent((event: EventValues));
                                  }}
                                >
                                  Going
                                </Button>
                              )}

                            <Button
                              size="small"
                              color="primary"
                              onClick={() => {
                                this.setState({
                                  zoomToMarker: index
                                });
                              }}
                            >
                              Zoom
                            </Button>
                          </CardActions>
                        </Grid>
                      </Grid>
                    </Card>
                  </li>
                );
              })}
            </List>
          </Grid>
          <Grid item xs={12} sm={7}>
            {markers.length > 0 && (
              <MapWithMarkers zoomToMarker={zoomToMarker} markers={markers} />
            )}
          </Grid>
        </Grid>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (state: ResultsState) => ({
  results: state.results
});

const connected = connect(
  mapStateToProps,
  { searchYelp, saveEvent }
)(withStyles(styles)(Results));

export default connected;
