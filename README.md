# Mini CRM Software (SAAS)

A modular, scalable CRM platform designed as a Software-as-a-Service (SAAS) solution. The platform is divided into multiple components for maintainability and scalability, supporting customer and order management with robust backend processing using Kafka and MongoDB.

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Tech Stack](#tech-stack)
- [Directory Structure](#directory-structure)
- [Setup & Installation](#setup--installation)
- [Running the Application](#running-the-application)
- [Backend API Endpoints](#backend-api-endpoints)

---

## Architecture Overview

- **Frontend:** Built with Next.js and React, styled using Tailwind CSS. Provides a modern UI for managing customers and orders.
- **Backend:** Node.js with Express, MongoDB for persistent storage, and Kafka for message queuing (pub/sub) to decouple data ingestion and processing.
- **Authentication:** Google OAuth 2.0 (with Next Auth planned for frontend page protection).
- **Deployment:** Dockerized for easy deployment, tested on AWS EC2.

---

## Tech Stack

**Frontend:**

- Next.js (React framework)
- Tailwind CSS (styling)
- React Query Builder (rule logic)
- React Grid (table creation)
- Fetch API (backend interactions)
- Next Auth (page protection) [Planned]

**Backend:**

- Express (API server)
- MongoDB (database)
- Kafka (message queue)
- Google OAuth 2.0 (authentication)

**Deployment:**

- Docker
- AWS EC2

---

## Directory Structure

```sh
SERVER/
├── models/                   # Database models and schemas
├──  ├──
     ├──
     ├──
    ├──
├── node_modules/            # NPM dependencies (auto-generated)
├── Routes/                  # API route definitions
│   ├── auth.routes.js
│   ├── campaign.routes.js
│   ├── communicationlog.routes.js
│   ├── customers.routes.js
│   └── orders.routes.js
├── Services/                # Business logic and external integrations
│   ├── AI/
│   │   └── GeminiConnection.ai.js
│   ├── kafka/               # Apache Kafka integration
│   │   ├── client.kafka.js
│   │   ├── consumer.kafka.js
│   │   ├── customerDB-consumer.kafka.js
│   │   ├── index.kafka.js
│   │   └── producer.kafka.js
│   └── vendorApi/           # Third-party vendor API integrations
│       ├── EventFunctions.vendorApi.js
│       └── vendor.services_api.js
├── utils/                   # Utility functions and helpers
│   ├── ApiError.utils.js
│   ├── ApiResponse.utils.js
│   ├── AsyncHandler.utils.js
│   └── DatabaseConnection.utils.js
├── .env                     # Environment variables
├── .env-local              # Local environment variables
├── .gitignore              # Git ignore rules
├── .gitkeep                # Keep empty directories in git
├── app.js                  # Main application entry point
├── client_secret_229311082244-mlq936... # OAuth client secret file
├── Dockerfile              # Docker container configuration
├── package-lock.json       # Locked dependency versions
├── package.json            # Node.js dependencies and scripts
└── server.js               # Server startup file
```

---

## Setup & Installation

### Prerequisites

- Node.js (v14+)
- Docker & Docker Compose
- MongoDB
- Kafka (locally or via Docker) [I used Docker]
- Google OAuth credentials

### 1. Clone the Repository

```sh
git clone https://github.com/PradeepSahhu/xeno.git
cd xeno
```

### 2. Environment Variables

Create .env files in /client and /server directories with necessary configuration (API URLs, DB credentials, OAuth keys, etc.).

### 3. Install Dependencies

```sh
cd client
npm install
cd ../server
npm install
```

### 4. Start Kafka

You can use Docker Compose or your local installations.

#### Steps to run kafka using docker without zookeeper.

For this step ensure that the docker daemon is running.

type command

```sh
sudo docker run -p 9092:9092 apache/kafka
```

### Running the Application

Frontend:

```sh
cd client
npm run dev
```

Runs at http://localhost:3000

Backend:

```sh
cd server
npm run dev
```

Runs at http://localhost:4000

---

## Frontend

- The frontend is running on the http://localhost:3000

## Backend API Endpoints

- Required : the kafka running instance
- Locally the backend is running on http://localhost:4000

### Customer

| Request Type | Endpoint                     | Description                           |
| ------------ | ---------------------------- | ------------------------------------- |
| POST         | `/api/customers/addCustomer` | To Add Customer to the kafka producer |

### Order

| Request Type | Endpoint               | Description                        |
| ------------ | ---------------------- | ---------------------------------- |
| POST         | `/api/orders/addOrder` | To Add Order to the kafka producer |

- When these routes are called with the data, the controller validate the data like there is no empty value, email is in correct format and the custoemr with the same email id should not exist.
- then the controller hit the kafka producer, the kafka producer
- the kafka producer queues the data and the kafka consumer handles the database insertion operation.
-
