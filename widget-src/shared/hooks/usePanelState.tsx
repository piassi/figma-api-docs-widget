const { widget } = figma;
const { useSyncedState } = widget;

export function usePanelState(key: string, defaultValue: boolean = false) {
  const [show, setShow] = useSyncedState(key, defaultValue);
  return {
    show,
    setShow,
    toggle: () => setShow(!show),
  };
}
