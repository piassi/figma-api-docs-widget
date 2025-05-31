const { widget } = figma;
const { AutoLayout } = widget;

import { Popup } from "./components/Popup";
import { Button } from "./components/Button";
import { EndpointBar } from "./components/EndpointBar";
import { useWidgetMenu } from "./hooks/useWidgetMenu";
import { useEndpointFeature } from "./hooks/useEndpointFeature";
import { useRequestFeature } from "./hooks/useRequestFeature";
import { useResponseFeature } from "./hooks/useResponseFeature";

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
            {request.state.hasRequest && (
              <Button
                label="Request"
                onClick={request.state.toggleRequestPopup}
              />
            )}

            {response.state.hasResponse && (
              <Button
                label="Response"
                onClick={response.state.toggleResponsePopup}
              />
            )}
          </AutoLayout>
        )}
      </AutoLayout>

      {request.state.hasRequest && (
        <Popup
          isVisible={request.state.showRequestPopup}
          onClose={() => request.state.setShowRequestPopup(false)}
          title="Expected Request Body"
          content={request.state.requestContent}
          editable={request.state.isRequestEditing}
          onContentChange={request.state.setRequestContent}
          onToggleEdit={request.state.toggleRequestEditing}
        />
      )}

      {response.state.hasResponse && (
        <Popup
          isVisible={response.state.showResponsePopup}
          onClose={() => response.state.setShowResponsePopup(false)}
          title="Expected Response Body"
          content={response.state.responseContent}
          editable={response.state.isResponseEditing}
          onContentChange={response.state.setResponseContent}
          onToggleEdit={response.state.toggleResponseEditing}
        />
      )}
    </AutoLayout>
  );
}

widget.register(Widget);
