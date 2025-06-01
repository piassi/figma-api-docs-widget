import type { Feature } from "@/types";
import {
  useLayoutState,
  type LayoutState,
  LAYOUT_THEMES,
  isValidLayoutType,
} from "./useLayoutState";

export type LayoutFeature = Feature<LayoutState>;

export function useLayoutFeature(): LayoutFeature {
  const state = useLayoutState();

  return {
    state,
    menuOptions: [
      {
        itemType: "dropdown",
        propertyName: "layoutTheme",
        tooltip: "Layout",
        selectedOption: state.layoutTheme,
        options: LAYOUT_THEMES.map((layout) => ({
          option: layout,
          label: layout,
        })),
        handler: (propertyValue) => {
          if (propertyValue && isValidLayoutType(propertyValue)) {
            state.setLayoutTheme(propertyValue);
          }
        },
      },
    ],
  };
}
