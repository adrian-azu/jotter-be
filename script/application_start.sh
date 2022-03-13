#!/bin/bash

# Stop all servers and start the server as a daemon
isExistApp = `pgrep httpd`
if [[ -n  $isExistApp ]]; then
    service httpd stop
fi

yum remove -y httpd

pm2 delete all
pm2 start index.js

# forever stopall
# forever start /home/ec2-user/jotter-api/index.js