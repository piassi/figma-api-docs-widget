const { widget } = figma;
const { useSyncedState } = widget;

export type LayoutType = "Default" | "Compact";

const LAYOUT_STATE_KEYS = {
  LAYOUT_TYPE: "layoutType",
} as const;

const LAYOUT_DEFAULT_VALUES = {
  LAYOUT_TYPE: "Default" as LayoutType,
} as const;

export const LAYOUT_OPTIONS = ["Default", "Compact"] as const;

export function isValidLayoutType(value: string): value is LayoutType {
  return LAYOUT_OPTIONS.includes(value as LayoutType);
}

export type LayoutState = {
  layoutType: LayoutType;
  setLayoutType: (layout: LayoutType) => void;
};

export function useLayoutState(): LayoutState {
  const [layoutType, setLayoutType] = useSyncedState<LayoutType>(
    LAYOUT_STATE_KEYS.LAYOUT_TYPE,
    LAYOUT_DEFAULT_VALUES.LAYOUT_TYPE
  );

  return {
    layoutType,
    setLayoutType,
  };
}
