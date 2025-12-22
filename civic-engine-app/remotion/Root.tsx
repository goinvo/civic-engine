import React from 'react';
import { Composition } from 'remotion';
import { PolicyWrappedSquare } from './PolicyWrappedSquare';
import type { PolicyWrappedRenderProps } from './types';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PolicyWrappedSquare"
        component={PolicyWrappedSquare}
        durationInFrames={120}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{
          displayName: 'Your Key Issues',
          label: 'Consensus Seeker',
          avgScore: 75,
          policies: [],
          urlText: 'example.com/wrapped',
        }}
      />
    </>
  );
};


