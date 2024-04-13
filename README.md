# Customer API

## Overview

This project is a RESTful API for managing customer data. The API provides the following functionalities:

- Listing customers with search by first name, last name, and city, with pagination support.
- Fetching a single customer by ID.
- Listing unique cities with the number of customers from each city.
- Adding a new customer with validation to ensure the city and company already exist.

The API uses a JSON file (`customers.json`) located in the `data` folder to store customer data.

## Table of Contents

- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-repo/customer-api.git
    cd customer-api
    ```

2. **Install dependencies**:
    - Make sure you have Node.js and npm installed.
    - Install the required dependencies:

    ```bash
    npm install
    ```

3. **Run the server**:
    - Start the server by running the following command:

    ```bash
    npm start
    ```

    The server will start running on `http://localhost:3000`.

## API Endpoints

### GET /customers

- Lists customers with optional search by first name, last name, and city.
- Supports pagination with `page` and `per_page` query parameters.
- Example query:

    ```
    GET http://localhost:3000/customers?first_name=Aman&city=Ahmedabad&page=1&per_page=5
    ```

### GET /customers/:id

- Fetches a single customer by ID.
- Example query:

    ```
    GET http://localhost:3000/customers/1
    ```

### GET /cities

- Lists unique cities and the number of customers from each city.
- Example query:

    ```
    GET http://localhost:3000/cities
    ```

### POST /customers

- Adds a new customer with the following fields:
    - `first_name`: The first name of the customer (required).
    - `last_name`: The last name of the customer (required).
    - `city`: The city where the customer resides (required and must already exist).
    - `company`: The company where the customer works (required and must already exist).
- If any required fields are missing, or if the city or company does not already exist, the request will return an error.
- Example query:

    ```
    POST http://localhost:3000/customers
    {
        "first_name": "John",
        "last_name": "Doe",
        "city": "Ahmedabad",
        "company": "SublimeDataSystems"
    }
    ```

