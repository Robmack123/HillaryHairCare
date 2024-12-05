const _apiUrl = "/api/appointments";

export const getAppointments = () => fetch(_apiUrl).then((res) => res.json());

export const createAppointment = (appointment) => {
  return fetch(_apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointment),
  }).then((res) => {
    console.log("Response Status:", res.status); // Debugging status code
    if (!res.ok) {
      throw new Error("Failed to create appointment");
    }
    return res.json();
  });
};
