const { widget } = figma;
const { usePropertyMenu } = widget;

import {
  HttpMethod,
  HTTP_METHODS,
  isValidHttpMethod,
} from "./useAPIWidgetState";

type UseAPIPropertyMenuProps = {
  httpMethod: HttpMethod;
  onHttpMethodChange: (method: HttpMethod) => void;
  hasResponse: boolean;
  onAddResponse: () => void;
  hasRequest: boolean;
  onAddRequest: () => void;
};

type WidgetPropertyMenuItem =
  | {
      itemType: "dropdown";
      propertyName: string;
      tooltip: string;
      selectedOption: string;
      options: Array<{ option: string; label: string }>;
    }
  | {
      itemType: "action";
      propertyName: string;
      tooltip: string;
    };

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
            propertyName: "addRequest",
            tooltip: "Add Request",
          },
        ]
      : []),
    ...(!hasResponse
      ? [
          {
            itemType: "action" as const,
            propertyName: "addResponse",
            tooltip: "Add Response",
          },
        ]
      : []),
  ];

  usePropertyMenu(menuItems, ({ propertyName, propertyValue }) => {
    if (
      propertyName === "httpMethod" &&
      propertyValue &&
      isValidHttpMethod(propertyValue)
    ) {
      onHttpMethodChange(propertyValue);
    } else if (propertyName === "addResponse") {
      onAddResponse();
    } else if (propertyName === "addRequest") {
      onAddRequest();
    }
  });
}
