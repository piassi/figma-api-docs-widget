import { useLayoutState } from "./useLayoutState";

type LayoutTheme = {
  widgetWidth: number;
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
        },
      };

    default:
      return {
        theme: {
          widgetWidth: 450,
        },
      };
  }
}
