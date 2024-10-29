import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService, Toast } from '../services/toast/toast.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: `./toast.component.html`,
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {
  toast: Toast | null = null;
  private subscription: Subscription | null = null; 

  constructor(private toastService: ToastService) {
  }

  ngOnInit() {
    this.subscription = this.toastService.toast$.subscribe(
      toast => {
        this.toast = toast;
        setTimeout(() => this.toast = null, 3000);
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
