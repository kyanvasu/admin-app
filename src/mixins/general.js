export default {
    methods: {
        basicActionsModal(options) {
            this.$modal.show("basic-modal", {
                title: options.title,
                message: options.message,
                buttons: [{
                    title: "Accept",
                    class: "btn-success",
                    handler: () => {
                        this.$modal.hide("basic-modal");
                        options.handler(options.params);
                    }
                }, {
                    title: "Cancel",
                    class: "btn-danger",
                    handler: () => {
                        this.$modal.hide("basic-modal");
                    }
                }]
            });
        }
    }
}
