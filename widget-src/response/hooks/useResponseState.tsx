import { usePopupState } from "../../hooks/usePopupState";
import { useToggleableFeature } from "../../hooks/useToggleableFeature";

const { widget } = figma;
const { useSyncedState } = widget;

const RESPONSE_STATE_KEYS = {
  SHOW_RESPONSE_POPUP: "showResponsePopup",
  RESPONSE_CONTENT: "responseContent",
  HAS_RESPONSE: "hasResponse",
} as const;

const RESPONSE_DEFAULT_VALUES = {
  SHOW_RESPONSE_POPUP: false,
  RESPONSE_CONTENT: "{}",
  HAS_RESPONSE: false,
} as const;

export type ResponseState = {
  showResponsePopup: boolean;
  setShowResponsePopup: (show: boolean) => void;
  toggleResponsePopup: () => void;
  responseContent: string;
  setResponseContent: (content: string) => void;
  hasResponse: boolean;
  setHasResponse: (hasResponse: boolean) => void;
  enableResponse: () => void;
  disableResponse: () => void;
};

export function useResponseState(): ResponseState {
  const popup = usePopupState(
    RESPONSE_STATE_KEYS.SHOW_RESPONSE_POPUP,
    RESPONSE_DEFAULT_VALUES.SHOW_RESPONSE_POPUP
  );
  const [responseContent, setResponseContent] = useSyncedState(
    RESPONSE_STATE_KEYS.RESPONSE_CONTENT,
    RESPONSE_DEFAULT_VALUES.RESPONSE_CONTENT
  ) as [string, (content: string) => void];
  const feature = useToggleableFeature(
    RESPONSE_STATE_KEYS.HAS_RESPONSE,
    RESPONSE_DEFAULT_VALUES.HAS_RESPONSE
  );

  return {
    showResponsePopup: popup.show,
    setShowResponsePopup: popup.setShow,
    toggleResponsePopup: popup.toggle,

    responseContent,
    setResponseContent,

    hasResponse: feature.enabled,
    setHasResponse: feature.setEnabled,
    enableResponse: feature.enable,
    disableResponse: feature.disable,
  };
}
