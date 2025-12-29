import React from 'react';
import { Composition } from 'remotion';
import { PolicyWrappedSquare } from './PolicyWrappedSquare';
import { CivicProfileVideo } from './CivicProfileVideo';
import type { PolicyWrappedRenderProps, CivicProfileRenderProps } from './types';

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
      <Composition
        id="CivicProfile"
        component={CivicProfileVideo}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{
          studentName: 'Alex',
          topPriorities: [
            { id: '1', title: '$17 Minimum Wage' },
            { id: '2', title: 'Affordable Housing Supply' },
            { id: '3', title: 'Mental Health 988 Lifeline' },
          ],
          quote: 'These three are connected for me. My older sister works full-time but can\'t afford her own place.',
          stats: {
            policiesExplored: 8,
            discussionsJoined: 6,
            positionsRevised: 2,
          },
          urlText: 'civic-engine.app',
        }}
      />
    </>
  );
};


