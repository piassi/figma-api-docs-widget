import { HTTP_METHODS, isValidHttpMethod } from "../constants/httpMethods";
import { useEndpointState, type EndpointState } from "./useEndpointState";
import type { Feature } from "../types";

export function useEndpointFeature(): Feature<EndpointState> {
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
