const { widget } = figma;
const { useSyncedState } = widget;

export function useEditableContent(
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
