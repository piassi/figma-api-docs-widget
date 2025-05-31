import { Button } from "../../components/Button";
import { ResponseFeature } from "../hooks/useResponseFeature";

type ResponseButtonProps = {
  response: ResponseFeature;
};

export const ResponseButton = ({ response }: ResponseButtonProps) => {
  if (!response.state.hasResponse) return null;

  return (
    <Button
      label={`Responses (${response.state.responses.length})`}
      onClick={response.state.toggleResponsesPopup}
      backgroundColor="#000000"
      strokeColor="#000000"
    />
  );
};
