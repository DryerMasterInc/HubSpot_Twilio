## Development Guide

### Setting Up for Local Development

1. Start the local development server:
   ```bash
   hs project dev
   ```
2. Make changes to the CRM card or serverless functions in the `src/app/` folder.
3. Test your changes locally by viewing the CRM card in your HubSpot developer portal.

### Adding a New CRM Card

1. Create a new React component inside the `extensions/` folder.
2. Add a new JSON file for the card configuration in the same folder.
3. Update `app.json` to include your new card.
4. Restart the development server and test your card.

### Debugging

- Use the browser's developer console to view errors and logs.
- Check the HubSpot CLI output in the terminal.
