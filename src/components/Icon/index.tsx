import * as Icon from '@/public';
import Image from 'next/image';

export type IconT = keyof typeof Icon;

export interface IconProps {
  width?: number;
  height?: number;
  name?: IconT;
  size?: number;
  icon?: IconProps;
  onClick?: () => void;
}

const IconComponent = ({
  name,
  size,
  icon,
  onClick,
  height,
  width,
}: IconProps) => {
  if (icon && icon.name && !!Icon[icon.name]) {
    return <IconComponent {...icon} />;
  }

  if (name && !!Icon[name]) {
    return (
      <Image
        src={Icon[name]}
        alt={name}
        width={width || size}
        height={height || size}
        onClick={onClick}
        style={onClick && { cursor: 'pointer' }}
      />
    );
  }
  return null;
};

export default IconComponent;
