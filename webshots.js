/*
A script using PhantomJS http://phantomjs.org to create Web page screenshots 
with common browser resolutions and save them as PNG files.

Known issues:
- Lower timeouts may lead to errors which can cause the script to not terminate.
- undefined:0 TypeError: 'undefined' is not an object

Written by Ramiro Gómez http://ramiro.org/
MIT licensed    : http://rg.mit-license.org/
*/

var fs = require('fs')
var cwd =fs.workingDirectory
var files = []

var re_proto = /https?:\/\//
var re_conv = /[^\w\.-]/

// common screen resolutions from gs.statcounter.com
var resolutions = [
    [1440, 900],
    [1366, 768],
    [1280, 1024],
    [1280, 800],
    [1024, 768],
    [800, 600],
    [480, 800],
    [360, 640],
    [320, 480],
    [240, 320]
]

var url2filename = function(url, w, h) {
    return url.replace(re_proto, '').replace(re_conv, '-') + '.' + w + 'x' + h + '.png'
}

var webshot = function(url, w, h) {
    var page = require('webpage').create()
    page.viewportSize = { width: w, height: h }
    page.open(url, function(status) {
        if (status !== 'success') {
            console.log('Unable to load url: ' + url)
        } else {
            window.setTimeout(function() {
                fname = url2filename(url, w, h)
                files.push(fname)
                page.render(fname)
                page.release()
            }, 1000);
        }
    })
}

if (phantom.args.length < 1 || phantom.args.length > 2) {
    console.log('Usage: webshots.js URL')
    phantom.exit()
} else {
    var url = phantom.args[0]
    for (i in resolutions) {
        webshot(url, resolutions[i][0], resolutions[i][1])
    }
}

// exit callback hell when finished
window.setInterval(function() {
    var created = 0;
    if (files.length === resolutions.length)
        var files_in_dir = fs.list(cwd)
        for (i in files) {
            if (-1 !== files_in_dir.indexOf(files[i])) {
                created++
            }
        }
        if (created === resolutions.length) {
            phantom.exit()
        }
}, 1000)
