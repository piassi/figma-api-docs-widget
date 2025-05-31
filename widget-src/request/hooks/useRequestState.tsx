import { usePopupState } from "../../hooks/usePopupState";
import { useToggleableFeature } from "../../hooks/useToggleableFeature";

const { widget } = figma;
const { useSyncedState } = widget;

const REQUEST_STATE_KEYS = {
  SHOW_REQUEST_POPUP: "showRequestPopup",
  REQUEST_CONTENT: "requestContent",
  IS_REQUEST_ENABLED: "isRequestEnabled",
} as const;

const REQUEST_DEFAULT_VALUES = {
  SHOW_REQUEST_POPUP: false,
  REQUEST_CONTENT: "",
  IS_REQUEST_ENABLED: false,
} as const;

export type RequestState = {
  showRequestPopup: boolean;
  setShowRequestPopup: (show: boolean) => void;
  toggleRequestPopup: () => void;
  requestContent: string;
  setRequestContent: (content: string) => void;
  isRequestEnabled: boolean;
  setIsRequestEnabled: (enabled: boolean) => void;
  enableRequest: () => void;
  disableRequest: () => void;
};

export function useRequestState(): RequestState {
  const popup = usePopupState(
    REQUEST_STATE_KEYS.SHOW_REQUEST_POPUP,
    REQUEST_DEFAULT_VALUES.SHOW_REQUEST_POPUP
  );
  const [requestContent, setRequestContent] = useSyncedState(
    REQUEST_STATE_KEYS.REQUEST_CONTENT,
    REQUEST_DEFAULT_VALUES.REQUEST_CONTENT
  ) as [string, (content: string) => void];
  const feature = useToggleableFeature(
    REQUEST_STATE_KEYS.IS_REQUEST_ENABLED,
    REQUEST_DEFAULT_VALUES.IS_REQUEST_ENABLED
  );

  const enableRequest = () => {
    feature.enable();
    popup.setShow(true);
  };

  const disableRequest = () => {
    feature.disable();
    popup.setShow(false);
  };

  return {
    showRequestPopup: popup.show,
    setShowRequestPopup: popup.setShow,
    toggleRequestPopup: popup.toggle,

    requestContent,
    setRequestContent,

    isRequestEnabled: feature.enabled,
    setIsRequestEnabled: feature.setEnabled,
    enableRequest,
    disableRequest,
  };
}
