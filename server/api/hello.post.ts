import { JSDOM } from "jsdom";

export default defineEventHandler(async (event) => {
  const { url } = await readBody(event);

  const test = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "text/html;charset=utf-8",
    },
  });

  const html = await test.text();
  const dom = new JSDOM(html, { contentType: "text/html" });

  console.log(dom.window.document.querySelectorAll("font"));
  return {
    hello: "world",
  };
});
