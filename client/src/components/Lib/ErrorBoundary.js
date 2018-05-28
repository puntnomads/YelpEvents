import React, { Component } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  withStyles
} from "@material-ui/core";

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
};

class ErrorBoundary extends Component {
  state = {
    hasError: false
  };
  componentDidCatch(error, info) {
    this.setState({
      hasError: true
    });
  }
  render() {
    const { classes } = this.props;
    if (this.state.hasError) {
      return (
        <div>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="https://cdn.dribbble.com/users/1078347/screenshots/2799566/oops.png"
              title="Error Message"
            />
            <CardContent>
              <Typography variant="title" align="left">
                Sorry something went wrong!!!
              </Typography>
              <Typography component="p" align="left">
                Error caught by error boundary of react 16
              </Typography>
            </CardContent>
          </Card>
        </div>
      );
    }
    return this.props.children;
  }
}

export default withStyles(styles)(ErrorBoundary);
