#!/bin/bash
TOMCAT_HOME=/home/dev/tools/tomcat-9.0.8
APP=usm-app
echo 'clean deploy dir...'
rm -f $TOMCAT_HOME/webapps/$APP.war
rm -rf $TOMCAT_HOME/webapps/$APP
echo 'copy war file...'
mv ./dist/$APP.war $TOMCAT_HOME/webapps/
