import {
  useEndpointState,
  type EndpointState,
} from '@/features/endpoint/hooks/useEndpointState';
import {
  useRequestState,
  type RequestState,
} from '@/features/request/hooks/useRequestState';
import {
  useResponseState,
  type ResponseState,
} from '@/features/response/hooks/useResponseState';

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
