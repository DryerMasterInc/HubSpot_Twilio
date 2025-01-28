## Installation Guide

### Prerequisites

- Node.js installed on your machine.
- HubSpot CLI installed.
- A HubSpot developer account.

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/inamcode-hub/HubSpot_Twilio
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Authenticate HubSpot CLI with your developer account:

   ```bash
   hs auth
   ```

4. Initialize the project:

   ```bash
   hs project init
   ```

5. Start the local development server:

   ```bash
   hs project dev
   ```

6. Upload the project to HubSpot:
   ```bash
   hs project upload
   ```

---

## Automating Deployments with GitHub Integration

### Important Note:

If you link your GitHub repository to your HubSpot project, the deployment process becomes seamless. Every time you push code to the connected GitHub repository, HubSpot will automatically build and deploy your project.

### Benefits:

- No need to manually upload code using the CLI.
- Ensures that your latest code changes are always live without additional steps.
- Simplifies the development workflow, especially in teams.

### How to Link GitHub:

1. Navigate to your **HubSpot Developer Project** settings.
2. Under the **Settings** tab, look for the **GitHub Repository** section.
3. Click on **Link GitHub Repository** and follow the prompts to authorize access.
4. Select the desired repository and branch for automatic builds.

> **Pro Tip**: Make sure your repository structure matches the HubSpot project requirements for smooth deployments.

Once linked, simply push your changes to GitHub, and HubSpot will handle the rest!
