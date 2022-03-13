#!/bin/bash
cd /home/ec2-user/jotter-api/

isExistApp = `pgrep httpd`
if [[ -n  $isExistApp ]]; then
    service httpd stop
fi

yum remove -y httpd

pm2 delete all
pm2 start server.js
