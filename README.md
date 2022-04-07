# CZ4034 Information Retrieval

This is our search engine for querying hotels in Singapore. We used React and Elasticsearch Search UI to
build our Web application, and Elasticsearch App Search as our engine.

## Table of Contents

1. [Installation of Elasticsearch](#installation-of-elasticsearch)
2. [Set up the Elasticsearch engine](#set-up-the-elasticsearch-engine)
3. [Run locally](#run-locally)

## Installation of Elasticsearch

Install and configure Elasticsearch, Kibana and Enterprise Search (referred to as the Elastic Stack (EKE) from now on)
by following the instructions on [this page](https://www.elastic.co/downloads/enterprise-search).

## Set up the Elasticsearch engine

The Elastic Stack (EKE) should now be running locally after the installation and configuration in the previous step.

1. Open Elasticsearch in your browser by going to the local address it is running on (e.g. http://localhost:5601).

2. Go to App Search under Enterprise Search.

3. Create a new engine:

    - Engine name: hotels
    - Engine language: English

4. Upload the data, which is the [hotelinfo_final.json file](data/hotelinfo_final.json). You should have 417 documents.

5. Under Schema, change the types of 'avrreviewscore', 'couplerating', 'distesplanademrt', 'distorchardmrt', 'distcityhallmrt', 'distrafflesmrt' to number. Remember to save your changes!

6. Adjust Relevance Tuning (Manage fields):

    - 'popularfacils': weight = 2.5
    - 'whatsnearby': weight = 3
    - 'hotels': weight = 5
    - 'location': weight = 4

    Remember to save your changes!

7. Adjust Precision Tuning (under the same settings where you did relevance tuning):

    - Set the slider to stop at 3

    Remember to save your changes!

8. Create Synonym Sets

    - Set 1:
        - accessibility
        - ramp
        - elderly
        - disabled
        - lift
        - elevator
    - Set 2:
        - swimming pool
        - badminton
        - gym
        - fitness
        - tennis
    - Set 3:
        - beach
        - seaside
        - sea
        - resort

9. Under Credentials, note down your Public Search Key (for use later).

## Run locally

To use our React Web App Search Engine locally, you must first run Elasticsearch, Kibana and Enterprise Search (in this order) locally.
Then run the React Web app locally.

### Start the Elasticsearch stack

Go to your Elasticsearch folder, then start Elasticsearch:

```bash
  bin/elasticsearch
```

Go to your Kibana folder, then start Kibana:

```bash
  bin/kibana
```

Go to your Enterprise Search folder, then start Enterprise Search:

```bash
  bin/enterprisesearch
```

Go to the local address where Elasticsearch is running (e.g. http://localhost:5601) if you would like to monitor the backend of the search engine.

### Set up the React web application

Clone the project

```bash
  git clone https://github.com/thedreamer67/CZ4034_UI.git
```

Go to the project (hotel-query) directory

```bash
  cd CZ4034_UI/hotel-query
```

Change the "PUBLIC_API_KEY" field in the [config.json](hotel-query/src/config.json) file to your own Public Search Key noted down
[earlier (step 9)](#set-up-elasticsearch-engine)

```
{
  "PUBLIC_API_KEY": "your-api-key"
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

Open the React Web app on your browser by going to the local address it is running on (e.g. http://localhost:3000/)
