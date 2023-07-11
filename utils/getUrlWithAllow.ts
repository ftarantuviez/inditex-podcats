import { ALLOW_URL_ORIGIN } from "@/constants/apiCalls";

export const getUrlWithAllow = (url: string) => {
  return `${ALLOW_URL_ORIGIN}${encodeURIComponent(url)}`;
};
