/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InvoiceServiceService } from './invoice-service.service';

describe('InvoiceServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvoiceServiceService]
    });
  });

  it('should ...', inject([InvoiceServiceService], (service: InvoiceServiceService) => {
    expect(service).toBeTruthy();
  }));
});
