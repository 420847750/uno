import { serve } from "https://deno.land/std@0.180.0/http/server.ts";

const target = "https://api.openai.com";

// 关键：把 handler 导出，给 main.ts 调用
export async function handler(req: Request): Promise<Response> {
  const { pathname, search } = new URL(req.url);
  const url = target + pathname + search;

  const headers = new Headers(req.headers);
  headers.delete("host");
  headers.set("host", new URL(target).host);

  const response = await fetch(url, {
    method: req.method,
    headers,
    body: req.body,
    // @ts-ignore: Deno supports streaming body
    duplex: "half",
  });

  return response;
}
