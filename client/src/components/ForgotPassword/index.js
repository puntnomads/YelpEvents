import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Button, Typography, withStyles, Grid, Card } from "@material-ui/core";
import { toast } from "react-toastify";
import ReCaptcha from "react-google-recaptcha";
import ErrorBoundary from "../Lib/ErrorBoundary";
import FormTextField from "../Lib/FormTextField";
import forgotPasswordRequest from "./actions";
import type { ForgotPasswordState } from "./types";
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
  forgotPassword: ForgotPasswordState,
  forgotPasswordRequest: Function,
  handleSubmit: (x: any) => void,
  fields: { forgot_password_email: InputProps }
};

class ForgotPassword extends Component<Props> {
  toastId = 0;
  recaptcha = "";
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      !this.props.forgotPassword.requesting &&
      !!this.props.forgotPassword.errors.length
    ) {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error("Failed to request forgot password.", {
          autoClose: 5000
        });
      }
    }
  }
  submit = values => {
    values["email"] = values["forgot_password_email"];
    delete values.forgot_password_email;
    if (this.recaptcha) {
      values["g-recaptcha-response"] = this.recaptcha;
      console.log("values: ", values);
      this.props.forgotPasswordRequest(values);
    } else {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error("Please complete the reCAPTCHA.", {
          autoClose: 5000
        });
      }
    }
  };
  getRecaptchaValue = value => {
    this.recaptcha = value;
  };
  render() {
    const {
      classes,
      fields: { forgot_password_email },
      handleSubmit
    } = this.props;
    return (
      <ErrorBoundary>
        <form onSubmit={handleSubmit(this.submit)}>
          <Typography variant="title" className={classes.heading}>
            Forgot Password
          </Typography>
          <FormTextField
            classes={classes}
            field={forgot_password_email}
            id="forgot_password_email"
            label="Email"
            type="email"
          />
          <ReCaptcha
            ref="recaptcha"
            sitekey="6Lev4FgUAAAAAGVKXzP0eK7MfB5JYEBzu67_Z3Rv"
            onChange={this.getRecaptchaValue}
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
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = state => ({
  forgotPassword: state.forgotPassword
});

const connected = connect(
  mapStateToProps,
  { forgotPasswordRequest }
)(withStyles(styles)(ForgotPassword));

const formed = reduxForm({
  fields: ["forgot_password_email"],
  form: "forgotPassword"
})(connected);

export default formed;
