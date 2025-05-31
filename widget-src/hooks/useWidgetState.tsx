const { widget } = figma;
const { useSyncedState } = widget;

export const HTTP_METHODS = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "HEAD",
  "OPTIONS",
] as const;

export type HttpMethod = (typeof HTTP_METHODS)[number];

export function isValidHttpMethod(method: string): method is HttpMethod {
  return HTTP_METHODS.includes(method as HttpMethod);
}

const ENDPOINT_STATE_KEYS = {
  HTTP_METHOD: "httpMethod",
  ENDPOINT_PATH: "endpointPath",
} as const;

const REQUEST_STATE_KEYS = {
  SHOW_REQUEST_POPUP: "showRequestPopup",
  REQUEST_CONTENT: "requestContent",
  IS_REQUEST_EDITING: "isRequestEditing",
  HAS_REQUEST: "hasRequest",
} as const;

const RESPONSE_STATE_KEYS = {
  SHOW_RESPONSE_POPUP: "showResponsePopup",
  RESPONSE_CONTENT: "responseContent",
  IS_RESPONSE_EDITING: "isResponseEditing",
  HAS_RESPONSE: "hasResponse",
} as const;

const ENDPOINT_DEFAULT_VALUES = {
  HTTP_METHOD: "GET" as HttpMethod,
  ENDPOINT_PATH: "",
} as const;

const REQUEST_DEFAULT_VALUES = {
  SHOW_REQUEST_POPUP: false,
  REQUEST_CONTENT: "{}",
  IS_REQUEST_EDITING: false,
  HAS_REQUEST: false,
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

function usePopupState(key: string, defaultValue: boolean = false) {
  const [show, setShow] = useSyncedState(key, defaultValue);
  return {
    show,
    setShow,
    toggle: () => setShow(!show),
  };
}

function useEditableContent(
  contentKey: string,
  editingKey: string,
  defaultContent: string
) {
  const [content, setContent] = useSyncedState(contentKey, defaultContent);
  const [isEditing, setIsEditing] = useSyncedState(editingKey, false);

  return {
    content,
    setContent,
    isEditing,
    setIsEditing,
    toggleEditing: () => setIsEditing(!isEditing),
  };
}

function useToggleableFeature(key: string, defaultValue: boolean = false) {
  const [enabled, setEnabled] = useSyncedState(key, defaultValue);
  return {
    enabled,
    setEnabled,
    enable: () => setEnabled(true),
    disable: () => setEnabled(false),
  };
}

type EndpointState = {
  httpMethod: HttpMethod;
  setHttpMethod: (method: HttpMethod) => void;
  endpointPath: string;
  setEndpointPath: (path: string) => void;
};

type RequestState = {
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

type ResponseState = {
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

export type WidgetState = EndpointState & RequestState & ResponseState;

function useEndpointState(): EndpointState {
  const [httpMethod, setHttpMethod] = useSyncedState<HttpMethod>(
    ENDPOINT_STATE_KEYS.HTTP_METHOD,
    ENDPOINT_DEFAULT_VALUES.HTTP_METHOD
  );
  const [endpointPath, setEndpointPath] = useSyncedState<string>(
    ENDPOINT_STATE_KEYS.ENDPOINT_PATH,
    ENDPOINT_DEFAULT_VALUES.ENDPOINT_PATH
  );

  return {
    httpMethod,
    setHttpMethod,
    endpointPath,
    setEndpointPath,
  };
}

function useRequestState(): RequestState {
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

function useResponseState(): ResponseState {
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

export function useWidgetState(): WidgetState {
  const endpoint = useEndpointState();
  const request = useRequestState();
  const response = useResponseState();

  return {
    ...endpoint,
    ...request,
    ...response,
  };
}
