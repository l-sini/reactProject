import React, { useCallback, useEffect, useRef, useState } from 'react';
import users from '../dummyData/users.json';

interface Props {}

export const UsingIntersectionObserver: React.FC<Props> = () => {
  const scrollBotttomRef = useRef<HTMLDivElement | null>(null);
  const scrollTopRef = useRef<HTMLDivElement | null>(null);
  const focusTopRef = useRef<any>(null);
  const focusBottomRef = useRef<any>(null);
  const rowsPerPage = 5;
  const [currentUsers, setCurrentUsers] = useState<any>();
  const [page, setPage] = useState<number>(0);
  const [loadingCheck, setLoadingCheck] = useState<number>(0);
  const handleLastObserver = useCallback((entries: any[]) => {
    setLoadingCheck(2);
    setTimeout(() => {
      const target = entries[0];
      target.isIntersecting &&
        setPage(prev =>
          prev === Math.ceil(users.length / rowsPerPage) ? prev : prev + 1
        );
      setLoadingCheck(0);
      focusBottomRef.current?.focus();
    }, 500);
  }, []);
  const handleTopObserver = useCallback((entries: any[]) => {
    setLoadingCheck(1);
    setTimeout(() => {
      const target = entries[0];
      if (target.isIntersecting) {
        setPage(prev => (prev === 0 ? prev : prev - 1));
        focusTopRef.current?.focus();
        setLoadingCheck(0);
      }
    }, 500);
  }, []);
  useEffect(() => {
    console.log('top');
    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleTopObserver, option);
    if (scrollTopRef.current) observer.observe(scrollTopRef.current);
  }, [handleTopObserver]);
  useEffect(() => {
    console.log('bottom');
    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleLastObserver, option);
    if (scrollBotttomRef.current) observer.observe(scrollBotttomRef.current);
  }, [handleLastObserver]);
  useEffect(() => {
    setTimeout(() => {
      setCurrentUsers(users);
    }, 2000);
  }, []);

  useEffect(() => {
    console.log('page>>>>>>>>.', page);
  }, [page]);

  return (
    <div>
      <h2>IntersectionObserver를 이용한 스크롤 test</h2>
      {!currentUsers ? (
        <div>
          <p>loading...</p>
        </div>
      ) : (
        <div style={{ height: '20vh', overflow: 'scroll', width: '700px' }}>
          {loadingCheck === 1 && <p>loading...</p>}
          <p ref={scrollTopRef}>유저</p>
          <table>
            <colgroup>
              <col width='10%' />
              <col width='15%' />
              <col width='15%' />
              <col width='15%' />
              <col width='30%' />
              <col width='15%' />
            </colgroup>
            <thead>
              <th style={{ padding: '10px 18px', height: '10vh' }}>번호</th>
              <th style={{ padding: '10px 18px', height: '10vh' }}>이름</th>
              <th style={{ padding: '10px 18px', height: '10vh' }}>전화번호</th>
              <th style={{ padding: '10px 18px', height: '10vh' }}>출생지</th>
              <th style={{ padding: '10px 18px', height: '10vh' }}>회사</th>
              <th style={{ padding: '10px 18px', height: '10vh' }}>가입일</th>
            </thead>
            <tbody>
              {currentUsers
                .slice(page * 5, (page + 1) * 5)
                .map((user: any, idx: number) => (
                  <tr
                    key={idx.toString()}
                    style={{ padding: '10px 18px', height: '10vh' }}
                  >
                    <td ref={focusTopRef}>{page * 5 + idx + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.phone}</td>
                    <td>{user.country}</td>
                    <td>{user.company}</td>
                    <td ref={focusBottomRef}>{user.date}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div ref={scrollBotttomRef} />
          <div>유저에 관한 정보입니다.</div>
          {loadingCheck === 2 && <p>loading...</p>}
        </div>
      )}
    </div>
  );
};
