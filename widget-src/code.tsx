const { widget } = figma;
const { useSyncedState, AutoLayout } = widget;

import { Popup } from "./components/Popup";
import { Button } from "./components/Button";
import { EndpointBar } from "./components/EndpointBar";
import { useAPIPropertyMenu } from "./hooks/useAPIPropertyMenu";

function Widget() {
  const [count, setCount] = useSyncedState("count", 0);
  const [httpMethod, setHttpMethod] = useSyncedState("httpMethod", "GET");
  const [endpointPath, setEndpointPath] = useSyncedState("endpointPath", "");
  const [showRequestPopup, setShowRequestPopup] = useSyncedState(
    "showRequestPopup",
    false
  );
  const [requestContent, setRequestContent] = useSyncedState(
    "requestContent",
    `{}`
  );
  const [isRequestEditing, setIsRequestEditing] = useSyncedState(
    "isRequestEditing",
    false
  );
  const [showResponsePopup, setShowResponsePopup] = useSyncedState(
    "showResponsePopup",
    false
  );
  const [responseContent, setResponseContent] = useSyncedState(
    "responseContent",
    `{
  "success": true,
  "data": {
    "id": "12345",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "created_at": "2024-01-01T00:00:00Z"
  },
  "message": "Operation completed successfully"
}`
  );
  const [isResponseEditing, setIsResponseEditing] = useSyncedState(
    "isResponseEditing",
    false
  );

  useAPIPropertyMenu({
    httpMethod,
    onHttpMethodChange: setHttpMethod,
    count,
    onReset: () => setCount(0),
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
          httpMethod={httpMethod}
          endpointPath={endpointPath}
          onEndpointPathChange={setEndpointPath}
          placeholder="/api/endpoint/path"
        />

        <AutoLayout direction="horizontal" spacing={16} width="fill-parent">
          <Button
            label="Request"
            onClick={() => setShowRequestPopup(!showRequestPopup)}
            backgroundColor="#4A90E2"
            strokeColor="#3A7BC8"
            tooltip={`Request Body Example:
{
  "id": "string",
  "name": "string", 
  "email": "user@example.com",
  "data": {
    "field1": "value1",
    "field2": 123
  }
}`}
          />

          <Button
            label="Response"
            onClick={() => setShowResponsePopup(!showResponsePopup)}
            backgroundColor="#28A745"
            strokeColor="#1E7E34"
            tooltip={`Response Body Example:
{
  "success": true,
  "data": {
    "id": "12345",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "created_at": "2024-01-01T00:00:00Z"
  },
  "message": "Operation completed successfully"
}`}
          />
        </AutoLayout>
      </AutoLayout>

      <Popup
        isVisible={showRequestPopup}
        onClose={() => setShowRequestPopup(false)}
        title="Expected Request Body"
        content={requestContent}
        editable={isRequestEditing}
        onContentChange={setRequestContent}
        onToggleEdit={() => setIsRequestEditing(!isRequestEditing)}
      />

      <Popup
        isVisible={showResponsePopup}
        onClose={() => setShowResponsePopup(false)}
        title="Expected Response Body"
        content={responseContent}
        editable={isResponseEditing}
        onContentChange={setResponseContent}
        onToggleEdit={() => setIsResponseEditing(!isResponseEditing)}
      />
    </AutoLayout>
  );
}

widget.register(Widget);
