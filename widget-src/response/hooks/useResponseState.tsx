import { useToggleableFeature } from "../../hooks/useToggleableFeature";
import { v4 as uuid } from "@lukeed/uuid";

const { widget } = figma;
const { useSyncedState } = widget;

const RESPONSE_STATE_KEYS = {
  RESPONSES: "responses",
  HAS_RESPONSE: "hasResponse",
  SHOW_RESPONSES_POPUP: "showResponsesPopup",
} as const;

export type ResponseItem = {
  id: string;
  content: string;
};

const RESPONSE_DEFAULT_VALUES = {
  RESPONSES: [] as ResponseItem[],
  HAS_RESPONSE: false,
  SHOW_RESPONSES_POPUP: false,
} as const;

export type ResponseState = {
  responses: ResponseItem[];
  setResponses: (responses: ResponseItem[]) => void;
  addResponse: () => void;
  updateResponse: (id: string, content: string) => void;
  showResponsesPopup: boolean;
  setShowResponsesPopup: (show: boolean) => void;
  toggleResponsesPopup: () => void;
  hasResponse: boolean;
  setHasResponse: (hasResponse: boolean) => void;
  enableResponse: () => void;
  disableResponse: () => void;
};

export function useResponseState(): ResponseState {
  const [responses, setResponses] = useSyncedState(
    RESPONSE_STATE_KEYS.RESPONSES,
    RESPONSE_DEFAULT_VALUES.RESPONSES
  ) as [ResponseItem[], (responses: ResponseItem[]) => void];

  const [showResponsesPopup, setShowResponsesPopup] = useSyncedState(
    RESPONSE_STATE_KEYS.SHOW_RESPONSES_POPUP,
    RESPONSE_DEFAULT_VALUES.SHOW_RESPONSES_POPUP
  ) as [boolean, (show: boolean) => void];

  const feature = useToggleableFeature(
    RESPONSE_STATE_KEYS.HAS_RESPONSE,
    RESPONSE_DEFAULT_VALUES.HAS_RESPONSE
  );

  const addResponse = () => {
    const newResponse: ResponseItem = {
      id: uuid(),
      content: "{}",
    };
    setResponses([...responses, newResponse]);
  };

  const updateResponse = (id: string, content: string) => {
    setResponses(
      responses.map((response) =>
        response.id === id ? { ...response, content } : response
      )
    );
  };

  const toggleResponsesPopup = () => {
    setShowResponsesPopup(!showResponsesPopup);
  };

  const enableResponse = () => {
    feature.enable();
    setShowResponsesPopup(true);

    if (responses.length === 0) {
      const defaultResponse: ResponseItem = {
        id: uuid(),
        content: "{}",
      };
      setResponses([defaultResponse]);
    }
  };

  const disableResponse = () => {
    feature.disable();
    setShowResponsesPopup(false);
  };

  return {
    responses,
    setResponses,
    addResponse,
    updateResponse,
    showResponsesPopup,
    setShowResponsesPopup,
    toggleResponsesPopup,

    hasResponse: feature.enabled,
    setHasResponse: feature.setEnabled,
    enableResponse,
    disableResponse,
  };
}
