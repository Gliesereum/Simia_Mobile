package com.simia_mobile;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import com.simia_mobile.RNInvokeApp;
import android.util.Log;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "simia_mobile";
  }

  @Override
    protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
  }

    @Override
    protected void onResume() {
      super.onResume();
      RNInvokeApp.setVisible(true);
    }

    @Override
    protected void onPause() {
      super.onPause();
      RNInvokeApp.setVisible(false);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        RNInvokeApp.setVisible(false);
    }
}
