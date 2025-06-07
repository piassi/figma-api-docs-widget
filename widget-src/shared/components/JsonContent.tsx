const { widget } = figma;
const { AutoLayout, Text } = widget;

import { useJsonEditor } from "@/shared/hooks/useJsonEditor";
import { HighlightedText } from "@/shared/components/HighlightedText";

type JsonContentProps = {
  content: string;
  onContentChange?: (content: string) => void;
  emptyMessage?: string;
  editable?: boolean;
  padding?: number;
};

export const JsonContent = ({
  content,
  onContentChange,
  emptyMessage = "Empty content",
  editable = true,
  padding = 12,
}: JsonContentProps) => {
  const { openEditor } = useJsonEditor();

  const handleEdit = () => {
    if (onContentChange) {
      return openEditor(content, onContentChange);
    }
  };

  const canEdit = editable && onContentChange;

  const isEmpty = content.trim() === "";

  return (
    <AutoLayout
      direction="vertical"
      padding={padding}
      cornerRadius={4}
      fill="#F8F8F8"
      width="fill-parent"
      stroke="#E6E6E6"
      strokeWidth={1}
      onClick={canEdit ? handleEdit : undefined}
      tooltip={canEdit ? "Click to edit JSON" : undefined}
    >
      {isEmpty ? (
        <Text fontSize={12} fill="#999999">
          {emptyMessage}
        </Text>
      ) : (
        <HighlightedText code={content} />
      )}
    </AutoLayout>
  );
};
