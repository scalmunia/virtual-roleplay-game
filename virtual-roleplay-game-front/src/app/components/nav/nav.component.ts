import { Component, Input, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';

interface Segment {
  name: string;
  url?: string;
}

@Component({
  selector: 'vrg-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  @Input() segments: Segment[] = [];

  userName: string = '';
  firstLetter: string = '';
  error: Error | null = null;

  constructor(private navService: NavService) { }

  ngOnInit(): void {
    this.getUser();
  }

  async getUser() {
    try {
      const response = await this.navService.getUser();
      this.userName = response.result.name;
      this.firstLetter = this.userName.charAt(0);

      return response;
    } catch (error) {
      this.error = error as Error;

      return error;
    }
  }
}
