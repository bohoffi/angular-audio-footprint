import { AudioVisualizerPage } from './app.po';

describe('audio-visualizer App', () => {
  let page: AudioVisualizerPage;

  beforeEach(() => {
    page = new AudioVisualizerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
