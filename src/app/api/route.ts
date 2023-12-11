import * as cheerio from "cheerio";

import { chromium } from "playwright";

const listaUrl = "https://predaqualis.netlify.app/lista/";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const res = await request.json();

  const fetchURL = await fetch(res.url);
  const response = await fetchURL.text();
  const $ = cheerio.load(response);

  const journal = $("#full-view-journal-trigger")
    .html()
    ?.trim()
    .replace(/ *\([^)]*\) */g, "")
    .replace(".", "");

  const browser = await chromium.launch({
    headless: true,
  });
  const page = await browser.newPage();

  await page.goto(listaUrl);
  await page.setViewportSize({ width: 1080, height: 1024 });

  await page.fill(
    "#DataTables_Table_0 > thead > tr:nth-child(2) > td:nth-child(3) > div > input",
    journal ?? ""
  );

  try {
    const result = await page.$$eval("tbody tr", (rows) => {
      return Array.from(rows, (row) => {
        const columns = row.querySelectorAll("td");
        return Array.from(columns, (column) => column.innerText);
      });
    });

    const qualis = result.map((v) => v[3]);
    return Response.json({ keyword: journal, response: [...new Set(qualis)] });
  } catch (e) {
    console.log("deu erro");
    console.log(e);
  }

  await browser.close();
  return Response.json({ res });
}
