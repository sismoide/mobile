# Prerequisitos

* Tener `yarn` instalado

# Instalación

Instalar json-server para el servidor de prueba

```bash
$ sudo yarn global add json-server
```

Instalar las dependencias del proyecto

```bash
$ yarn install
```

# Correr en modo desarollo

Correr una instancia del servidor falso. Puedes encontrar `db.json` [aquí](https://gist.github.com/sgioia9/4f6e2b41429e1ea0acc87af5d5750575)

```bash
$ json-server db.json
```

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

