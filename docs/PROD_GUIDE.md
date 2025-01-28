## Production Deployment Guide

### Preparing for Deployment

1. Ensure all changes are tested locally and approved.
2. Update the `hubspot.config.yml` file with the production account details.
3. Run the build command (if applicable):
   ```bash
   npm run build
   ```

### Deploying to Production

1. Upload the project to the production account:

   ```bash
   hs project upload --account=<production-account-id>
   ```

2. Verify the deployment by logging into the HubSpot production portal and checking the CRM card.

### Best Practices

- Use version control to track changes.
- Maintain separate developer and production accounts.
- Document all updates and changes in a `CHANGELOG.md` file.

---
