import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Button, Typography, withStyles, Grid, Card } from "@material-ui/core";
import { toast } from "react-toastify";
import queryString from "query-string";
import { GoogleLogin } from "react-google-login";
import TwitterLogin from "react-twitter-auth";
import ErrorBoundary from "../Lib/ErrorBoundary";
import NavBar from "../NavBar";
import FormTextField from "../Lib/FormTextField";
import { loginRequest, googleLoginRequest, confirmUserEmail } from "./actions";
import { setUser } from "../User/actions";
import type { LoginState, LoginValues } from "./types";
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
    marginTop: "-20%"
  },
  heading: {
    padding: "48px",
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
    marginBottom: theme.spacing.unit * 4,
    width: "70%"
  },
  color: {
    color: "black"
  }
});

const googleButton = {
  display: "inline-block",
  background: "#dd4b39",
  color: "rgb(255, 255, 255)",
  paddingTop: "10px",
  paddingBottom: "10px",
  borderRadius: "2px",
  border: "1px solid transparent",
  fontsize: "16px",
  fontWeight: "bold",
  fontFamily: "Roboto",
  fontSize: "16px",
  width: "70%",
  marginBottom: "32px"
};

const twitterButton = {
  display: "inline-block",
  background: "#55acee",
  color: "rgb(255, 255, 255)",
  paddingTop: "10px",
  paddingBottom: "10px",
  borderRadius: "2px",
  border: "1px solid transparent",
  fontsize: "16px",
  fontWeight: "bold",
  fontFamily: "Roboto",
  fontSize: "16px",
  width: "70%",
  marginBottom: "32px"
};

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
  login: LoginState,
  loginRequest: Function,
  googleLoginRequest: Function,
  confirmUserEmail: Function,
  setUser: Function,
  handleSubmit: (x: any) => void,
  fields: { email: InputProps, password: InputProps }
};

class Login extends Component<Props> {
  toastId = 0;
  componentDidMount() {
    const token = queryString.parse(this.props.location.search).token;
    if (token) {
      this.props.confirmUserEmail({ token });
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.props.login.requesting && !!this.props.login.errors.length) {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error(
          "Failed to login in. Please insure that you are registered and your details are correct.",
          { autoClose: 5000 }
        );
      }
    }
  }
  submit = (values: LoginValues) => {
    this.props.loginRequest(values);
  };
  onFailure = error => {
    alert(error);
  };
  googleResponse = response => {
    const values = new Blob(
      [JSON.stringify({ access_token: response.accessToken }, null, 2)],
      { type: "application/json" }
    );
    this.props.googleLoginRequest(values);
  };
  twitterResponse = response => {
    response.json().then(response => {
      this.props.setUser(response);
    });
  };
  render() {
    const {
      classes,
      fields: { email, password },
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
                      Login
                    </Typography>
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
                      Login
                    </Button>
                  </form>
                  <TwitterLogin
                    loginUrl="/api/auth/twitter"
                    requestTokenUrl="/api/auth/twitter/reverse"
                    onSuccess={this.twitterResponse}
                    onFailure={this.onFailure}
                    style={twitterButton}
                    showIcon={false}
                  />
                  <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
                    buttonText="Login with Google+"
                    onSuccess={this.googleResponse}
                    onFailure={this.onFailure}
                    style={googleButton}
                  />
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
  login: state.login
});

const connected = connect(
  mapStateToProps,
  { loginRequest, googleLoginRequest, confirmUserEmail, setUser }
)(withStyles(styles)(Login));

const formed = reduxForm({
  fields: ["email", "password"],
  form: "login"
})(connected);

export default formed;
