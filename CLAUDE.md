# CLAUDE.md — Вертикальный интерактивный сайт Шежире (Казахское генеалогическое дерево)

## Описание проекта

Создай интерактивный веб-сайт казахского генеалогического дерева (Шежире) — аналог tumalas.kz, но с **вертикальной** компоновкой дерева (корень сверху, ветви вниз). Сайт отображает полную иерархию казахских родов: Алаш → Три Жуза → Роды → Подроды → Имена.

---

## Технический стек

- **Frontend**: React + TypeScript
- **Стилизация**: Tailwind CSS + CSS Variables
- **Граф/Дерево**: D3.js (d3-hierarchy + d3-zoom + d3-drag)
- **Состояние**: Zustand
- **Роутинг**: React Router v6
- **Иконки**: Lucide React
- **Шрифты**: Google Fonts — `Playfair Display` (заголовки) + `Noto Serif KZ` или `Source Serif 4` (казахский текст)
- **Backend** (опционально): Node.js + PostgreSQL + REST API

---

## Цветовая палитра и визуальный стиль

```css
:root {
  --bg-primary: #0f0c07;        /* почти чёрный, тёплый */
  --bg-secondary: #1a1508;      /* тёмно-коричневый */
  --bg-card: #231c0d;           /* карточки */
  --accent-gold: #c9942a;       /* золото — главный акцент */
  --accent-gold-light: #e8b84b; /* светлое золото */
  --accent-red: #8b2c1a;        /* тёмно-красный — Старший жуз */
  --accent-blue: #1a3d6b;       /* тёмно-синий — Средний жуз */
  --accent-green: #1a4d2e;      /* тёмно-зелёный — Младший жуз */
  --text-primary: #f0e6d0;      /* кремово-белый */
  --text-secondary: #a89070;    /* приглушённый */
  --border: rgba(201, 148, 42, 0.3); /* золотая граница */
  --node-line: #c9942a;         /* цвет линий дерева */
}
```

**Эстетика**: этно-геральдика, степной минимализм, темное золото. Фоновая текстура — тонкий казахский орнамент (SVG паттерн, opacity 0.05). Никакого современного "tech" дизайна — дух степи и истории.

---

## Структура данных (Шежире)

```typescript
interface ShejireNode {
  id: string;
  nameKz: string;           // Имя на казахском
  nameRu?: string;          // Имя на русском
  type: 'root' | 'zhuz' | 'ru' | 'ata' | 'person';
  zhuz?: 'elder' | 'middle' | 'junior'; // Жуз
  children?: ShejireNode[];
  description?: string;     // Историческая справка
  tamga?: string;           // SVG тамги
  uran?: string;            // Боевой клич
  count?: number;           // Кол-во записей
  birthYear?: number;
  deathYear?: number;
}
```

**Начальные данные** (хардкод для демо):

```typescript
const SHEJIRE_DATA: ShejireNode = {
  id: 'alash',
  nameKz: 'Алаш',
  nameRu: 'Алаш',
  type: 'root',
  description: 'Легендарный прародитель казахского народа',
  children: [
    {
      id: 'elder-zhuz',
      nameKz: 'Ұлы жүз',
      nameRu: 'Старший жуз',
      type: 'zhuz',
      zhuz: 'elder',
      children: [
        { id: 'dulat', nameKz: 'Дулат', type: 'ru', children: [...] },
        { id: 'alban', nameKz: 'Албан', type: 'ru', children: [...] },
        { id: 'suan', nameKz: 'Суан', type: 'ru', children: [...] },
        { id: 'srgeli', nameKz: 'Сіргелі', type: 'ru', children: [...] },
        { id: 'ysty', nameKz: 'Ысты', type: 'ru', children: [...] },
        { id: 'shanshkly', nameKz: 'Шанышқылы', type: 'ru', children: [...] },
        { id: 'jalair', nameKz: 'Жалайыр', type: 'ru', children: [...] },
        { id: 'shapyrashty', nameKz: 'Шапырашты', type: 'ru', children: [...] },
        { id: 'oshakty', nameKz: 'Ошақты', type: 'ru', children: [...] },
      ]
    },
    {
      id: 'middle-zhuz',
      nameKz: 'Орта жүз',
      nameRu: 'Средний жуз',
      type: 'zhuz',
      zhuz: 'middle',
      children: [
        { id: 'argyn', nameKz: 'Арғын', type: 'ru', children: [...] },
        { id: 'naiman', nameKz: 'Найман', type: 'ru', children: [...] },
        { id: 'kerei', nameKz: 'Керей', type: 'ru', children: [...] },
        { id: 'kipshak', nameKz: 'Қыпшақ', type: 'ru', children: [...] },
        { id: 'kongyrat', nameKz: 'Қоңырат', type: 'ru', children: [...] },
        { id: 'uak', nameKz: 'Уақ', type: 'ru', children: [...] },
        { id: 'tarakty', nameKz: 'Тарақты', type: 'ru', children: [...] },
      ]
    },
    {
      id: 'junior-zhuz',
      nameKz: 'Кіші жүз',
      nameRu: 'Младший жуз',
      type: 'zhuz',
      zhuz: 'junior',
      children: [
        { id: 'bayuly', nameKz: 'Байұлы', type: 'ru', children: [...] },
        { id: 'zhetiru', nameKz: 'Жетіру', type: 'ru', children: [...] },
        { id: 'alimuly', nameKz: 'Әлімұлы', type: 'ru', children: [...] },
      ]
    }
  ]
};
```

---

## Компоненты (структура файлов)

```
src/
├── components/
│   ├── TreeCanvas/
│   │   ├── TreeCanvas.tsx        # Основной D3 канвас с деревом
│   │   ├── TreeNode.tsx          # Узел дерева (SVG foreignObject)
│   │   ├── TreeEdge.tsx          # Линии связи (кривые Безье)
│   │   └── TreeMinimap.tsx       # Минимапа в углу
│   ├── Sidebar/
│   │   ├── NodeDetail.tsx        # Панель с деталями выбранного узла
│   │   ├── SearchPanel.tsx       # Поиск по имени
│   │   └── FilterPanel.tsx       # Фильтр по жузу
│   ├── UI/
│   │   ├── Header.tsx            # Шапка сайта
│   │   ├── ZoomControls.tsx      # Кнопки зума +/-/reset
│   │   ├── BreadcrumbPath.tsx    # Путь: Алаш → Орта жүз → Арғын → ...
│   │   └── StatsBar.tsx          # Статистика (кол-во записей)
│   └── Modals/
│       ├── AddPersonModal.tsx    # Форма добавления человека
│       └── PersonProfile.tsx     # Профиль человека
├── hooks/
│   ├── useTree.ts                # D3 логика
│   ├── useSearch.ts              # Поиск
│   └── useZoom.ts                # Зум/пан
├── store/
│   └── shejireStore.ts           # Zustand стор
├── data/
│   └── initialData.ts            # Начальные данные шежире
└── types/
    └── shejire.ts                # TypeScript интерфейсы
```

---

## Основная логика D3 дерева (вертикальное)

```typescript
// TreeCanvas.tsx
import * as d3 from 'd3';

const treeLayout = d3.tree<ShejireNode>()
  .nodeSize([NODE_WIDTH + H_GAP, NODE_HEIGHT + V_GAP])
  .separation((a, b) => a.parent === b.parent ? 1 : 1.5);

// Корень СВЕРХУ, дерево растёт ВНИЗ
// Линии — кривые Безье (linkVertical)
const linkGenerator = d3.linkVertical<any, any>()
  .x(d => d.x)
  .y(d => d.y);

// Зум + пан
const zoom = d3.zoom()
  .scaleExtent([0.1, 3])
  .on('zoom', (event) => {
    container.attr('transform', event.transform);
  });

// Анимация при разворачивании узла
node.transition()
  .duration(400)
  .ease(d3.easeCubicOut)
  .attr('transform', d => `translate(${d.x}, ${d.y})`);
```

---

## Дизайн узла дерева

Каждый узел — скруглённый прямоугольник с золотой рамкой.

```
┌─────────────────────┐
│  🔶  [ТАМГА иконка]  │  ← только для жузов
│   Арғын             │  ← nameKz (главное)
│   Аргын             │  ← nameRu (мелко)
│   ████ 12 450       │  ← кол-во записей
└─────────────────────┘
       ▼ (кнопка развернуть)
```

**Размеры узлов по типу:**
- `root` — 200×70px, золото, крупный шрифт
- `zhuz` — 160×60px, цвет по жузу
- `ru` — 140×50px, стандартный
- `ata` — 120×45px, меньше
- `person` — 110×40px, минимальный

**При hover**: золотое свечение (box-shadow: 0 0 20px rgba(201,148,42,0.5))
**При клике**: боковая панель с деталями

---

## Боковая панель (Sidebar)

Открывается справа при клике на узел. Содержит:

1. **Заголовок** — имя на казахском + русском
2. **Тип** — жуз, ру, подрод, человек
3. **Тамга** — SVG изображение родового знака
4. **Уран** — боевой клич рода
5. **Историческая справка** — краткое описание
6. **Статистика** — кол-во записей в этой ветви
7. **Путь шежире** — цепочка предков (breadcrumb)
8. **Кнопки действий**:
   - "Открыть полностью" — фокусирует на этом узле
   - "Добавить потомка" — форма добавления
   - "Поделиться" — копирует ссылку

---

## Поиск

- Строка поиска в шапке с debounce 300ms
- Поиск по `nameKz` и `nameRu`
- Результаты — выпадающий список с путём до найденного узла
- При клике — дерево автоматически центрируется на найденном узле с анимацией

---

## Фильтры и навигация

- **Фильтр по жузу**: кнопки "Ұлы жүз | Орта жүз | Кіші жүз"
- **Свернуть все**: кнопка — сворачивает дерево до уровня жузов
- **Развернуть все**: разворачивает все ветви
- **Найти себя**: подсвечивает путь от корня до выбранного лица
- **Режимы отображения**:
  - "Дерево" — основной вертикальный вид
  - "Список" — плоский список всех записей
  - "Карта" — (опционально) географическое распределение родов

---

## Анимации и эффекты

```css
/* Разворачивание узла */
.node-enter {
  opacity: 0;
  transform: translateY(-20px) scale(0.8);
}
.node-enter-active {
  opacity: 1;
  transform: translateY(0) scale(1);
  transition: all 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Мерцание при выборе */
@keyframes selectedPulse {
  0%, 100% { box-shadow: 0 0 10px rgba(201,148,42,0.4); }
  50% { box-shadow: 0 0 30px rgba(201,148,42,0.9); }
}

/* Линии дерева — нарисовать анимацией */
.tree-edge {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawLine 0.6s ease forwards;
}
@keyframes drawLine {
  to { stroke-dashoffset: 0; }
}
```

---

## Шапка (Header)

```
[🔶 ШЕЖІРЕ логотип]    [Поиск по имени...]    [Ұлы | Орта | Кіші]    [Кіру | Тіркелу]
```

- Фон: `rgba(15, 12, 7, 0.95)` + backdrop-blur
- Нижняя граница: 1px solid var(--accent-gold) с opacity 0.3
- Казахский орнамент в качестве декоративного элемента

---

## Статистика (StatsBar)

Строка под шапкой:
```
Барлық жазбалар: 87 420  |  Модераторлар: 92  |  Рулар: 47  |  Сайтта: 1 240
```

---

## Страницы (роутинг)

| Путь | Компонент | Описание |
|------|-----------|----------|
| `/` | `HomePage` | Главная — полное дерево |
| `/node/:id` | `NodePage` | Страница конкретного рода |
| `/person/:id` | `PersonPage` | Профиль человека |
| `/search` | `SearchPage` | Расширенный поиск |
| `/login` | `LoginPage` | Вход |
| `/register` | `RegisterPage` | Регистрация |
| `/submit` | `SubmitPage` | Форма заявки на добавление |
| `/members` | `MembersPage` | Список участников |
| `/about` | `AboutPage` | О проекте |

---

## Форма добавления человека (Submit)

Поля:
1. **Ваше полное имя** (казахский / русский)
2. **Жуз** — выпадающий список
3. **Ру (род)** — выпадающий список (зависит от жуза)
4. **Ата (подрод)** — выпадающий список
5. **Имя отца** (для связи в дереве)
6. **Год рождения**
7. **Комментарий / дополнительная информация**
8. **Контакт** (WhatsApp / Telegram)

После отправки — заявка уходит модератору.

---

## Адаптивность

- **Desktop (1200px+)**: полное дерево + правая боковая панель
- **Tablet (768–1199px)**: дерево на весь экран + боковая панель снизу
- **Mobile (< 768px)**: упрощённое дерево (только 2 уровня глубины) + tap для деталей
- На мобиле — горизонтальный скролл с touch/pinch зумом

---

## Производительность

- **Виртуализация**: рендерить только видимые узлы (intersection observer)
- **Canvas fallback**: если узлов > 5000 — переключиться на PixiJS canvas
- **Ленивая загрузка**: дочерние узлы загружаются только при разворачивании
- **Web Workers**: тяжёлые вычисления D3 layout — в воркере

---

## Фоновый SVG орнамент (паттерн)

```html
<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60">
  <defs>
    <pattern id="kazakh-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
      <!-- Ромбовидный казахский мотив -->
      <path d="M30 5 L55 30 L30 55 L5 30 Z" fill="none" stroke="#c9942a" stroke-width="0.5" opacity="0.15"/>
      <path d="M30 15 L45 30 L30 45 L15 30 Z" fill="none" stroke="#c9942a" stroke-width="0.3" opacity="0.1"/>
      <circle cx="30" cy="30" r="2" fill="#c9942a" opacity="0.1"/>
    </pattern>
  </defs>
  <rect width="60" height="60" fill="url(#kazakh-pattern)"/>
</svg>
```

---

## Пример реализации TreeCanvas (ключевой фрагмент)

```tsx
// TreeCanvas.tsx
useEffect(() => {
  const svg = d3.select(svgRef.current);
  const g = svg.select('g.tree-container');

  const root = d3.hierarchy(data);
  const treeLayout = d3.tree<ShejireNode>()
    .nodeSize([160, 120])
    .separation((a, b) => a.parent === b.parent ? 1.2 : 2);

  treeLayout(root);

  // Линии
  const links = g.selectAll('.link')
    .data(root.links())
    .join('path')
    .attr('class', 'link tree-edge')
    .attr('fill', 'none')
    .attr('stroke', 'var(--node-line)')
    .attr('stroke-width', 1.5)
    .attr('stroke-opacity', 0.6)
    .attr('d', d3.linkVertical<any,any>()
      .x(d => d.x)
      .y(d => d.y)
    );

  // Узлы
  const nodes = g.selectAll('.node')
    .data(root.descendants())
    .join('foreignObject')
    .attr('class', 'node')
    .attr('width', d => getNodeWidth(d.data.type))
    .attr('height', d => getNodeHeight(d.data.type))
    .attr('x', d => d.x - getNodeWidth(d.data.type) / 2)
    .attr('y', d => d.y - getNodeHeight(d.data.type) / 2)
    .html(d => renderNodeHTML(d.data));

  // Зум
  svg.call(
    d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.05, 4])
      .on('zoom', e => g.attr('transform', e.transform))
  );
}, [data]);
```

---

## Локализация

Сайт должен поддерживать три языка:
- 🇰🇿 **Қазақша** (основной)
- 🇷🇺 **Русский**
- 🇬🇧 **English**

Переключатель языка — в шапке справа.

---

## SEO и мета-теги

```html
<title>Шежіре — Қазақтың интерактивті шежіресі</title>
<meta name="description" content="Қазақ халқының толық шежіресі. Өз тегіңізді табыңыз.">
<meta property="og:image" content="/og-shejire.jpg">
```

---

## Дополнительные фичи (v2)

- [ ] **AI-помощник**: "Опиши мой путь в шежире" — генерирует текст по цепочке предков
- [ ] **PDF экспорт**: скачать своё поддерево как красивый PDF
- [ ] **Карта**: отображение на карте Казахстана — где жили роды
- [ ] **Тамга галерея**: страница с тамгами всех родов
- [ ] **Форум/комментарии**: обсуждение под каждым родом
- [ ] **Генетика**: интеграция с Y-ДНК данными для подтверждения родства

---

## Инструкции для Claude

1. **Начни с данных**: реализуй `initialData.ts` с полной структурой трёх жузов и их основными родами
2. **Затем D3 дерево**: вертикальная компоновка с зумом и паном — это сердце сайта
3. **Затем UI**: шапка, боковая панель, поиск
4. **Стиль в последнюю очередь**: применяй казахскую этно-эстетику через CSS переменные

**Не используй**: Chart.js, recharts, или другие библиотеки графиков — только D3.js для дерева.

**Обязательно**: все казахские названия пиши правильно с казахскими буквами (Ə, Ү, Қ, Ғ, Ң, Ұ, Ө, І, Ш и т.д.).

---

*Этот промпт описывает полный аналог tumalas.kz с вертикальным деревом. Реализация возможна как Single Page Application на React или как серверный проект на Next.js.*
