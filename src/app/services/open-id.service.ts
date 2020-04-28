import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from '../auth-config';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { IUser } from '../interfaces/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OpenIdService {

    currentUser: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);

    constructor(private oauthService: OAuthService) {
        this.configureImplicitFlow();
    }

    logIn() {
        this.oauthService.initImplicitFlow();
    }

    logOut() {
        this.oauthService.logOut();
    }

    private configureImplicitFlow() {
        this.oauthService.configure(authCodeFlowConfig);
        this.oauthService.tokenValidationHandler = new JwksValidationHandler();

        this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
        });

        this.oauthService.events
            .subscribe(e => {
                switch (e.type) {
                    case 'logout':
                    case 'token_received':
                        this.handleLoginLogout();
                }
            });
        this.handleLoginLogout();
    }

    private handleLoginLogout() {
        let user: IUser;
        const claims = this.oauthService.getIdentityClaims();

        if (claims) {
            user = {
                username: claims['name'],
                claims: Object.keys(claims).map(key => ({
                    key: key,
                    value: claims[key]
                }))
            };
        }
        this.currentUser.next(user);
    }
}
