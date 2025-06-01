const { widget } = figma;
const { AutoLayout, Text } = widget;

import { DEFAULT_LAYOUT_WIDTH } from "../layout/constants";

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
      width={DEFAULT_LAYOUT_WIDTH}
    >
      <AutoLayout
        direction="horizontal"
        spacing={8}
        width="fill-parent"
        verticalAlignItems="center"
      >
        <Text fontSize={16} fill="#333333" fontWeight={600} width="fill-parent">
          {title}
        </Text>

        {headerActions}
      </AutoLayout>

      {children}
    </AutoLayout>
  );
}
