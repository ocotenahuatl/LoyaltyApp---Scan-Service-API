# Scan Service API

This API handles the scanning of QR codes, the tagging of sales associates, and the management of loyalty points for a mobile app. It includes endpoints for scan validation, store location validation, and point award management.

## Setup

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file with your MongoDB URI and JWT secret.

### Endpoints

- `POST /api/scan`: Handles QR code scanning and geolocation validation.
- `POST /api/store/:storeId/associate`: Adds a sales associate to a store.
- `DELETE /api/store/:storeId/associate/:associateId`: Removes a sales associate from a store.
