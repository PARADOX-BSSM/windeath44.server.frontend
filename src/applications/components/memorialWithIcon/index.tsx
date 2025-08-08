import * as _ from '@/applications/components/memorialWithIcon/style';

interface MemorialWithIconProps {
  icon?: string;
  name: string;
  onDoubleClick: () => void;
}

const MemorialWithIcon = ({ icon, name, onDoubleClick }: MemorialWithIconProps) => {
  return (
    <_.Item>
      <_.Icon
        src={icon}
        onDoubleClick={onDoubleClick}
      />
      <_.Name>{name}</_.Name>
    </_.Item>
  );
};
export default MemorialWithIcon;
