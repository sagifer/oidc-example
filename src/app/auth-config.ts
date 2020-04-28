import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
    // Url of the Identity Provider
    issuer: 'https://outlooksagifer.okta.com',
    // URL of the SPA to redirect the user to after login
    redirectUri: window.location.origin,
    // The SPA's id. The SPA is registerd with this id at the auth-server
    clientId: '0oaakvv27VG7qLwTT4x6',
    // set the scope for the permissions the client should request
    scope: 'openid profile email',
    showDebugInformation: true,
};
