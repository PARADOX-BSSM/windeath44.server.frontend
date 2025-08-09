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
    <_.Container>
      <_.Title>조문객 명단</_.Title>
      <_.UserList>
        {mockList.map((user, index) => {
          return (
            <_.UserItem key={index}>
              <div>
                <div>#{index + 1}</div>
              </div>
              <_.UserInfo>
                <div>{index != 0 ? user.name : user.name + '(상주)'}</div>
                <div>{user.num}회</div>
              </_.UserInfo>
            </_.UserItem>
          );
        })}
      </_.UserList>
    </_.Container>
  );
};
export default Mourners;
