import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { DataService } from './../service/data.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showLogout: boolean = true

  constructor(private router: Router, private dataService: DataService) { }
  user: any;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    // if (localStorage.getItem('loggedInUser')){
      
    // }
    this.dataService.showLogout.subscribe((res: any) => {
      this.showLogout = res
    })
  }
  logoutUser() {
    localStorage.removeItem('loggedInUser')
    this.dataService.userStatus(false)
    this.router.navigate(['/login'])
  }

}