const { widget } = figma;
const { AutoLayout } = widget;

import { Popup } from "./components/Popup";
import { Button } from "./components/Button";
import { EndpointBar } from "./components/EndpointBar";
import { useWidgetMenu } from "./hooks/useWidgetMenu";
import { useWidgetState } from "./hooks/useWidgetState";

function Widget() {
  const state = useWidgetState();

  useWidgetMenu({ state });

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

        {(state.hasRequest || state.hasResponse) && (
          <AutoLayout direction="horizontal" spacing={16} width="fill-parent">
            {state.hasRequest && (
              <Button label="Request" onClick={state.toggleRequestPopup} />
            )}

            {state.hasResponse && (
              <Button label="Response" onClick={state.toggleResponsePopup} />
            )}
          </AutoLayout>
        )}
      </AutoLayout>

      {state.hasRequest && (
        <Popup
          isVisible={state.showRequestPopup}
          onClose={() => state.setShowRequestPopup(false)}
          title="Expected Request Body"
          content={state.requestContent}
          editable={state.isRequestEditing}
          onContentChange={state.setRequestContent}
          onToggleEdit={state.toggleRequestEditing}
        />
      )}

      {state.hasResponse && (
        <Popup
          isVisible={state.showResponsePopup}
          onClose={() => state.setShowResponsePopup(false)}
          title="Expected Response Body"
          content={state.responseContent}
          editable={state.isResponseEditing}
          onContentChange={state.setResponseContent}
          onToggleEdit={state.toggleResponseEditing}
        />
      )}
    </AutoLayout>
  );
}

widget.register(Widget);
