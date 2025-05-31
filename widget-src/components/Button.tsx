const { widget } = figma;
const { AutoLayout, Text } = widget;

type ButtonProps = {
  label: string;
  onClick: () => void;
  backgroundColor?: string;
  strokeColor?: string;
  tooltip?: string;
  icon?: FigmaDeclarativeNode;
};

export function Button({
  label,
  onClick,
  backgroundColor = "#000000",
  strokeColor = "#000000",
  tooltip,
  icon,
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
      <AutoLayout
        direction="horizontal"
        spacing={8}
        verticalAlignItems="center"
        horizontalAlignItems={icon ? "start" : "center"}
        width="fill-parent"
      >
        <Text
          fontSize={16}
          fill="#FFFFFF"
          fontWeight={600}
          tooltip={tooltip}
          width={icon ? "fill-parent" : undefined}
        >
          {label}
        </Text>
        {icon}
      </AutoLayout>
    </AutoLayout>
  );
}
