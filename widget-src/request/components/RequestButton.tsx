import { Button } from "../../components/Button";
import { ChevronDownIcon, ChevronUpIcon } from "../../components/icons/index";
import { RequestFeature } from "../hooks/useRequestFeature";

type RequestButtonProps = {
  request: RequestFeature;
};

export const RequestButton = ({ request }: RequestButtonProps) => {
  if (!request.state.hasRequest) return null;

  return (
    <Button
      label="Request"
      onClick={request.state.toggleRequestPopup}
      icon={
        request.state.showRequestPopup ? (
          <ChevronUpIcon size={16} color="#FFFFFF" />
        ) : (
          <ChevronDownIcon size={16} color="#FFFFFF" />
        )
      }
    />
  );
};
