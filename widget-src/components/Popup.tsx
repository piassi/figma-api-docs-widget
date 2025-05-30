const { widget } = figma;
const { AutoLayout, Text, Input } = widget;

import { HighlightedText } from "./HighlightedText";
import { EditIcon, JsonIcon, CloseIcon } from "./icons/index";

type PopupProps = {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  content: string;
  editable?: boolean;
  onContentChange?: (content: string) => void;
  onToggleEdit?: () => void;
};

export function Popup({
  isVisible,
  onClose,
  title,
  content,
  editable = false,
  onContentChange,
  onToggleEdit,
}: PopupProps) {
  if (!isVisible) return null;

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
        {onToggleEdit && (
          <AutoLayout
            onClick={onToggleEdit}
            tooltip={editable ? "Switch to view mode" : "Switch to edit mode"}
            padding={4}
            cornerRadius={4}
            fill="#00000000"
            horizontalAlignItems="center"
            verticalAlignItems="center"
          >
            {editable ? <JsonIcon /> : <EditIcon />}
          </AutoLayout>
        )}
        <CloseIcon onClick={onClose} tooltip="Close" />
      </AutoLayout>

      <AutoLayout
        direction="vertical"
        padding={16}
        cornerRadius={4}
        fill="#F8F8F8"
        width="fill-parent"
      >
        {editable && onContentChange ? (
          <Input
            value={content}
            onTextEditEnd={(e) => {
              onContentChange(e.characters);
            }}
            fontSize={12}
            fill="#333333"
            fontFamily="Monaco"
            width="fill-parent"
            placeholder="Enter JSON content..."
            inputBehavior="multiline"
            inputFrameProps={{
              fill: "#F8F8F8",
              stroke: "#E0E0E0",
              strokeWidth: 1,
              cornerRadius: 4,
              padding: 8,
            }}
          />
        ) : (
          <HighlightedText
            content={content}
            fontSize={12}
            fontFamily="Monaco"
            width="fill-parent"
          />
        )}
      </AutoLayout>
    </AutoLayout>
  );
}
