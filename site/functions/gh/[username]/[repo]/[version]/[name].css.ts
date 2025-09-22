import { fetchGithubRelease, type Params } from '@/fetchGithubRelease';

export async function onRequest(context: any) {
  // typlog/theme-nezu/0.6.1/base.css
  const params = context.params as Params;
  const result = await fetchGithubRelease(params, 'css');
  if (!result) {
    return new Response('Not Found', { status: 404 });
  } else {
    const headers = {
      'content-type': 'text/css',
      ...result.headers,
    };
    return new Response(result.content, { headers });
  }
}
