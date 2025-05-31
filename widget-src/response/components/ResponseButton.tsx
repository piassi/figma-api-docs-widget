import { Button } from "../../components/Button";
import { ResponseFeature } from "../hooks/useResponseFeature";

type ResponseButtonProps = {
  response: ResponseFeature;
};

export const ResponseButton = ({ response }: ResponseButtonProps) => {
  if (!response.state.hasResponse) return null;

  return (
    <Button label="Response" onClick={response.state.toggleResponsePopup} />
  );
};
