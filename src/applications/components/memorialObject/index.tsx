import * as _ from '@/applications/components/memorialObject/style';
import { useGetAnimeQuery } from '@/api/anime/getAnime';

interface MemorialObjectProps {
  icon: string;
  name: string;
  animeId: number;
  onDoubleClick: () => void;
}

const MemorialObject = ({ icon, name, animeId, onDoubleClick }: MemorialObjectProps) => {
  const { data: animeData, isLoading, isError } = useGetAnimeQuery(animeId, !!animeId);

  const animationText = animeData?.data
    ? `${animeData.data.name} | ${animeData.data.genres.slice(0, 2).join(', ')}`
    : isLoading
    ? '로딩 중...'
    : `애니메이션 ID: ${animeId}`;

  return (
    <_.Container onDoubleClick={onDoubleClick}>
      <_.Info>
        <_.Icon imgUrl={icon} />
        <_.NameContainer>
          <_.Name>{name}</_.Name>
          <_.Animation>{animationText}</_.Animation>
        </_.NameContainer>
      </_.Info>
    </_.Container>
  );
};
export default MemorialObject;
