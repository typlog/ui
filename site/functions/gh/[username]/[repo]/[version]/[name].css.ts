import { fetchGithubRelease, type Params } from '@/fetchGithubRelease';

export async function onRequest(context: any) {
  // typlog/theme-nezu/0.6.1/base.css
  const params = context.params as Params
  const content = await fetchGithubRelease(params, 'css')
  if (!content) {
    return new Response('Not Found', { status: 404 });
  } else {
    return new Response(content, { headers: { 'Content-Type': 'text/css' } });
  }
}
