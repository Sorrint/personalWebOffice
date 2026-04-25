#!/usr/bin/env node
import {
  readFileSync,
  writeFileSync,
  copyFileSync,
  rmSync,
  readdirSync,
  mkdirSync,
  existsSync,
} from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const ICON_FONT_DIR = join(ROOT, 'src/shared/assets/icon-font');
const SOURCE_DIR = process.argv[2]
  ? resolve(process.argv[2])
  : join(ICON_FONT_DIR, 'office');
const FONTS_DIR = join(ICON_FONT_DIR, 'fonts');
const SCSS_PATH = join(ICON_FONT_DIR, 'style.module.scss');
const SELECTION_PATH = join(ICON_FONT_DIR, 'selection.json');

if (!existsSync(SOURCE_DIR)) {
  console.error(`Папка не найдена: ${SOURCE_DIR}`);
  console.error(`Распакуй zip из IcoMoon в src/shared/assets/icon-font/office/`);
  process.exit(1);
}

const jsonName = readdirSync(SOURCE_DIR).find((f) => f.endsWith('.icomoon.json'));
if (!jsonName) {
  console.error(`В ${SOURCE_DIR} не найден *.icomoon.json`);
  process.exit(1);
}

const icomoon = JSON.parse(readFileSync(join(SOURCE_DIR, jsonName), 'utf8'));
const icons = icomoon.glyphs
  .map((g) => ({
    name: g.extras.name,
    code: g.extras.codePoint.toString(16),
  }))
  .sort((a, b) => parseInt(a.code, 16) - parseInt(b.code, 16));

if (icons.length === 0) {
  console.error('В JSON нет иконок');
  process.exit(1);
}

console.log(`Найдено иконок: ${icons.length}`);

const rules = icons
  .map((i) => `.icon-${i.name}::before {\n  content: '\\${i.code}';\n}`)
  .join('\n\n');

const scss = `@font-face {
  font-family: office;
  font-weight: normal;
  font-style: normal;
  font-display: block;
  src: url('fonts/office.woff2') format('woff2'),
    url('fonts/office.woff') format('woff'),
    url('fonts/office.ttf') format('truetype');
}

i {
  speak: never;

  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: office !important;
  font-weight: normal;
  font-style: normal;
  font-variant: normal;
  line-height: 1;
  text-transform: none;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

${rules}
`;

writeFileSync(SCSS_PATH, scss);
console.log(`Обновлён style.module.scss`);

const fontSource = join(SOURCE_DIR, 'font/fonts');
if (!existsSync(fontSource)) {
  console.error(`Папка со шрифтами не найдена: ${fontSource}`);
  process.exit(1);
}

if (!existsSync(FONTS_DIR)) mkdirSync(FONTS_DIR, { recursive: true });
for (const f of readdirSync(FONTS_DIR)) {
  rmSync(join(FONTS_DIR, f));
}

const fontFiles = readdirSync(fontSource);
const formats = ['woff2', 'woff', 'ttf'];
for (const fmt of formats) {
  const src = fontFiles.find((f) => f.endsWith(`.${fmt}`));
  if (!src) {
    console.warn(`Не найден .${fmt} файл — пропущен`);
    continue;
  }
  copyFileSync(join(fontSource, src), join(FONTS_DIR, `office.${fmt}`));
  console.log(`Скопирован ${src} → office.${fmt}`);
}

copyFileSync(join(SOURCE_DIR, jsonName), SELECTION_PATH);
console.log(`Сохранён selection.json`);

rmSync(SOURCE_DIR, { recursive: true, force: true });
console.log(`Удалена временная папка ${SOURCE_DIR}`);

console.log(`Готово. Иконок: ${icons.length}.`);
