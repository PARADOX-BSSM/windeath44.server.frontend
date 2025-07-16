import * as _ from '@/applications/applicationList/search/viewer/style.ts';
import myComputer from '@/assets/appIcons/my_computer.svg';

interface MemorialWithIconProps {
  icon?: string;
  name: string;
}

const MemorialWithIcon = ({ icon, name }: MemorialWithIconProps) => {
  return (
    <_.Item>
      <_.Icon src={icon} />
      <_.Name>{name}</_.Name>
    </_.Item>
  );
};
export default MemorialWithIcon;
