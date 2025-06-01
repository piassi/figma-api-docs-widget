const { widget } = figma;
const { AutoLayout } = widget;

import { RequestFeature } from '@/features/request/hooks/useRequestFeature';
import { Panel } from '@/shared/components/Panel';
import { JsonContent } from '@/shared/components/JsonContent';
import { EditIcon } from '@/shared/components/icons/index';
import { useJsonEditor } from '@/shared/hooks/useJsonEditor';

type RequestPanelProps = {
  request: RequestFeature;
};

export const RequestPanel = ({ request }: RequestPanelProps) => {
  if (!request.state.isRequestEnabled) return null;

  const { openEditor } = useJsonEditor();

  const handleEdit = () => {
    return openEditor(
      request.state.requestContent,
      request.state.setRequestContent
    );
  };

  const headerActions = (
    <AutoLayout
      onClick={handleEdit}
      tooltip="Edit JSON"
      padding={4}
      cornerRadius={4}
      fill="#00000000"
      horizontalAlignItems="center"
      verticalAlignItems="center"
    >
      <EditIcon />
    </AutoLayout>
  );

  return (
    <Panel
      isVisible={request.state.showRequestPanel}
      title="Expected Request Body"
      headerActions={headerActions}
    >
      <JsonContent
        content={request.state.requestContent}
        onContentChange={request.state.setRequestContent}
        emptyMessage="Empty request body"
      />
    </Panel>
  );
};
