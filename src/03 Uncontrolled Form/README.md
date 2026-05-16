# Uncontrolled Form

## Overview

Create a simple uncontrolled form with default values and display the submitted data in an alert.

## Requirements

-   Display the default values in the form inputs.
-   Manage form values without using any React hooks.
-   Handle form submission using a submit handler.
-   Collect the values from all inputs when the form is submitted.
-   Display the collected data inside an  `alert`  to verify the submission.
-   Refactor each input into a reusable  `Input`  component.

## Notes

-   Learn how to work with uncontrolled form inputs in React.
-   Understand how to collect form data using the browser's  `FormData`  API.
-   Practice handling form submissions and extracting input values without using state.
-   Refactor repeated elements into reusable components for cleaner code.
-   Compare controlled vs uncontrolled components to understand when each is useful.

## Tests

1.  renders form fields with default values
2.  updates input values when user types
3.  displays the submitted form data in an alert