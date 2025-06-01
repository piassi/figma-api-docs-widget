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

export function useLayoutTheme(): UseLayoutThemeReturn {
  const { layoutTheme } = useLayoutState();

  switch (layoutTheme) {
    case "Compact":
      return {
        theme: {
          widgetWidth: 300,
          text: {
            body: 14,
          },
        },
      };

    default:
      return {
        theme: {
          widgetWidth: 450,
          text: {
            body: 16,
          },
        },
      };
  }
}
