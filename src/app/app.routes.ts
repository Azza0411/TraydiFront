import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { TradingComponent } from './trading/trading.component';
import { CommunauteComponent } from './communaute/communaute.component';
import { FormationComponent } from './formation/formation.component';
import { ContactsComponent } from './contacts/contacts.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TestQuizComponent } from './test-quiz/test-quiz.component';
import { TestQuizResultComponent } from './test-quiz-result/test-quiz-result.component';

export const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'trading', component: TradingComponent },
  { path: 'communaute', component: CommunauteComponent },
  { path: 'formation', component: FormationComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'test-quiz', component: TestQuizComponent },
  { path: 'test-quiz/result', component: TestQuizResultComponent },

  // 🔁 Redirections par défaut
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: '**', redirectTo: '/accueil' }
];
