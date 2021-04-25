import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormService } from './form.service';


describe('FormService', () => {
  let service: FormService = new FormService();

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list with 3 elements', () => {
    const defaultPatternsArray = service.defaultNameValidator;
    expect(defaultPatternsArray.length).toBe(3);
  });

  it('should return numeric pattern', () => {
    const allPatterns = service.getAllPatterns();
    expect(allPatterns.numericPattern).toBe('^[0-9]+$');
  });
});
