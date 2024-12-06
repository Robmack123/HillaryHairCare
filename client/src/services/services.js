const _apiUrl = "/api/services";

export const getServices = () =>
  fetch(_apiUrl).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch services");
    }
    return res.json();
  });

export const createService = (service) => {
  return fetch(_apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(service),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to create service");
    }
    return res.json();
  });
};

// Fetch a service by ID
export const getServiceById = (id) => {
  return fetch(`${_apiUrl}/${id}`).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch service details");
    }
    return res.json();
  });
};

// Update a service by ID
export const updateService = (id, service) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(service),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to update service");
    }
    return res.json();
  });
};
