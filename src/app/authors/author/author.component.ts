import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Author } from '../model/author';
import { AuthorsService } from '../service/authors.service';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css'],
  standalone: true,
  imports: [NgIf]
})
export class AuthorComponent implements OnInit, OnDestroy {
  selectedAuthor: Author | null = null; // Initialize selectedAuthor
  authorId: string = ''; // Initialize authorId for binding
  message: string = ''; // Message for displaying errors or information
  private subscription!: Subscription;
  private authorsService: AuthorsService = inject(AuthorsService);

  ngOnInit(): void {
    // This can be empty if you are only using search functionality
  }

  searchAuthor(): void {
    if (this.authorId) {
      this.subscription = this.authorsService.getAuthor(this.authorId).subscribe({
        next: (data: Author) => {
          this.selectedAuthor = data; // Assign fetched author data
          this.message = ''; // Clear any previous messages
        },
        error: () => {
          this.selectedAuthor = null; // Reset selectedAuthor
          this.message = 'Author not found'; // Set error message
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
