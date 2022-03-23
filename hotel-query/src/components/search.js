import React from "react";
import configData from "../config.json";

// import elasticsearch app search
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { SearchProvider, Results, SearchBox } from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";

// app search connector
const connector = new AppSearchAPIConnector({
  searchKey: configData.PUBLIC_API_KEY,
  engineName: configData.ENGINE_NAME,
  endpointBase: configData.END_POINT_BASE,
});

// app search configuration options
const configurationOptions = {
  apiConnector: connector,
  searchQuery: {
    search_fields: {
      // 1. Search by name of hotel.
      hotels: {},
    },
    // 2. Results: name, location, avrreviewscore.
    result_fields: {
      hotels: {
        // A snippet means that matching search terms will be wrapped in <em> tags.
        snippet: {
          size: 300, // Limit the snippet to 75 characters.
          fallback: true, // Fallback to a "raw" result.
        },
      },
      location: {
        snippet: {
          size: 150,
          fallback: true,
        },
      },
      avrreviewscore: {
        // Scores are numeric, so we won't snippet.
        raw: {},
      },
    },
    // 3. Facet by scores, genre, publisher, and platform, which we'll use to build filters later.
    // facets: {
    //   avrreviewscore: {
    //     type: "range",
    //     ranges: [
    //       { from: 0, to: 5, name: "Not good" },
    //       { from: 5, to: 7, name: "Not bad" },
    //       { from: 7, to: 9, name: "Pretty good" },
    //       { from: 9, to: 10, name: "Must stay!" },
    //     ],
    //   },
    //   critic_score: {
    //     type: "range",
    //     ranges: [
    //       { from: 0, to: 50, name: "Not good" },
    //       { from: 50, to: 70, name: "Not bad" },
    //       { from: 70, to: 90, name: "Pretty good" },
    //       { from: 90, to: 100, name: "Must play!" },
    //     ],
    //   },
    //   genre: { type: "value", size: 100 },
    //   publisher: { type: "value", size: 100 },
    //   platform: { type: "value", size: 100 },
    // },
  },
};

function Search() {
  return (
    <SearchProvider config={configurationOptions}>
      <div className='App'>
        <Layout
          header={<SearchBox />}
          // titleField is the most prominent field within a result: the result header.
          bodyContent={<Results titleField='hotels' />}
          // bodyContent={<Results titleField='hotels' urlField='image_url' />}
        />
      </div>
    </SearchProvider>
  );
}

export default Search;
