import { useRequestState, type RequestState } from "./useRequestState";
import type { Feature } from "../../types";

export type RequestFeature = Feature<RequestState>;

export function useRequestFeature(): RequestFeature {
  const state = useRequestState();

  return {
    state,
    menuOptions: state.hasRequest
      ? [
          {
            itemType: "action",
            propertyName: "disableRequest",
            tooltip: "Disable Request",
            handler: state.disableRequest,
          },
        ]
      : [
          {
            itemType: "action",
            propertyName: "enableRequest",
            tooltip: "Enable Request",
            handler: state.enableRequest,
          },
        ],
  };
}
