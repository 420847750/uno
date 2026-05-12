import { serve } from "https://deno.land/std@0.180.0/http/server.ts";
import { handler } from "./proxy.ts";

// 关键：监听 Deno Deploy 要求的 0.0.0.0 和 PORT 环境变量
const port = parseInt(Deno.env.get("PORT") || "8000");
serve(handler, { port: port, hostname: "0.0.0.0" });
