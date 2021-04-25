import { TestBed } from '@angular/core/testing';

import { MessagesService } from './message.service';

describe('MessageService', () => {
  let service: MessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesService);
  });
});
