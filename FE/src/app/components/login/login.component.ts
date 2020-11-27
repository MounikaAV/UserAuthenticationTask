import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    userDetails: any;
    message: any;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
    ) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            user_name: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/users';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.login(this.loginForm.value).subscribe((data) => {
            console.log(data)
            this.userDetails = data
            const userData = data['userData']
            sessionStorage.setItem('CurrentLoggedinUserName', userData['user_name'])
            sessionStorage.setItem('CurrentLoggedinUserId', userData['user_id'])
            sessionStorage.setItem('accessToken', this.userDetails.token)
            this.router.navigate(['/users']);

        },error => {
            console.log(error)
            if(error.status == 404) {
                this.message = true
            }
            this.loading = false;
        });
    }
}
