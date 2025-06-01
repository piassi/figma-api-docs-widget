import { Button } from '@/shared/components/Button';
import {
  ChevronDownIcon,
  ChevronUpIcon,
} from '@/shared/components/icons/index';
import { ResponseFeature } from '@/features/response/hooks/useResponseFeature';

type ResponseButtonProps = {
  response: ResponseFeature;
};

export const ResponseButton = ({ response }: ResponseButtonProps) => {
  if (!response.state.isResponseEnabled) return null;

  return (
    <Button
      label={`Responses (${response.state.responses.length})`}
      onClick={response.state.toggleResponsesPanel}
      backgroundColor="#000000"
      strokeColor="#000000"
      icon={
        response.state.showResponsesPanel ? (
          <ChevronUpIcon size={16} color="#FFFFFF" />
        ) : (
          <ChevronDownIcon size={16} color="#FFFFFF" />
        )
      }
    />
  );
};
