import { JSON_EDITOR_HTML } from '@/shared/utils/htmlLoader';

export const useJsonEditor = () => {
  const openEditor = (content: string, onSave: (content: string) => void) => {
    return new Promise<void>((resolve) => {
      figma.showUI(JSON_EDITOR_HTML, {
        width: 550,
        height: 500,
        title: "JSON Editor",
      });

      figma.ui.onmessage = (message) => {
        const messageType = message.pluginMessage?.type || message.type;

        if (messageType === "request-content") {
          figma.ui.postMessage({
            type: "init-content",
            content: content,
          });
        } else if (messageType === "save-content") {
          const messageContent =
            message.pluginMessage?.content || message.content;
          onSave(messageContent);
          figma.closePlugin();
          resolve();
        } else if (messageType === "cancel") {
          figma.closePlugin();
          resolve();
        }
      };
    });
  };

  return { openEditor };
}; 