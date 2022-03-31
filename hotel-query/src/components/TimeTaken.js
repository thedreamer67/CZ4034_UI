import React from "react";
import configData from "../config.json";
import { withSearch } from "@elastic/react-search-ui";

// function TimeTaken2({ searchTerm }) {
//   return <div>Time taken: {searchTerm} ms</div>;
// }

var ElasticAppSearch = require("@elastic/app-search-javascript");
const client = ElasticAppSearch.createClient({
  searchKey: configData.PUBLIC_API_KEY,
  engineName: configData.ENGINE_NAME,
  endpointBase: configData.END_POINT_BASE,
});

function GetTimeTaken({ query }) {
  const options = {
    search_fields: {
      hotels: {},
    },
    result_fields: {
      hotels: {
        snippet: {
          size: 300,
          fallback: true,
        },
      },
    },
  };
  const startTime = performance.now();
  client
    .search(query, options)
    .then((response) => console.log(response))
    .catch((error) => console.log(error.errorMessages));
  const endTime = performance.now();
  return endTime - startTime;
}

function TimeTaken({ searchTerm }) {
  return (
    <div>Time taken: {Number(GetTimeTaken(searchTerm)).toFixed(3)} ms</div>
  );
}

export default withSearch(({ searchTerm }) => ({
  searchTerm,
}))(TimeTaken);
