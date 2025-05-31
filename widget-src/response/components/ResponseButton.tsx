import { Button } from "../../components/Button";
import { ChevronDownIcon, ChevronUpIcon } from "../../components/icons/index";
import { ResponseFeature } from "../hooks/useResponseFeature";

type ResponseButtonProps = {
  response: ResponseFeature;
};

export const ResponseButton = ({ response }: ResponseButtonProps) => {
  if (!response.state.isResponseEnabled) return null;

  return (
    <Button
      label={`Responses (${response.state.responses.length})`}
      onClick={response.state.toggleResponsesPopup}
      backgroundColor="#000000"
      strokeColor="#000000"
      icon={
        response.state.showResponsesPopup ? (
          <ChevronUpIcon size={16} color="#FFFFFF" />
        ) : (
          <ChevronDownIcon size={16} color="#FFFFFF" />
        )
      }
    />
  );
};
