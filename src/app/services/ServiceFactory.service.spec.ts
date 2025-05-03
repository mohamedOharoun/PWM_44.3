import { TestBed } from '@angular/core/testing';

import { ServiceFactory } from './service-factory.service';

describe('ServicefactoryService', () => {
  let service: ServiceFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceFactory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
