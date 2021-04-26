import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormService } from './form.service';


describe('FormService', () => {
  let service: FormService = new FormService();
  let formBuilder: FormBuilder = new FormBuilder();
  let form = formBuilder.group({});


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormService);
  });

  beforeEach(() => {
    form = formBuilder.group({});
  })

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

  it('It should return required message', () => {
    form.addControl('testField', new FormControl('', Validators.compose([Validators.required])));
    const response = service.getError('testField', form);
    expect(response).toBe('El campo es requerido');
  });

  it('It should return min length message', () => {
    form.addControl('testField', new FormControl('aa', Validators.compose([Validators.minLength(3)])));
    const response = service.getError('testField', form);
    expect(response).toBe('El campo tiene menos caracteres de los requeridos');
  });
});
