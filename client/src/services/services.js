const _apiUrl = "/api/services";

export const getServices = () =>
  fetch(_apiUrl).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch services");
    }
    return res.json();
  });
