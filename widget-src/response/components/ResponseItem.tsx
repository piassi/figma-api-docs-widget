const { widget } = figma;
const { AutoLayout } = widget;

import { JsonContent } from "../../components/JsonContent";
import { EditIcon, DeleteIcon } from "../../components/icons/index";
import { StatusBadge } from "./StatusBadge";
import { useJsonEditor } from "../../hooks/useJsonEditor";
import { useStatusSelector } from "../../hooks/useStatusSelector";
import { HttpStatus } from "../../constants/httpStatuses";
import { ResponseItem as ResponseItemType } from "../hooks/useResponseState";

type ResponseItemProps = {
  response: ResponseItemType;
  onContentChange: (responseId: string, content: string) => void;
  onStatusChange: (responseId: string, status: HttpStatus) => void;
  onDelete?: (responseId: string) => void;
  showDeleteButton?: boolean;
};

export const ResponseItem = ({
  response,
  onContentChange,
  onStatusChange,
  onDelete,
  showDeleteButton = true,
}: ResponseItemProps) => {
  const { openEditor } = useJsonEditor();
  const { openStatusSelector } = useStatusSelector();

  const handleContentEdit = () => {
    return openEditor(response.content, (newContent) => {
      onContentChange(response.id, newContent);
    });
  };

  const handleStatusChange = () => {
    return openStatusSelector(response.statusCode, (newStatus) => {
      onStatusChange(response.id, newStatus);
    });
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(response.id);
    }
  };

  return (
    <AutoLayout direction="vertical" spacing={8} width="fill-parent">
      <AutoLayout
        direction="horizontal"
        spacing={4}
        width="fill-parent"
        verticalAlignItems="center"
      >
        <StatusBadge
          status={response.statusCode}
          onClick={handleStatusChange}
          tooltip="Click to change status code"
        />

        <AutoLayout height={1} width="fill-parent" />

        {showDeleteButton && onDelete && (
          <AutoLayout
            onClick={handleDelete}
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
          onClick={handleContentEdit}
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

      <JsonContent
        content={response.content}
        onContentChange={(newContent) =>
          onContentChange(response.id, newContent)
        }
        emptyMessage="Empty response body"
      />
    </AutoLayout>
  );
};
