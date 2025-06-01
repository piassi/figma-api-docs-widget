import {
  HTTP_METHODS,
  isValidHttpMethod,
} from '@/shared/constants/httpMethods';
import type { Feature } from '@/types';
import { useEndpointState, type EndpointState } from "./useEndpointState";

export type EndpointFeature = Feature<EndpointState>;

export function useEndpointFeature(): EndpointFeature {
  const state = useEndpointState();

  return {
    state,
    menuOptions: [
      {
        itemType: "dropdown",
        propertyName: "httpMethod",
        tooltip: "HTTP Method",
        selectedOption: state.httpMethod,
        options: HTTP_METHODS.map((method) => ({
          option: method,
          label: method,
        })),
        handler: (propertyValue) => {
          if (propertyValue && isValidHttpMethod(propertyValue)) {
            state.setHttpMethod(propertyValue);
          }
        },
      },
    ],
  };
}
