const { widget } = figma;
const { AutoLayout, Text } = widget;

import { HttpMethod } from '@/shared/constants/httpMethods';

type HttpMethodBadgeProps = {
  method: HttpMethod;
};

const METHOD_COLORS: Record<HttpMethod, string> = {
  GET: "#4CAF50",
  POST: "#2196F3",
  PUT: "#FF9800",
  PATCH: "#9C27B0",
  DELETE: "#F44336",
  HEAD: "#607D8B",
  OPTIONS: "#795748",
  ANY: "#9E9E9E",
};

export function HttpMethodBadge({ method }: HttpMethodBadgeProps) {
  return (
    <AutoLayout
      padding={{ horizontal: 16, vertical: 8 }}
      cornerRadius={8}
      fill={METHOD_COLORS[method]}
      width={85}
      horizontalAlignItems="center"
      verticalAlignItems="center"
    >
      <Text fontSize={16} fill="#FFFFFF" fontWeight={600}>
        {method}
      </Text>
    </AutoLayout>
  );
}
