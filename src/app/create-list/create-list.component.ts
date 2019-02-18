import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})

export class CreateListComponent implements OnInit {

  constructor(private http: SearchService,
    private router: Router) { }

  ngOnInit() {
  }





  onSubmit(event){
    const target = event.target;
    const title = target.querySelector('#title').value;
    const user_id = target.querySelector('#user_id').value;
    this.http.createList(title, user_id).subscribe(data =>{
      if(data){      
        this.router.navigate(['/saved'])
console.log(data);
      } else {
        window.alert('error!');
      }
    });
  };
}
