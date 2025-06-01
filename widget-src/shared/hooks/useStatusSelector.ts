import { STATUS_SELECTOR_HTML } from '@/shared/utils/htmlLoader';
import { HttpStatus } from '@/shared/constants/httpStatuses';

export const useStatusSelector = () => {
  const openStatusSelector = (
    currentStatus: HttpStatus,
    onStatusChange: (status: HttpStatus) => void
  ) => {
    return new Promise<void>((resolve) => {
      figma.showUI(STATUS_SELECTOR_HTML, {
        width: 460,
        height: 600,
        title: "Select Status Code",
      });

      figma.ui.onmessage = (message) => {
        const messageType = message.pluginMessage?.type || message.type;

        if (messageType === "request-current-status") {
          figma.ui.postMessage({
            type: "init-status-selector",
            currentStatus: currentStatus,
          });
        } else if (messageType === "status-selected") {
          const messageStatus = message.pluginMessage?.status || message.status;
          onStatusChange(messageStatus);
          figma.closePlugin();
          resolve();
        } else if (messageType === "status-selector-closed") {
          figma.closePlugin();
          resolve();
        }
      };
    });
  };

  return { openStatusSelector };
}; 