const { widget } = figma;
const { AutoLayout } = widget;

import { JsonContent } from '@/shared/components/JsonContent';
import { EditIcon, DeleteIcon } from '@/shared/components/icons/index';
import { useJsonEditor } from '@/shared/hooks/useJsonEditor';
import { useStatusSelector } from '@/shared/hooks/useStatusSelector';
import { HttpStatus } from '@/shared/constants/httpStatuses';
import { ResponseItem as ResponseItemType } from '@/features/response/hooks/useResponseState';
import { StatusBadge } from "./StatusBadge";

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
