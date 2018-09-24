# Gangris Price Checker Module
This JavaScript application monitors a MongoDB database for new cards that have been scanned by the Gangris Card Scanner module. Optionally will provide a price update for existing cards within the database if the price has not been updated since a specified time interval.

## Configuration
This application requires a TCGPlayer Developer Key to access their pricing API. This requires an application here: http://developer.tcgplayer.com/developer-application-form.html

Within the `private.json` file, it needs to store the PRIVATE_KEY and PUBLIC_KEY provided by TCGPlayer.

```json
{
  "PRIVATE_KEY": "...",
  "PUBLIC_KEY": "..."
}
```

Within the `configuration.json` file, it needs to store the polling time for each module within the application and the configuration for the MongoDB database.

## Methods

### startup()
Method gets called when application starts up, and sets up the rest of the application based on the configuration provided within `configuration.json`.

### startupCheckup()
Method that just ensures that the `private.json` and `configuration.json` was loaded properly and configured properly.

### testConnectDB()
Method called on startup to test the connection to the configured MongoDB database.

### main()
Main application loop. It tests to see if the configurable time has elapsed for the enabled services so they can be run again. It waits till they complete the actions requested via Promises, then waits a configurable time before performing the tests again.

### getBearerToken()
Method to get a current session so the application has access to the TCGPlayer API.

### testSession()
Method to ensure the currently stored session in memory is still valid.

### getLocalSession()
Method to get the latest session from the MongoDB database, tests if it is valid, and returns the session if it is and null/undefined if it is not.

### getRemoteSession()
To be completed.

### saveSession(session)
To be completed.

### pollNewCards()
To be completed.

### pollPriceUpdates()
To be completed.

### processPriceUpdates()
To be completed.
