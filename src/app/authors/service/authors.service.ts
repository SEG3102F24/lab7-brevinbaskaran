import { inject, Injectable } from '@angular/core';
import { Author } from '../model/author'; // Ensure this path is correct based on your project structure
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const Url = 'http://localhost:8080/books-api/'; // Define the base API URL

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private http: HttpClient = inject(HttpClient); // Inject HttpClient using the inject function

  // Method to fetch an author by ID
  public getAuthor(id: string): Observable<Author> {
    return this.http.get<Author>(`${Url}authors/${id}`); // Construct the API endpoint URL
  }
}
