import { renderMediaOnLambda } from '@remotion/lambda/client';
import { AwsRegion } from '@remotion/lambda';

const region = (process.env.REMOTION_AWS_REGION || 'us-east-1') as AwsRegion;
const functionName = process.env.REMOTION_FUNCTION_NAME!;
const serveUrl = process.env.REMOTION_SERVE_URL!;

export async function POST(request: Request) {
  if (!functionName || !serveUrl) {
    return Response.json(
      { error: 'Lambda not configured. Set REMOTION_FUNCTION_NAME and REMOTION_SERVE_URL.' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();

    const { bucketName, renderId } = await renderMediaOnLambda({
      region,
      functionName,
      serveUrl,
      composition: 'PolicyWrappedSquare',
      codec: 'h264',
      inputProps: {
        displayName: body.displayName,
        label: body.label,
        avgScore: body.avgScore,
        scoreLabel: body.scoreLabel,
        policies: body.policies,
        urlText: body.urlText,
      },
      downloadBehavior: {
        type: 'download',
        fileName: 'policy-wrapped.mp4',
      },
    });

    return Response.json({ renderId, bucketName });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    console.error('[render] Error starting render:', message);
    return Response.json({ error: message }, { status: 500 });
  }
}
