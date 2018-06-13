import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Button,
  AppBar,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";
import ErrorBoundary from "./Lib/ErrorBoundary";

const styles = theme => ({});

type Props = {
  history: Object,
  classes: {}
};

class NavBar extends Component<Props> {
  toastId = 0;
  render() {
    const { classes } = this.props;
    let user;
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
    const isLoggedIn = user && user.token ? true : false;
    if (isLoggedIn) {
      return (
        <ErrorBoundary>
          <AppBar position="static">
            <Toolbar>
              <Grid container>
                <Grid item xs={9}>
                  <Button color="inherit" component={Link} to="/">
                    <Typography variant="title" color="inherit">
                      Yelp Events
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button color="inherit" component={Link} to="/events">
                    Events
                  </Button>
                  <Button color="inherit" component={Link} to="/logout">
                    Log out
                  </Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </ErrorBoundary>
      );
    }
    return (
      <ErrorBoundary>
        <AppBar position="static">
          <Toolbar>
            <Grid container>
              <Grid item xs={9}>
                <Button color="inherit" component={Link} to="/">
                  <Typography variant="title" color="inherit">
                    Yelp Events
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button color="inherit" component={Link} to="/signup">
                  Sign Up
                </Button>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </ErrorBoundary>
    );
  }
}

export default withStyles(styles)(NavBar);
