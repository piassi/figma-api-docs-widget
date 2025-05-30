const { widget } = figma;
const { AutoLayout, Text } = widget;

type ButtonProps = {
  label: string;
  onClick: () => void;
  backgroundColor: string;
  strokeColor: string;
  tooltip?: string;
};

export function Button({
  label,
  onClick,
  backgroundColor,
  strokeColor,
  tooltip,
}: ButtonProps) {
  return (
    <AutoLayout
      direction="vertical"
      padding={16}
      cornerRadius={12}
      fill={backgroundColor}
      stroke={strokeColor}
      strokeWidth={1}
      width="fill-parent"
      verticalAlignItems="center"
      horizontalAlignItems="center"
      height={50}
      effect={{
        type: "drop-shadow",
        color: "#00000020",
        offset: { x: 0, y: 2 },
        blur: 4,
      }}
      onClick={onClick}
    >
      <Text fontSize={16} fill="#FFFFFF" fontWeight={600} tooltip={tooltip}>
        {label}
      </Text>
    </AutoLayout>
  );
}
