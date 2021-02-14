import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgParticlesModule } from 'ng-particles';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DialogComponent } from '../dialog/dialog.component';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent,
                      DialogComponent ],
      imports: [ HttpClientModule,
                 RouterTestingModule,
                 MatDialogModule,
                 MatMenuModule,
                 BrowserModule,
                 AppRoutingModule,
                 FormsModule,
                 BrowserAnimationsModule,
                 MatFormFieldModule,
                 MatIconModule,
                 MatInputModule,
                 MatSelectModule,
                 MatButtonModule,
                 NgParticlesModule,
                 HttpClientModule,
                 MatProgressSpinnerModule,
                 MatProgressBarModule,
                 MatDividerModule,
                 MatExpansionModule,
                 MatPaginatorModule,
                 MatDialogModule,
                 MatMenuModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
