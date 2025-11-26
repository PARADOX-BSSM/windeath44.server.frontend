import React, { useState } from 'react';
import * as _ from './style';

export const parseCustomContent = (root: string[], content: string): React.ReactNode[] => {
  const elements: React.ReactNode[] = [];
  root.length = 0;
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
      root.push(match[1]);
      elements.push(
        <>
          <_.Horizon />
          <_.Index key={`목차-${match.index}`}>
            {indexIdx}. {match[1]}
          </_.Index>
        </>,
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
      const videoUrl = match[4].trim();
      let embedUrl = '';

      // 유튜브 링크를 embed 형식으로 변환
      if (videoUrl.includes('youtube.com/watch?v=')) {
        // 일반 링크: https://www.youtube.com/watch?v=VIDEO_ID
        embedUrl = videoUrl.replace('watch?v=', 'embed/').split('&')[0];
      } else if (
        videoUrl.includes('youtube.com/shorts/') ||
        videoUrl.includes('youtu.be/shorts/')
      ) {
        // 쇼츠 링크: https://www.youtube.com/shorts/VIDEO_ID 또는 https://youtu.be/shorts/VIDEO_ID
        const videoId = videoUrl.split('/shorts/')[1].split('?')[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      } else if (videoUrl.includes('youtu.be/')) {
        // 공유 링크: https://youtu.be/VIDEO_ID?si=...
        const videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      } else {
        // 이미 embed 형식이거나 다른 형식
        embedUrl = '';
      }

      elements.push(
        <iframe
          key={`동영상-${match.index}`}
          src={embedUrl}
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
