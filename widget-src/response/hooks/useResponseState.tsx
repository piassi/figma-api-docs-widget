import { usePopupState } from "../../hooks/usePopupState";
import { useEditableContent } from "../../hooks/useEditableContent";
import { useToggleableFeature } from "../../hooks/useToggleableFeature";

const RESPONSE_STATE_KEYS = {
  SHOW_RESPONSE_POPUP: "showResponsePopup",
  RESPONSE_CONTENT: "responseContent",
  IS_RESPONSE_EDITING: "isResponseEditing",
  HAS_RESPONSE: "hasResponse",
} as const;

const RESPONSE_DEFAULT_VALUES = {
  SHOW_RESPONSE_POPUP: false,
  RESPONSE_CONTENT: `{
  "success": true,
  "data": {
    "id": "12345",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "created_at": "2024-01-01T00:00:00Z"
  },
  "message": "Operation completed successfully"
}`,
  IS_RESPONSE_EDITING: false,
  HAS_RESPONSE: false,
} as const;

export type ResponseState = {
  showResponsePopup: boolean;
  setShowResponsePopup: (show: boolean) => void;
  toggleResponsePopup: () => void;
  responseContent: string;
  setResponseContent: (content: string) => void;
  isResponseEditing: boolean;
  setIsResponseEditing: (editing: boolean) => void;
  toggleResponseEditing: () => void;
  hasResponse: boolean;
  setHasResponse: (hasResponse: boolean) => void;
  addResponse: () => void;
  removeResponse: () => void;
};

export function useResponseState(): ResponseState {
  const popup = usePopupState(
    RESPONSE_STATE_KEYS.SHOW_RESPONSE_POPUP,
    RESPONSE_DEFAULT_VALUES.SHOW_RESPONSE_POPUP
  );
  const content = useEditableContent(
    RESPONSE_STATE_KEYS.RESPONSE_CONTENT,
    RESPONSE_STATE_KEYS.IS_RESPONSE_EDITING,
    RESPONSE_DEFAULT_VALUES.RESPONSE_CONTENT
  );
  const feature = useToggleableFeature(
    RESPONSE_STATE_KEYS.HAS_RESPONSE,
    RESPONSE_DEFAULT_VALUES.HAS_RESPONSE
  );

  return {
    showResponsePopup: popup.show,
    setShowResponsePopup: popup.setShow,
    toggleResponsePopup: popup.toggle,

    responseContent: content.content,
    setResponseContent: content.setContent,
    isResponseEditing: content.isEditing,
    setIsResponseEditing: content.setIsEditing,
    toggleResponseEditing: content.toggleEditing,

    hasResponse: feature.enabled,
    setHasResponse: feature.setEnabled,
    addResponse: feature.enable,
    removeResponse: feature.disable,
  };
}
