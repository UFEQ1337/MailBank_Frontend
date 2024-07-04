# MailBank Frontend

To repozytorium zawiera frontend projektu MailBank, zbudowanego przy użyciu nowoczesnych technologii webowych.

## Rozpoczęcie pracy

Aby rozpocząć pracę z projektem, wykonaj następujące kroki:

### Klonowanie repozytorium

Najpierw sklonuj repozytorium na swój lokalny komputer:

```bash
git clone https://github.com/UFEQ1337/MailBank_Frontend.git
cd MailBank_Frontend
```

### Instalacja zależności

Następnie zainstaluj wszystkie niezbędne zależności:

```bash
npm install
```

### Uruchomienie aplikacji w trybie deweloperskim

Aby uruchomić aplikację w trybie deweloperskim, użyj następującej komendy:

```bash
npm start
```

Aplikacja zostanie uruchomiona na lokalnym serwerze deweloperskim. Otwórz [http://localhost:3000](http://localhost:3000) w swojej przeglądarce, aby zobaczyć aplikację.

### Uruchamianie testów

Aby uruchomić testy jednostkowe, użyj następującej komendy:

```bash
npm test
```

### Budowanie aplikacji do produkcji

Aby zbudować aplikację do wersji produkcyjnej, użyj następującej komendy:

```bash
npm run build
```

Kompilacja zoptymalizuje aplikację do najlepszej wydajności. Zbudowane pliki będą znajdować się w folderze `build`.

## Struktura katalogów

- `public/` - folder zawierający publiczne zasoby, takie jak pliki HTML.
- `src/` - główny folder z kodem źródłowym aplikacji.
- `package.json` - plik konfiguracyjny zarządzający zależnościami i skryptami projektu.
