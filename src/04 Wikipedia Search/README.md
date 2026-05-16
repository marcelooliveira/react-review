## Overview

Build a Wikipedia search app that fetches results from the Wikipedia API, displays them, and keeps track of the last 5 search terms with timestamps.

## Requirements

-   Implement a search form that fetches results from the Wikipedia OpenSearch API:  
    `https://en.wikipedia.org/w/api.php?action=opensearch&search=SEARCH_TERM&format=json&origin=*`
-   Display the search results as clickable links that open in a new tab.
-   Track the last 5 search terms with timestamps.
    -   Do not duplicate terms; if a term is searched again, move it to the most recent position.
    -   Only keep the most recent 5 terms.
-   Clear the search input after submitting a search.

## Notes

-   Focus on handling the form submission properly.
-   Use  `toLocaleString()`  to format timestamps in a readable way.
-   Think about how to manage and update the search history efficiently.
-   Ensure links open safely in a new tab (`target="_blank"`  and  `rel="noopener noreferrer"`).

## Tests

1.  fetches and displays results
2.  clears the input after submitting a search
3.  keeps only the last 5 search terms without duplicates
4.  does not duplicate a search term but moves it to the end