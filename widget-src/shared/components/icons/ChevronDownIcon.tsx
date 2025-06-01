const { widget } = figma;
const { SVG } = widget;

type ChevronDownIconProps = {
  size?: number;
  color?: string;
  onClick?: () => void;
  tooltip?: string;
};

export function ChevronDownIcon({
  size = 16,
  color = "#666666",
  onClick,
  tooltip,
}: ChevronDownIconProps) {
  return (
    <SVG
      src={`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 9L12 15L18 9" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`}
      onClick={onClick}
      tooltip={tooltip}
    />
  );
}
