import React from "react";
import configData from "../config.json";
import TimeTaken from "./TimeTaken";
import ResultView from "./ResultView";

// import elasticsearch app search
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { Layout, SingleLinksFacet } from "@elastic/react-search-ui-views";
import {
  PagingInfo,
  ResultsPerPage,
  Paging,
  Facet,
  SearchProvider,
  Results,
  SearchBox,
  Sorting,
  WithSearch,
  ErrorBoundary,
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
          fields: ["hotels", "location"],
        },
      },
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
    result_fields: {
      hotels: {
        snippet: {
          size: 300,
          fallback: true,
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
      distorchardmrt: {
        raw: {},
      },
      distcityhallmrt: {
        raw: {},
      },
      distrafflesmrt: {
        raw: {},
      },
      distesplanademrt: {
        raw: {},
      },
    },
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
      distorchardmrt: {
        type: "range",
        ranges: [
          { from: 0, to: 1, name: "Walkable distance (<1km)" },
          { from: 1, to: 2, name: "1-2km" },
          { from: 2, to: 3, name: "2-3km" },
          { from: 3, name: "More than 3km" },
        ],
      },
      distesplanademrt: {
        type: "range",
        ranges: [
          { from: 0, to: 1, name: "Walkable distance (<1km)" },
          { from: 1, to: 2, name: "1-2km" },
          { from: 2, to: 3, name: "2-3km" },
          { from: 3, name: "More than 3km" },
        ],
      },
      distcityhallmrt: {
        type: "range",
        ranges: [
          { from: 0, to: 1, name: "Walkable distance (<1km)" },
          { from: 1, to: 2, name: "1-2km" },
          { from: 2, to: 3, name: "2-3km" },
          { from: 3, name: "More than 3km" },
        ],
      },
      distrafflesmrt: {
        type: "range",
        ranges: [
          { from: 0, to: 1, name: "Walkable distance (<1km)" },
          { from: 1, to: 2, name: "1-2km" },
          { from: 2, to: 3, name: "2-3km" },
          { from: 3, name: "More than 3km" },
        ],
      },
    },
  },
};

function Search() {
  return (
    <SearchProvider config={configurationOptions}>
      <WithSearch mapContextToProps={({ wasSearched }) => ({ wasSearched })}>
        {({ wasSearched }) => {
          return (
            <div className='App'>
              <ErrorBoundary>
                <Layout
                  header={
                    <SearchBox
                      inputProps={{ placeholder: "Enter your query here!" }}
                      autocompleteSuggestions={true}
                    />
                  }
                  bodyContent={
                    <Results titleField='hotels' resultView={ResultView} />
                  }
                  sideContent={
                    <div>
                      {wasSearched && (
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
                            {
                              name: "Distance to Orchard MRT Station",
                              value: "distorchardmrt",
                              direction: "asc",
                            },
                            {
                              name: "Distance to City Hall MRT Station",
                              value: "distcityhallmrt",
                              direction: "asc",
                            },
                            {
                              name: "Distance to Raffles Place MRT Station",
                              value: "distrafflesmrt",
                              direction: "asc",
                            },
                            {
                              name: "Distance to Esplanade MRT Station",
                              value: "distesplanademrt",
                              direction: "asc",
                            },
                          ]}
                        />
                      )}
                      <Facet
                        field='avrreviewscore'
                        label='Average Review Score'
                        filterType='any'
                      />
                      <Facet field='couplerating' label='Couple Rating' />
                      <Facet field='town' label='In town or not?' />
                      <Facet
                        field='distorchardmrt'
                        label='Distance to Orchard MRT Station'
                        view={SingleLinksFacet}
                      />
                      <Facet
                        field='distcityhallmrt'
                        label='Distance to City Hall MRT Station'
                        view={SingleLinksFacet}
                      />
                      <Facet
                        field='distrafflesmrt'
                        label='Distance to Raffles Place MRT Station'
                        view={SingleLinksFacet}
                      />
                      <Facet
                        field='distesplanademrt'
                        label='Distance to Esplanade MRT Station'
                        view={SingleLinksFacet}
                      />
                    </div>
                  }
                  bodyHeader={
                    <>
                      {wasSearched && <PagingInfo />}
                      {wasSearched && <TimeTaken />}
                      {wasSearched && <ResultsPerPage />}
                    </>
                  }
                  bodyFooter={<Paging />}
                />
              </ErrorBoundary>
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
}

export default Search;
