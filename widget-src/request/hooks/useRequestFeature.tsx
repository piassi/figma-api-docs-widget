import { useRequestState, type RequestState } from "./useRequestState";
import type { Feature } from "../../types";

export type RequestFeature = Feature<RequestState>;

export function useRequestFeature(): RequestFeature {
  const state = useRequestState();

  return {
    state,
    menuOptions: [
      {
        itemType: "toggle",
        propertyName: "toggleRequest",
        tooltip: "Request",
        isToggled: state.hasRequest,
        handler: () => {
          if (state.hasRequest) {
            state.disableRequest();
          } else {
            state.enableRequest();
          }
        },
      },
    ],
  };
}
