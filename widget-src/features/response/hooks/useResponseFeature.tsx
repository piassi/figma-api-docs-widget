import { useResponseState, type ResponseState } from "./useResponseState";
import type { Feature } from "../../../types";

export type ResponseFeature = Feature<ResponseState>;

export function useResponseFeature(): ResponseFeature {
  const state = useResponseState();

  return {
    state,
    menuOptions: [
      {
        itemType: "toggle",
        propertyName: "toggleResponse",
        tooltip: "Response",
        isToggled: state.isResponseEnabled,
        handler: () => {
          state.isResponseEnabled
            ? state.disableResponse()
            : state.enableResponse();
        },
      },
    ],
  };
}
