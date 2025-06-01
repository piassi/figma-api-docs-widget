import { usePanelState } from "../../../hooks/usePanelState";
import { useToggleableFeature } from "../../../hooks/useToggleableFeature";

const { widget } = figma;
const { useSyncedState } = widget;

const REQUEST_STATE_KEYS = {
  SHOW_REQUEST_PANEL: "showRequestPanel",
  REQUEST_CONTENT: "requestContent",
  IS_REQUEST_ENABLED: "isRequestEnabled",
} as const;

const REQUEST_DEFAULT_VALUES = {
  SHOW_REQUEST_PANEL: false,
  REQUEST_CONTENT: "",
  IS_REQUEST_ENABLED: false,
} as const;

export type RequestState = {
  showRequestPanel: boolean;
  setShowRequestPanel: (show: boolean) => void;
  toggleRequestPanel: () => void;
  requestContent: string;
  setRequestContent: (content: string) => void;
  isRequestEnabled: boolean;
  setIsRequestEnabled: (enabled: boolean) => void;
  enableRequest: () => void;
  disableRequest: () => void;
};

export function useRequestState(): RequestState {
  const panel = usePanelState(
    REQUEST_STATE_KEYS.SHOW_REQUEST_PANEL,
    REQUEST_DEFAULT_VALUES.SHOW_REQUEST_PANEL
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
    panel.setShow(true);
  };

  const disableRequest = () => {
    feature.disable();
    panel.setShow(false);
  };

  return {
    showRequestPanel: panel.show,
    setShowRequestPanel: panel.setShow,
    toggleRequestPanel: panel.toggle,

    requestContent,
    setRequestContent,

    isRequestEnabled: feature.enabled,
    setIsRequestEnabled: feature.setEnabled,
    enableRequest,
    disableRequest,
  };
}
