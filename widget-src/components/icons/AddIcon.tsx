const { widget } = figma;
const { SVG } = widget;

type AddIconProps = {
  size?: number;
  color?: string;
  onClick?: () => void;
  tooltip?: string;
};

export function AddIcon({
  size = 16,
  color = "#666666",
  onClick,
  tooltip,
}: AddIconProps) {
  return (
    <SVG
      src={`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5V19M5 12H19" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`}
      onClick={onClick}
      tooltip={tooltip}
    />
  );
}
