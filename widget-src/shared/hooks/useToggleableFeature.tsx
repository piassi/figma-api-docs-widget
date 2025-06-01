const { widget } = figma;
const { useSyncedState } = widget;

export function useToggleableFeature(
  key: string,
  defaultValue: boolean = false
) {
  const [enabled, setEnabled] = useSyncedState(key, defaultValue);
  return {
    enabled,
    setEnabled,
    enable: () => setEnabled(true),
    disable: () => setEnabled(false),
  };
}
