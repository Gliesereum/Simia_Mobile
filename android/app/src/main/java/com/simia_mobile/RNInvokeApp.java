
package com.simia_mobile;

import android.app.ActivityManager;

import android.content.Context;
import android.content.Intent;

import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.List;

public class RNInvokeApp extends ReactContextBaseJavaModule {

    private static ReactApplicationContext reactContext;
    public static final String LOG_TAG = "RNInvokeApp";
    private static Bundle bundle = null;
    private static boolean activityVisible = false;
    final Handler handler = new Handler(Looper.getMainLooper());

    public RNInvokeApp(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "RNInvokeApp";
    }

    @ReactMethod
    public void invokeApp(ReadableMap params) {
        ReadableMap data = params.hasKey("data") ? params.getMap("data") : null;

        if (data != null) {
            bundle = Arguments.toBundle(data);
        }

        String packageName = reactContext.getPackageName();
        Intent launchIntent = reactContext.getPackageManager().getLaunchIntentForPackage(packageName);
        String className = launchIntent.getComponent().getClassName();

        try {
            Class<?> activityClass = Class.forName(className);
            Intent activityIntent = new Intent(reactContext, activityClass);

            activityIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent
            .FLAG_ACTIVITY_SINGLE_TOP | Intent.FLAG_ACTIVITY_REORDER_TO_FRONT);
            reactContext.startActivity(activityIntent);
        } catch(Exception e) {
            Log.e(LOG_TAG, "Class not found", e);
            return;
        }

        handler.post(sendEvent);
    }

    Runnable sendEvent = new Runnable() {
        public void run() {
            if (isVisible()) {
                if (reactContext != null && bundle != null) {
                    reactContext
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("appInvoked", Arguments.fromBundle(bundle));
                }
            } else {
                handler.postDelayed(sendEvent, 1000);
                // TODO: Це - костиль. Знайти спосіб, щоб знати напевно, що
                // додаток відкрився і готовий до прийому даних емітора
                // Якщо зменшити до 100 або 200 мс, то додаток буде працювати лише в близько 50% випадків
            }
        }
    };

    public static boolean isVisible() {
       return activityVisible;
    };

    public static void setVisible(boolean visibility) {
        activityVisible = visibility;
    }


    private boolean isAppOnForeground(ReactApplicationContext context) {
        /**
         * We need to check if app is in foreground otherwise the app will crash.
         * http://stackoverflow.com/questions/8489993/check-android-application-is-in-foreground-or-not
         **/
        ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        List<ActivityManager.RunningAppProcessInfo> appProcesses = activityManager.getRunningAppProcesses();
        if (appProcesses == null) {
            return false;
        }
        final String packageName = context.getPackageName();
        for (ActivityManager.RunningAppProcessInfo appProcess : appProcesses) {
            if (appProcess.importance == ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND
                    && appProcess.processName.equals(packageName)) {
                return true;
            }
        }
        return false;
    }
}
