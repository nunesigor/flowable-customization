@ECHO OFF
set TOMCAT_HOME="C:/program files/tomcat/"
del "%TOMCAT_HOME%/webapps/usm-app.war"
del "%TOMCAT_HOME%/webapps/usm-app/*.*"
copy "%~dp0\dist.usm-app.war" "%TOMCAT_HOME%/webapps/"