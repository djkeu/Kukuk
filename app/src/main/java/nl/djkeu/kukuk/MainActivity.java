package nl.djkeu.kukuk;

import android.annotation.SuppressLint;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.appcompat.app.AppCompatActivity;
import org.json.JSONObject;
import org.json.JSONException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = "KukuClock";
    private List<MediaPlayer> audioPlayers;
    private WebView webView;
    private String aboutDataCache = null;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webview);
        initializeAudioPlayers();
        loadAboutDataFromAssets();
        configureWebView();
        webView.loadUrl("file:///android_asset/kukuk.html");
    }

    private void initializeAudioPlayers() {
        audioPlayers = new ArrayList<>();
        try {
            for (int i = 0; i < 5; i++) {
                MediaPlayer player = new MediaPlayer();
                try (android.content.res.AssetFileDescriptor afd = getAssets().openFd("sounds/keukuk03.mp3")) {
                    player.setDataSource(afd.getFileDescriptor(), afd.getStartOffset(), afd.getLength());
                    player.prepare();
                    player.setVolume(1.0f, 1.0f);
                    audioPlayers.add(player);
                }
            }
        } catch (IOException e) {
            Log.e(TAG, "Audio initialization failed", e);
        }
    }

    private void loadAboutDataFromAssets() {
        try (InputStream inputStream = getAssets().open("about.json")) {
            byte[] buffer = new byte[inputStream.available()];
            int bytesRead = inputStream.read(buffer);
            if (bytesRead > 0) {
                aboutDataCache = new String(buffer, StandardCharsets.UTF_8);
                // Validate JSON
                new JSONObject(aboutDataCache);
            } else {
                throw new IOException("Empty about.json file");
            }
        } catch (IOException | JSONException e) {
            Log.w(TAG, "Loading about.json failed, using fallback", e);
            try {
                JSONObject fallbackData = new JSONObject();
                fallbackData.put("App Name", "Kuku Clock");
                fallbackData.put("Version", "2.0.4");
                fallbackData.put("Developer", "Marc Kooij");
                aboutDataCache = fallbackData.toString();
            } catch (JSONException fallbackException) {
                Log.e(TAG, "Fallback JSON creation failed", fallbackException);
                aboutDataCache = "{}";
            }
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    private void configureWebView() {
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setMediaPlaybackRequiresUserGesture(false);

        // Required for sound to work
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);

        // Security note: These are needed but we restrict to local assets
        settings.setAllowFileAccessFromFileURLs(true);
        settings.setAllowUniversalAccessFromFileURLs(true);

        webView.addJavascriptInterface(new WebAppInterface(), "AndroidInterface");

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                if (url.contains("about.html") && aboutDataCache != null) {
                    view.evaluateJavascript(
                            "window.appData = " + aboutDataCache + ";",
                            null
                    );
                }
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return !url.startsWith("file:///android_asset/");
            }
        });
    }

    @Override
    protected void onDestroy() {
        if (audioPlayers != null) {
            for (MediaPlayer player : audioPlayers) {
                if (player != null) {
                    player.release();
                }
            }
        }
        super.onDestroy();
    }

    public class WebAppInterface {
        private int currentPlayerIndex = 0;

        // Removed unused context parameter
        WebAppInterface() {
        }

        @JavascriptInterface
        @SuppressWarnings("unused") // Called from JavaScript
        public void playKukuSound() {
            runOnUiThread(() -> {
                if (audioPlayers != null && !audioPlayers.isEmpty()) {
                    MediaPlayer player = audioPlayers.get(currentPlayerIndex);
                    try {
                        player.seekTo(0);
                        player.start();
                        currentPlayerIndex = (currentPlayerIndex + 1) % audioPlayers.size();
                    } catch (IllegalStateException e) {
                        Log.e(TAG, "Sound playback failed", e);
                    }
                }
            });
        }

        @JavascriptInterface
        @SuppressWarnings("unused") // Called from JavaScript
        public String getAboutData() {
            return aboutDataCache != null ? aboutDataCache : "{}";
        }
    }
}