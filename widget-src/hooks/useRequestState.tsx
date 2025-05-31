import { usePopupState } from "./usePopupState";
import { useEditableContent } from "./useEditableContent";
import { useToggleableFeature } from "./useToggleableFeature";

const REQUEST_STATE_KEYS = {
  SHOW_REQUEST_POPUP: "showRequestPopup",
  REQUEST_CONTENT: "requestContent",
  IS_REQUEST_EDITING: "isRequestEditing",
  HAS_REQUEST: "hasRequest",
} as const;

const REQUEST_DEFAULT_VALUES = {
  SHOW_REQUEST_POPUP: false,
  REQUEST_CONTENT: "{}",
  IS_REQUEST_EDITING: false,
  HAS_REQUEST: false,
} as const;

export type RequestState = {
  showRequestPopup: boolean;
  setShowRequestPopup: (show: boolean) => void;
  toggleRequestPopup: () => void;
  requestContent: string;
  setRequestContent: (content: string) => void;
  isRequestEditing: boolean;
  setIsRequestEditing: (editing: boolean) => void;
  toggleRequestEditing: () => void;
  hasRequest: boolean;
  setHasRequest: (hasRequest: boolean) => void;
  addRequest: () => void;
  removeRequest: () => void;
};

export function useRequestState(): RequestState {
  const popup = usePopupState(
    REQUEST_STATE_KEYS.SHOW_REQUEST_POPUP,
    REQUEST_DEFAULT_VALUES.SHOW_REQUEST_POPUP
  );
  const content = useEditableContent(
    REQUEST_STATE_KEYS.REQUEST_CONTENT,
    REQUEST_STATE_KEYS.IS_REQUEST_EDITING,
    REQUEST_DEFAULT_VALUES.REQUEST_CONTENT
  );
  const feature = useToggleableFeature(
    REQUEST_STATE_KEYS.HAS_REQUEST,
    REQUEST_DEFAULT_VALUES.HAS_REQUEST
  );

  return {
    showRequestPopup: popup.show,
    setShowRequestPopup: popup.setShow,
    toggleRequestPopup: popup.toggle,

    requestContent: content.content,
    setRequestContent: content.setContent,
    isRequestEditing: content.isEditing,
    setIsRequestEditing: content.setIsEditing,
    toggleRequestEditing: content.toggleEditing,

    hasRequest: feature.enabled,
    setHasRequest: feature.setEnabled,
    addRequest: feature.enable,
    removeRequest: feature.disable,
  };
}
