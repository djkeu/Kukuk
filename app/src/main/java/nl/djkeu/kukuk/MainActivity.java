package nl.djkeu.kukuk;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.util.Log;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.appcompat.app.AppCompatActivity;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = "KukuKApp";

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        WebView webView = findViewById(R.id.webview);
        configureSecureWebView(webView);
        webView.loadUrl("file:///android_asset/kukuk.html");
    }

    @SuppressLint("SetJavaScriptEnabled")
    private void configureSecureWebView(WebView webView) {
        // 1. First load JSON data
        final String jsonData = loadAboutJsonData();

        // 2. Apply all security-critical settings
        webView.getSettings().setJavaScriptEnabled(true);  // Required but carefully controlled
        webView.getSettings().setMediaPlaybackRequiresUserGesture(false);

        // DISABLE all dangerous settings
        webView.getSettings().setAllowFileAccess(false);
        webView.getSettings().setAllowContentAccess(false);
        webView.getSettings().setAllowFileAccessFromFileURLs(false);
        webView.getSettings().setAllowUniversalAccessFromFileURLs(false);
        webView.getSettings().setDatabaseEnabled(false);
        webView.getSettings().setGeolocationEnabled(false);

        // 3. Secure WebViewClient with delayed JSON injection
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                // Only allow our asset files to load
                return !url.startsWith("file:///android_asset/");
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                // Initial injection
                injectJsonWithRetry(view, jsonData);
            }
        });
    }

    private void injectJsonWithRetry(WebView view, String json) {
        // Immediate injection
        view.evaluateJavascript(
                "if (!window.appData) window.appData = " + json + ";",
                null
        );

        // Safety net after delay
        view.postDelayed(() -> view.evaluateJavascript(
                "if (!window.appData) console.warn('Delayed injection needed');" +
                        "window.appData = " + json + ";",
                null
        ), 300);
    }

    private String loadAboutJsonData() {
        try (InputStream is = getAssets().open("about.json")) {
            byte[] buffer = new byte[is.available()];
            //noinspection ResultOfMethodCallIgnored
            is.read(buffer); // We know available() matches read() for asset files
            return new String(buffer, StandardCharsets.UTF_8);
        } catch (IOException e) {
            Log.e(TAG, "Failed to load about.json", e);
            return "{}";
        }
    }
}