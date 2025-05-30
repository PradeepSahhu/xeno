# Mini CRM Software (SAAS)

- Divided the whole CRM platform architecture into 5 directories
  - Client (frontend) build using React
  - Server (backend) build using express + mongodb for database

## Tech Used :

- Frontend :
  - Next.js
  - Tailwind css (styling)
  - React Query builder (for rule logic)
  - React Grid (Table Creation)
  - Fetch (for backend interactions)
  - Next Auth (For page protection)
- Backend :
  - express (backend server)
  - Kafka (message Queing - pub/sub)
  - Google Auth 2.0

## Frontend

## Backend Endpoints

- Locally the backend is running on http://localhost:4000

### Customer

| Request Type | Endpoint                     | Description                           |
| ------------ | ---------------------------- | ------------------------------------- |
| POST         | `/api/customers/addCustomer` | To Add Customer to the kafka producer |

### Order

| Request Type | Endpoint               | Description                        |
| ------------ | ---------------------- | ---------------------------------- |
| POST         | `/api/orders/addOrder` | To Add Order to the kafka producer |
