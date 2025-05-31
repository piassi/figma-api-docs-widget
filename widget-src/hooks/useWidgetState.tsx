import { useEndpointState, type EndpointState } from "./useEndpointState";
import { useRequestState, type RequestState } from "./useRequestState";
import { useResponseState, type ResponseState } from "./useResponseState";

export const HTTP_METHODS = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "HEAD",
  "OPTIONS",
] as const;

export type HttpMethod = (typeof HTTP_METHODS)[number];

export function isValidHttpMethod(method: string): method is HttpMethod {
  return HTTP_METHODS.includes(method as HttpMethod);
}

export type WidgetState = EndpointState & RequestState & ResponseState;

export function useWidgetState(): WidgetState {
  const endpoint = useEndpointState();
  const request = useRequestState();
  const response = useResponseState();

  return {
    ...endpoint,
    ...request,
    ...response,
  };
}
