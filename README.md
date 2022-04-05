# CZ4034 Information Retrieval

UI for our Information Retrieval project

# Set up elasticsearch, kibana and enterprise search to use App Search

# Set up elasticsearch engine

- create engine: engine name='hotels', engine language='english'
- upload data
- change config "PUBLIC_API_KEY"
- changing the type in 'schema'
- relevance tuning
- precision tuning
- synonyms

# Set up react

- cd hotel-query
- npm install
- npm install --save @elastic/react-search-ui @elastic/search-ui-app-search-connector
- npm install react-router-dom

# How to use the search engine:

- start elasticsearch, kibana, enterpriseseach
- start react app
- explain how to query in the app
