import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { Button, Typography, withStyles, Grid } from "@material-ui/core";
import ErrorBoundary from "./Lib/ErrorBoundary";
import NavBar from "./NavBar";
import SelectField from "./Lib/SelectField";
import SimpleTextField from "./Lib/SimpleTextField";
import { toast } from "react-toastify";
import type { InputProps } from "redux-form";

const styles = theme => ({
  root: {
    height: "100%"
  },
  flex: {
    flex: 1
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
    color: "white"
  }
});

type Props = {
  history: Object,
  classes: {
    root: string,
    body: string,
    backgroundColor: string,
    section: string,
    button: string,
    color: string
  },
  handleSubmit: (x: any) => void,
  fields: { category: InputProps, location: InputProps }
};

type State = {
  category: string
};

class Home extends Component<Props, State> {
  state = {
    category: ""
  };
  toastId = 0;
  submit = values => {
    const category = values.category;
    const location = values.location;
    if (category && location) {
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
    console.log(values);
  };
  render() {
    const {
      classes,
      fields: { category, location },
      handleSubmit
    } = this.props;
    return (
      <ErrorBoundary>
        <NavBar />
        <Grid container className={classes.root}>
          <Grid
            item
            xs={12}
            className={`${classes.body} ${classes.backgroundColor}`}
          >
            <Grid
              container
              className={classes.root}
              spacing={0}
              justify="center"
            >
              <Grid
                item
                xs={12}
                sm={6}
                className={classes.section}
                align="center"
              >
                <Typography variant="display3" style={{ color: "white" }}>
                  Welcome to Yelp Events
                </Typography>
                <Typography variant="headline" style={{ color: "white" }}>
                  What event do you want to attend?
                </Typography>
                <form onSubmit={handleSubmit(this.submit)}>
                  <Grid container justify="center">
                    <Grid item xs={10}>
                      <Grid container>
                        <Grid item xs={12} sm={5}>
                          <div>
                            <SelectField
                              classes={classes}
                              field={category}
                              label="Category"
                            />
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                          <div>
                            <SimpleTextField
                              classes={classes}
                              field={location}
                              label="Location"
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
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ErrorBoundary>
    );
  }
}

const formed = reduxForm({
  fields: ["category", "location"],
  form: "home"
})(withStyles(styles)(Home));

export default formed;
