import React from "react";
import configData from "../config.json";
import TimeTaken from "./TimeTaken";
import ResultView from "./ResultView";

// import elasticsearch app search
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { Layout } from "@elastic/react-search-ui-views";
import {
  PagingInfo,
  ResultsPerPage,
  Paging,
  Facet,
  SearchProvider,
  Results,
  SearchBox,
  Sorting,
} from "@elastic/react-search-ui";
import "@elastic/react-search-ui-views/lib/styles/styles.css";

// app search connector
const connector = new AppSearchAPIConnector({
  searchKey: configData.PUBLIC_API_KEY,
  engineName: configData.ENGINE_NAME,
  endpointBase: configData.END_POINT_BASE,
});

// app search configuration options
const configurationOptions = {
  autocompleteQuery: {
    suggestions: {
      types: {
        documents: {
          // Which fields to search for suggestions
          fields: ["hotels", "location"],
        },
      },
      // How many suggestions appear
      size: 5,
    },
  },
  apiConnector: connector,
  searchQuery: {
    search_fields: {
      // 1. Search by name of hotel, location, popular facils and what's nearby
      hotels: {},
      location: {},
      popularfacils: {},
      whatsnearby: {},
    },
    // 2. Results: name, location, avrreviewscore.
    result_fields: {
      hotels: {
        // A snippet means that matching search terms will be wrapped in <em> tags.
        snippet: {
          size: 300, // Limit the snippet to 300 characters.
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
        raw: {},
      },
      couplerating: {
        raw: {},
      },
      popularfacils: {
        raw: {},
      },
      whatsnearby: {
        raw: {},
      },
      accessibility: {
        raw: {},
      },
    },
    // 3. Facet by ave review score, couple rating and whether the hotel is in town
    facets: {
      avrreviewscore: {
        type: "range",
        ranges: [
          { from: 0, to: 5, name: "Not good" },
          { from: 5, to: 7, name: "Not bad" },
          { from: 7, to: 9, name: "Pretty good" },
          { from: 9, to: 10, name: "Must stay!" },
        ],
      },
      couplerating: {
        type: "range",
        ranges: [
          { from: 0, to: 5, name: "Not good" },
          { from: 5, to: 7, name: "Not bad" },
          { from: 7, to: 9, name: "Pretty good" },
          { from: 9, to: 10, name: "Must stay!" },
        ],
      },
      town: {
        type: "value",
        size: 2,
      },
    },
  },
};

function Search() {
  return (
    <SearchProvider config={configurationOptions}>
      {/* <WithSearch mapContextToProps={({ rawResponse }) => ({ rawResponse })}> */}
      {/* {({ rawResponse, searchTerm }) => ( */}
      <div className='App'>
        <Layout
          header={<SearchBox autocompleteSuggestions={true} />}
          // titleField is the most prominent field within a result: the result header.
          bodyContent={<Results titleField='hotels' resultView={ResultView} />}
          // bodyContent={<Results titleField='hotels' urlField='image_url' />}
          sideContent={
            <div>
              <Sorting
                label={"Sort by"}
                sortOptions={[
                  {
                    name: "Relevance",
                    value: "",
                    direction: "",
                  },
                  {
                    name: "Name",
                    value: "hotels",
                    direction: "asc",
                  },
                  {
                    name: "Average Review Score",
                    value: "avrreviewscore",
                    direction: "desc",
                  },
                  {
                    name: "Couple Rating",
                    value: "couplerating",
                    direction: "desc",
                  },
                ]}
              />
              <Facet field='avrreviewscore' label='Average Review Score' />
              <Facet field='couplerating' label='Couple Rating' />
              <Facet field='town' label='In town or not' />
              {/*<Facet field='publisher' label='Publisher' isFilterable={true} />*/}
            </div>
          }
          bodyHeader={
            <>
              <PagingInfo />
              <TimeTaken />
              <ResultsPerPage />
            </>
          }
          bodyFooter={<Paging />}
        />
      </div>
      {/* // )} */}
      {/* // </WithSearch> */}
    </SearchProvider>
  );
}

export default Search;
