import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { OpenIdService } from './open-id.service';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';
import { IUser } from '../interfaces/user';

describe('OpenIdService', () => {
    let service: OpenIdService;
    const fakeUser: IUser = {
        claims: [
            {
                key: 'key1',
                value: 'value1'
            }
        ],
        username: 'user_name'
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                OAuthModule.forRoot(),
                HttpClientModule
            ],
            providers: [
                {
                    provide: OpenIdService,
                    useFactory: (oAuthService: OAuthService) => {
                        service = new OpenIdService(oAuthService);
                        return service;
                    },
                    deps: [OAuthService],
                    multi: false
                },
                OAuthService
            ]
        });
        service = TestBed.inject(OpenIdService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should have subscribed user after login', fakeAsync(() => {
       // spyOn(service, 'currentUser').and.returnValue(of(fakeUser).pipe(delay(1)));
        service.currentUser.next(fakeUser);
        service.currentUser.subscribe( user => {
            expect(user.username).toEqual(fakeUser.username);
        });
        tick(1);
    }));
});
