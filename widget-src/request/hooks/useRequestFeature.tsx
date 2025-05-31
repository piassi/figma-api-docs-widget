import { useRequestState, type RequestState } from "./useRequestState";
import type { Feature } from "../../types";

export type RequestFeature = Feature<RequestState>;

export function useRequestFeature(): RequestFeature {
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
