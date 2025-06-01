export const HTTP_STATUSES = [
  // 2xx Success
  200, 201, 202, 204,
  // 3xx Redirection  
  301, 302, 304,
  // 4xx Client Error
  400, 401, 403, 404, 405, 409, 422, 429,
  // 5xx Server Error
  500, 501, 502, 503, 504
] as const;

export type HttpStatus = (typeof HTTP_STATUSES)[number];

export const HTTP_STATUS_MESSAGES: Record<HttpStatus, string> = {
  // 2xx Success
  200: "OK",
  201: "Created", 
  202: "Accepted",
  204: "No Content",
  // 3xx Redirection
  301: "Moved Permanently",
  302: "Found",
  304: "Not Modified",
  // 4xx Client Error
  400: "Bad Request",
  401: "Unauthorized", 
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  409: "Conflict",
  422: "Unprocessable Entity",
  429: "Too Many Requests",
  // 5xx Server Error
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway", 
  503: "Service Unavailable",
  504: "Gateway Timeout"
};

export function isValidHttpStatus(status: number): status is HttpStatus {
  return HTTP_STATUSES.includes(status as HttpStatus);
}

export function getStatusMessage(status: HttpStatus): string {
  return HTTP_STATUS_MESSAGES[status];
}

export function getStatusColor(status: HttpStatus): string {
  if (status >= 200 && status < 300) return "#4CAF50"; // Green for success
  if (status >= 300 && status < 400) return "#FF9800"; // Orange for redirection
  if (status >= 400 && status < 500) return "#F44336"; // Red for client error
  if (status >= 500) return "#9C27B0"; // Purple for server error
  return "#9E9E9E"; // Gray fallback
} 