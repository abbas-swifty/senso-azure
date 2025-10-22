# Azure App Service Deployment Configuration

## Environment Variables Required

Create these environment variables in your Azure App Service:

### Database Configuration
- `MONGODB_URI`: Your MongoDB connection string
- `PAYLOAD_SECRET`: A secure secret key for Payload CMS

### Next.js Configuration
- `NEXT_PUBLIC_SERVER_URL`: Your Azure App Service URL (e.g., https://your-app-name.azurewebsites.net)
- `NEXT_PUBLIC_IS_LIVE`: Set to "true" when ready for production

### Stripe Configuration (if using Stripe)
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `STRIPE_WEBHOOKS_SECRET`: Your Stripe webhook secret
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key

### Optional Configuration
- `NODE_ENV`: Set to "production"
- `PORT`: Azure will set this automatically

## Build Configuration

The app uses the following build process:
1. `npm run build:payload` - Builds Payload CMS
2. `npm run build:server` - Compiles TypeScript server code
3. `npm run copyfiles` - Copies static assets
4. `npm run build:next` - Builds Next.js application

## Deployment Notes

- The app runs on Node.js
- Uses Express server with Next.js
- Requires MongoDB database
- Static files are served from the `public` directory
- Build output goes to the `dist` directory
