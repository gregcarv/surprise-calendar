//Detech touch device
export const isTouchDevice = (): boolean => {
  try {
    //We try to create TouchEvent. It would fail for desktops and throw error.
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
};

export const isdeviceType = isTouchDevice() ? "touch" : "mouse";
