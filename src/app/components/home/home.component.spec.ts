import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { OpenIdService } from '../../services/open-id.service';
import { HttpClientModule } from '@angular/common/http';
import { IUser } from '../../interfaces/user';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let openIdService: OpenIdService;

    const fakeUser: IUser = {
        claims: [
            {
                key: 'key1',
                value: 'value1'
            }
        ],
        username: 'user_name'
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomeComponent],
            imports: [
                OAuthModule.forRoot(),
                HttpClientModule
            ],
            providers: [
                {
                    provide: OpenIdService,
                    useFactory: (oAuthService: OAuthService) => {
                        openIdService = new OpenIdService(oAuthService);
                        return openIdService;
                    },
                    deps: [OAuthService],
                    multi: false
                },
                OAuthService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be openIdService ', () => {
        expect(openIdService).not.toBe(null);
    });

    it('should be create', () => {
        expect(component).toBeTruthy();
    });

    it('should be login button in case of logged out user', () => {
        openIdService.currentUser.next(null);
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('button').textContent).toContain('Login');
    });

    it('should be logout button in case of logged in user', () => {
        openIdService.currentUser.next(fakeUser);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('button').textContent).toContain('Logout');
    });

    it('should be a claim with proper key/value', () => {
        openIdService.currentUser.next(fakeUser);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('div .col-4').textContent).toContain('key1');
        expect(compiled.querySelector('div .col-8').textContent).toContain('value1');
    });
});
