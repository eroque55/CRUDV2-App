import { useRouter } from 'next/navigation';
import { NavItemContainer } from './styles';
import IconComponent, { IconT } from '../Icon';

interface Props {
  icon: IconT;
  href?: string;
  active?: boolean;
  onClick?: () => void;
}

export default function NavBarItem({
  href,
  icon,
  active = false,
  onClick,
}: Props) {
  const router = useRouter();

  const handleClick = () => {
    onClick && onClick();
    href && router.push(href);
  };

  return (
    <NavItemContainer onClick={handleClick} $active={active}>
      <IconComponent name={icon} size={20} />
    </NavItemContainer>
  );
}
