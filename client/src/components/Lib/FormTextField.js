import React from "react";
import { TextField } from "@material-ui/core";
import type { InputProps } from "redux-form";

type Props = {
  classes: {
    color: string,
    textField: string
  },
  field: InputProps,
  id: string,
  label: string,
  type: string
};

const FormTextField = ({
  classes,
  id,
  label,
  type,
  field: { touched, error, onChange }
}: Props) => (
  <TextField
    id={id}
    label={label}
    error={touched && typeof error === "string"}
    className={classes.textField}
    margin="normal"
    type={type}
    InputProps={{
      classes: {
        root: classes.color,
        input: classes.color
      }
    }}
    InputLabelProps={{
      className: classes.color
    }}
    onChange={(event: SyntheticInputEvent<any>): void => {
      onChange(event.target.value);
    }}
  />
);

export default FormTextField;
