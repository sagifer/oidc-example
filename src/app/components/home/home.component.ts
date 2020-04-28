import { Component } from '@angular/core';
import { OpenIdService } from '../../services/open-id.service';
import { Observable } from 'rxjs';
import { IUser } from '../../interfaces/user';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent {

    // Async value for the Logged in user. If the user is logged out the observed value is null.
    currentUser$: Observable<IUser>;

    constructor(private openIdService: OpenIdService) {
        this.currentUser$ = this.openIdService.currentUser;
    }

    logIn() {
        this.openIdService.logIn();
    }

    logOut() {
        this.openIdService.logOut();
    }
}
