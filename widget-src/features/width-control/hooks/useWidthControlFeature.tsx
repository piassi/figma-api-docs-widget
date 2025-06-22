import type { Feature } from "@/types";
import {
  useWidthControlState,
  type WidthControlState,
} from "./useWidthControlState";

export type WidthControlFeature = Feature<WidthControlState>;

export function useWidthControlFeature(): WidthControlFeature {
  const state = useWidthControlState();

  const menuOptions = [
    {
      itemType: "action" as const,
      propertyName: "increaseWidth",
      tooltip: "←→",
      handler: () => {
        state.increaseWidth();
      },
    },
    ...(state.canDecrease
      ? [
          {
            itemType: "action" as const,
            propertyName: "decreaseWidth",
            tooltip: "→←",
            handler: () => {
              state.decreaseWidth();
            },
          },
        ]
      : []),
  ];

  return {
    state,
    menuOptions,
  };
}
