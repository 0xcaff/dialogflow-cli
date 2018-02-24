# dialogflow-cli

The missing command line interface for managing DialogFlow agents.

## Why?

DialogFlow stores intents and entities outside of source control. This makes
rollbacks and keeping track of history difficult.

## Installation

    yarn install dialogflow-cli

## Usage

This interacts with DialogFlow with the v2 API. First, follow the directions in
the [API Quickstart][quickstart] to get JSON Credentials to a Service Account.
Then, you can run one of the following commands.

### Export

Exports the DialogFlow agent for the project under the account accessed by the
credential file to the folder test.

    dialogflow export --credentials ./credentials.json test/

### Import

Imports the DialogFlow agent from the folder to the project under the account
accessed by the credential file from the folder test.

    dialogflow import --credentials ./credentials.json test/

[quickstart]: https://github.com/dialogflow/dialogflow-nodejs-client-v2#quickstart
