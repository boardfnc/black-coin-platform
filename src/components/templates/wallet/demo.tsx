'use client';

import React, { useEffect, useState } from 'react';

import { Image } from '@/components/atoms/images';
import { coinFront, coinBack } from '@/mocks/images';

const prefix = 'https://api-platform.onefabric.co.kr';

export default function Demo() {
  const [isFlipping, setIsFlipping] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState<'heads' | 'tails' | null>(null);

  const getMoney = async () => {
    const data = await (
      await fetch(`${prefix}/coin/money-check?code=2EG38QILJ&esntl_key=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9`, {
        method: 'POST',
        body: JSON.stringify({
          code: '2EG38QILJ',
          esntl_key: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9',
        }),
      })
    ).json();

    setScore(data.money);
  };

  const handleWin = async () => {
    setScore((prev) => prev + 300);

    await (
      await fetch(
        `${prefix}/coin/money-addition?code=2EG38QILJ&esntl_key=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9&money=300`,
        {
          method: 'POST',
        },
      )
    ).json();

    getMoney();
  };

  const handleLose = async () => {
    setScore((prev) => prev - 100);

    await (
      await fetch(
        `${prefix}/coin/money-deduction?code=2EG38QILJ&esntl_key=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9&money=100`,
        {
          method: 'POST',
        },
      )
    ).json();

    getMoney();
  };

  const flipCoin = async () => {
    const currentMoney = await (
      await fetch(`${prefix}/coin/money-check?code=2EG38QILJ&esntl_key=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9`, {
        method: 'POST',
        body: JSON.stringify({
          code: '2EG38QILJ',
          esntl_key: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9',
        }),
      })
    ).json();

    if (currentMoney.money < 100) return;

    setIsFlipping(true);
    setResult(null);

    await handleLose();

    setTimeout(() => {
      const random = Math.random() < 0.5 ? 'heads' : 'tails';
      setResult(random);

      if (random === 'heads') {
        handleWin();
      }

      setIsFlipping(false);
    }, 1000);
  };

  useEffect(() => {
    getMoney();
    const interval = setInterval(getMoney, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={'min-h-screen bg-[#4D5258] pt-[5.625rem]'}>
      <div className={'flex flex-col gap-8 container mx-auto'}>
        <div className={'w-[1352px] h-[750px] mx-auto relative bg-gray-100 rounded-lg p-8'}>
          <div className={'text-red-50 text-lg font-bold'}>※1회 배팅시 100원 소모! (승리시 +200원)</div>

          <div className={'flex flex-col items-center justify-center h-[600px]'}>
            {!isFlipping && !result && (
              <div
                className={'absolute text-7xl font-bold text-blue-500 mt-60 cursor-pointer'}
                onClick={flipCoin}
                role={'button'}
                onKeyDown={flipCoin}
              >
                Clack!
              </div>
            )}
            <div
              role={'button'}
              className={`w-32 h-32 rounded-full cursor-pointer flex items-center justify-center relative
                ${isFlipping ? 'animate-[coin-flip_1s_ease-in-out]' : ''}`}
              onClick={flipCoin}
              onKeyDown={flipCoin}
            >
              <Image
                src={coinFront}
                alt={'동전 앞면'}
                className={`absolute w-full h-full rounded-full ${result === 'tails' ? 'hidden' : ''}`}
              />
              <Image
                src={coinBack}
                alt={'동전 뒷면'}
                className={`absolute w-full h-full rounded-full ${result === 'heads' ? 'hidden' : ''}`}
              />
              {!result && <Image src={coinFront} alt={'동전'} className={'w-full h-full rounded-full'} />}
            </div>

            {result && (
              <div
                className={`absolute text-7xl text-center font-bold mt-60 ${result === 'heads' ? 'text-red-50' : 'text-blue-500'}`}
              >
                {result === 'heads' ? '승!' : '패!'}
              </div>
            )}
          </div>

          <div className={'absolute bottom-8 right-8 text-black text-xl text-right'}>
            {result && (
              <div className={`text-7xl mb-2 ${result === 'heads' ? 'text-red-50' : 'text-blue-500'}`}>
                {result === 'heads' ? '+200' : '-100'}
              </div>
            )}
            게임 머니: {score.toLocaleString('ko-kR')}원
          </div>
        </div>

        <div className={'flex items-center justify-center w-[1352px] mx-auto bg-[#D9D9D9]'}>
          <button
            className={'text-7xl gray-100 font-bold w-full h-full text-center p-8'}
            onClick={() => {
              window.open(
                '/wallet?code=2EG38QILJ&essential-key=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9&auto-login=true',
                '_blank',
                'width=788, height=600',
              );
            }}
          >
            입/출금신청 바로가기
          </button>
        </div>
      </div>
    </div>
  );
}
