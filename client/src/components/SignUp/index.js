import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Button, Typography, withStyles, Grid, Card } from "@material-ui/core";
import { toast } from "react-toastify";
import ErrorBoundary from "../Lib/ErrorBoundary";
import NavBar from "../NavBar";
import FormTextField from "../Lib/FormTextField";
import signUpRequest from "./actions";
import type { SignUpState, Values } from "./types";
import type { InputProps } from "redux-form";

const styles = theme => ({
  root: {
    height: "100%",
    textAlign: "center"
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
  card: {
    marginTop: "-15%"
  },
  heading: {
    padding: theme.spacing.unit * 2,
    marginTop: "16px",
    marginBottom: "-16px",
    color: "black"
  },
  textField: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    width: "70%"
  },
  button: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 10,
    width: "70%"
  },
  color: {
    color: "black"
  }
});

type Props = {
  history: Object,
  classes: {
    root: string,
    body: string,
    backgroundColor: string,
    section: string,
    card: string,
    heading: string,
    textField: string,
    button: string,
    color: string
  },
  location: Object,
  match: Object,
  signUp: SignUpState,
  signUpRequest: Function,
  handleSubmit: (x: any) => void,
  fields: { name: InputProps, email: InputProps, password: InputProps }
};

class SignUp extends Component<Props> {
  toastId = 0;
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      !this.props.signUp.requesting &&
      !this.props.signUp.successful &&
      this.props.signUp.errors.length > 0
    ) {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error("Failed to sign up.", { autoClose: 5000 });
      }
    }
  }
  submit = (values: Values) => {
    this.props.signUpRequest(values);
  };
  render() {
    const {
      classes,
      fields: { name, email, password },
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
                xs={10}
                sm={6}
                lg={4}
                className={classes.section}
                align="center"
              >
                <Card className={classes.card}>
                  <form onSubmit={handleSubmit(this.submit)}>
                    <Typography variant="display1" className={classes.heading}>
                      Sign Up
                    </Typography>
                    <FormTextField
                      classes={classes}
                      field={name}
                      label="Name"
                      type="name"
                    />
                    <FormTextField
                      classes={classes}
                      field={email}
                      label="Email"
                      type="email"
                    />
                    <FormTextField
                      classes={classes}
                      field={password}
                      label="Password"
                      type="password"
                    />
                    <Button
                      variant="raised"
                      color="primary"
                      type="submit"
                      size="large"
                      className={classes.button}
                    >
                      Sign Up
                    </Button>
                  </form>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = state => ({
  signUp: state.signUp
});

const connected = connect(
  mapStateToProps,
  { signUpRequest }
)(withStyles(styles)(SignUp));

const formed = reduxForm({
  fields: ["name", "email", "password"],
  form: "signUp"
})(connected);

export default formed;
