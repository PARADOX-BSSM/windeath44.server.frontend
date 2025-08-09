import * as _ from './style';

const Mourners = () => {
  const mockList = [
    {
      name: '소메링링',
      num: 1234,
    },
    {
      name: '이케아 연필도둑',
      num: 536,
    },
  ];
  return (
    <div>
      <div>조문객 명단</div>
      <div>
        {mockList.map((user, index) => {
          return (
            <div key={index}>
              <div>{index != 0 ? user.name : user.name + '(상주)'}</div>
              <div>{user.num}회</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Mourners;
