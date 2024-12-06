const _apiUrl = "/api/stylists";

export const getStylists = () => fetch(_apiUrl).then((res) => res.json());

export const toggleStylistStatus = (stylistId, isActive) => {
  return fetch(`${_apiUrl}/${stylistId}/deactivate`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isActive }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to update stylist status");
    }
    return res.json();
  });
};
