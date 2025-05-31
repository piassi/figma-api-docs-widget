const { widget } = figma;
const { useSyncedState } = widget;

import { type HttpMethod } from "../../constants/httpMethods";

const ENDPOINT_STATE_KEYS = {
  HTTP_METHOD: "httpMethod",
  ENDPOINT_PATH: "endpointPath",
} as const;

const ENDPOINT_DEFAULT_VALUES = {
  HTTP_METHOD: "GET" as HttpMethod,
  ENDPOINT_PATH: "",
} as const;

export type EndpointState = {
  httpMethod: HttpMethod;
  setHttpMethod: (method: HttpMethod) => void;
  endpointPath: string;
  setEndpointPath: (path: string) => void;
};

export function useEndpointState(): EndpointState {
  const [httpMethod, setHttpMethod] = useSyncedState<HttpMethod>(
    ENDPOINT_STATE_KEYS.HTTP_METHOD,
    ENDPOINT_DEFAULT_VALUES.HTTP_METHOD
  );
  const [endpointPath, setEndpointPath] = useSyncedState<string>(
    ENDPOINT_STATE_KEYS.ENDPOINT_PATH,
    ENDPOINT_DEFAULT_VALUES.ENDPOINT_PATH
  );

  return {
    httpMethod,
    setHttpMethod,
    endpointPath,
    setEndpointPath,
  };
}
