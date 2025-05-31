const { widget } = figma;
const { AutoLayout } = widget;

import { EndpointBar } from "./endpoint/components/EndpointBar";
import { useWidgetMenu } from "./hooks/useWidgetMenu";
import { useEndpointFeature } from "./endpoint/hooks/useEndpointFeature";
import { useRequestFeature } from "./request/hooks/useRequestFeature";
import { useResponseFeature } from "./response/hooks/useResponseFeature";
import { useColorFeature } from "./color/hooks/useColorFeature";
import { useDescriptionFeature } from "./description/hooks/useDescriptionFeature";
import { RequestPopup } from "./request/components/RequestPopup";
import { ResponsePopUp } from "./response/components/ResponsePopup";
import { ResponseButton } from "./response/components/ResponseButton";
import { RequestButton } from "./request/components/RequestButton";
import { DescriptionField } from "./description/components/DescriptionField";

function Widget() {
  try {
    const endpoint = useEndpointFeature();
    const request = useRequestFeature();
    const response = useResponseFeature();
    const color = useColorFeature();
    const description = useDescriptionFeature();

    useWidgetMenu([color, endpoint, request, response, description]);

    return (
      <AutoLayout direction="vertical" spacing={16} padding={0}>
        <AutoLayout
          direction="vertical"
          spacing={16}
          padding={20}
          cornerRadius={12}
          fill={color.state.widgetColor}
          stroke="#E6E6E6"
          width={500}
        >
          <EndpointBar
            httpMethod={endpoint.state.httpMethod}
            endpointPath={endpoint.state.endpointPath}
            onEndpointPathChange={endpoint.state.setEndpointPath}
            placeholder="/api/endpoint/path"
          />

          {description.state.hasDescription && (
            <DescriptionField
              descriptionContent={description.state.descriptionContent}
              onDescriptionChange={description.state.setDescriptionContent}
            />
          )}

          {(request.state.hasRequest || response.state.hasResponse) && (
            <AutoLayout direction="horizontal" spacing={16} width="fill-parent">
              <RequestButton request={request} />
              <ResponseButton response={response} />
            </AutoLayout>
          )}
        </AutoLayout>

        <RequestPopup request={request} />
        <ResponsePopUp response={response} />
      </AutoLayout>
    );
  } catch (error) {
    console.error(`[DEBUG] Error in Widget function:`, error);
    // Return a safe fallback
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
        >
          {/* Simple text fallback */}
        </AutoLayout>
      </AutoLayout>
    );
  }
}

widget.register(Widget);
