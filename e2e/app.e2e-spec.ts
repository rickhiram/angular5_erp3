import { Erp3Page } from './app.po';

describe('erp3 App', function() {
  let page: Erp3Page;

  beforeEach(() => {
    page = new Erp3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
