import * as _ from '@/applications/components/memorialObject/style';

interface MemorialObjectProps {
  icon: string;
  name: string;
  animation: string;
  onDoubleClick: () => void;
}

const MemorialObject = ({ icon, name, animation, onDoubleClick }: MemorialObjectProps) => {
  return (
    <_.Container onDoubleClick={onDoubleClick}>
      <_.Info>
        <_.Icon imgUrl={icon} />
        <_.NameContainer>
          <_.Name>{name}</_.Name>
          <_.Animation>{animation}</_.Animation>
        </_.NameContainer>
      </_.Info>
    </_.Container>
  );
};
export default MemorialObject;
