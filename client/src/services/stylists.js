const _apiUrl = "/api/stylists";

export const getStylists = () => fetch(_apiUrl).then((res) => res.json());
