import { serve } from "https://deno.land/std@0.180.0/http/server.ts";

const target = "https://api.openai.com";

async function handler(req: Request): Promise<Response> {
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

// 关键修改：同时监听 0.0.0.0 和环境变量 PORT
const port = parseInt(Deno.env.get("PORT") || "8000");
serve(handler, { port: port, hostname: "0.0.0.0" });
