#!/bin/sh
npm run build
http-server -P http://frontend:8080? dist