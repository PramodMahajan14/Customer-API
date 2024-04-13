const route = require("express").Router();
const { loadData, saveData } = require("../InputOutput/fileoperation");

// Routes-----

// List API with search by first_name, last_name, and city with pagination
route.get("/customers", async (req, res) => {
  try {
    const { first_name, last_name, city, page = 1, per_page = 2 } = req.query;

    let customers = await loadData();

    // Filter based on search parameters
    if (first_name) {
      customers = customers.filter((customer) =>
        customer.first_name.toLowerCase().includes(first_name.toLowerCase())
      );
    }
    if (last_name) {
      customers = customers.filter((customer) =>
        customer.last_name.toLowerCase().includes(last_name.toLowerCase())
      );
    }
    if (city) {
      customers = customers.filter(
        (customer) => customer.city.toLowerCase() === city.toLowerCase()
      );
    }

    // Pagination;
    const startIndex = (page - 1) * per_page;
    const endIndex = startIndex + per_page;
    const paginatedCustomers = customers.slice(startIndex, endIndex);

    res.json(paginatedCustomers);
  } catch (err) {
    res.json(err);
  }
});

// API to get single customer data by its ID
route.get("/customers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const customers = await loadData();

    const customer = customers.find((cust) => cust.id === parseInt(id));

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    console.log(customer);
    res.json(customer);
  } catch (err) {
    res.json(err);
  }
});

// API to list all unique cities with number of customers from a particular city
route.get("/cities", async (req, res) => {
  try {
    const customers = await loadData();
    const cityCount = {};

    customers.forEach((customer) => {
      if (cityCount[customer.city]) {
        cityCount[customer.city]++;
      } else {
        cityCount[customer.city] = 1;
      }
    });

    res.json(cityCount);
  } catch (err) {
    res.json(err);
  }
});

// API to add a customer with validations
route.post("/customers", async (req, res) => {
  try {
    const { first_name, last_name, city, company } = req.body;
    const customers = await loadData();

    // Check if all fields are provided
    if (!first_name || !last_name || !city || !company) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if city and company already exist
    const existingCities = [
      ...new Set(customers.map((customer) => customer.city)),
    ];
    const existingCompanies = [
      ...new Set(customers.map((customer) => customer.company)),
    ];

    if (!existingCities.includes(city)) {
      return res.status(400).json({ message: "City must already exist" });
    }

    if (!existingCompanies.includes(company)) {
      return res.status(400).json({ message: "Company must already exist" });
    }

    // Add new customer
    const newCustomer = {
      id: customers.length + 1,
      first_name,
      last_name,
      city,
      company,
    };

    customers.push(newCustomer);
    let response = await saveData(customers);

    res.status(201).json({ newCustomer, response });
  } catch (err) {
    res.json(err);
  }
});

module.exports = route;
