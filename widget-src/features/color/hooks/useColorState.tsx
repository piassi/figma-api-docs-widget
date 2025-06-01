const { widget } = figma;
const { useSyncedState } = widget;

const COLOR_STATE_KEYS = {
  WIDGET_COLOR: "widgetColor",
} as const;

const COLOR_DEFAULT_VALUES = {
  WIDGET_COLOR: "#FFFFFF",
} as const;

export type ColorState = {
  widgetColor: string;
  setWidgetColor: (color: string) => void;
};

export function useColorState(): ColorState {
  const [widgetColor, setWidgetColor] = useSyncedState<string>(
    COLOR_STATE_KEYS.WIDGET_COLOR,
    COLOR_DEFAULT_VALUES.WIDGET_COLOR
  );

  return {
    widgetColor,
    setWidgetColor,
  };
}
