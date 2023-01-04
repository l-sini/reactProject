import React, { useEffect, useState } from 'react';
import {
  FixedSizeList,
  ListOnScrollProps,
  VariableSizeList,
} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import users from '../dummyData/users.json';

interface Props {}

export const UsingReactWindow: React.FC<Props> = () => {
  const a = 1;
  const rowsPerPage = 5;
  const [currentUsers, setCurrentUsers] = useState<any>();
  const [page, setPage] = useState<number>(0);
  const [loadingCheck, setLoadingCheck] = useState<number>(0);
  const getItemSize = (index: number) => 150;

  const Row = ({ index }: { index: number }) => {
    const as = 1;
    return (
      <>
        {currentUsers.map((user: any, idx: number) => (
          <div
            style={{ display: 'flex', alignItems: 'center' }}
            key={idx.toString()}
          >
            <div style={{ width: '150px' }}>{user.name}</div>
            <div style={{ width: '150px' }}>{user.phone}</div>
            <div style={{ width: '150px' }}>{user.country}</div>
            <div style={{ width: '150px' }}>{user.company}</div>
            <div style={{ width: '150px' }}>{user.date}</div>
          </div>
        ))}
        <div>s</div>
      </>
    );
  };
  useEffect(() => {
    setTimeout(() => {
      setCurrentUsers(users);
    }, 2000);
  }, []);
  return (
    <>
      <div>
        <h2>reactWindow 이용한 스크롤 test</h2>
        {!currentUsers ? (
          <div>
            <p>loading...</p>
          </div>
        ) : (
          <div style={{ height: '500px', overflow: 'scroll', width: '700px' }}>
            {loadingCheck === 1 && <p>loading...</p>}
            <p>유저</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '100px' }}>번호</div>
              <div style={{ width: '100px' }}>이름</div>
              <div style={{ width: '100px' }}>전화번호</div>
              <div style={{ width: '100px' }}>출생지</div>
              <div style={{ width: '100px' }}>회사</div>
              <div style={{ width: '100px' }}>가입일</div>
            </div>
            <AutoSizer>
              {({ width, height }) => (
                <VariableSizeList
                  width={700}
                  height={500}
                  itemCount={currentUsers?.length ?? 0}
                  itemSize={getItemSize}
                  overscanCount={0}
                >
                  {Row}
                </VariableSizeList>
              )}
            </AutoSizer>
            {loadingCheck === 2 && <p>loading...</p>}
          </div>
        )}
      </div>
    </>
  );
};
