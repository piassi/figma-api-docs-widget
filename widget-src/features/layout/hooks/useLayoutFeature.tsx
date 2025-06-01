import type { Feature } from '@/types';
import {
  useLayoutState,
  type LayoutState,
  LAYOUT_OPTIONS,
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
        propertyName: "layoutType",
        tooltip: "Layout",
        selectedOption: state.layoutType,
        options: LAYOUT_OPTIONS.map((layout) => ({
          option: layout,
          label: layout,
        })),
        handler: (propertyValue) => {
          if (propertyValue && isValidLayoutType(propertyValue)) {
            state.setLayoutType(propertyValue);
          }
        },
      },
    ],
  };
}
