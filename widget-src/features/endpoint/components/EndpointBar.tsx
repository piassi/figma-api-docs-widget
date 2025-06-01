const { widget } = figma;
const { AutoLayout } = widget;

type EndpointBarProps = {
  children: FigmaDeclarativeNode;
};

export function EndpointBar({ children }: EndpointBarProps) {
  return (
    <AutoLayout
      direction="horizontal"
      spacing={14}
      padding={{ horizontal: 8, vertical: 6 }}
      cornerRadius={12}
      fill="#F0F0F0"
      verticalAlignItems="center"
      width="fill-parent"
      horizontalAlignItems="center"
    >
      {children}
    </AutoLayout>
  );
}
