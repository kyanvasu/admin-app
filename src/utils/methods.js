
export default {
    getTableData(apiUrl, options) {
        return axios({
            url: apiUrl,
            params: options.params
        });
    },
    formatFileSystem(file) {
        return {
            id: file.filesystem_id ? file.id : null,
            filesystem_id: file.filesystem_id ? file.filesystem_id : file.id,
            field_name: "files"
        }
    },
    uids() {
        return Math.random().toString(16).replace(".", "");
    }
}
