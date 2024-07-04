### Dokumentacja dla projektu MailBank_Frontend

## Wprowadzenie

MailBank_Frontend to repozytorium zawierające frontend projektu MailBank, zapewniające przy użyciu nowoczesnych technologii webowych interfejs użytkownika dla systemu bankowego. Projekt umożliwia realizację transakcji za pomocą adresu e-mail, podobnie jak system BLIK, ale zamiast numeru telefonu używa adresu e-mail.

## Instalacja

### Wymagania systemowe

- Node.js
- npm (Node Package Manager)

### Instrukcje instalacji

1. Sklonuj repozytorium:
   ```sh
   git clone https://github.com/UFEQ1337/MailBank_Frontend.git
   cd MailBank_Frontend
   ```

2. Zainstaluj zależności:
   ```sh
   npm install
   ```

## Uruchamianie Aplikacji

Aby uruchomić aplikację lokalnie, użyj poniższej komendy w terminalu:

```sh
npm start
```

Aplikacja będzie dostępna pod adresem [http://localhost:3000](http://localhost:3000).

## Struktura Projektu

- **public/**: Katalog zawierający publiczne zasoby, takie jak pliki HTML.
- **src/**: Katalog zawierający kod źródłowy aplikacji.
  - **components/**: Komponenty React używane w aplikacji.
  - **App.js**: Główny plik aplikacji.
  - **index.js**: Punkt wejścia aplikacji.
- **package.json**: Plik konfiguracyjny projektu zawierający informacje o zależnościach i skryptach.

## Budowanie Aplikacji

Aby zbudować aplikację do produkcji, użyj poniższej komendy:

```sh
npm run build
```

Zbudowane pliki będą znajdować się w katalogu `build/`.

## Struktura katalogów

- `public/` - Folder zawierający zasoby publiczne, takie jak pliki HTML.
- `src/` - Folder z kodem źródłowym aplikacji.
  - `components/` - Folder zawierający komponenty React używane w aplikacji.
  - `App.js` - Główny plik aplikacji.
  - `index.js` - Punkt wejścia aplikacji.

## Konfiguracja

### Plik package.json

Plik `package.json` zawiera informacje o projekcie, w tym zależności i skrypty do uruchamiania, testowania i budowania aplikacji.

```json
{
  "name": "mailbank-frontend",
  "version": "1.0.0",
  "description": "Frontend for MailBank project",
  "main": "index.js",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "4.0.3"
  },
  "devDependencies": {},
  "author": "",
  "license": "ISC"
}
```
