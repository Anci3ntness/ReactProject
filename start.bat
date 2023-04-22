@echo off
cd server
start /min/b powershell yarn dev
cd ..
cd client
start /min/b powershell yarn start
