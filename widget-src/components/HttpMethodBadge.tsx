const { widget } = figma;
const { AutoLayout, Text } = widget;

type HttpMethodBadgeProps = {
  method: string;
};

export function HttpMethodBadge({ method }: HttpMethodBadgeProps) {
  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "#4CAF50";
      case "POST":
        return "#2196F3";
      case "PUT":
        return "#FF9800";
      case "PATCH":
        return "#9C27B0";
      case "DELETE":
        return "#F44336";
      case "HEAD":
        return "#607D8B";
      case "OPTIONS":
        return "#795748";
      default:
        return "#4CAF50";
    }
  };

  return (
    <AutoLayout
      padding={{ horizontal: 16, vertical: 8 }}
      cornerRadius={10}
      fill={getMethodColor(method)}
      width={85}
      horizontalAlignItems="center"
      verticalAlignItems="center"
    >
      <Text fontSize={16} fill={"#FFFFFF"} fontWeight={600}>
        {method}
      </Text>
    </AutoLayout>
  );
}
