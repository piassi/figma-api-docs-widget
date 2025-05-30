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
} as const;

export type APIWidgetState = {
  httpMethod: HttpMethod;
  endpointPath: string;
  showRequestPopup: boolean;
  requestContent: string;
  isRequestEditing: boolean;
  showResponsePopup: boolean;
  responseContent: string;
  isResponseEditing: boolean;
  setHttpMethod: (method: HttpMethod) => void;
  setEndpointPath: (path: string) => void;
  setShowRequestPopup: (show: boolean) => void;
  setRequestContent: (content: string) => void;
  setIsRequestEditing: (editing: boolean) => void;
  setShowResponsePopup: (show: boolean) => void;
  setResponseContent: (content: string) => void;
  setIsResponseEditing: (editing: boolean) => void;
  toggleRequestPopup: () => void;
  toggleResponsePopup: () => void;
  toggleRequestEditing: () => void;
  toggleResponseEditing: () => void;
};

export function useAPIWidgetState(): APIWidgetState {
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

  return {
    httpMethod,
    endpointPath,
    showRequestPopup,
    requestContent,
    isRequestEditing,
    showResponsePopup,
    responseContent,
    isResponseEditing,
    setHttpMethod,
    setEndpointPath,
    setShowRequestPopup,
    setRequestContent,
    setIsRequestEditing,
    setShowResponsePopup,
    setResponseContent,
    setIsResponseEditing,
    toggleRequestPopup: () => setShowRequestPopup(!showRequestPopup),
    toggleResponsePopup: () => setShowResponsePopup(!showResponsePopup),
    toggleRequestEditing: () => setIsRequestEditing(!isRequestEditing),
    toggleResponseEditing: () => setIsResponseEditing(!isResponseEditing),
  };
}
