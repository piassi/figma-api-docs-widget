import { useRequestState, type RequestState } from "./useRequestState";
import type { Feature } from "../types";

export function useRequestFeature(): Feature<RequestState> {
  const state = useRequestState();

  return {
    state,
    menuOptions: state.hasRequest
      ? []
      : [
          {
            itemType: "action",
            propertyName: "addRequest",
            tooltip: "Add Request",
            handler: () => state.addRequest(),
          },
        ],
  };
}
