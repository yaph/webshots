#!/usr/bin/env bash

if [ ! -f /usr/bin/local/webshots ]; then
    echo "webshots does not appear to be installed. Install by running './install.sh'";
    exit;
fi

rm /usr/bin/local/webshots
rm /usr/bin/local/webshots.js