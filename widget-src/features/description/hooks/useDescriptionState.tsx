import { useToggleableFeature } from "../../../shared/hooks/useToggleableFeature";

const { widget } = figma;
const { useSyncedState } = widget;

const DESCRIPTION_STATE_KEYS = {
  DESCRIPTION_CONTENT: "descriptionContent",
  IS_DESCRIPTION_ENABLED: "isDescriptionEnabled",
} as const;

const DESCRIPTION_DEFAULT_VALUES = {
  DESCRIPTION_CONTENT: "",
  IS_DESCRIPTION_ENABLED: false,
} as const;

export type DescriptionState = {
  descriptionContent: string;
  setDescriptionContent: (content: string) => void;
  isDescriptionEnabled: boolean;
  setIsDescriptionEnabled: (enabled: boolean) => void;
  enableDescription: () => void;
  disableDescription: () => void;
};

export function useDescriptionState(): DescriptionState {
  const [descriptionContent, setDescriptionContent] = useSyncedState(
    DESCRIPTION_STATE_KEYS.DESCRIPTION_CONTENT,
    DESCRIPTION_DEFAULT_VALUES.DESCRIPTION_CONTENT
  ) as [string, (content: string) => void];

  const feature = useToggleableFeature(
    DESCRIPTION_STATE_KEYS.IS_DESCRIPTION_ENABLED,
    DESCRIPTION_DEFAULT_VALUES.IS_DESCRIPTION_ENABLED
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
    isDescriptionEnabled: feature.enabled,
    setIsDescriptionEnabled: feature.setEnabled,
    enableDescription,
    disableDescription,
  };
}
