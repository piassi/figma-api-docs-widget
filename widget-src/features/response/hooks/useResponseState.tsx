import { useToggleableFeature } from "../../../shared/hooks/useToggleableFeature";
import { v4 as uuid } from "@lukeed/uuid";
import { HttpStatus } from "../../../shared/constants/httpStatuses";

const { widget } = figma;
const { useSyncedState } = widget;

const RESPONSE_STATE_KEYS = {
  RESPONSES: "responses",
  IS_RESPONSE_ENABLED: "isResponseEnabled",
  SHOW_RESPONSES_PANEL: "showResponsesPanel",
} as const;

export type ResponseItem = {
  id: string;
  content: string;
  statusCode: HttpStatus;
};

const RESPONSE_DEFAULT_VALUES = {
  RESPONSES: [] as ResponseItem[],
  IS_RESPONSE_ENABLED: false,
  SHOW_RESPONSES_PANEL: false,
} as const;

export type ResponseState = {
  responses: ResponseItem[];
  setResponses: (responses: ResponseItem[]) => void;
  addResponse: () => void;
  updateResponse: (id: string, content: string) => void;
  updateResponseStatus: (id: string, statusCode: HttpStatus) => void;
  removeResponse: (id: string) => void;
  showResponsesPanel: boolean;
  setShowResponsesPanel: (show: boolean) => void;
  toggleResponsesPanel: () => void;
  isResponseEnabled: boolean;
  setIsResponseEnabled: (enabled: boolean) => void;
  enableResponse: () => void;
  disableResponse: () => void;
};

export function useResponseState(): ResponseState {
  const [responses, setResponses] = useSyncedState(
    RESPONSE_STATE_KEYS.RESPONSES,
    RESPONSE_DEFAULT_VALUES.RESPONSES
  ) as [ResponseItem[], (responses: ResponseItem[]) => void];

  const [showResponsesPanel, setShowResponsesPanel] = useSyncedState(
    RESPONSE_STATE_KEYS.SHOW_RESPONSES_PANEL,
    RESPONSE_DEFAULT_VALUES.SHOW_RESPONSES_PANEL
  ) as [boolean, (show: boolean) => void];

  const feature = useToggleableFeature(
    RESPONSE_STATE_KEYS.IS_RESPONSE_ENABLED,
    RESPONSE_DEFAULT_VALUES.IS_RESPONSE_ENABLED
  );

  const addResponse = () => {
    const newResponse: ResponseItem = {
      id: uuid(),
      content: "",
      statusCode: 200,
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

  const updateResponseStatus = (id: string, statusCode: HttpStatus) => {
    setResponses(
      responses.map((response) =>
        response.id === id ? { ...response, statusCode } : response
      )
    );
  };

  const toggleResponsesPanel = () => {
    setShowResponsesPanel(!showResponsesPanel);
  };

  const enableResponse = () => {
    feature.enable();
    setShowResponsesPanel(true);

    if (responses.length === 0) {
      const defaultResponse: ResponseItem = {
        id: uuid(),
        content: "",
        statusCode: 200,
      };
      setResponses([defaultResponse]);
    }
  };

  const disableResponse = () => {
    feature.disable();
    setShowResponsesPanel(false);
  };

  const removeResponse = (id: string) => {
    const updatedResponses = responses.filter((response) => response.id !== id);
    setResponses(updatedResponses);
  };

  return {
    responses,
    setResponses,
    addResponse,
    updateResponse,
    updateResponseStatus,
    removeResponse,
    showResponsesPanel,
    setShowResponsesPanel,
    toggleResponsesPanel,

    isResponseEnabled: feature.enabled,
    setIsResponseEnabled: feature.setEnabled,
    enableResponse,
    disableResponse,
  };
}
