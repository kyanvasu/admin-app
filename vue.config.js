module.exports = {
    lintOnSave: false,
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/scss/main.scss";`
            }
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                "@": `${__dirname}/src`,
                "@c": `${__dirname}/src/components`,
                "@v": `${__dirname}/src/views`,
                "@config": `${__dirname}/src/config`
            }
        }
    }
}
