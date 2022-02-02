import {
  clearIndexedDB,
  pause,
  getUrl,
  url,
  setDevice,
  switchToWeb,
  Device,
  waitForLoad,
} from '../helpers';

import Tutorial from '../pageobjects/tutorial.page';

describe('Tutorial', () => {
  before(async () => {
    await waitForLoad();
  });

  beforeEach(async () => {
    await switchToWeb();
    await url('/tutorial');
    await setDevice(Device.Mobile);
    await clearIndexedDB('_ionicstorage');
  });

  it('Should load swiper', async () => {
    await expect(await Tutorial.slides.$).toBeDisplayed();
  });

  it('Should get to schedule', async () => {
    await Tutorial.slides.swipeLeft();
    await Tutorial.slides.swipeLeft();
    await Tutorial.slides.swipeLeft();

    await Tutorial.continue();

    await pause(1000);

    await expect((await getUrl()).pathname).toBe('/app/tabs/schedule');
  });

  it.skip('Should skip to schedule', async () => {
    await Tutorial.skip();

    await pause(1000);

    await expect((await getUrl()).pathname).toBe('/app/tabs/schedule');
  });
});
