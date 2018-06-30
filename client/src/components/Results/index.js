import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
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
import { toast } from "react-toastify";
import type { InputProps } from "redux-form";
import type { ResultsState, EventValues } from "./types";
import { searchYelp, saveEvent } from "./actions";
import ErrorBoundary from "../Lib/ErrorBoundary";
import MapWithMarkers from "../Lib/MapWithMarkers";
import SelectField from "../Lib/SelectField";
import AutoComplete from "../Lib/AutoComplete";

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
  },
  flex: {
    flex: 1
  },
  container: {
    paddingRight: "10px",
    paddingLeft: "10px"
  },
  body: {
    height: "100%"
  },
  backgroundColor: {
    backgroundColor: theme.palette.secondary.light
  },
  section: {
    margin: "auto"
  },
  button: {
    margin: theme.spacing.unit * 2
  },
  color: {
    color: "black"
  }
});

type Props = {
  history: Object,
  classes: {
    root: string,
    media: string,
    flex: string,
    container: string,
    body: string,
    backgroundColor: string,
    section: string,
    button: string,
    color: string
  },
  location: Object,
  match: Object,
  results: ResultsState,
  searchYelp: Function,
  saveEvent: Function,
  handleSubmit: (x: any) => void,
  fields: { category: InputProps, location: InputProps }
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
  toastId = 0;
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
  submit = values => {
    const category = values.category;
    const location = values.location;
    if (category && location) {
      this.props.searchYelp(`?category=${category}&location=${location}`);
      this.props.history.push(
        `/search?category=${category}&location=${location}`
      );
    } else {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error("Missing information", {
          autoClose: 5000
        });
      }
    }
  };
  render() {
    const {
      classes,
      fields: { category, location },
      handleSubmit,
      results: { results }
    } = this.props;
    const { markers, zoomToMarker } = this.state;
    return (
      <ErrorBoundary>
        <NavBar />
        <Grid container>
          <Grid item xs={12} sm={5}>
            <form onSubmit={handleSubmit(this.submit)}>
              <Grid container className={classes.container}>
                <Grid item xs={12} sm={5}>
                  <div>
                    <SelectField
                      id="category"
                      classes={classes}
                      field={category}
                      label="Category"
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <div>
                    <AutoComplete
                      id="location"
                      classes={classes}
                      field={location}
                      label="City"
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button
                    variant="raised"
                    color="primary"
                    type="submit"
                    size="small"
                    className={classes.button}
                  >
                    Go!
                  </Button>
                </Grid>
              </Grid>
            </form>
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

const formed = reduxForm({
  fields: ["category", "location"],
  form: "results"
})(connected);

export default formed;
