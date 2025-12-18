import { Component } from '@angular/core';
import { PracticeSerciceService } from '../../practice-sercice.service';

@Component({
  selector: 'app-scroll-table',
  templateUrl: './scroll-table.component.html',
  styleUrl: './scroll-table.component.css',
})
export class ScrollTableComponent {
  users: any[] = [];

  constructor(private userService: PracticeSerciceService) {
    this.loadUsers();
  }
  loadUsers() {
    for (let i = 1; i <= 20; i++) {
      this.users.push({
        id: i,
        name: 'User ' + i,
        email: 'user' + i + '@mail.com',
        role: 'Developer',
        status: 'Active',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-05',
        department: 'Engineering',
      });
    }
  }
  // *************** Call API by passing payload ***********
  createPost() {
    const payload = {
      title: 'Angular Payload Example',
      body: 'This is a sample payload',
      userId: 1,
    };

    this.userService.createPost(payload).subscribe((res) => {
      console.log('POST Response:', res);
    });
  }

  //  ******************Call API by passing value for the payload *****************
  createPost_2() {
    this.userService
      .createPost_2('Angular Payload Example', 'This is a sample payload', 1)
      .subscribe({
        // ****************Component – Subscribe with res and error ************
        next: (res) => {
          console.log('Success Response:', res);
        },
        error: (err) => {
          console.error('Error Response:', err);
        },
      });
  }
}
