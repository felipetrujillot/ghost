import puppeteer from "puppeteer";

export default defineEventHandler(async (event) => {
  const { url } = await readBody(event);

  const test = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "text/html;charset=utf-8",
    },
  });

  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    //headless: 'new',
  });
  const page = await browser.newPage();
  await page.goto(url);

  //await page.waitForSelector(".title");

  const textContent = await page.evaluate(() => document.body.textContent);

  console.log(textContent);

  /* console.log("here");
  // Get the text content of the element with class "title"
  const titleText = await page.$eval(".title", (element) =>
    element.textContent.trim()
  ); 
  console.log(titleText);
  */

  await browser.close();

  return {
    hello: "world",
  };
});
