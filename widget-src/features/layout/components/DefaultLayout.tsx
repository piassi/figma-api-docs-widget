const { widget } = figma;
const { AutoLayout, Input } = widget;

import { EndpointBar } from "@/features/endpoint/components/EndpointBar";
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
import type { WidthControlFeature } from "@/features/width-control/hooks/useWidthControlFeature";
import { HttpMethodBadge } from "@/features/endpoint/components/HttpMethodBadge";
import { useLayoutTheme } from "../hooks/useLayoutTheme";

type DefaultLayoutProps = {
  endpoint: EndpointFeature;
  request: RequestFeature;
  response: ResponseFeature;
  color: ColorFeature;
  description: DescriptionFeature;
  widthControl: WidthControlFeature;
};

export function DefaultLayout({
  endpoint,
  request,
  response,
  color,
  description,
  widthControl,
}: DefaultLayoutProps) {
  const { theme } = useLayoutTheme({
    customWidth: widthControl.state.widgetWidth,
  });

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
          padding={{ top: 11, left: 16, right: 16, bottom: 16 }}
          width="fill-parent"
        >
          <EndpointBar>
            <>
              <HttpMethodBadge
                method={endpoint.state.httpMethod}
                padding={{ horizontal: 16, vertical: 8 }}
                fontSize={theme.text.body}
              />

              <Input
                value={endpoint.state.endpointPath}
                onTextEditEnd={(e) => {
                  endpoint.state.setEndpointPath(e.characters);
                }}
                fontSize={theme.text.body}
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
            <AutoLayout direction="horizontal" spacing={16} width="fill-parent">
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
