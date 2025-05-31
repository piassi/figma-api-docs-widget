import { Button } from "../../components/Button";
import { RequestFeature } from "../hooks/useRequestFeature";

type RequestButtonProps = {
  request: RequestFeature;
};

export const RequestButton = ({ request }: RequestButtonProps) => {
  if (!request.state.hasRequest) return null;

  return <Button label="Request" onClick={request.state.toggleRequestPopup} />;
};
