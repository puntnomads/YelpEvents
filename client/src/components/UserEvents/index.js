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
import moment from "moment";
import NavBar from "../NavBar.js";
import type { EventsState, EventValues } from "./types";
import { getEvents, deleteEvent } from "./actions";
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
  userEvents: EventsState,
  getEvents: Function,
  deleteEvent: Function
};

type State = {
  markers: Array<{
    id: number,
    latitude: number,
    longitude: number
  }>,
  zoomToMarker: number
};

class UserEvents extends Component<Props, State> {
  state = {
    markers: [],
    zoomToMarker: -1
  };
  user = false;
  componentDidMount() {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.props.getEvents(this.user.id);
    }
  }
  static getDerivedStateFromProps(props, state) {
    const markers = props.userEvents.events.map(event => {
      return {
        id: event.id,
        latitude: event.latitude,
        longitude: event.longitude
      };
    });
    return {
      markers: markers
    };
  }
  render() {
    const {
      classes,
      userEvents: { events }
    } = this.props;
    const { markers, zoomToMarker } = this.state;
    return (
      <ErrorBoundary>
        <NavBar />
        <Grid container>
          <Grid item xs={12} sm={5}>
            <List className={classes.root}>
              {events.map(
                (
                  { id, name, image_url, description, time_start, time_end },
                  index
                ) => {
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
                              <Typography gutterBottom component="p">
                                {description}
                              </Typography>
                              <Typography component="p">
                                Starts:{" "}
                                {moment(time_start).format(
                                  "Do MMMM YYYY h:mm a"
                                )}
                              </Typography>
                              <Typography component="p">
                                Ends:{" "}
                                {moment(time_end).format("Do MMMM YYYY h:mm a")}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              {this.user &&
                                this.user.token && (
                                  <Button
                                    size="small"
                                    color="primary"
                                    onClick={() => {
                                      const event = events[index];
                                      if (this.user) {
                                        this.props.deleteEvent(
                                          (event.id: string),
                                          (this.user.id: string)
                                        );
                                      }
                                    }}
                                  >
                                    Delete
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
                }
              )}
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

const mapStateToProps = state => ({
  userEvents: state.userEvents
});

const connected = connect(
  mapStateToProps,
  { getEvents, deleteEvent }
)(withStyles(styles)(UserEvents));

export default connected;
