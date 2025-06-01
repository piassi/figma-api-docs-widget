const { widget } = figma;
const { AutoLayout } = widget;

import { EndpointBar } from "../../endpoint/components/EndpointBar";
import { DescriptionField } from "../../description/components/DescriptionField";
import { RequestButton } from "../../request/components/RequestButton";
import { ResponseButton } from "../../response/components/ResponseButton";
import { RequestPanel } from "../../request/components/RequestPanel";
import { ResponsePanel } from "../../response/components/ResponsePanel";

import type { EndpointFeature } from "../../endpoint/hooks/useEndpointFeature";
import type { RequestFeature } from "../../request/hooks/useRequestFeature";
import type { ResponseFeature } from "../../response/hooks/useResponseFeature";
import type { ColorFeature } from "../../color/hooks/useColorFeature";
import type { DescriptionFeature } from "../../description/hooks/useDescriptionFeature";
import { DEFAULT_LAYOUT_WIDTH } from "../constants";

type DefaultLayoutProps = {
  endpoint: EndpointFeature;
  request: RequestFeature;
  response: ResponseFeature;
  color: ColorFeature;
  description: DescriptionFeature;
};

export function DefaultLayout({
  endpoint,
  request,
  response,
  color,
  description,
}: DefaultLayoutProps) {
  return (
    <AutoLayout direction="vertical" spacing={8} padding={0}>
      <AutoLayout
        direction="vertical"
        spacing={0}
        padding={0}
        cornerRadius={12}
        fill="#FFFFFF"
        stroke="#E6E6E6"
        width={DEFAULT_LAYOUT_WIDTH}
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
          <EndpointBar
            httpMethod={endpoint.state.httpMethod}
            endpointPath={endpoint.state.endpointPath}
            onEndpointPathChange={endpoint.state.setEndpointPath}
            placeholder="/api/endpoint/path"
          />

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
