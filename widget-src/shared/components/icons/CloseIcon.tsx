const { widget } = figma;
const { SVG } = widget;

type CloseIconProps = {
  size?: number;
  color?: string;
  onClick?: () => void;
  tooltip?: string;
};

export function CloseIcon({
  size = 16,
  color = "#666666",
  onClick,
  tooltip,
}: CloseIconProps) {
  return (
    <SVG
      src={`<svg width="${size}" height="${size}" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 21.32L21 3.32001" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3 3.32001L21 21.32" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`}
      onClick={onClick}
      tooltip={tooltip}
    />
  );
}
