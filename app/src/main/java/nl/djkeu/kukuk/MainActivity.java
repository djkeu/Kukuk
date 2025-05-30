package nl.djkeu.kukuk;

import android.content.Context;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.appcompat.app.AppCompatActivity;
import org.json.JSONObject;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {
    private List<MediaPlayer> audioPlayers;
    private WebView webView;
    private String aboutDataCache = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webview);

        // Initialize audio players
        initializeAudioPlayers();

        // Load about data from JSON file
        loadAboutDataFromAssets();

        // WebView settings
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setAllowFileAccess(true);
        webSettings.setAllowContentAccess(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setMediaPlaybackRequiresUserGesture(false);

        // These are needed for the audio to work, but we limit exposure by only loading trusted assets
        webSettings.setAllowFileAccessFromFileURLs(true);
        webSettings.setAllowUniversalAccessFromFileURLs(true);

        // Add JavaScript interface for secure data access
        webView.addJavascriptInterface(new WebAppInterface(this), "AndroidInterface");

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);

                // Inject about data for about.html (as fallback)
                if (url.contains("about.html")) {
                    injectAboutDataFallback(view);
                }
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                // Only allow loading of asset files for security
                if (url.startsWith("file:///android_asset/")) {
                    view.loadUrl(url);
                    return true;
                }
                return false;
            }
        });

        webView.loadUrl("file:///android_asset/kukuk.html");
    }

    private void initializeAudioPlayers() {
        audioPlayers = new ArrayList<>();
        try {
            // Create multiple MediaPlayer instances for overlapping sounds
            for (int i = 0; i < 5; i++) {
                MediaPlayer player = new MediaPlayer();
                android.content.res.AssetFileDescriptor afd = getAssets().openFd("sounds/keukuk03.mp3");
                player.setDataSource(afd.getFileDescriptor(), afd.getStartOffset(), afd.getLength());
                player.prepare();
                player.setVolume(1.0f, 1.0f);
                audioPlayers.add(player);
                afd.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void loadAboutDataFromAssets() {
        try {
            InputStream inputStream = getAssets().open("about.json");
            int size = inputStream.available();
            byte[] buffer = new byte[size];
            inputStream.read(buffer);
            inputStream.close();

            aboutDataCache = new String(buffer, "UTF-8");

            // Validate JSON format
            new JSONObject(aboutDataCache);

        } catch (Exception e) {
            e.printStackTrace();
            // Fallback data if JSON loading fails
            try {
                JSONObject fallbackData = new JSONObject();
                fallbackData.put("App Name", "Kuku Clock");
                fallbackData.put("Version", "2.0.2");
                fallbackData.put("Developer", "Marc Kooij");
                fallbackData.put("Description", "A cuckoo clock app with customizable alarms");
                fallbackData.put("Features", "Hourly, quarterly, and minutely alarms with authentic cuckoo sounds");
                fallbackData.put("Copyright", "© 2024 Marc Kooij. All rights reserved.");
                aboutDataCache = fallbackData.toString();
            } catch (Exception fallbackException) {
                fallbackException.printStackTrace();
                aboutDataCache = "{}";
            }
        }
    }

    private void injectAboutDataFallback(WebView webView) {
        try {
            if (aboutDataCache != null) {
                String javascript = "window.appData = " + aboutDataCache + ";";
                webView.evaluateJavascript(javascript, null);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        // Clean up MediaPlayer resources
        if (audioPlayers != null) {
            for (MediaPlayer player : audioPlayers) {
                if (player != null) {
                    player.release();
                }
            }
        }
    }

    // JavaScript Interface for secure communication
    public class WebAppInterface {
        Context context;
        private int currentPlayerIndex = 0;

        WebAppInterface(Context c) {
            context = c;
        }

        @JavascriptInterface
        public void playKukuSound() {
            if (audioPlayers != null && !audioPlayers.isEmpty()) {
                try {
                    MediaPlayer player = audioPlayers.get(currentPlayerIndex);
                    if (player != null) {
                        player.seekTo(0);
                        player.start();
                        currentPlayerIndex = (currentPlayerIndex + 1) % audioPlayers.size();
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }

        @JavascriptInterface
        public String getAboutData() {
            return aboutDataCache != null ? aboutDataCache : "{}";
        }
    }
}