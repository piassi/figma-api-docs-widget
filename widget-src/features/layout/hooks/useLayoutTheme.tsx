import { useLayoutState } from "./useLayoutState";

type LayoutTheme = {
  widgetWidth: number;
  text: {
    body: number;
  };
};

type UseLayoutThemeReturn = {
  theme: LayoutTheme;
};

type UseLayoutThemeProps = {
  customWidth?: number;
};

export function useLayoutTheme({
  customWidth,
}: UseLayoutThemeProps = {}): UseLayoutThemeReturn {
  const { layoutTheme } = useLayoutState();

  const getWidgetWidth = () => {
    if (customWidth) return customWidth;

    switch (layoutTheme) {
      case "Compact":
        return 300;
      default:
        return 450;
    }
  };

  switch (layoutTheme) {
    case "Compact":
      return {
        theme: {
          widgetWidth: getWidgetWidth(),
          text: {
            body: 14,
          },
        },
      };

    default:
      return {
        theme: {
          widgetWidth: getWidgetWidth(),
          text: {
            body: 16,
          },
        },
      };
  }
}
