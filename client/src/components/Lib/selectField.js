import React, { Component } from "react";
import { TextField } from "@material-ui/core";

class selectField extends Component {
  state = {
    category: ""
  };
  render() {
    const {
      classes,
      input,
      label,
      meta: { touched, error },
      children,
      ...custom
    } = this.props;
    return (
      <TextField
        id="category"
        select
        style={{ width: "90%" }}
        label={label}
        error={touched && error}
        value={this.state.category}
        onChange={event => {
          console.log();
          this.setState({
            category: event.target.value
          });
          input.onChange(event.target.value);
        }}
        InputProps={{
          classes: {
            root: classes.color,
            input: classes.color
          }
        }}
        InputLabelProps={{
          className: classes.color
        }}
        {...input}
        {...custom}
      >
        <option key="music" value="music">
          Music
        </option>
        <option key="visual-arts" value="visual-arts">
          Visual Arts
        </option>
        <option key="performing-arts" value="performing-arts">
          Performing Arts
        </option>
        <option key="film" value="film">
          Film
        </option>
        <option key="lectures-books" value="lectures-books">
          Lectures & Books
        </option>
        <option key="fashion" value="fashion">
          Fashion
        </option>
        <option key="food-and-drink" value="food-and-drink">
          Food & Drink
        </option>
        <option value="festivals-fairs">Festivals & Fairs</option>
        <option value="charities">Charities</option>
        <option value="sports-active-life">Sports & Active Life</option>
        <option value="nightlife">Nightlife</option>
        <option value="kids-family">Kids & Family</option>
        <option value="other">Other</option>
      </TextField>
    );
  }
}

export default selectField;
