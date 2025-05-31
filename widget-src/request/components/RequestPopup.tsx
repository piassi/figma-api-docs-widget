import { RequestFeature } from "../hooks/useRequestFeature";
import { Popup } from "../../components/Popup";

type RequestPopupProps = {
  request: RequestFeature;
};

export const RequestPopup = ({ request }: RequestPopupProps) => {
  if (!request.state.isRequestEnabled) return null;

  return (
    <Popup
      isVisible={request.state.showRequestPopup}
      title="Expected Request Body"
      content={request.state.requestContent}
      onContentChange={request.state.setRequestContent}
    />
  );
};
