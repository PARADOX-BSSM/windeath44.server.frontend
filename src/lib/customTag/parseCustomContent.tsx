import React, { useState } from 'react';
import * as _ from './style';

export const parseCustomContent = (content: string): React.ReactNode[] => {
  const elements: React.ReactNode[] = [];
  let indexIdx = 0;

  // 전체를 반복하며 커스텀 태그를 찾음
  const tagRegex =
    /<목차>(.*?)<\/목차>|<사진\s*\{(.*?)\}>(.*?)<\/사진>|<동영상>(.*?)<\/동영상>|<강조>(.*?)<\/강조>|<다음\s*\/>/g;
  let lastIndex = 0;
  let match;

  while ((match = tagRegex.exec(content)) !== null) {
    // 이전 일반 텍스트 처리
    if (match.index > lastIndex) {
      const text = content.slice(lastIndex, match.index).trim();
      if (text) {
        text.split('\n').forEach((line, idx) => {
          if (line.trim()) elements.push(<p key={`text-${lastIndex}-${idx}`}>{line}</p>);
        });
      }
    }

    if (match[1]) {
      // 목차
      indexIdx += 1;
      elements.push(
        <_.Index key={`목차-${match.index}`}>
          {indexIdx}. {match[1]}
        </_.Index>,
      );
    } else if (match[2] && match[3]) {
      // 사진
      elements.push(
        <img
          key={`사진-${match.index}`}
          src={match[3].trim()}
          alt=""
          style={{ width: match[2].trim() }}
        />,
      );
    } else if (match[4]) {
      // 동영상
      elements.push(
        <iframe
          key={`동영상-${match.index}`}
          src={match[4].trim().replace('watch?v=', 'embed/')}
          width="560"
          height="315"
          allowFullScreen
        />,
      );
    } else if (match[5]) {
      // 강조
      elements.push(<b key={`강조-${match.index}`}>{match[5]}</b>);
    } else if (match[0].startsWith('<다음')) {
      // 다음 (줄바꿈)
      elements.push(
        <p key={`br-${match.index}`}>
          <br />
        </p>,
      );
    }

    lastIndex = tagRegex.lastIndex;
  }

  // 마지막 남은 텍스트 처리
  if (lastIndex < content.length) {
    const remainingText = content.slice(lastIndex).trim();
    if (remainingText) {
      remainingText.split(/\n|<다음\s*\/>/).forEach((line, idx) => {
        if (line.trim()) elements.push(<p key={`text-end-${lastIndex}-${idx}`}>{line}</p>);
      });
    }
  }

  return elements;
};
