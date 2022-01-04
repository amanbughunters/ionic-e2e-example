import { Device, pause, setDevice, switchToWeb, url, waitForLoad } from '../helpers';

import Support from '../pageobjects/support.page';

describe('support', () => {
  before(async () => {
    await waitForLoad();
  });

  beforeEach(async () => {
    await setDevice(Device.Mobile);
    await switchToWeb();
    await url('/support');
    await pause(500);
  });

  it('Should submit support request', async () => {
    await pause(5000);
    const input = Support.messageInput;
    await input.setValue('I am very happy with the app');
    await Support.submitMessage();

    const toast = await Support.toast;
    await expect(await toast.getText()).toBe('Your support request has been sent.');
  });
});