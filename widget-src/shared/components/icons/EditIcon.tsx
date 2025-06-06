const { widget } = figma;
const { SVG } = widget;

type EditIconProps = {
  size?: number;
  color?: string;
  onClick?: () => void;
  tooltip?: string;
};

export function EditIcon({
  size = 16,
  color = "#666666",
  onClick,
  tooltip,
}: EditIconProps) {
  return (
    <SVG
      src={`<svg width="${size}" height="${size}" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
        <path stroke="${color}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.8 12.963L2 18l4.8-.63L18.11 6.58a2.612 2.612 0 00-3.601-3.785L3.8 12.963z"/>
      </svg>`}
      onClick={onClick}
      tooltip={tooltip}
    />
  );
}
