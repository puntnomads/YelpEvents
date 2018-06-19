import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Button, Typography, withStyles, Grid, Card } from "@material-ui/core";
import { toast } from "react-toastify";
import ErrorBoundary from "../Lib/ErrorBoundary";
import NavBar from "../NavBar";
import FormTextField from "../Lib/FormTextField";
import resetPasswordRequest from "./actions";
import type { ResetPasswordState } from "./types";
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
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 6,
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
  resetPassword: ResetPasswordState,
  resetPasswordRequest: Function,
  handleSubmit: (x: any) => void,
  fields: { password: InputProps, confirmPassword: InputProps }
};

class ResetPassword extends Component<Props> {
  toastId = 0;
  submit = values => {
    if (values.password !== values.confirmPassword) {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error("Passwords must match.", {
          autoClose: 5000
        });
      }
    } else {
      values["token"] = this.props.match.params.token;
      this.props.resetPasswordRequest(values);
    }
  };
  render() {
    const {
      classes,
      fields: { password, confirmPassword },
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
                      Reset Password
                    </Typography>
                    <FormTextField
                      classes={classes}
                      field={password}
                      id="password"
                      label="Password"
                      type="password"
                    />
                    <FormTextField
                      classes={classes}
                      field={confirmPassword}
                      id="confirmPassword"
                      label="Confirm Password"
                      type="password"
                    />
                    <Button
                      variant="raised"
                      color="primary"
                      type="submit"
                      size="large"
                      className={classes.button}
                    >
                      Submit
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
  resetPassword: state.resetPassword
});

const connected = connect(
  mapStateToProps,
  { resetPasswordRequest }
)(withStyles(styles)(ResetPassword));

const formed = reduxForm({
  fields: ["password", "confirmPassword"],
  form: "resetPassword"
})(connected);

export default formed;
