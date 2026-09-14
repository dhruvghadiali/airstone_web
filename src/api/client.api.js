import axios from "axios";
import _ from "lodash";

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
  const envelope = _.isObject(body) ? body : {};

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
        _.assign(
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

    return Promise.reject(_.assign(new Error(message), envelope));
  },
);

export function extractErrorMessage(error) {
  if (_.isArray(error?.data) && !_.isEmpty(error.data)) {
    const messages = _.compact(
      _.map(error.data, (item) =>
        _.isString(item) ? item : _.get(item, "message"),
      ),
    );

    if (!_.isEmpty(messages)) {
      return _.join(messages, " ");
    }
  }

  return error?.message || "Something went wrong. Please try again.";
}

export default apiClient;
