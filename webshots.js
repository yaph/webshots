/*
A script using PhantomJS http://phantomjs.org to create Web page screenshot at
the given browser resolution and save it as a PNG file.

Written by Ramiro Gómez http://ramiro.org/
MIT licensed: http://rg.mit-license.org/
*/

var page = require('webpage').create()
var re_proto = /https?:\/\//
var re_conv = /[^\w\.-]/

var url2filename = function(url, w, h) {
    return url.replace(re_proto, '').replace(re_conv, '-') + '.' + w + 'x' + h + '.png'
}

var webshot = function(url, w, h) {
    page.viewportSize = { width: w, height: h }
    page.open(url, function(status) {
        if (status !== 'success') {
            console.log('Unable to load url: ' + url)
        } else {
            window.setTimeout(function() {
                page.clipRect = { top: 0, left: 0, width: w, height: h }
                page.render(url2filename(url, w, h))
                phantom.exit()
            }, 200)
        }
    })
}

if (3 !== phantom.args.length) {
    console.log('Usage: phantomjs webshots.js http://example.com 1024 768')
    phantom.exit()
} else {
    webshot(phantom.args[0], phantom.args[1], phantom.args[2])
}
