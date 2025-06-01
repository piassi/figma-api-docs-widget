const { widget } = figma;
const { AutoLayout } = widget;

import { RequestFeature } from "../hooks/useRequestFeature";
import { Popup } from "../../components/Popup";
import { JsonContent } from "../../components/JsonContent";
import { EditIcon } from "../../components/icons/index";
import { useJsonEditor } from "../../hooks/useJsonEditor";

type RequestPopupProps = {
  request: RequestFeature;
};

export const RequestPopup = ({ request }: RequestPopupProps) => {
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
    <Popup
      isVisible={request.state.showRequestPopup}
      title="Expected Request Body"
      headerActions={headerActions}
    >
      <JsonContent
        content={request.state.requestContent}
        onContentChange={request.state.setRequestContent}
        emptyMessage="Empty request body"
      />
    </Popup>
  );
};
