const { widget } = figma;
const { AutoLayout } = widget;

import { EndpointBar } from "./endpoint/components/EndpointBar";
import { useWidgetMenu } from "./hooks/useWidgetMenu";
import { useEndpointFeature } from "./endpoint/hooks/useEndpointFeature";
import { useRequestFeature } from "./request/hooks/useRequestFeature";
import { useResponseFeature } from "./response/hooks/useResponseFeature";
import { RequestPopup } from "./request/components/RequestPopup";
import { ResponsePopUp } from "./response/components/ResponsePopUp";
import { ResponseButton } from "./response/components/ResponseButton";
import { RequestButton } from "./request/components/RequestButton";

function Widget() {
  const endpoint = useEndpointFeature();
  const request = useRequestFeature();
  const response = useResponseFeature();

  useWidgetMenu([endpoint, request, response]);

  return (
    <AutoLayout direction="vertical" spacing={16} padding={0}>
      <AutoLayout
        direction="vertical"
        spacing={16}
        padding={20}
        cornerRadius={12}
        fill="#FFFFFF"
        stroke="#E6E6E6"
        width={500}
      >
        <EndpointBar
          httpMethod={endpoint.state.httpMethod}
          endpointPath={endpoint.state.endpointPath}
          onEndpointPathChange={endpoint.state.setEndpointPath}
          placeholder="/api/endpoint/path"
        />

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
}

widget.register(Widget);
