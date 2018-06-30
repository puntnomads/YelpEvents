import {
  SEARCH_GOOGLE_PLACES,
  SEARCH_GOOGLE_PLACES_SUCCESS,
  SEARCH_GOOGLE_PLACES_ERROR
} from "./constants";
import type { searchGooglePlacesAction } from "./types";

export const searchGooglePlaces = function searchGooglePlaces(
  input: string
): searchGooglePlacesAction {
  return {
    type: SEARCH_GOOGLE_PLACES,
    input
  };
};

export const searchGooglePlacesSuccess = function searchGooglePlacesSuccess(
  results: Array<string>
) {
  return {
    type: SEARCH_GOOGLE_PLACES_SUCCESS,
    results
  };
};

export const searchGooglePlacesError = function searchGooglePlacesError(
  error: Object
) {
  return {
    type: SEARCH_GOOGLE_PLACES_ERROR,
    error
  };
};
