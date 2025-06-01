const { widget } = figma;
const { usePropertyMenu } = widget;

import type { Feature, MenuOption, MenuOptionHandler } from "../../types";

export function useWidgetMenu(features: Feature<unknown>[]) {
  const allMenuOptions = features.reduce<MenuOption[]>((acc, feature) => {
    return [...acc, ...feature.menuOptions];
  }, []);

  const menuItems = allMenuOptions.map((option) => {
    const { handler: _handler, ...item } = option;
    return item;
  });

  const handlers = allMenuOptions.reduce<Record<string, MenuOptionHandler>>(
    (acc, option) => {
      if ("propertyName" in option) {
        acc[option.propertyName] = option.handler;
      }

      return acc;
    },
    {}
  );

  const propertyMenuHandler = ({
    propertyName,
    propertyValue,
  }: WidgetPropertyEvent) => {
    handlers[propertyName]?.(propertyValue);
  };

  usePropertyMenu(menuItems, propertyMenuHandler);
}
