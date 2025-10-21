import axios from "axios";

export const api = axios.create({
  baseURL: "https://reqres.in",
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    err.friendlyMessage =
      status === 404
        ? "Endpoint bulunamadı (404). Yedek uç noktaya yönlendiriyorum."
        : "İstek sırasında bir sorun oluştu.";
    return Promise.reject(err);
  }
);

export async function postWorkintech(payload) {
  try {
    const { data } = await api.post("/api/workintech", payload);
    return data;
  } catch (err) {
    if (err?.response?.status === 404) {
      const { data } = await api.post("/api/users", payload);
      return data;
    }
    throw err;
  }
}
