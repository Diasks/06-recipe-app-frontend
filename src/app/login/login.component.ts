import { Component, OnInit } from "@angular/core";
import { SearchService } from "../search-service.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private http: SearchService, private router: Router) {}

  ngOnInit() {}
 public form = {
  email: null,
  password: null
 }



onSubmit()
{
  this.http.login(this.form).subscribe(data => this.handleResponse(data));
}


handleResponse(data) {
  this.http.handle(data.access_token, data.user.email);
  this.router.navigateByUrl('/');
}

}
