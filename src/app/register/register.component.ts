import { Component, OnInit } from "@angular/core";
import { SearchService } from "../search-service.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(private http: SearchService, private router: Router) {}
  
  ngOnInit() {}
public form = {
  name: null,
email: null,
password: null,
password_confirmation: null,

}


  onSubmit() {
this.http.register(this.form).subscribe(
  data => this.handleResponse(data)
);
}


handleResponse(data) {
this.http.handle(data.access_token, data.user.email);
this.router.navigateByUrl('login');
}


}