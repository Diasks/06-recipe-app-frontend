import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: SearchService,
    private router: Router) { }

  ngOnInit() {
 
  }

  onSubmit(event){
    const target = event.target;
    const email = target.querySelector('#email').value;
    const password = target.querySelector('#password').value;
    this.http.getUserDetails(email, password).subscribe(data =>{
    if(data['status'] == 'success') {
      this.router.navigate(['/saved'])
      console.log('du är inloggad!');
    } else {
      window.alert('Error!');
    }
       
      
    })
  };


}
