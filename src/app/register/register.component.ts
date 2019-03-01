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

name: null;
email: null;
password: null;
password_confirmation: null;


  onSubmit(event) {
    const target = event.target;
    const name = target.querySelector("#name").value;
    const email = target.querySelector("#email").value;
    const password = target.querySelector("#password").value;
    const password_confirmation = target.querySelector("#password_confirmation")
      .value;
    this.http
      .registerUser(name, email, password, password_confirmation)
      .subscribe(data => {
        if (data) {
          this.router.navigate(["/login"]);
         return data;
        } else {
          window.alert("error!");
        }
      });
  }
}
