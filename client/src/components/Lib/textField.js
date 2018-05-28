import React from "react";
import { TextField } from "@material-ui/core";

const textField = ({
  classes,
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    id="location"
    style={{ width: "90%" }}
    label={label}
    error={touched && error}
    {...input}
    {...custom}
    InputProps={{
      classes: {
        root: classes.color,
        input: classes.color
      }
    }}
    InputLabelProps={{
      className: classes.color
    }}
  />
);

export default textField;
