const { widget } = figma;
const { usePropertyMenu } = widget;

import {
  HttpMethod,
  HTTP_METHODS,
  isValidHttpMethod,
} from "./useAPIWidgetState";

type PropertyName = "httpMethod" | "addRequest" | "addResponse";

type UseAPIPropertyMenuProps = {
  httpMethod: HttpMethod;
  onHttpMethodChange: (method: HttpMethod) => void;
  hasResponse: boolean;
  onAddResponse: () => void;
  hasRequest: boolean;
  onAddRequest: () => void;
};

type WidgetPropertyDropdown = {
  itemType: "dropdown";
  propertyName: PropertyName;
  tooltip: string;
  selectedOption: string;
  options: Array<{ option: string; label: string }>;
};

type WidgetPropertyAction = {
  itemType: "action";
  propertyName: PropertyName;
  tooltip: string;
};

type WidgetPropertyMenuItem = WidgetPropertyDropdown | WidgetPropertyAction;

export function useAPIPropertyMenu({
  httpMethod,
  onHttpMethodChange,
  hasResponse,
  onAddResponse,
  hasRequest,
  onAddRequest,
}: UseAPIPropertyMenuProps) {
  const menuItems: WidgetPropertyMenuItem[] = [
    {
      itemType: "dropdown",
      propertyName: "httpMethod",
      tooltip: "HTTP Method",
      selectedOption: httpMethod,
      options: HTTP_METHODS.map((method) => ({
        option: method,
        label: method,
      })),
    },
    ...(!hasRequest
      ? [
          {
            itemType: "action" as const,
            propertyName: "addRequest" as const,
            tooltip: "Add Request",
          },
        ]
      : []),
    ...(!hasResponse
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
    if (!isValidPropertyName(propertyName)) {
      return;
    }

    switch (propertyName) {
      case "httpMethod": {
        if (propertyValue && isValidHttpMethod(propertyValue)) {
          onHttpMethodChange(propertyValue);
        }
        break;
      }
      case "addRequest": {
        onAddRequest();
        break;
      }
      case "addResponse": {
        onAddResponse();
        break;
      }
    }
  });
}

// Type guard function to check if a string is a valid PropertyName
function isValidPropertyName(name: string): name is PropertyName {
  return (
    name === "httpMethod" || name === "addRequest" || name === "addResponse"
  );
}
