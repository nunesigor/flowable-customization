export const environment = {
  production: true,
  anonymous_user: 'anonymous',
  anonymous_password: 'anonymous',
  //for deploy - script will change the %%TOMCAT_HOST%%
  idm_app: 'https://%%TOMCAT_HOST%%/flowable-idm/',
  task_app: 'https://%%TOMCAT_HOST%%/flowable-task/',
  admin_app: 'https://%%TOMCAT_HOST%%/flowable-admin/',
  rest_app: 'https://%%TOMCAT_HOST%%/flowable-rest/'

};
