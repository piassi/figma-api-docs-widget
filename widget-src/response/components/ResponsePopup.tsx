import { Popup } from "../../components/Popup";
import { ResponseFeature } from "../hooks/useResponseFeature";

type ResponsePopUpProps = {
  response: ResponseFeature;
};

export const ResponsePopUp = ({ response }: ResponsePopUpProps) => {
  if (!response.state.hasResponse) return null;

  return (
    <Popup
      isVisible={response.state.showResponsePopup}
      onClose={() => response.state.setShowResponsePopup(false)}
      title="Expected Response Body"
      content={response.state.responseContent}
      onContentChange={response.state.setResponseContent}
    />
  );
};
