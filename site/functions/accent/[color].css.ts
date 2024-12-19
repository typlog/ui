import { generateColorsCss } from '@/index';

export function onRequest(context: any) {
  const color = context.params.color as string
  if (/^[0-9a-f]{6}$/.test(color) || /^[0-9a-f]{3}$/.test(color)) {
    const result = generateColorsCss({
      name: 'accent',
      accent: `#${color}`,
    });
    return new Response(result, { headers: { 'Content-Type': 'text/css' } });
  } else {
    return new Response('Not Found', { status: 404 });
  }
}
