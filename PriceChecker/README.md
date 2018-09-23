# Gangris Price Checker Module
This application monitors a MongoDB database for new cards that have been scanned by the Gangris Card Scanner module. Optionally will provide a price update for existing cards within the database if the price has not been updated since a specified time interval.

## Configuration
This application requires a TCGPlayer Developer Key to access their pricing API. This requires an application here: http://developer.tcgplayer.com/developer-application-form.html

Within the ./private.json file, needs to store the PRIVATE_KEY and PUBLIC_KEY provided by TCGPlayer.

```json
{
  "PRIVATE_KEY": "...",
  "PUBLIC_KEY": "..."
}
```

## Methods

### getBearerToken()
This method requests a new bearer token, and stores it locally within the MongoDB Sessions table. It also ensures that the bearer token matches

### getCatalogCatagories()
This method requests the TCGPlayer Catagories. This data is saved within the MongoDB TCGCatagories table. 
