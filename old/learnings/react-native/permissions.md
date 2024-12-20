# Android


 - [Android Permissions](https://developer.android.com/reference/android/Manifest.permission#READ_EXTERNAL_STORAGE) - Used in file picker

  Starting in API level 33, this permission has no effect.

  ```
  export const requestAndroidStoragePermissions = async (): Promise<boolean> => {
    if (Platform.OS === 'ios') {
      return true;
    }
    // https://developer.android.com/reference/android/Manifest.permission#READ_EXTERNAL_STORAGE
    if (Platform.OS === 'android' && +Platform.constants.Release >= 13) {
      return true;
    }

    const check = await PermissionsAndroid.check(
      'android.permission.READ_EXTERNAL_STORAGE'
    );
    if (check) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      'android.permission.READ_EXTERNAL_STORAGE'
    );

    return status === 'granted'; // needed to account for never_ask_again
  };
  ```
