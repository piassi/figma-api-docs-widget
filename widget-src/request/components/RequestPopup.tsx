import { Popup } from "../../components/Popup";
import { RequestFeature } from "../hooks/useRequestFeature";

type RequestPopupProps = {
  request: RequestFeature;
};

export const RequestPopup = ({ request }: RequestPopupProps) => {
  if (!request.state.hasRequest) return null;

  return (
    <Popup
      isVisible={request.state.showRequestPopup}
      onClose={() => request.state.setShowRequestPopup(false)}
      title="Expected Request Body"
      content={request.state.requestContent}
      onContentChange={request.state.setRequestContent}
    />
  );
};
