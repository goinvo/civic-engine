import { renderMediaOnLambda } from '@remotion/lambda/client';
import { AwsRegion } from '@remotion/lambda';

const region = (process.env.REMOTION_AWS_REGION || 'us-east-1') as AwsRegion;
const functionName = process.env.REMOTION_FUNCTION_NAME!;
const serveUrl = process.env.REMOTION_SERVE_URL!;

type CompositionType = 'PolicyWrappedSquare' | 'CivicProfile';

function getInputProps(composition: CompositionType, body: Record<string, unknown>) {
  if (composition === 'CivicProfile') {
    return {
      studentName: body.studentName,
      topPriorities: body.topPriorities,
      quote: body.quote,
      stats: body.stats,
      urlText: body.urlText,
    };
  }

  // Default: PolicyWrappedSquare
  return {
    displayName: body.displayName,
    label: body.label,
    avgScore: body.avgScore,
    scoreLabel: body.scoreLabel,
    policies: body.policies,
    urlText: body.urlText,
  };
}

function getFileName(composition: CompositionType): string {
  if (composition === 'CivicProfile') {
    return 'civic-profile.mp4';
  }
  return 'policy-wrapped.mp4';
}

export async function POST(request: Request) {
  if (!functionName || !serveUrl) {
    return Response.json(
      { error: 'Lambda not configured. Set REMOTION_FUNCTION_NAME and REMOTION_SERVE_URL.' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const composition: CompositionType = body.composition || 'PolicyWrappedSquare';

    const { bucketName, renderId } = await renderMediaOnLambda({
      region,
      functionName,
      serveUrl,
      composition,
      codec: 'h264',
      inputProps: getInputProps(composition, body),
      downloadBehavior: {
        type: 'download',
        fileName: getFileName(composition),
      },
    });

    return Response.json({ renderId, bucketName });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    console.error('[render] Error starting render:', message);
    return Response.json({ error: message }, { status: 500 });
  }
}
