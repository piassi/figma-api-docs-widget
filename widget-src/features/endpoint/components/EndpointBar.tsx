const { widget } = figma;
const { AutoLayout, Input } = widget;

import { HttpMethod } from '@/shared/constants/httpMethods';
import { HttpMethodBadge } from "./HttpMethodBadge";

type EndpointBarProps = {
  httpMethod: HttpMethod;
  endpointPath: string;
  onEndpointPathChange: (path: string) => void;
  placeholder?: string;
};

export function EndpointBar({
  httpMethod,
  endpointPath,
  onEndpointPathChange,
  placeholder = "/api/endpoint/path",
}: EndpointBarProps) {
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
      <HttpMethodBadge method={httpMethod} />
      <Input
        value={endpointPath}
        onTextEditEnd={(e) => {
          onEndpointPathChange(e.characters);
        }}
        fontSize={16}
        fill="#333333"
        fontWeight={600}
        placeholder={placeholder}
        width="fill-parent"
        inputFrameProps={{
          fill: "#00000000",
          stroke: "#00000000",
        }}
      />
    </AutoLayout>
  );
}
