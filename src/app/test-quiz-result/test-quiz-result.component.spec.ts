import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestQuizResultComponent } from './test-quiz-result.component';

describe('TestQuizResultComponent', () => {
  let component: TestQuizResultComponent;
  let fixture: ComponentFixture<TestQuizResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestQuizResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestQuizResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
