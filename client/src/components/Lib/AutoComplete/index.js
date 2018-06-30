import React, { Component } from "react";
import { connect } from "react-redux";
import DownShift from "downshift";
import { TextField, MenuItem, Paper } from "@material-ui/core";
import type { InputProps } from "redux-form";
import type { AutoCompleteState } from "./types";
import { searchGooglePlaces } from "./actions";

type Props = {
  classes: {
    color: string
  },
  field: InputProps,
  label: string,
  id: string,
  autoComplete: AutoCompleteState,
  searchGooglePlaces: Function
};

type State = {
  city: string,
  cities: Array<string>
};

class AutoComplete extends Component<Props, State> {
  state = {
    city: "",
    cities: []
  };
  static getDerivedStateFromProps(props, state) {
    return { cities: props.autoComplete.results };
  }
  onChange = (selectedCity: string) => {
    console.log("selectedCity: ", selectedCity);
    const city = selectedCity.toLowerCase().split(",")[0];
    this.props.field.onChange(city);
    this.setState({ city: selectedCity });
  };
  onInputValueChange = (city: string) => {
    this.setState({ city });
    this.props.searchGooglePlaces(city);
  };
  render() {
    const { city, cities } = this.state;
    const { classes, label, id } = this.props;
    return (
      <DownShift
        inputValue={city}
        onChange={this.onChange}
        onInputValueChange={this.onInputValueChange}
      >
        {({ getInputProps, getItemProps, isOpen }) => (
          <div>
            <TextField
              id={id}
              label={label}
              InputLabelProps={{
                className: classes.color
              }}
              InputProps={{
                classes: {
                  root: classes.color,
                  input: classes.color
                },
                ...getInputProps({
                  id: "place"
                })
              }}
            />
            {isOpen ? (
              <Paper square>
                {cities.map((city, index) => (
                  <MenuItem
                    {...getItemProps({ item: city })}
                    key={city}
                    component="div"
                  >
                    {city}
                  </MenuItem>
                ))}
              </Paper>
            ) : null}
          </div>
        )}
      </DownShift>
    );
  }
}

const mapStateToProps = state => ({
  autoComplete: state.autoComplete
});

const connected = connect(
  mapStateToProps,
  { searchGooglePlaces }
)(AutoComplete);

export default connected;
