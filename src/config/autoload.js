const path = require('path')
const fs = require('fs');

/* get all dirs existents */
const getDir = d => fs.readdirSync(d)
    .map(f => path.join(d, f))


/* access subdir or get files */
const getRoutersFile = (dir, prefix) => gd => {
    const router_files = []

    const getFiles = (dir) => gd(dir)
        .map(d => fs.statSync(d).isDirectory()
            ? getFiles(d)
            : router_files.push(d))

    getFiles(dir)

    return router_files.filter(f =>
        f.match(prefix) ? f : false)
}

const load = (base_api, dir, prefix_route, mid) => (app) =>
    (router_express) =>

        app.use(base_api,
            getRoutersFile(dir, prefix_route)(getDir)
                .map(route =>
                     require(route)(router_express)(mid)
                     )
        )

module.exports = load