// InfoBox.tsx
import React from 'react';

interface InfoBoxProps {
  num: number;
  info: string;
  onClick?: () => void; // 클릭 이벤트 핸들러 추가
}

const InfoBox: React.FC<InfoBoxProps> = ({ num, info, onClick }) => {
  return (
    <div className="flex flex-col items-center cursor-pointer" onClick={onClick}>
      <p className="text-lg font-bold">{num}</p>
      <p className="text-sm">{info}</p>
    </div>
  );
};

export default InfoBox;
