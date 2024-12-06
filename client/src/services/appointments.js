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

export const cancelAppointment = (appointmentId) => {
  return fetch(`${_apiUrl}/${appointmentId}/cancel`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to cancel appointment");
    }
    return res.json();
  });
};

export const updateAppointmentServices = (appointmentId, serviceIds) => {
  return fetch(`${_apiUrl}/${appointmentId}/services`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(serviceIds),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to update appointment services");
    }
    return res.json();
  });
};
