const { widget } = figma;
const { useSyncedState } = widget;

const WIDTH_CONTROL_STATE_KEYS = {
  WIDGET_WIDTH: "widgetWidth",
} as const;

const WIDTH_CONTROL_DEFAULT_VALUES = {
  WIDGET_WIDTH: 450,
} as const;

const WIDTH_CONFIG = {
  MIN_WIDTH: 300,
  STEP_SIZE: 100,
} as const;

export type WidthControlState = {
  widgetWidth: number;
  setWidgetWidth: (width: number) => void;
  increaseWidth: () => void;
  decreaseWidth: () => void;
  canIncrease: boolean;
  canDecrease: boolean;
};

export function useWidthControlState(): WidthControlState {
  const [widgetWidth, setWidgetWidth] = useSyncedState<number>(
    WIDTH_CONTROL_STATE_KEYS.WIDGET_WIDTH,
    WIDTH_CONTROL_DEFAULT_VALUES.WIDGET_WIDTH
  );

  const increaseWidth = () => {
    const newWidth = widgetWidth + WIDTH_CONFIG.STEP_SIZE;
    setWidgetWidth(newWidth);
  };

  const decreaseWidth = () => {
    const newWidth = Math.max(
      widgetWidth - WIDTH_CONFIG.STEP_SIZE,
      WIDTH_CONFIG.MIN_WIDTH
    );
    setWidgetWidth(newWidth);
  };

  const canIncrease = true;
  const canDecrease = widgetWidth > WIDTH_CONFIG.MIN_WIDTH;

  return {
    widgetWidth,
    setWidgetWidth,
    increaseWidth,
    decreaseWidth,
    canIncrease,
    canDecrease,
  };
}
