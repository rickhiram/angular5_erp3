/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FormulationService } from './formulation.service';

describe('FormulationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormulationService]
    });
  });

  it('should ...', inject([FormulationService], (service: FormulationService) => {
    expect(service).toBeTruthy();
  }));
});
