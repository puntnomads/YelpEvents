import React from "react";
import { TextField } from "@material-ui/core";
import type { InputProps } from "redux-form";

type Props = {
  classes: {
    color: string
  },
  field: InputProps,
  label: string
};

const SimpleTextField = ({
  classes,
  label,
  field: { touched, error, onChange }
}: Props) => (
  <TextField
    id="location"
    style={{ width: "90%" }}
    label={label}
    error={touched && typeof error === "string"}
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

export default SimpleTextField;
