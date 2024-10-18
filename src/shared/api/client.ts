import { ENV } from "@/shared/config";

import { Api } from "./api.types";

export const client = new Api({
  baseUrl: ENV.API_URL,
  baseApiParams: {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    mode: "cors",
    credentials: "include",
  },
});
