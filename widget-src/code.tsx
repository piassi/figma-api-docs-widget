const { widget } = figma;
const { AutoLayout } = widget;

import { Popup } from "./components/Popup";
import { Button } from "./components/Button";
import { EndpointBar } from "./components/EndpointBar";
import { useAPIPropertyMenu } from "./hooks/useAPIPropertyMenu";
import { useAPIWidgetState } from "./hooks/useAPIWidgetState";

function Widget() {
  const state = useAPIWidgetState();

  useAPIPropertyMenu({
    httpMethod: state.httpMethod,
    onHttpMethodChange: state.setHttpMethod,
    count: state.count,
    onReset: state.resetCount,
  });

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
          httpMethod={state.httpMethod}
          endpointPath={state.endpointPath}
          onEndpointPathChange={state.setEndpointPath}
          placeholder="/api/endpoint/path"
        />

        <AutoLayout direction="horizontal" spacing={16} width="fill-parent">
          <Button
            label="Request"
            onClick={state.toggleRequestPopup}
            backgroundColor="#4A90E2"
            strokeColor="#3A7BC8"
          />

          <Button
            label="Response"
            onClick={state.toggleResponsePopup}
            backgroundColor="#28A745"
            strokeColor="#1E7E34"
          />
        </AutoLayout>
      </AutoLayout>

      <Popup
        isVisible={state.showRequestPopup}
        onClose={() => state.setShowRequestPopup(false)}
        title="Expected Request Body"
        content={state.requestContent}
        editable={state.isRequestEditing}
        onContentChange={state.setRequestContent}
        onToggleEdit={state.toggleRequestEditing}
      />

      <Popup
        isVisible={state.showResponsePopup}
        onClose={() => state.setShowResponsePopup(false)}
        title="Expected Response Body"
        content={state.responseContent}
        editable={state.isResponseEditing}
        onContentChange={state.setResponseContent}
        onToggleEdit={state.toggleResponseEditing}
      />
    </AutoLayout>
  );
}

widget.register(Widget);
