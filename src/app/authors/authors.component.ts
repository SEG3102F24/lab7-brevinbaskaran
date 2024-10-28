import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Author } from './model/author';
import { AuthorsService } from './service/authors.service';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
  standalone: true,
  imports: [NgIf, RouterModule] 
})
export class AuthorsComponent implements OnInit, OnDestroy {
  selectedAuthor: Author | null = null; 
  message: string = ''; 
  private subscription!: Subscription;
  private authorsService: AuthorsService = inject(AuthorsService);

  ngOnInit(): void {
   
  }

  submit(authorId: string): void {
    if (authorId) {
      this.subscription = this.authorsService.getAuthor(authorId).subscribe({
        next: (data: Author) => {
          this.selectedAuthor = data; 
          this.message = ''; 
        },
        error: () => {
          this.selectedAuthor = null; 
          this.message = 'Author not found'; 
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
