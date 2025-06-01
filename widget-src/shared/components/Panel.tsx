import { useLayoutTheme } from "@/features/layout/hooks/useLayoutTheme";

const { widget } = figma;
const { AutoLayout, Text } = widget;

type PanelProps = {
  isVisible: boolean;
  title: string;
  children: FigmaDeclarativeNode;
  headerActions?: FigmaDeclarativeNode;
};

export function Panel({
  isVisible,
  title,
  children,
  headerActions,
}: PanelProps) {
  const { theme } = useLayoutTheme();

  if (!isVisible) {
    return null;
  }

  return (
    <AutoLayout
      direction="vertical"
      spacing={12}
      padding={16}
      cornerRadius={8}
      fill="#FFFFFF"
      stroke="#E0E0E0"
      strokeWidth={1}
      width="fill-parent"
    >
      <AutoLayout
        direction="horizontal"
        spacing={8}
        width="fill-parent"
        verticalAlignItems="center"
      >
        <Text
          fontSize={theme.text.body}
          fill="#333333"
          fontWeight={600}
          width="fill-parent"
        >
          {title}
        </Text>

        {headerActions}
      </AutoLayout>

      {children}
    </AutoLayout>
  );
}
