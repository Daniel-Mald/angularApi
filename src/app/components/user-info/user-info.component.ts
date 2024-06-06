// src/app/components/user-info/user-info.component.ts
import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../../services/twitter.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  userInfo: any;

  constructor(private twitterService: TwitterService) {}

  ngOnInit() {
    this.twitterService.getUserInfo().subscribe(response => {
      this.userInfo = response;
    }, error => {
      console.error('Error al obtener información del usuario:', error);
    });
  }
}

