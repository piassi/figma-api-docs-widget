import { useResponseState, type ResponseState } from "./useResponseState";
import type { Feature } from "../types";

export function useResponseFeature(): Feature<ResponseState> {
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
