import { useResponseState, type ResponseState } from "./useResponseState";
import type { Feature } from "../../types";

export type ResponseFeature = Feature<ResponseState>;

export function useResponseFeature(): ResponseFeature {
  const state = useResponseState();

  return {
    state,
    menuOptions: state.hasResponse
      ? []
      : [
          {
            itemType: "action",
            propertyName: "addResponse",
            tooltip: "Add Response",
            handler: () => state.addResponse(),
          },
        ],
  };
}
