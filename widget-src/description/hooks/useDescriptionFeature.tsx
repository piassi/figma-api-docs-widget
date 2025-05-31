import {
  useDescriptionState,
  type DescriptionState,
} from "./useDescriptionState";
import type { Feature } from "../../types";

export type DescriptionFeature = Feature<DescriptionState>;

export function useDescriptionFeature(): DescriptionFeature {
  const state = useDescriptionState();

  return {
    state,
    menuOptions: [
      {
        itemType: "toggle",
        propertyName: "toggleDescription",
        tooltip: "Description",
        isToggled: state.isDescriptionEnabled,
        handler: () => {
          state.isDescriptionEnabled
            ? state.disableDescription()
            : state.enableDescription();
        },
      },
    ],
  };
}
