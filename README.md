# Kuku - a digital cuckoo clock for Android

`Note:` This is a work in progress


## Index
1. Description
    - Pitch
    - Actual description
    - Roads
    - Odds and ends
2. About Kuku
3. Disclaimer
4. Credits: software
5. Prototypes
    - 0.1 - Python
    - 0.2 - Kotlin 
6. Obsolete version
    - 1.3 - Netlify


## 1. Description
### Pitch
Always wanted to own a cuckoo clock but couldn't afford one?
Well, bless the marvels of the modern world, you can get one on your Android phone right now. For Free!

### Actual description
Kuku is an app that mimics a cuckoo-clock in a cartoonish style. By default a cuckoo sound is played once every 15 minutes and multiple times according to the hour of the day, accompanied by a message. If this is considered too intrusive, the user can choose to have only the hours indicated.

The minutely alarms are included for testing/showcasing purposes. They are not meant and/or recommended for everyday use.

### Roads
After having worked through some Python programming tutorials, most notably Python Crash Course, I figured it was time to write a real program, a program that would take the world by storm and earn me my rightful position between the tech million- and billionaires, so that I would never have to work a single day in my life again. After having a good look around I realized there was just this one niche that I should follow to achieve that goal. And that niche was going to be: a cuckoo clock.

Cuckoo clocks have been around for centuries in analogue form.
- memories of cuckoo clocks
(..)
-> digital cuckoo clock

I immediately took to work, paused my musical carreer to record the Kuku sound that is actually still in use in the current version and started working on a Python version with Pygame, which was at that time the only GUI for Python that I had some experience with. I soon realized that, since Kukuk, as I named the program by then, was not going to be a game, Pygame might not be the best fit and I switched to the Kivy framework, which I found pleasantly easy to use and had the advantage of being able to run on mobile phones.

I did create a prototype using Kivy, but I was not impressed by the long loading times of the app. Now it's hard to say if that was due to my lack of programming experience or if it was an unfortunate aspect of (the then current version of) Kivy, but I decided to take a leap and give the more native programming languages for Android a try, which led me to Java or Kotlin.

Since the little experience I had with Java had been quite frightening and Kotlin was presented as elegant, future-proof and specially made for Android, I decided to go with Kotlin, combined with Android Studio.

As you probably guessed by now, it has not been a straight road

- How (the journey)
    - Python road
    - Kotlin road: coroutines
    - Use of CoPilots

### Odds and ends
For the poor souls who don't have an Android device, the [1.3] version of the app is and will still be available as long as Netlify supports it at `https://kuku-klok.netlify.app/`. The current version [2.0.x] is specifically tailored for Android, has several improvements under the hood and is therefore recommended over the [1.3] version if possible.

There are some cosmetic changes between the versions as well and based on your preference you may be more inclined to use the older version. In that case I herald your decision and wish you the best of experiences with the [1.3] version.


## 2. About Kuku
This section is accurate but very basic and will not be updated or expanded upon and may ultimately even be removed in its entirety, to prevent multiple different versions of this section circulating throughout the code/app. A more current and complete version of 'About Kuku' is available through the app and in the `app/src/main/assets/` folder.
- App: Kuku
- Author: Marc Kooij
- Licence: MIT
- Github: https://github.com/djkeu/Kukuk


## 3. Disclaimer
Use at your own risk. The developer is not liable for any issues caused by this app.
- sudden sounds
- hypnotizing animations



## 4. Credits
### Software used
Android Studio
VSCode
Python
Pygame
Kivy
Kotlin
Javascript
Lubuntu 24.04
Audacity
Libre Office Draw
Google Keep
GIMP
XnViewMp

Netlify.com
Github.com

AI:
ChatGPT
DeepSeek
Claude

And yes, that's me voicing the Kuku

## 5. Prototypes
### Kukuk [0.1] - Python:
Experimenting with Pygame and ultimately using Kivy framework for GUI\
Github repository: https://github.com/djkeu/kukuk_python

### Kukuk [0.2] - Kotlin:
Switch to Kotlin for better performance on Android\
Github repository: https://github.com/djkeu/kukuk-kotlin


## 6. Obsolete version:
### Kukuk [1.3] - Netlify:
Switch to JavaScript for deployment to Netlify\
Year of development: 2024\
Netlify: https://kuku-klok.netlify.app\
Github: https://github.com/djkeu/kukuk-js
