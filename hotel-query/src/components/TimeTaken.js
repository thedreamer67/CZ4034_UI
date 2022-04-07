import React from "react";
import configData from "../config.json";
import { withSearch } from "@elastic/react-search-ui";

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
  console.log(startTime);
  client
    .search(query, options)
    .then((response) => console.log(response))
    .catch((error) => console.log(error.errorMessages));
  const endTime = performance.now();
  console.log(endTime);
  return endTime - startTime;
}

function TimeTaken({ resultSearchTerm }) {
  return (
    <div>
      <span style={{ fontWeight: "normal" }}>Time taken: </span>
      {Number(GetTimeTaken(resultSearchTerm)).toFixed(3)} ms
    </div>
  );
}

export default withSearch(({ resultSearchTerm }) => ({
  resultSearchTerm,
}))(TimeTaken);
