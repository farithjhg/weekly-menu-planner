import { MyAngular4Page } from './app.po';

describe('my-angular4 App', () => {
  let page: MyAngular4Page;

  beforeEach(() => {
    page = new MyAngular4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
