class Sheet {
    constructor() {
        this._sheetUrl = null;
        this._gAppScriptUrl = null;
    }

    set sheetUrl(url) {
        this._sheetUrl = url;
        console.log('sheet url has been set');
    }

    set gAppScriptUrl(url) {
        this._gAppScriptUrl = url;
        console.log('google app script url has been set');
    }

    async getColumns() {
        const url = `${this._gAppScriptUrl}?action=columns`;
        const result = await axios.get(url);
        console.log(result.data.columns);
    }

    async index() {
        const url = `${this._gAppScriptUrl}?action=index`;
        const result = await axios.get(url);
        console.log(result.data);
    }
}
