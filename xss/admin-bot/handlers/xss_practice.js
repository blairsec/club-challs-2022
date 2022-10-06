module.exports = {
    name: "xss practice",
    timeout: 5000,
    async execute(browser, url) {
        const page = await browser.newPage();
        const domain = process.env.CHALL_XSS_DOMAIN || "localhost:8080";
        const parsedUrl = new URL(url);
        if (parsedUrl.host !== domain) {
            return { error: "URL must be on domain " + domain };
        }

        let flag = "";
        switch (parsedUrl.pathname) {
            case "/one": 
                flag = process.env.CHALL_XSS_ONE_FLAG;
                break;
            case "/two": 
                flag = process.env.CHALL_XSS_TWO_FLAG;
                break;
            case "/three": 
                flag = process.env.CHALL_XSS_THREE_FLAG;
                break;
            case "/four": 
                flag = process.env.CHALL_XSS_FOUR_FLAG;
                break;
            default:
                return { error: "this isn't even the challenge????"}
        }
        await page.setCookie({
            name: "flag",
            value: encodeURIComponent(flag),
            domain,
            httpOnly: false,
        });
        await page.goto(parsedUrl.toString());
        await page.waitForNetworkIdle({
            timeout: 5000,
        });
        await page.close();
    },
};
