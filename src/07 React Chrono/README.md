# React Chrono: Start/Pause & Stop

## Overview

Build a simple chronometer in React with two buttons: Start/Pause (toggle) and Stop (reset).

## Requirements

-   Display the timer starting at  `00:00.0`.
-   Toggle the timer with a  **Start/Pause**  button:
    -   Start counting when pressed.
    -   Pause counting when pressed again.
-   Reset the timer to  `00:00.0`  with a  **Stop**  button.
-   Update the timer display in tenths of a second while running.
-   Ensure that multiple presses of Start/Pause behave correctly (do not create multiple intervals).
-   Make the buttons accessible with proper  `aria-label`s (Play, Pause, Stop)

## Notes

-   Use  `setInterval`  and  `clearInterval`  to control the timer.
-   Consider storing the interval ID in state or a ref to manage starting and stopping correctly.
-   Formatting the timer into minutes, seconds, and tenths can be done with helper functions.
-   Tests check the buttons’ aria-labels, so make sure to add them.

## Constraints

1.  renders the timer at 00:00.0 initially
2.  starts counting when Play is pressed
3.  pauses when Pause is pressed
4.  resets to 00:00.0 when Stop is pressed