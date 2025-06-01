import type { Feature } from '@/types';
import { useRequestState, type RequestState } from "./useRequestState";

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
        isToggled: state.isRequestEnabled,
        handler: () => {
          state.isRequestEnabled
            ? state.disableRequest()
            : state.enableRequest();
        },
      },
    ],
  };
}
