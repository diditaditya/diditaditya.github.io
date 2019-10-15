const sheet = new Sheet();
const gAppScriptUrl = "https://script.google.com/macros/s/AKfycbxAbLWFzhdQagFHf-dalmwpWwfoUAXHB8kLg754e3oIqnJc5y5S/exec";
sheet.gAppScriptUrl = gAppScriptUrl;

console.log('blanket is initializing..');

function createElement(opts) {
    if (!opts.parent) {
        const err = new Error('parent is required');
        throw err;
    }
    if (!opts.elementType) {
        const err = new Error('elementType is required');
        throw err;
    }
    const el = document.createElement(opts.elementType);
    const keys = Object.keys(opts);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        el[key] = opts[key];
        if (key === 'style') {
            const styles = Object.keys(opts[key]);
            for (let j = 0; j < styles.length; j++) {
                const styleKey = styles[j]
                el.style[styleKey] = opts[key][styleKey];
            }
        }
    }
    opts.parent.appendChild(el);
    return el;
}

function app() {
    let columns = null;

    // get main div element
    const main = document.getElementById("main");
    main.style.display = "grid";
    main.style.gridTemplateColumns = "auto auto auto";
    main.style.gridTemplateRows = "80px 40px 40px";

    // set the title
    const title = createElement({
        parent: main,
        elementType: "h2",
        innerHTML: "blanket",
        style: {
            textAlign: "center",
            gridColumn: "2 / 3",
        }
    });

    // create form to enter google sheet url
    const sheetUrlInput = createElement({
        parent: main,
        elementType: "input",
        placeholder: "Your Google Sheet Public Url",
        type: "text",
        style: {
            margin: "5px 5% 5px 5%",
            gridRow: "2 / 3",
            gridColumn: "1 / span 3",
        }
    });

    // create button to set google sheet url
    const setSheetUrlButton = createElement({
        parent: main,
        elementType: "button",
        innerHTML: "User Your Google Sheet Public Url",
        style: {
            margin: "5px 20% 5px 20%",
            gridRow: "3 / 3",
            gridColumn: "2 / 3",
        },
    });
    setSheetUrlButton.onclick = async () => {
        try {
            const gSheetUrl = sheetUrlInput.value;
            console.log(gSheetUrl);
            sheet.gSheetUrl = gSheetUrl;
            columns = await sheet.getColumns();
            await sheet.index();
        } catch (err) {
            throw err;
        }
    };

}

app();