import * as _ from '@/applications/applicationList/search/viewer/style.ts';
import MemorialWithIcon from '@/applications/components/memorialWithIcon';
import myComputer from '@/assets/appIcons/my_computer.svg';

interface ViewerProps {
  characters: any[];
}

const Viewer = ({ characters }: ViewerProps) => {
  return (
    <_.view>
      <_.viewer>
        <_.Shadow>
          <_.inputs>
            {characters.map((character: any) => (
              <MemorialWithIcon
                icon={myComputer}
                name={character.name}
              />
            ))}
          </_.inputs>
        </_.Shadow>
      </_.viewer>
    </_.view>
  );
};
export default Viewer;
