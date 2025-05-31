import {
  useEndpointState,
  type EndpointState,
} from "../endpoint/hooks/useEndpointState";
import {
  useRequestState,
  type RequestState,
} from "../request/hooks/useRequestState";
import {
  useResponseState,
  type ResponseState,
} from "../response/hooks/useResponseState";

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
