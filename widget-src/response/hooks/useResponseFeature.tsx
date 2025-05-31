import { useResponseState, type ResponseState } from "./useResponseState";
import type { Feature } from "../../types";

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
        isToggled: state.hasResponse,
        handler: () => {
          if (state.hasResponse) {
            state.disableResponse();
          } else {
            state.enableResponse();
          }
        },
      },
    ],
  };
}
