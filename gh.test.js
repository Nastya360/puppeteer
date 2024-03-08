async function openPage(url) {
  const page = await browser.newPage();
  await page.goto(url);
  return page;
}
let page;

describe("Github page tests", () => {
  beforeEach(async () => {
    page = await openPage("https://github.com/team");
  }, 60000);

  afterEach(() => {
    page.close();
  }, 60000);

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub: Where the world builds software · GitHub");
  }, 60000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 60000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Sign up for free");
  }, 60000);
});

describe("GitHub footer tests", () => {
  beforeEach(async () => {
    page = await openPage("https://github.com/");
  }, 60000);

  afterEach(async () => {
    page.close();
  }, 60000);

  test("terms link", async () => {
    const termsBtn = await page.$("li[class = mx-2] a");
    await termsBtn.click();
    await page.waitForSelector("h1");
    const title1 = await page.$eval("#title-h1", (link) => link.textContent);
    expect(title1).toEqual("Условия обслуживания GitHub");
  }, 60000);

  test("title text", async () => {
    const visibleTitle = await page.title();
    expect(visibleTitle).toEqual("GitHub: Let’s build from here · GitHub");
  }, 60000);

  test("cookies link", async () => {
    const cookeBtn = await page.$(
      "[class = 'Link--secondary underline-on-hover border-0 p-0 color-bg-transparent']"
    );
    await cookeBtn.click();
    await page.waitForSelector("h1");
    const title6 = await page.$eval(
      '[class = "_17pX1m9O_W--iZbDt3Ta5r w8hcgFksdo30C8w-bygqu"]',
      (link) => link.textContent
    );
    expect(title6).toEqual("Manage cookie preferences");
  }, 60000);
});
