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
};

export function useAPIPropertyMenu({
  httpMethod,
  onHttpMethodChange,
}: UseAPIPropertyMenuProps) {
  usePropertyMenu(
    [
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
    ],
    ({ propertyName, propertyValue }) => {
      if (
        propertyName === "httpMethod" &&
        propertyValue &&
        isValidHttpMethod(propertyValue)
      ) {
        onHttpMethodChange(propertyValue);
      }
    }
  );
}
