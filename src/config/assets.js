const express = require('express')

const assets_dir = '/assets/'

const consts = {
    imgs: `${assets_dir}images/`,
}

module.exports = (app, dir) => {
    app.use('/images/', express.static(dir + `${consts.imgs}`));
}