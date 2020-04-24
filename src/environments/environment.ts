// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlApi: 'http://localhost:3000',
  GOOGLE_CLIENT_ID: '836680142681-v040um4bvesolt3qd3ij7hj5q650mrdu.apps.googleusercontent.com',
  role: [{id: 1, value: 'USER_ROLE'}, {id: 2, value: 'ADMIN_ROLE'} ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
