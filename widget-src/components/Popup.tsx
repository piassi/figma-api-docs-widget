const { widget } = figma;
const { AutoLayout, Text } = widget;

import { HighlightedText } from "./HighlightedText";
import { EditIcon } from "./icons/index";
import { JSON_EDITOR_HTML } from "../utils/htmlLoader";

type PopupProps = {
  isVisible: boolean;
  title: string;
  content: string;
  onContentChange?: (content: string) => void;
};

export function Popup({
  isVisible,
  title,
  content,
  onContentChange,
}: PopupProps) {
  if (!isVisible) {
    return null;
  }

  const openEditor = () => {
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
          onContentChange && onContentChange(message.content);
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
          {title}
        </Text>
        {onContentChange && (
          <AutoLayout
            onClick={openEditor}
            tooltip="Edit JSON"
            padding={4}
            cornerRadius={4}
            fill="#00000000"
            horizontalAlignItems="center"
            verticalAlignItems="center"
          >
            <EditIcon />
          </AutoLayout>
        )}
      </AutoLayout>

      <AutoLayout
        direction="vertical"
        padding={16}
        cornerRadius={4}
        fill="#F8F8F8"
        width="fill-parent"
      >
        <HighlightedText content={content} />
      </AutoLayout>
    </AutoLayout>
  );
}
