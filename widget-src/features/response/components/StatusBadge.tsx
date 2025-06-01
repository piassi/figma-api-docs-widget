const { widget } = figma;
const { AutoLayout, Text } = widget;

import {
  HttpStatus,
  getStatusMessage,
  getStatusColor,
} from "../../../shared/constants/httpStatuses";

type StatusBadgeProps = {
  status: HttpStatus;
  onClick?: () => void;
  tooltip?: string;
};

export function StatusBadge({ status, onClick, tooltip }: StatusBadgeProps) {
  return (
    <AutoLayout
      padding={{ horizontal: 8, vertical: 4 }}
      cornerRadius={4}
      fill={getStatusColor(status)}
      onClick={onClick}
      tooltip={tooltip}
      horizontalAlignItems="center"
      verticalAlignItems="center"
    >
      <Text fontSize={12} fill="#FFFFFF" fontWeight={600}>
        {status} {getStatusMessage(status)}
      </Text>
    </AutoLayout>
  );
}
