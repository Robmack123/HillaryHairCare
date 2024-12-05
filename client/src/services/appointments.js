const _apiUrl = "/api/appointments";

export const getAppointments = () => fetch(_apiUrl).then((res) => res.json());
