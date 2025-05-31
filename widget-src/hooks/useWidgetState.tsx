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

const STATE_KEYS = {
  HTTP_METHOD: "httpMethod",
  ENDPOINT_PATH: "endpointPath",
  SHOW_REQUEST_POPUP: "showRequestPopup",
  REQUEST_CONTENT: "requestContent",
  IS_REQUEST_EDITING: "isRequestEditing",
  SHOW_RESPONSE_POPUP: "showResponsePopup",
  RESPONSE_CONTENT: "responseContent",
  IS_RESPONSE_EDITING: "isResponseEditing",
  HAS_RESPONSE: "hasResponse",
  HAS_REQUEST: "hasRequest",
} as const;

const DEFAULT_VALUES = {
  HTTP_METHOD: "GET" as HttpMethod,
  ENDPOINT_PATH: "",
  SHOW_REQUEST_POPUP: false,
  REQUEST_CONTENT: "{}",
  IS_REQUEST_EDITING: false,
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
  HAS_REQUEST: false,
} as const;

type WidgetStateValues = {
  httpMethod: HttpMethod;
  endpointPath: string;
  showRequestPopup: boolean;
  requestContent: string;
  isRequestEditing: boolean;
  showResponsePopup: boolean;
  responseContent: string;
  isResponseEditing: boolean;
  hasResponse: boolean;
  hasRequest: boolean;
};

type WidgetStateActions = {
  setHttpMethod: (method: HttpMethod) => void;
  setEndpointPath: (path: string) => void;
  setShowRequestPopup: (show: boolean) => void;
  setRequestContent: (content: string) => void;
  setIsRequestEditing: (editing: boolean) => void;
  setShowResponsePopup: (show: boolean) => void;
  setResponseContent: (content: string) => void;
  setIsResponseEditing: (editing: boolean) => void;
  setHasResponse: (hasResponse: boolean) => void;
  setHasRequest: (hasRequest: boolean) => void;
  toggleRequestPopup: () => void;
  toggleResponsePopup: () => void;
  toggleRequestEditing: () => void;
  toggleResponseEditing: () => void;
  addResponse: () => void;
  removeResponse: () => void;
  addRequest: () => void;
  removeRequest: () => void;
};

export type WidgetState = WidgetStateValues & WidgetStateActions;

export function useWidgetState(): WidgetState {
  const [httpMethod, setHttpMethod] = useSyncedState<HttpMethod>(
    STATE_KEYS.HTTP_METHOD,
    DEFAULT_VALUES.HTTP_METHOD
  );
  const [endpointPath, setEndpointPath] = useSyncedState<string>(
    STATE_KEYS.ENDPOINT_PATH,
    DEFAULT_VALUES.ENDPOINT_PATH
  );
  const [showRequestPopup, setShowRequestPopup] = useSyncedState<boolean>(
    STATE_KEYS.SHOW_REQUEST_POPUP,
    DEFAULT_VALUES.SHOW_REQUEST_POPUP
  );
  const [requestContent, setRequestContent] = useSyncedState<string>(
    STATE_KEYS.REQUEST_CONTENT,
    DEFAULT_VALUES.REQUEST_CONTENT
  );
  const [isRequestEditing, setIsRequestEditing] = useSyncedState<boolean>(
    STATE_KEYS.IS_REQUEST_EDITING,
    DEFAULT_VALUES.IS_REQUEST_EDITING
  );
  const [showResponsePopup, setShowResponsePopup] = useSyncedState<boolean>(
    STATE_KEYS.SHOW_RESPONSE_POPUP,
    DEFAULT_VALUES.SHOW_RESPONSE_POPUP
  );
  const [responseContent, setResponseContent] = useSyncedState<string>(
    STATE_KEYS.RESPONSE_CONTENT,
    DEFAULT_VALUES.RESPONSE_CONTENT
  );
  const [isResponseEditing, setIsResponseEditing] = useSyncedState<boolean>(
    STATE_KEYS.IS_RESPONSE_EDITING,
    DEFAULT_VALUES.IS_RESPONSE_EDITING
  );
  const [hasResponse, setHasResponse] = useSyncedState<boolean>(
    STATE_KEYS.HAS_RESPONSE,
    DEFAULT_VALUES.HAS_RESPONSE
  );
  const [hasRequest, setHasRequest] = useSyncedState<boolean>(
    STATE_KEYS.HAS_REQUEST,
    DEFAULT_VALUES.HAS_REQUEST
  );

  return {
    httpMethod,
    endpointPath,
    showRequestPopup,
    requestContent,
    isRequestEditing,
    showResponsePopup,
    responseContent,
    isResponseEditing,
    hasResponse,
    hasRequest,
    setHttpMethod,
    setEndpointPath,
    setShowRequestPopup,
    setRequestContent,
    setIsRequestEditing,
    setShowResponsePopup,
    setResponseContent,
    setIsResponseEditing,
    setHasResponse,
    setHasRequest,
    toggleRequestPopup: () => setShowRequestPopup(!showRequestPopup),
    toggleResponsePopup: () => setShowResponsePopup(!showResponsePopup),
    toggleRequestEditing: () => setIsRequestEditing(!isRequestEditing),
    toggleResponseEditing: () => setIsResponseEditing(!isResponseEditing),
    addResponse: () => setHasResponse(true),
    removeResponse: () => setHasResponse(false),
    addRequest: () => setHasRequest(true),
    removeRequest: () => setHasRequest(false),
  };
}
