# webshots - take Web page screenshots

A utility for taking Web page screenshots with common browser resolutions and
saving them as PNG files using [PhantomJS](http://phantomjs.org). Read more
in this brief [introduction to webshots](http://geeksta.net/geeklog/web-page-screenshots-phantomjs-python/).

## Installation

    git clone https://github.com/yaph/webshots.git
    ln -s /path/to/webshots/webshots $HOME/bin
    ln -s /path/to/webshots/webshots.js $HOME/bin

## Usage

Create several screenshots at common browser resolutions:

    webshots http://example.com

Create one screenshot at given browser resolution:

    webshots --width=300 --height=200 http://example.com

## Hints

* When pages have the body element background set to transparent it is set to
    white to reflect how browsers render it.

## About

Written by [Ramiro Gómez](http://ramiro.org/), licensed under the
[MIT License](http://rg.mit-license.org/).
