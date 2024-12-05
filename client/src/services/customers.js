const _apiUrl = "/api/customers";

export const getCustomers = () => fetch(_apiUrl).then((res) => res.json());
