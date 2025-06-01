const { widget } = figma;
const { AutoLayout } = widget;

import { AddIcon } from "../../components/icons/AddIcon";
import { Popup } from "../../components/Popup";
import { ResponseItem } from "./ResponseItem";
import { ResponseFeature } from "../hooks/useResponseFeature";

type ResponsePopUpProps = {
  response: ResponseFeature;
};

export const ResponsePopUp = ({ response }: ResponsePopUpProps) => {
  if (!response.state.isResponseEnabled || !response.state.showResponsesPopup)
    return null;

  return (
    <Popup
      isVisible={true}
      title={`Responses (${response.state.responses.length})`}
      headerActions={
        <AutoLayout
          onClick={response.state.addResponse}
          tooltip="Add new response"
          padding={4}
          cornerRadius={4}
          fill="#00000000"
          horizontalAlignItems="center"
          verticalAlignItems="center"
        >
          <AddIcon size={16} color="#666666" />
        </AutoLayout>
      }
    >
      <AutoLayout direction="vertical" spacing={16} width="fill-parent">
        {response.state.responses.map((responseItem) => (
          <ResponseItem
            key={responseItem.id}
            response={responseItem}
            onContentChange={response.state.updateResponse}
            onStatusChange={response.state.updateResponseStatus}
            onDelete={response.state.removeResponse}
            showDeleteButton={response.state.responses.length > 1}
          />
        ))}
      </AutoLayout>
    </Popup>
  );
};
