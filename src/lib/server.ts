const windows = new Map<string, { count: number; reset: number }>();
export function rateLimit(request: Request) {
  const now = Date.now();
  for (const [key, v] of windows) if (v.reset < now) windows.delete(key);
  const key =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const v = windows.get(key) || { count: 0, reset: now + 60000 };
  v.count++;
  windows.set(key, v);
  return v.count <= 12;
}
export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}
export async function readBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("Missing body");
  let text = "",
    size = 0;
  const decoder = new TextDecoder();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 16384) {
      await reader.cancel();
      throw new Error("Too large");
    }
    text += decoder.decode(value, { stream: true });
  }
  return JSON.parse(text + decoder.decode()) as unknown;
}
