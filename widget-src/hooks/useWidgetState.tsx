import { useEndpointState, type EndpointState } from "./useEndpointState";
import { useRequestState, type RequestState } from "./useRequestState";
import { useResponseState, type ResponseState } from "./useResponseState";

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
