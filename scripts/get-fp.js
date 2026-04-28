//script/get-fp.js
// © Heavstal Tech 
// umm...
import puppeteer = from 'puppeteer'

(async () => {
  var browser = await puppeteer.launch({ headless: "new" });
  var page = await browser.newPage();
  await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36");
  await page.setViewport({ width: 1920, height: 1080 });

  var FP = await page.evaluate(async () => {
    async function getFP() {
      let e = document.createElement("canvas"), t = e.getContext("2d");
      t.textBaseline = "top"; t.font = "14px Arial"; t.fillText("fp-canvas", 2, 2);
      
      let s = [
        navigator.userAgent, 
        navigator.language, 
        navigator.languages?.join(",") ?? "", 
        screen.width + "x" + screen.height + "x" + screen.colorDepth, 
        new Date().getTimezoneOffset().toString(), 
        Intl.DateTimeFormat().resolvedOptions().timeZone, 
        navigator.hardwareConcurrency?.toString() ?? "", 
        navigator.deviceMemory?.toString() ?? "", 
        (!!window.chrome).toString(), 
        e.toDataURL().slice(0, 200)
      ].join("|");
      
      return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s))))
        .map(e => e.toString(16).padStart(2, "0"))
        .join("");
    }
    return await getFP()
  });
    console.log("browser fp:", FP)

  await browser.close()
})();
