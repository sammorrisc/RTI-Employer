import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private db!: IDBDatabase;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.openDatabase();
  }

  // Open or create the database
  private openDatabase(): void {
    const request = indexedDB.open('employeeDB', 1);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Create object store if it doesn't already exist
      const objectStore = db.createObjectStore('employees', { keyPath: 'id', autoIncrement: true });
      // objectStore.createIndex('name', 'name', { unique: false });
    };

    request.onsuccess = (event: Event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
      console.log('Database opened successfully');
      this.dbReady.next(true); // Mark the database as ready
    };

    request.onerror = (event: Event) => {
      console.error('Error opening database', (event.target as IDBOpenDBRequest).error);
      this.dbReady.error((event.target as IDBOpenDBRequest).error); // Error state
    };
  }

  waitForDatabase(): Observable<boolean> {
    return this.dbReady.asObservable();
  }

  // Add an employee
  addEmployee(employee: { name: string; joinedAt: number; role: string }): Observable<void> {
    return new Observable((observer) => {
      const transaction = this.db?.transaction(['employees'], 'readwrite');
      const objectStore = transaction?.objectStore('employees');
      const request = objectStore?.add(employee);

      request.onsuccess = () => {
        observer.next();
        observer.complete();
      };

      request.onerror = (event) => {
        observer.error((event.target as IDBRequest).error);
      };
    });
  }

  // Get all employees
  getEmployees(): Observable<any[]> {
    return new Observable((observer) => {
      const transaction = this.db?.transaction(['employees'], 'readonly');
      const objectStore = transaction?.objectStore('employees');

      const request = objectStore?.getAll();
      request.onsuccess = (event) => {
        const employees = (event.target as IDBRequest).result;
        observer.next(employees);
        observer.complete();
      };

      request.onerror = (event) => {
        observer.error((event.target as IDBRequest).error);
      };
    });
  }

  // Get employee by ID
  getEmployeeById(id: number): Observable<any> {
    return new Observable((observer) => {
      const transaction = this.db?.transaction(['employees'], 'readonly');
      const objectStore = transaction?.objectStore('employees');
      const request = objectStore?.get(+id);

      request.onsuccess = (event) => {
        const employee = (event.target as IDBRequest).result;
        observer.next(employee);
        observer.complete();
      };

      request.onerror = (event) => {
        observer.error((event.target as IDBRequest).error);
      };
    });
  }


  // Update an employee
  updateEmployee(employee: { id: number; name: string; joinedAt: Date; role: string }): Observable<void> {
    return new Observable((observer) => {
      const transaction = this.db.transaction(['employees'], 'readwrite');
      const objectStore = transaction.objectStore('employees');

      const request = objectStore.put(employee);

      request.onsuccess = () => {
        observer.next();
        observer.complete();
      };

      request.onerror = (event) => {
        observer.error((event.target as IDBRequest).error);
      };
    });
  }

  // Delete an employee
  deleteEmployee(id: number): Observable<void> {
    return new Observable((observer) => {
      const transaction = this.db?.transaction(['employees'], 'readwrite');
      const objectStore = transaction?.objectStore('employees');

      const request = objectStore?.delete(id);

      request.onsuccess = () => {
        observer.next();
        observer.complete();
      };

      request.onerror = (event) => {
        observer.error((event.target as IDBRequest).error);
      };
    });
  }
}
