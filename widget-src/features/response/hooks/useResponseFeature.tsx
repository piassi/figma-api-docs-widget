import type { Feature } from '@/types';
import { useResponseState, type ResponseState } from "./useResponseState";

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
