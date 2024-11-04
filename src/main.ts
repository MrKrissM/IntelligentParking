import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { FormsModule } from '@angular/forms';
import { routes } from './app/app.routes';
import { HttpClientModule } from '@angular/common/http';



bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(FormsModule, HttpClientModule),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));