// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  //VERSION: require("../../package.json").version,
  production: false,
  anonymous_user: 'anonymous',
  anonymous_password: 'anonymous',
  //for deploy - script will change the %%TOMCAT_HOST%%
  //idm_app: 'https://%%TOMCAT_HOST%%/flowable-idm/',
  //task_app: 'https://%%TOMCAT_HOST%%/flowable-task/',
  //admin_app: 'https://%%TOMCAT_HOST%%/flowable-admin/',
  //rest_app: 'https://%%TOMCAT_HOST%%/flowable-rest/'

  //for development
  idm_app: 'http://localhost:8080/flowable-idm/',
  task_app: 'https://localhost:8080/flowable-task/',
  admin_app: 'https://localhost:8080/flowable-admin/',
  rest_app: 'http://localhost:8080/flowable-rest/'

};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
