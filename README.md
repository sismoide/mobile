# Correr en modo desarollo

Dejar corriendo el bundler

```bash
$ react-native start
```

Y correr en android:

```bash
$ react-native run-android
```

o en iOS:
```bash
$ react-native run-ios
```

# Build para producción

* Asegurarse que la configuración está correcta en `config/index.js`

Buildear para android:

```bash
$ cd android && ./gradlew assembleRelease
```

Esto genera el apk en `android/app/build/outputs/apk/release/app-release.apk`

