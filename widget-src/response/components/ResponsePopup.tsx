const { widget } = figma;
const { AutoLayout, Text } = widget;

import { HighlightedText } from "../../components/HighlightedText";
import { EditIcon, CloseIcon, DeleteIcon } from "../../components/icons/index";
import { AddIcon } from "../../components/icons/AddIcon";
import { ResponseFeature } from "../hooks/useResponseFeature";
import { JSON_EDITOR_HTML } from "../../utils/htmlLoader";

type ResponsePopUpProps = {
  response: ResponseFeature;
};

export const ResponsePopUp = ({ response }: ResponsePopUpProps) => {
  if (!response.state.hasResponse || !response.state.showResponsesPopup)
    return null;

  const openEditor = (responseId: string, content: string) => {
    return new Promise<void>((resolve) => {
      figma.showUI(JSON_EDITOR_HTML, {
        width: 550,
        height: 500,
        title: "JSON Editor",
      });

      figma.ui.onmessage = (message) => {
        if (message.type === "request-content") {
          figma.ui.postMessage({
            type: "init-content",
            content: content,
          });
        } else if (message.type === "save-content") {
          response.state.updateResponse(responseId, message.content);
          figma.closePlugin();
          resolve();
        } else if (message.type === "cancel") {
          figma.closePlugin();
          resolve();
        }
      };
    });
  };

  return (
    <AutoLayout
      direction="vertical"
      spacing={12}
      padding={20}
      cornerRadius={8}
      fill="#FFFFFF"
      stroke="#E0E0E0"
      strokeWidth={1}
      width={500}
    >
      <AutoLayout
        direction="horizontal"
        spacing={8}
        width="fill-parent"
        verticalAlignItems="center"
      >
        <Text fontSize={16} fill="#333333" fontWeight={600} width="fill-parent">
          Responses ({response.state.responses.length})
        </Text>
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
        <CloseIcon
          onClick={() => response.state.setShowResponsesPopup(false)}
          tooltip="Close"
        />
      </AutoLayout>

      <AutoLayout direction="vertical" spacing={16} width="fill-parent">
        {response.state.responses.map((responseItem, index) => (
          <AutoLayout
            key={responseItem.id}
            direction="vertical"
            spacing={8}
            width="fill-parent"
          >
            <AutoLayout
              direction="horizontal"
              spacing={4}
              width="fill-parent"
              verticalAlignItems="center"
            >
              <Text
                fontSize={14}
                fill="#666666"
                fontWeight={500}
                width="fill-parent"
              >
                Response {index + 1}
              </Text>
              {response.state.responses.length > 1 && (
                <AutoLayout
                  onClick={() => response.state.removeResponse(responseItem.id)}
                  tooltip="Delete response"
                  padding={4}
                  cornerRadius={4}
                  fill="#00000000"
                  horizontalAlignItems="center"
                  verticalAlignItems="center"
                >
                  <DeleteIcon size={14} />
                </AutoLayout>
              )}

              <AutoLayout
                onClick={() =>
                  openEditor(responseItem.id, responseItem.content)
                }
                tooltip="Edit JSON"
                padding={4}
                cornerRadius={4}
                fill="#00000000"
                horizontalAlignItems="center"
                verticalAlignItems="center"
              >
                <EditIcon size={14} />
              </AutoLayout>
            </AutoLayout>

            <AutoLayout
              direction="vertical"
              padding={12}
              cornerRadius={4}
              fill="#F8F8F8"
              width="fill-parent"
              stroke="#E6E6E6"
              strokeWidth={1}
            >
              <HighlightedText content={responseItem.content} />
            </AutoLayout>
          </AutoLayout>
        ))}
      </AutoLayout>
    </AutoLayout>
  );
};
