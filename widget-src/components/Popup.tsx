const { widget } = figma;
const { AutoLayout, Text } = widget;

export function Popup({
  isVisible,
  onClose,
  title,
  content,
}: {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  content: string;
}) {
  if (!isVisible) return null;

  return (
    <AutoLayout
      direction={"vertical"}
      spacing={12}
      padding={20}
      cornerRadius={8}
      fill={"#FFFFFF"}
      stroke={"#E0E0E0"}
      strokeWidth={1}
      width={500}
    >
      <AutoLayout
        direction={"horizontal"}
        spacing={8}
        width={"fill-parent"}
        verticalAlignItems={"center"}
      >
        <Text
          fontSize={16}
          fill={"#333333"}
          fontWeight={600}
          width={"fill-parent"}
        >
          {title}
        </Text>
        <Text
          fontSize={16}
          fill={"#666666"}
          fontWeight={400}
          onClick={onClose}
          tooltip="Close"
        >
          ✕
        </Text>
      </AutoLayout>

      <AutoLayout
        direction={"vertical"}
        padding={16}
        cornerRadius={4}
        fill={"#F8F8F8"}
        width={"fill-parent"}
      >
        <Text
          fontSize={12}
          fill={"#333333"}
          fontFamily={"Monaco"}
          width={"fill-parent"}
        >
          {content}
        </Text>
      </AutoLayout>
    </AutoLayout>
  );
}
