import { getRenderProgress } from '@remotion/lambda/client';
import { AwsRegion } from '@remotion/lambda';

const region = (process.env.REMOTION_AWS_REGION || 'us-east-1') as AwsRegion;
const functionName = process.env.REMOTION_FUNCTION_NAME!;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ renderId: string }> }
) {
  const { renderId } = await params;
  const { searchParams } = new URL(request.url);
  const bucketName = searchParams.get('bucket');

  if (!bucketName) {
    return Response.json({ error: 'Missing bucket parameter' }, { status: 400 });
  }

  try {
    const progress = await getRenderProgress({
      renderId,
      bucketName,
      functionName,
      region,
    });

    return Response.json({
      done: progress.done,
      overallProgress: progress.overallProgress,
      outputFile: progress.outputFile,
      fatalErrorEncountered: progress.fatalErrorEncountered,
      errors: progress.errors,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    console.error('[render] Error getting progress:', message);
    return Response.json({ error: message }, { status: 500 });
  }
}
