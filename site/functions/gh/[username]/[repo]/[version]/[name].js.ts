import { fetchGithubRelease, type Params } from '@/fetchGithubRelease';

export async function onRequest(context: any) {
  // typlog/theme-nezu/0.6.1/app.js
  const params = context.params as Params;
  const result = await fetchGithubRelease(params, 'js');
  if (!result) {
    return new Response('Not Found', { status: 404 });
  } else {
    const headers = {
      'content-type': 'text/javascript',
      ...result.headers,
    };
    return new Response(result.content, { headers });
  }
}
