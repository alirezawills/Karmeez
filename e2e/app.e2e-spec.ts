import { KarmeezTemplatePage } from './app.po';

describe('Karmeez App', function() {
  let page: KarmeezTemplatePage;

  beforeEach(() => {
    page = new KarmeezTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
