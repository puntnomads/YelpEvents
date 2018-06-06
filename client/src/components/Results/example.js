import React, { Component } from "react";
import { connect } from "react-redux";
import {
  List,
  ListItem,
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
import type { ResultsState } from "./types";
import { searchYelp } from "./actions";
import ErrorBoundary from "../Lib/ErrorBoundary";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 500
  }
});

type Props = {
  history: Object,
  classes: {
    root: string
  },
  location: Object,
  match: Object,
  results: ResultsState,
  searchYelp: Function
};

class Results extends Component<Props> {
  componentDidMount() {
    const query = this.props.location.search;
    this.props.searchYelp(query);
  }
  render() {
    const {
      classes,
      results: { results }
    } = this.props;
    console.log(results);
    return (
      <ErrorBoundary>
        <NavBar />
        <Grid container>
          <Grid item xs={12} sm={5}>
            <List className={classes.root}>
              {results.map(({ id, name, image_url, description }) => (
                <li key={`section-${id}`}>
                  <Card>
                    <Grid container>
                      <Grid item xs={4}>
                        <CardMedia image={image_url} title="image" />
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
                          <Button size="small" color="primary">
                            Share
                          </Button>
                          <Button size="small" color="primary">
                            Learn More
                          </Button>
                        </CardActions>
                      </Grid>
                    </Grid>
                  </Card>
                </li>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} sm={7}>
            <h1>Hello</h1>
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
  { searchYelp }
)(withStyles(styles)(Results));

export default connected;
