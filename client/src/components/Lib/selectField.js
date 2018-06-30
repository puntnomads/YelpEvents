import * as React from "react";
import { Component } from "react";
import { TextField } from "@material-ui/core";
import type { InputProps } from "redux-form";
import Categories from "./Categories";

type Props = {
  classes: {
    color: string
  },
  field: InputProps,
  label: string,
  id: string
};
type State = {
  category: string
};

class SelectField extends Component<Props, State> {
  state = {
    category: ""
  };
  handleChange = (event: SyntheticInputEvent<any>): void => {
    this.setState({
      category: event.target.value
    });
    this.props.field.onChange(event.target.value);
  };
  render() {
    const {
      classes,
      label,
      id,
      field: { touched, error }
    } = this.props;
    return (
      <TextField
        id={id}
        select={true}
        style={{ width: "90%" }}
        label={label}
        error={touched && typeof error === "string"}
        value={this.state.category}
        onChange={this.handleChange}
        InputProps={{
          classes: {
            root: classes.color,
            input: classes.color
          }
        }}
        InputLabelProps={{
          className: classes.color
        }}
      >
        {Categories.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>
    );
  }
}

export default SelectField;
