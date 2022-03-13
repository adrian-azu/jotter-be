#!/bin/bash
cd /home/ec2-user/jotter-api/

curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
yum install -y gcc-c++ make
yum install -y nodejs npm

npm install -g pm2
npm install