import Bowser from "bowser"

const validBrowsersList = {
    chrome: ">130",
    firefox: ">133",
    safari: ">17.6",
    edge:">130",
    'Yandex Browser':">23.3",
}

export function BrowserCheck() {
    const browser = Bowser.getParser(window.navigator.userAgent);
    const isValidBrowser:boolean | undefined = browser.satisfies(validBrowsersList);
    console.log(isValidBrowser);
    return (
        <>
        </>
    )
}