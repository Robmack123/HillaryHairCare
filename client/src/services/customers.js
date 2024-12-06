const _apiUrl = "/api/customers";

export const getCustomers = () => fetch(_apiUrl).then((res) => res.json());

export const createCustomer = (customer) => {
  return fetch(_apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to create customer");
    }
    return res.json();
  });
};

export const getCustomerById = (id) => {
  return fetch(`${_apiUrl}/${id}`).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch customer details");
    }
    return res.json();
  });
};

// Update a customer
export const updateCustomer = (id, customer) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to update customer");
    }
    return res.json();
  });
};
