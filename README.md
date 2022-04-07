# CZ4034 Information Retrieval

This is our search engine for querying hotels in Singapore. We used React and Elasticsearch Search UI to
build our Web application, and Elasticsearch App Search as our engine.

## Table of Contents

1. [Installation of Elasticsearch](#installation-of-elasticsearch)
2. [Set up Elasticsearch engine](#set-up-elasticsearch-engine)
3. [Run locally](#run-locally)

## Installation of Elasticsearch

Install Elasticsearch, Kibana and Enterprise Search (referred to as the Elastic Stack (EKE) from now on)
by following the instructions on [this page](https://www.elastic.co/downloads/enterprise-search)

## Set up Elasticsearch engine

The Elastic Stack (EKE) should now be running locally after the installation and configuration in the previous step.

1. Open Elasticsearch in your browser by going to the local address where it is running on (e.g. http://localhost:5601).

2. Go to App Search

3. Create an engine:

   - Engine name: "hotels"
   - Engine language: "English"

4. Upload the data using the [hotelinfo_final.json file](data/hotelinfo_final.json)

5. Under Schema, change the types of 'avrreviewscore' and 'couplerating' to number

6. Adjusting Relevance Tuning

7. Adjusting Precision Tuning

8. Creating Synonyms

9. Under Credentials, note down your public search API key (for use later)

## Run locally

To use our React Web App locally, you must first run Elasticsearch, Kibana and Enterprise Search locally.
Then run the React Web app locally.

### Start the Elasticsearch stack

Go to the Elasticsearch folder, then start Elasticsearch

```bash
bin/elasticsearch
```

Go to the Kibana folder, then start Kibana

```bash
bin/kibana
```

Go to the Enterprise Search folder, then start Enterprise Search

```bash
bin/enterprisesearch
```

Go to the local address where Elasticsearch is running (e.g. http://localhost:5601).

### Set up the React web application

Clone the project

```bash
  git clone https://github.com/thedreamer67/CZ4034_UI.git
```

Go to the project (hotel-query) directory

```bash
  cd CZ4034_UI/hotel-query
```

Change the "PUBLIC_API_KEY" field in the config.json file to your own public search API key noted down
[earlier (step 9)](#set-up-elasticsearch-engine)

```
{
  "PUBLIC_API_KEY": your-api-key
  ...
}
```

Install dependencies

```bash
  npm install
```

Start the server in dev mode or production mode

- Dev mode:

  ```bash
    npm start
  ```

- Production mode:

  - First run

    ```bash
      npm run build
      npm install -g serve
      serve -s build
    ```

  - Subsequent runs

    ```bash
      serve -s build
    ```
