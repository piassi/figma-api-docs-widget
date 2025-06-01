const { widget } = figma;
const { AutoLayout, Input } = widget;

import { DescriptionField } from "@/features/description/components/DescriptionField";
import { RequestButton } from "@/features/request/components/RequestButton";
import { ResponseButton } from "@/features/response/components/ResponseButton";
import { RequestPanel } from "@/features/request/components/RequestPanel";
import { ResponsePanel } from "@/features/response/components/ResponsePanel";

import type { EndpointFeature } from "@/features/endpoint/hooks/useEndpointFeature";
import type { RequestFeature } from "@/features/request/hooks/useRequestFeature";
import type { ResponseFeature } from "@/features/response/hooks/useResponseFeature";
import type { ColorFeature } from "@/features/color/hooks/useColorFeature";
import type { DescriptionFeature } from "@/features/description/hooks/useDescriptionFeature";
import { EndpointBar } from "@/features/endpoint/components/EndpointBar";
import { HttpMethodBadge } from "@/features/endpoint/components/HttpMethodBadge";
import { useLayoutTheme } from "../hooks/useLayoutTheme";

type CompactLayoutProps = {
  endpoint: EndpointFeature;
  request: RequestFeature;
  response: ResponseFeature;
  color: ColorFeature;
  description: DescriptionFeature;
};

export function CompactLayout({
  endpoint,
  request,
  response,
  color,
  description,
}: CompactLayoutProps) {
  const { theme } = useLayoutTheme();

  return (
    <AutoLayout direction="vertical" spacing={8} padding={0}>
      <AutoLayout
        direction="vertical"
        spacing={0}
        padding={0}
        cornerRadius={12}
        fill="#FFFFFF"
        stroke="#E6E6E6"
        width={theme.widgetWidth}
      >
        <AutoLayout
          width="fill-parent"
          height={5}
          fill={color.state.widgetColor}
          cornerRadius={{
            topLeft: 12,
            topRight: 12,
            bottomLeft: 0,
            bottomRight: 0,
          }}
        />

        <AutoLayout
          direction="vertical"
          spacing={12}
          padding={{ top: 7, left: 12, right: 12, bottom: 12 }}
          width="fill-parent"
        >
          <EndpointBar>
            <>
              <HttpMethodBadge
                method={endpoint.state.httpMethod}
                padding={{ horizontal: 8, vertical: 4 }}
                fontSize={14}
              />

              <Input
                value={endpoint.state.endpointPath}
                onTextEditEnd={(e) => {
                  endpoint.state.setEndpointPath(e.characters);
                }}
                fontSize={14}
                fill="#333333"
                fontWeight={600}
                placeholder="/api/endpoint/path"
                width="fill-parent"
                inputFrameProps={{
                  fill: "#00000000",
                  stroke: "#00000000",
                }}
              />
            </>
          </EndpointBar>

          <DescriptionField description={description} />

          {(request.state.isRequestEnabled ||
            response.state.isResponseEnabled) && (
            <AutoLayout direction="vertical" spacing={8} width="fill-parent">
              <RequestButton request={request} />
              <ResponseButton response={response} />
            </AutoLayout>
          )}
        </AutoLayout>
      </AutoLayout>

      <RequestPanel request={request} />
      <ResponsePanel response={response} />
    </AutoLayout>
  );
}
