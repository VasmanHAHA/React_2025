import { getRouter } from "@/Router";
import { api } from "../api";

export const extraArgument = {
    api,
    get router() {
      return getRouter();
    },
  }

export type ExtraArgument = typeof extraArgument;