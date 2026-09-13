import axios from "axios";

import {
  getStoredAuth,
  notifyInvalidAuthSession,
} from "@redux/auth/auth.storage";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getStoredAuth()?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

function unwrapEnvelope(body, fallbackStatus) {
  const envelope = body && typeof body === "object" ? body : {};

  return {
    status: envelope.status ?? fallbackStatus,
    message: envelope.message ?? "",
    data: envelope.data ?? null,
  };
}

apiClient.interceptors.response.use(
  (response) => {
    const envelope = unwrapEnvelope(response.data, response.status);

    if (envelope.status >= 400) {
      return Promise.reject(
        Object.assign(
          new Error(envelope.message || "Request failed."),
          envelope,
        ),
      );
    }

    return envelope;
  },
  (error) => {
    const envelope = unwrapEnvelope(
      error.response?.data,
      error.response?.status,
    );
    const message =
      envelope.message ||
      error.message ||
      "Something went wrong. Please try again.";

    if (envelope.status === 401) {
      notifyInvalidAuthSession();
    }

    return Promise.reject(Object.assign(new Error(message), envelope));
  },
);

export function extractErrorMessage(error) {
  if (Array.isArray(error?.data) && error.data.length > 0) {
    const messages = error.data
      .map((item) => (typeof item === "string" ? item : item?.message))
      .filter(Boolean);

    if (messages.length > 0) {
      return messages.join(" ");
    }
  }

  return error?.message || "Something went wrong. Please try again.";
}

export default apiClient;
