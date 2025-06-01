const { widget } = figma;
const { AutoLayout } = widget;

import { useWidgetMenu } from "./shared/hooks/useWidgetMenu";
import { useEndpointFeature } from "./features/endpoint/hooks/useEndpointFeature";
import { useRequestFeature } from "./features/request/hooks/useRequestFeature";
import { useResponseFeature } from "./features/response/hooks/useResponseFeature";
import { useColorFeature } from "./features/color/hooks/useColorFeature";
import { useDescriptionFeature } from "./features/description/hooks/useDescriptionFeature";
import { useLayoutFeature } from "./features/layout/hooks/useLayoutFeature";
import { DefaultLayout } from "./features/layout/components/DefaultLayout";

function Widget() {
  try {
    const endpoint = useEndpointFeature();
    const request = useRequestFeature();
    const response = useResponseFeature();
    const color = useColorFeature();
    const description = useDescriptionFeature();
    const layout = useLayoutFeature();

    useWidgetMenu([color, layout, endpoint, request, response, description]);

    return (
      <DefaultLayout
        endpoint={endpoint}
        request={request}
        response={response}
        color={color}
        description={description}
      />
    );
  } catch (error) {
    console.error(`[DEBUG] Error in Widget function:`, error);

    return (
      <AutoLayout direction="vertical" spacing={16} padding={20}>
        <AutoLayout
          direction="vertical"
          spacing={16}
          padding={20}
          cornerRadius={12}
          fill="#FFFFFF"
          stroke="#E6E6E6"
          width={500}
        ></AutoLayout>
      </AutoLayout>
    );
  }
}

widget.register(Widget);
