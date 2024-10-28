import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthorService } from './services/author.service';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent {
  authorId: string = '';
  author: any;
  message: string = '';

  constructor(private authorService: AuthorService) {}

  searchAuthor() {
    this.authorService.getAuthorById(this.authorId).subscribe(
      data => {
        if (data) {
          this.author = data;
          this.message = '';
        } else {
          this.message = 'Author not found.';
          this.author = null;
        }
      },
      error => {
        this.message = 'An error occurred while searching for the author.';
        this.author = null;
      }
    );
  }
}
