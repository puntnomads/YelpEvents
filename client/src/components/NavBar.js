import React, { Component } from "react";
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";
import ErrorBoundary from "./Lib/ErrorBoundary";

const styles = theme => ({
  flex: {
    flex: 1
  }
});

type Props = {
  history: Object,
  classes: {
    flex: string
  }
};

class NavBar extends Component<Props> {
  toastId = 0;
  render() {
    const { classes } = this.props;
    return (
      <ErrorBoundary>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              Yelp Events
            </Typography>
            <Button color="inherit">Sign Up</Button>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </ErrorBoundary>
    );
  }
}

export default withStyles(styles)(NavBar);
