import { DescriptionFeature } from "../hooks/useDescriptionFeature";

const { widget } = figma;
const { AutoLayout, Input, Text } = widget;

type DescriptionFieldProps = {
  description: DescriptionFeature;
};

export function DescriptionField({ description }: DescriptionFieldProps) {
  if (!description.state.isDescriptionEnabled) return null;

  return (
    <AutoLayout direction="vertical" spacing={8} width="fill-parent">
      <Text fontSize={12} fill="#666666" fontWeight={500}>
        Description
      </Text>
      <Input
        value={description.state.descriptionContent}
        placeholder="Add a description for this endpoint..."
        onTextEditEnd={(e) =>
          description.state.setDescriptionContent(e.characters)
        }
        fontSize={14}
        fill="#333333"
        width="fill-parent"
        inputFrameProps={{
          fill: "#F8F8F8",
          stroke: "#E6E6E6",
          cornerRadius: 6,
          padding: { horizontal: 12, vertical: 12 },
        }}
        inputBehavior="multiline"
      />
    </AutoLayout>
  );
}
