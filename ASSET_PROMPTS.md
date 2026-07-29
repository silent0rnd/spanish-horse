# Imagegen assets

Mode: built-in imagegen.

Reference image for all prompts: `C:\Users\user\Desktop\для сайта лошадей\4c9ffe4e-c839-43a3-82db-5823e14af0e3.png`.
Дополнительная стилевая опора: `assets/hero-cinematic-v2.webp` - главный кадр сайта, по нему выравнивается грейд всей съёмки.

## Единый грейд

Все кадры держат одну обработку, иначе страница рассыпается:

- палитра: charcoal, smoke gray, deep forest green, muted antique gold;
- свет низкий и направленный, без HDR и без насыщенного заката;
- зерно натуральное, лёгкое;
- никаких людей в кадре, кроме явно оговорённых случаев;
- никакого текста, логотипов, водяных знаков, рамок;
- никакого фольклорного костюма, матрёшечной стилистики и сказочного свечения.

Дуализм сайта задан не сюжетом, а температурой: испанские кадры теплее и суше, русские холоднее и влажнее. Разница должна читаться, но оставаться в пределах одной палитры.

---

# 1. Диптих и сезоны

Сгенерированы через ChatGPT одной сессией, с приложенным `hero-cinematic-v2.webp` в качестве стилевого референса. Ниже промпты в том виде, в котором они реально сработали: если кадр придётся пересобрать, берите их, иначе грейд разъедется.

Реальные размеры файлов: диптих и весна 1122x1402, лето, осень и зима 1024x1536. Пропорции разные, но вёрстка приводит их к общей канве через `aspect-ratio` и `object-fit: cover`, поэтому в ряду это не читается.

## Общий стилевой блок

Отправляется один раз в начале сессии, до первого кадра.

```text
I'm going to ask you for a series of 6 photographs for a luxury horse-breeding website. They must all look like they were shot by the same photographer on the same trip, with identical colour grading. The attached image is the exact reference for mood, grade and light.

House style for every image in this series:
Photorealistic editorial photography, cinematic and low-key. Dark, quiet, expensive. Muted palette only: charcoal, smoke grey, deep forest green, and a single restrained antique-gold highlight. Low directional natural light, never harsh, never HDR. Soft atmospheric depth with haze or mist. Fine natural film grain. Shot on a full-frame camera, 85mm, shallow but not extreme depth of field.

Absolute rules for every image:
- No text, no lettering, no logos, no watermarks, no signatures, no borders or decorative frames.
- No people anywhere in frame.
- No saddles, bridles, halters, ropes or any tack on the horses.
- Anatomically correct horses: exactly four legs, correct proportions, realistic heads and hooves.
- No saturated colour, no orange sunsets, no lens flare, no glow, no fantasy or fairy-tale mood.
- No folkloric styling, no ornaments, no costumes, no painted decoration of any kind.
- Keep the top and bottom edges of the frame calm and free of critical detail; they will be faded out in the layout.
```

## `assets/two-lands-andalusia.webp`

Левая створка диптиха «Две земли». Тёплая половина.

```text
Image 1 of 6. Vertical portrait orientation, tall frame.

A wide dry Andalusian plain at first light: the land that formed the Pura Raza Española breed. Rolling dehesa grassland, pale bleached grass, scattered old cork oaks with dark twisted trunks. Far in the distance, a single low whitewashed estate wall, and beyond it the faint blue ridge of a sierra dissolving into haze.

This is a pure landscape - no horse needed. If any horse appears, it must be one distant grey silhouette, small in frame.

Place the horizon low, roughly one third up the frame, leaving a large calm sky. Build strong layered atmospheric depth from foreground to sierra.

Light: warm low sun raking across the plain, long dry shadows, fine dust suspended in the air, old-gold highlights on the grass. The mood is ancient, still and hot.

This image is the WARM, DRY half of a two-part diptych. Push it warmer and drier than the rest of the series, but stay inside the muted house palette - warm ochre and dry straw, never orange or golden-hour cliché.
```

## `assets/two-lands-russia.webp`

Правая створка. Холодная половина. Композиционно рифмуется с левой: та же высота горизонта, та же глубина.

```text
Image 2 of 6. Vertical portrait orientation, tall frame.

This is the COLD, DAMP half of the same diptych as image 1, and it must mirror its composition: the same low horizon at roughly one third up the frame, the same large calm sky, the same sense of layered depth. Side by side, the two images should read as a matched pair.

A misty field in the Tula region of central Russia at dawn. The edge of a birch grove on one side, pale trunks against darkness. Damp black-earth field in the foreground. A shallow ravine cutting through the middle distance with river mist pooling in it. On the far horizon, very small and barely readable through the haze, the silhouette of a modest Orthodox church.

Pure landscape - no horse needed. If any horse appears, one distant grey silhouette only.

Light: cool overcast dawn, damp heavy air, silver light, very low contrast. One single muted warm accent far in the distance, nothing more.

Palette: smoke grey, deep forest green, cold charcoal. Noticeably cooler and wetter than image 1.

The Russian landscape must feel authentic and restrained - a real working field at dawn. No wooden folk architecture in the foreground, no snow, no saturated greens, no postcard prettiness.
```

## `assets/season-spring.webp`

```text
Image 3 of 6. Vertical portrait orientation. First of four seasonal frames that will sit in a row, so keep the camera distance and treatment consistent across images 3 to 6.

Early spring on the farm. One or two grey Andalusian mares with very young foals on a thawing pasture. The mares are calm, the foals close to them, natural unposed herd behaviour. No tack of any kind.

Ground: wet spring meadow, patches of standing meltwater, a shallow ravine still holding runoff, bare birches just breaking into first leaf, low river mist behind.

Frame the horses full body, clearly readable, with generous space around them.

Light: cool overcast morning with a thin warm rim light along the horses' backs. The mood is fragile and quiet.

Palette: smoke grey, wet earth brown, pale muted forest green, a trace of old gold.

Critical: foal anatomy and the size difference between mare and foal must be realistic. No spring flowers, no bright green, no sentimental framing.
```

## `assets/season-summer.webp`

```text
Image 4 of 6. Vertical portrait orientation. Same series and treatment as image 3.

High summer. A group of four to six Andalusian horses, mostly grey with long manes, walking together through deep seeded grass. Natural herd movement, no tack.

Setting: a broad Russian meadow, tall dry-gold grass up to the horses' knees, a dark treeline in the distance, low evening haze hanging over a river bend behind them.

The horses cross from shadow into low light. Full bodies visible.

Light: late summer dusk, soft haze, warm highlights but heavily muted - the warmth should be barely there.

Palette: deep forest green, dry gold grass, charcoal, restrained amber.

Critical: realistic herd scale and spacing, correct anatomy on every animal. No saturated sunset, no lens flare, no postcard glow.
```

## `assets/season-autumn.webp`

```text
Image 5 of 6. Vertical portrait orientation. Same series and treatment as images 3 and 4.

Deep autumn. One or two Andalusian horses standing completely still on the edge of a ravine, partly veiled by heavy fog. No tack.

Setting: an eroded ravine edge with exposed wet black earth, bare and half-turned birches, thick low fog filling the hollow below and drifting up around the horses.

Light: flat cold daylight diffused through fog. Extremely low contrast. Heavy, still, almost silent.

Palette: cold grey, damp brown, dark forest green. Almost no gold at all - this is the coldest and quietest frame of the four.

Critical: the horse silhouette must stay clearly readable through the fog, not dissolve into it. No orange autumn foliage, no saturated colour, no dramatic light beams.
```

## `assets/season-winter.webp`

```text
Image 6 of 6. Vertical portrait orientation. Same series and treatment as images 3 to 5.

Winter. A single grey Andalusian horse standing calmly among snow-covered birches. Thick shaggy winter coat, long mane. No tack.

Setting: a birch grove under fresh snow, deep untouched snow on the ground, flat white overcast sky, dark birch trunks giving a strong vertical rhythm through the frame.

Frame the horse full body, its darker form reading clearly against the light snow.

Light: flat cold winter daylight, blue-grey shadows in the snow. Absolutely quiet.

Palette: cold white, blue-grey shadow, charcoal, dark birch bark.

Critical: the winter coat must look genuinely thick and rough, not the sleek summer coat. No blue fantasy tint, no sparkling snow, no Christmas mood, no saturated sky.
```

## Замер после интеграции

Средняя яркость и температура готовых файлов, по которым выставлены CSS-фильтры. Если кадр пересобирается, он должен попадать примерно в эти значения, иначе выпадет из ряда.

| Файл | Яркость | Насыщенность | Тепло (R-B) |
|---|---:|---:|---:|
| `two-lands-andalusia` | 83 | 31 | +31 |
| `two-lands-russia` | 104 | 6 | +2 |
| `season-spring` | 59 | 24 | +11 |
| `season-summer` | 70 | 27 | +20 |
| `season-autumn` | 82 | 5 | +2 |
| `season-winter` | 124 | 5 | -6 |

Дуга сезонов от тёплой весны к холодной зиме задана съёмкой, поэтому общего `sepia` в CSS на них нет.

---

# 2. Желательно, но не обязательно

Сейчас эти места закрыты рабочими кадрами. Замена улучшит результат, но ничего не сломано.

## `assets/break-panorama.webp`

Размер: 2400x1030 (примерно 21:9). Полноэкранный кинематографический разрыв между «О ферме» и «Лошадьми». Сейчас там стоит `farm-herd.jpg` в кропе 16:10, он работает, но панорамный кадр даст больше воздуха. Если генерируете - подключите в `index.html`, секция `.break`.

```text
Use case: photorealistic-natural
Asset type: full-bleed cinematic break banner
Primary request: a wide panorama of the herd crossing a broad Russian field at dusk
Input images: Image 1: visual style reference only
Scene/backdrop: river bend, dark pine and birch forest, expansive black-earth fields, a distant white Orthodox church with dark domes barely visible through evening mist
Subject: 5-7 Andalusian horses small in frame, crossing from shadow into low warm light
Style/medium: photorealistic cinematic landscape photography, European luxury editorial restraint
Composition/framing: extreme panorama 21:9, horses placed in the lower third, huge sky, deep negative space on both sides for a centered quote
Lighting/mood: late dusk, soft haze, quiet movement, subtle film grain
Color palette: deep forest, smoke gray, charcoal, restrained amber
Constraints: center of the frame must stay calm and dark enough for white text over it; no people; no text; no logos; no watermark
Avoid: fantasy, fairy-tale glow, saturated sunset, decorative frame
```

## Фотографии лошадей в каталоге

Карточки рисуются в канве 4:5 через `object-fit: contain` на подложке-паспарту, поэтому лошадь всегда видна целиком и исходники могут быть любых пропорций. Свободное поле держим примерно до 25 процентов: если больше, надо не уменьшать лошадь, а вырезать из исходника лишнее небо и траву.

Что сейчас используется: `horse-magnifico.webp` (Магнифико YAD), `bucefalo-02.jpg` (Алеко), `breeding-03.jpg` (Новилеро), `breeding-02.jpg` (Далли).

`horse-magnifico.webp` - подрезанный кадр из `stallion-motion.jpg` 864x1821. Исходник был вертикалью обойного формата: лошадь в середине, сверху деревья, снизу пустая трава. Обрезан по y 300-1620, оригинал сохранён.

Два кадра требуют замены:

- **Новилеро, `breeding-03.jpg`** - круп, задние ноги и хвост обрезаны в самом файле-исходнике. Вёрсткой это не лечится, нужна другая фотография с лошадью целиком.
- **Далли, `breeding-02.jpg`** - в левом верхнем углу вотермарка стороннего фотографа. Для коммерческого сайта нужна либо лицензия, либо другой кадр.

Требования к замене: лошадь целиком от ушей до копыт, запас по краям, ровный горизонт, один грейд со всей съёмкой, никакой посторонней амуниции и техники в кадре, никаких чужих вотермарок.

## `assets/og-cover.jpg`

Размер: 1200x630. Сейчас в `og:image` стоит `hero-cinematic-v2.png` весом 1.8 МБ - краулеры его тянут целиком. Отдельная лёгкая обложка в JPEG на 150-250 КБ решает это. Кадр брать тот же героический, кроп горизонтальный, без текста: подпись соцсети рисуют сами.

---

# 3. Уже сгенерировано

Сохранено для повторяемости грейда. Файлы на месте, перегенерировать не нужно.

## `assets/philosophy-horse.jpg`

```text
Use case: photorealistic-natural
Asset type: premium horse-breeding website philosophy section
Primary request: cinematic portrait of a silver-gray Andalusian PRE horse standing calmly on a Russian estate
Input images: Image 1: visual style reference only
Scene/backdrop: misty river meadow in the Tula region, dark birch grove, a very distant small Orthodox church silhouette integrated naturally into the horizon
Subject: noble Andalusian horse, authentic baroque neck and long mane, no tack
Style/medium: photorealistic high-end editorial equestrian photography, restrained quiet luxury
Composition/framing: vertical 4:5 feeling, horse placed slightly off-center with atmospheric negative space
Lighting/mood: low dawn light, cool charcoal shadows, muted old-gold highlights, natural film grain
Color palette: smoke gray, deep forest green, charcoal, muted antique gold
Constraints: realistic anatomy; Russian landscape subtle, not folkloric costume; no people; no text; no logos; no watermark
Avoid: fantasy horse, excessive ornaments, saturated colors, fake luxury, dramatic fire
```

## `assets/stallion-motion.jpg`

```text
Use case: photorealistic-natural
Asset type: premium horse catalog portrait
Primary request: full-body portrait of a powerful gray Andalusian PRE stallion in motion
Input images: Image 1: visual style reference only
Scene/backdrop: dark Russian meadow with long grass, low river haze, blurred birch forest
Subject: authentic gray Andalusian stallion with long flowing mane, collected trot, no tack
Style/medium: photorealistic cinematic equestrian editorial photograph
Composition/framing: portrait crop, entire horse visible, low camera angle, generous edge padding
Lighting/mood: overcast late afternoon with a thin warm rim light, quiet strength
Color palette: charcoal, silver, forest green, muted old gold
Materials/textures: natural coat, mane, damp grass, subtle film grain
Constraints: anatomically accurate; no people; no text; no logos; no watermark
Avoid: fantasy, glowing eyes, exaggerated muscles, arena, Spanish architecture
```

## `assets/farm-herd.jpg`

```text
Use case: photorealistic-natural
Asset type: premium horse farm lifestyle section banner
Primary request: a small herd of Andalusian horses moving across a broad Russian meadow
Input images: Image 1: visual style reference only
Scene/backdrop: river bend, dark pine and birch forest, expansive fields, a distant white Orthodox church with dark domes barely visible through evening mist
Subject: 5-7 Andalusian horses including gray mares and young horses, natural herd behavior
Style/medium: photorealistic cinematic landscape photography, European luxury editorial restraint
Composition/framing: wide panoramic 16:9 feeling, horses crossing from shadow into low warm light
Lighting/mood: late summer dusk, soft haze, quiet movement, subtle film grain
Color palette: deep forest, smoke gray, charcoal, restrained amber
Constraints: realistic anatomy and group scale; landscape and church feel authentically Russian; no people; no text; no logos; no watermark
Avoid: fantasy, fairy-tale glow, tourist postcard, saturated sunset, decorative frame
```

## `assets/bucefalo-cinematic-v2.webp`

```text
Use case: photorealistic-natural
Asset type: premium website breeding chapter photograph
Primary request: a new cinematic full-body portrait of Bucefalo XXXII in collected trot
Input images: Image 1: Bucefalo subject reference; Image 2: Yeguada MS hero style reference
Scene/backdrop: dark misty Russian meadow at dawn, subtle birch woodland and low river mist
Subject: mature gray Andalusian PRE stallion, silver dappled coat, baroque build, long mane, simple black bridle
Style/medium: photorealistic high-end equestrian editorial photography
Composition/framing: wide 3:2 landscape, full horse visible from ears to hooves, noble side profile
Lighting/mood: low-key directional rim light, forest-black shadows, restrained antique-gold highlights
Constraints: realistic anatomy and four legs; no rider; no saddle; no text; no logo; no watermark; soft dark edge falloff
Avoid: red fabric, arena signage, modern clutter, fantasy styling, overprocessed HDR
```

## `assets/hero-cinematic-v2.webp` и `assets/hero-cinematic-mobile-v2.webp`

Главный кадр. **Не перегенерировать и не заменять.** Утверждён заказчиком.
