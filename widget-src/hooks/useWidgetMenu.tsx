const { widget } = figma;
const { usePropertyMenu } = widget;

import { HTTP_METHODS, isValidHttpMethod, WidgetState } from "./useWidgetState";

const MENU_OPTIONS_NAMES = ["httpMethod", "addRequest", "addResponse"] as const;

type MenuOptionName = (typeof MENU_OPTIONS_NAMES)[number];

type UseWidgetMenuProps = {
  state: WidgetState;
};

type MenuOptionDropdown = {
  itemType: "dropdown";
  propertyName: MenuOptionName;
  tooltip: string;
  selectedOption: string;
  options: Array<{ option: string; label: string }>;
};

type MenuOptionActionButton = {
  itemType: "action";
  propertyName: MenuOptionName;
  tooltip: string;
};

type MenuOption = MenuOptionDropdown | MenuOptionActionButton;

type MenuOptionHandler = (propertyValue?: string) => void;

export function useWidgetMenu({ state }: UseWidgetMenuProps) {
  const menuOptionHandlers: Record<MenuOptionName, MenuOptionHandler> = {
    httpMethod: (propertyValue) => {
      if (propertyValue && isValidHttpMethod(propertyValue)) {
        state.setHttpMethod(propertyValue);
      }
    },
    addRequest: state.addRequest,
    addResponse: state.addResponse,
  };

  const menuItems: MenuOption[] = [
    {
      itemType: "dropdown",
      propertyName: "httpMethod",
      tooltip: "HTTP Method",
      selectedOption: state.httpMethod,
      options: HTTP_METHODS.map((method) => ({
        option: method,
        label: method,
      })),
    },
    ...(!state.hasRequest
      ? [
          {
            itemType: "action" as const,
            propertyName: "addRequest" as const,
            tooltip: "Add Request",
          },
        ]
      : []),
    ...(!state.hasResponse
      ? [
          {
            itemType: "action" as const,
            propertyName: "addResponse" as const,
            tooltip: "Add Response",
          },
        ]
      : []),
  ];

  usePropertyMenu(menuItems, ({ propertyName, propertyValue }) => {
    if (!isValidMenuOptionName(propertyName)) {
      return;
    }

    menuOptionHandlers[propertyName](propertyValue);
  });
}

function isValidMenuOptionName(name: string): name is MenuOptionName {
  return MENU_OPTIONS_NAMES.includes(name as MenuOptionName);
}
