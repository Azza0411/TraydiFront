import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = 'http://localhost:8081/api/user';

  constructor(private http: HttpClient) {}

  addUserWithConfPassword(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/addwithconfpassword`, formData, { responseType: 'text' });
  }
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user = {
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    address: '',
    password: '',
    confirmPassword: '',
    cin: 0,
    telephone: 0,
    age: 0,
    roleName: ''
  };

  selectedFile: File | null = null;

  constructor(private userService: UserService, private router: Router) {}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('user', new Blob([JSON.stringify(this.user)], { type: 'application/json' }));
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.userService.addUserWithConfPassword(formData).subscribe({
      next: () => {
        alert('✅ Compte créé avec succès !');

        // 🔹 Stockage du username dans localStorage pour le quiz
        localStorage.setItem('username', this.user.username);

        if (this.user.roleName === 'TRADER') {
          alert('🎯 Vous allez passer un petit test pour évaluer votre niveau.');
          this.router.navigate(['/test-quiz']);
        } else {
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        console.error(error);
        alert('❌ Erreur lors de la création du compte : ' + error.message);
      }
    });
  }
}
