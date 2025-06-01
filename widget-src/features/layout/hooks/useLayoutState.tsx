const { widget } = figma;
const { useSyncedState } = widget;

export type LayoutTheme = "Default" | "Compact";

const LAYOUT_STATE_KEYS = {
  LAYOUT_THEME: "layoutTheme",
} as const;

const LAYOUT_DEFAULT_VALUES = {
  LAYOUT_THEME: "Default" as LayoutTheme,
} as const;

export const LAYOUT_THEMES = ["Default", "Compact"] as const;

export function isValidLayoutType(value: string): value is LayoutTheme {
  return LAYOUT_THEMES.includes(value as LayoutTheme);
}

export type LayoutState = {
  layoutTheme: LayoutTheme;
  setLayoutTheme: (layout: LayoutTheme) => void;
};

export function useLayoutState(): LayoutState {
  const [layoutTheme, setLayoutTheme] = useSyncedState<LayoutTheme>(
    LAYOUT_STATE_KEYS.LAYOUT_THEME,
    LAYOUT_DEFAULT_VALUES.LAYOUT_THEME
  );

  return {
    layoutTheme,
    setLayoutTheme,
  };
}
