import { useToggleableFeature } from "../../hooks/useToggleableFeature";

const { widget } = figma;
const { useSyncedState } = widget;

const DESCRIPTION_STATE_KEYS = {
  DESCRIPTION_CONTENT: "descriptionContent",
  HAS_DESCRIPTION: "hasDescription",
} as const;

const DESCRIPTION_DEFAULT_VALUES = {
  DESCRIPTION_CONTENT: "",
  HAS_DESCRIPTION: false,
} as const;

export type DescriptionState = {
  descriptionContent: string;
  setDescriptionContent: (content: string) => void;
  hasDescription: boolean;
  setHasDescription: (hasDescription: boolean) => void;
  enableDescription: () => void;
  disableDescription: () => void;
};

export function useDescriptionState(): DescriptionState {
  const [descriptionContent, setDescriptionContent] = useSyncedState(
    DESCRIPTION_STATE_KEYS.DESCRIPTION_CONTENT,
    DESCRIPTION_DEFAULT_VALUES.DESCRIPTION_CONTENT
  ) as [string, (content: string) => void];

  const feature = useToggleableFeature(
    DESCRIPTION_STATE_KEYS.HAS_DESCRIPTION,
    DESCRIPTION_DEFAULT_VALUES.HAS_DESCRIPTION
  );

  const enableDescription = () => {
    feature.enable();
  };

  const disableDescription = () => {
    feature.disable();
  };

  return {
    descriptionContent,
    setDescriptionContent,
    hasDescription: feature.enabled,
    setHasDescription: feature.setEnabled,
    enableDescription,
    disableDescription,
  };
}
