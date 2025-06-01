import { useColorState, type ColorState } from "./useColorState";
import type { Feature } from "../../../types";

export type ColorFeature = Feature<ColorState>;

const COLOR_OPTIONS = [
  { option: "#FFFFFF", tooltip: "White" },
  { option: "#1E1E1E", tooltip: "Black" },
  { option: "#757575", tooltip: "Dark Gray" },
  { option: "#B3B3B3", tooltip: "Gray" },
  { option: "#D9D9D9", tooltip: "Light Gray" },

  // Green variations
  { option: "#66D575", tooltip: "Green" },
  { option: "#CDF4D3", tooltip: "Light Green" },
  { option: "#4FB85E", tooltip: "Dark Green" },

  // Teal variations
  { option: "#5AD8CC", tooltip: "Teal" },
  { option: "#C6FAF6", tooltip: "Light Teal" },
  { option: "#45B8AF", tooltip: "Dark Teal" },

  // Blue variations
  { option: "#3DADFF", tooltip: "Blue" },
  { option: "#C2E5FF", tooltip: "Light Blue" },
  { option: "#2B8ACC", tooltip: "Dark Blue" },

  // Violet variations
  { option: "#9747FF", tooltip: "Violet" },
  { option: "#E4CCFF", tooltip: "Light Violet" },
  { option: "#7A35CC", tooltip: "Dark Violet" },

  // Pink variations
  { option: "#F849C1", tooltip: "Pink" },
  { option: "#FFC2EC", tooltip: "Light Pink" },
  { option: "#C93A9A", tooltip: "Dark Pink" },

  // Red variations
  { option: "#FF7556", tooltip: "Red" },
  { option: "#FFCDC2", tooltip: "Light Red" },
  { option: "#CC5E45", tooltip: "Dark Red" },

  // Orange variations
  { option: "#FF9E42", tooltip: "Orange" },
  { option: "#FFE0C2", tooltip: "Light Orange" },
  { option: "#CC7E35", tooltip: "Dark Orange" },

  // Yellow variations
  { option: "#FFC943", tooltip: "Yellow" },
  { option: "#FFECBD", tooltip: "Light Yellow" },
  { option: "#CCA135", tooltip: "Dark Yellow" },
];

export function useColorFeature(): ColorFeature {
  const state = useColorState();

  return {
    state,
    menuOptions: [
      {
        itemType: "color-selector",
        propertyName: "widgetColor",
        tooltip: "Widget Color",
        selectedOption: state.widgetColor,
        options: COLOR_OPTIONS,
        handler: (propertyValue) => {
          if (propertyValue && typeof propertyValue === "string") {
            state.setWidgetColor(propertyValue);
          }
        },
      },
    ],
  };
}
