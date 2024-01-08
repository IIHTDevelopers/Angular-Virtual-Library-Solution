import { Component } from '@angular/core';

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
}

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  books: Book[] = [];
  newBook: Book = {} as Book;
  editedBook: Book = {} as Book;
  isEditing = false;
  searchKeyword = '';

  addBook(): void {
    this.newBook.id = this.books.length + 1;
    this.books.push({ ...this.newBook });
    this.newBook = {} as Book;
  }

  editBook(book: Book): void {
    this.isEditing = true;
    this.editedBook = { ...book };
  }

  saveEditedBook(): void {
    const index = this.books.findIndex(book => book.id === this.editedBook.id);
    if (index !== -1) {
      this.books[index] = { ...this.editedBook };
    }
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editedBook = {} as Book;
  }

  deleteBook(book: Book): void {
    this.books = this.books.filter(item => item.id !== book.id);
  }

  get filteredBooks(): Book[] {
    return this.books.filter(book =>
      book.title.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );
  }
}
