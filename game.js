const STORAGE_KEY = "xinglin_player_state";
const difficultyCycle = [3, 3, 4, 4, 5, 3, 4, 5, 3, 4, 5, 3, 3, 4, 4, 5, 3, 4, 5, 3];
const timeByGrid = { 3: 180, 4: 240, 5: 300 };
const EPISODE_ASSET_VERSION = "20260525-compressed-ep-fix";
const STORY_ASSET_VERSION = "20260525-compressed-story";
const HERB_ASSET_VERSION = "20260525-compressed-herb";
const imageWidth = 1080;
const imageHeight = 1440;

const herbTests = [
  {
    id: "ch01_gancao",
    name: "甘草",
    subtitle: "草木残页 · 甘草",
    imageAsset: `img/episodes/mingyao/ch01-gancao.png?v=${HERB_ASSET_VERSION}`,
    range: [2, 2],
    forceAfterEpisode: 2,
    gridSize: 3,
    timeLimitSeconds: 90,
    summary: "味甘，常见于方中。古人常称其能调和诸药。",
    liananComment: "越常见的药，越要认得清。以后见到药铺里的甘草片，可别只当成甜味零嘴。"
  },
  {
    id: "ch01_shengjiang",
    name: "生姜",
    subtitle: "草木残页 · 生姜",
    imageAsset: `img/episodes/mingyao/ch01-shengjiang.png?v=${HERB_ASSET_VERSION}`,
    range: [6, 10],
    gridSize: 3,
    timeLimitSeconds: 90,
    summary: "辛温散寒，常见于厨房，也常见于药图。",
    liananComment: "越是寻常之物，越容易被轻看。认得它，才算真的开始看见草木。"
  },
  {
    id: "ch01_bohe",
    name: "薄荷",
    subtitle: "草木残页 · 薄荷",
    imageAsset: `img/episodes/mingyao/ch01-bohe.png?v=${HERB_ASSET_VERSION}`,
    range: [11, 15],
    gridSize: 3,
    timeLimitSeconds: 90,
    summary: "叶气清凉，图谱中常以枝叶纹路辨认。",
    liananComment: "清凉不只是入口的感觉，也藏在叶脉和花穗的样子里。"
  },
  {
    id: "ch01_jinyinhua",
    name: "金银花",
    subtitle: "草木残页 · 金银花",
    imageAsset: `img/episodes/mingyao/ch01-jinyinhua.png?v=${HERB_ASSET_VERSION}`,
    range: [16, 20],
    gridSize: 3,
    timeLimitSeconds: 90,
    summary: "花有黄白，藤蔓缠绕，是山野间很醒目的草木。",
    liananComment: "金银花一名，先看花色，再看藤叶。别只记名字，要记住它的样子。"
  }
];

const episodeSeeds = [
  ["药庐清晨", "杏林山药庐晨雾缭绕，贾济世趴在药案上睡眼惺忪。", "贾济世睡得正香，连青岚先生布置的晨课都忘在脑后。", "home", "先从画面边缘找起吧～"],
  ["偷懒背药", "贾济世躲在药柜后偷看小抄，只想把今日晨课混过去。", "他以为背熟几句药性就能蒙混过关，却没发现药柜后的抽屉已经松动。", "scroll", "这一回还是 3×3，先记住人物和药柜位置。"],
  ["莲安初现影", "药盏中有莲光轻轻一闪，像有谁在看着他。", "莲安的影子在药盏里晃过，可贾济世只顾着翻小抄，半点没有察觉。", "herb", "莲光是关键线索，拼图时留意画面中间。"],
  ["错认药性", "他把几味药材混在一起，自以为这样更快。", "寒热升降全被他搅乱，药灵们在药屉里急得直拍盖板。", "herb", "颜色相近的药材要看线条走向。"],
  ["药柜大乱", "药屉纷纷弹开，药材洒了一地，药庐里一片狼藉。", "这一乱，不只是药材落地，连等药的山民也被耽误了。", "mess", "5×5 会更碎，先拼外框。"],
  ["药灵惊醒", "小药灵们从药材中飞出，满脸惊慌。", "它们守着药性与药名，最怕有人把救人的东西当成儿戏。", "spirit", "关键剧情回用 3×3，快速看清冲突。"],
  ["一味逞能", "贾济世拍胸口保证自己能收拾好，手却越伸越乱。", "他越想证明自己，越不肯停下来认真分辨。", "hero", "先合并衣角、药箱、门框这些明显边。"],
  ["越收越乱", "他把药材放错药屉，药灵们急得团团转。", "错一味药，就可能错一条人命，莲安第一次对他皱起眉头。", "mess", "移动合并块时，会和目标范围整体交换。"],
  ["病人等药", "山民在药庐外等药，神情焦急。", "贾济世终于听见门外的咳声和催促，闯祸开始影响别人。", "patient", "3×3 用来推进情绪，拼完就看剧情。"],
  ["药方迟误", "因药材混乱，给病人的药迟迟配不齐。", "药童低声埋怨，药灵也不再替他遮掩。", "scroll", "相邻正确会自动合并，组内缝隙会消失。"],
  ["众人埋怨", "山民、药童、药灵都看向贾济世，药庐里安静得发沉。", "他第一次发现，自己的偷懒会让所有人一起承担后果。", "crowd", "一次移动可能从多边连锁合并。"],
  ["青岚归来", "青岚先生站在门口，衣袖带风，目光沉静。", "师傅没有高声责骂，药庐却比方才更安静。", "master", "这回很短，重点是青岚先生登场。"],
  ["药卷落地", "贾济世藏着的药卷从怀里滑落，啪地掉在地上。", "小抄摊开，所有人都知道他并没有真正用心学。", "scroll", "先找药卷边缘，能快速合并。"],
  ["师傅问心", "青岚先生没有立刻骂他，只问他为何学医。", "这个问题比责罚更重，贾济世一时答不上来。", "master", "人物面部和衣袖通常是稳定锚点。"],
  ["嘴硬辩解", "贾济世低头却不服气，仍小声替自己辩解。", "青岚先生听完，只让他看看门外等药的人。", "hero", "4×4 需要先建立两个以上小合并块。"],
  ["药灵控诉", "药灵们围成一圈，纷纷指出他的错。", "它们不是讨厌贾济世，而是不愿救人的药被轻慢。", "spirit", "5×5 先拼大色块，再拼细节。"],
  ["莲安现身", "莲安从莲花药盏中正式出现，抱着药谱落在案前。", "她奉青岚先生之命，记录贾济世下山后的每一次诊治。", "herb", "莲安登场，快速拼完看完整画面。"],
  ["下山之令", "青岚先生命他下山历练，不许再只在书里学医。", "贾济世要去人间看病，也要去看见病人背后的日子。", "mountain", "注意山门方向，整块移动更省步。"],
  ["空药箱", "贾济世打开药箱，里面只有病案册和药签。", "师傅收走了现成的方子，只留下让他认真观察的空白。", "box", "药箱直线很多，适合作为拼图参照。"],
  ["山门将启", "山门缓缓打开，远处人间烟火隐现。", "下山篇第一章结束。贾济世背起空药箱，莲安跟在他肩头，真正的历练开始了。", "gate", "最后一回回到 3×3，让剧情落点更清晰。"]
];

const palettes = [
  ["#355f4b", "#d9b86f", "#8f4b3f", "#f3ead7"],
  ["#2f6f55", "#8ab37f", "#d99745", "#fff3da"],
  ["#274a43", "#c88d41", "#6f8e73", "#f8edcf"],
  ["#3f6655", "#bd6f45", "#dfc16f", "#f6ead2"]
];

const story = [
  {
    pieceTitle: "下山篇",
    chapters: [
      {
        chapterId: "downhill_ch01",
        chapterTitle: "第一章：贾济世惹众怒",
        introComics: Array.from({ length: 5 }, (_, index) => `img/story/downhill/ch01/intro_${String(index + 1).padStart(3, "0")}.png?v=${STORY_ASSET_VERSION}`),
        outroComics: Array.from({ length: 5 }, (_, index) => `img/story/downhill/ch01/outro_${String(index + 1).padStart(3, "0")}.png?v=${STORY_ASSET_VERSION}`),
        episodes: episodeSeeds.map(([episodeTitle, introText, completeText, motif, tip], index) => ({
          episodeId: `downhill_ch01_ep${String(index + 1).padStart(3, "0")}`,
          pieceTitle: "下山篇",
          chapterTitle: "第一章：贾济世惹众怒",
          episodeNo: index + 1,
          episodeTitle,
          gridSize: difficultyCycle[index],
          imageRatio: "3:4",
          image: `downhill_ch01_ep${String(index + 1).padStart(3, "0")}.png`,
          imageAsset: `img/episodes/downhill/ch01/downhill_ch01_ep${String(index + 1).padStart(3, "0")}.png?v=${EPISODE_ASSET_VERSION}`,
          introText,
          completeText,
          dialogue: [{ speaker: "莲安", text: tip }],
          motif,
          palette: palettes[index % palettes.length],
          unlock: { type: "story", title: episodeTitle }
        }))
      }
    ]
  }
];

const defaultPlayerState = {
  version: 2,
  playerName: "贾济世",
  level: 3,
  title: "药童初学",
  currentPieceId: "downhill",
  currentChapterId: "downhill_ch01",
  currentEpisodeId: "downhill_ch01_ep001",
  completedEpisodeIds: [],
  episodeStats: {},
  settings: {
    musicEnabled: true,
    soundEnabled: true,
    vibrationEnabled: true
  },
  tasks: {
    usedHint: 0,
    mergeCount: 0,
    openedGallery: 0
  },
  herbTests: {
    introSeen: false,
    items: {}
  }
};

function loadPlayerState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return structuredClone(defaultPlayerState);
  try {
    const saved = JSON.parse(raw);
    if (saved.version !== defaultPlayerState.version) {
      return structuredClone(defaultPlayerState);
    }
    return {
      ...structuredClone(defaultPlayerState),
      ...saved,
      settings: { ...defaultPlayerState.settings, ...(saved.settings || {}) },
      tasks: { ...defaultPlayerState.tasks, ...(saved.tasks || {}) },
      herbTests: {
        ...defaultPlayerState.herbTests,
        ...(saved.herbTests || {}),
        items: { ...defaultPlayerState.herbTests.items, ...((saved.herbTests || {}).items || {}) }
      }
    };
  } catch {
    return structuredClone(defaultPlayerState);
  }
}

function savePlayerState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(playerState));
}

function allEpisodes() {
  return story[0].chapters[0].episodes;
}

function episodeIndexById(episodeId) {
  const index = allEpisodes().findIndex((episode) => episode.episodeId === episodeId);
  return index >= 0 ? index : 0;
}

function episodeIdByIndex(index) {
  return allEpisodes()[index]?.episodeId || allEpisodes()[0].episodeId;
}

const playerState = loadPlayerState();

const state = {
  pieceIndex: 0,
  chapterIndex: 0,
  episodeIndex: episodeIndexById(playerState.currentEpisodeId),
  mode: "story",
  imageUrl: "",
  tiles: [],
  groups: [],
  drag: null,
  boardWidth: 330,
  boardHeight: 440,
  tileWidth: 110,
  tileHeight: 146.67,
  remainingSeconds: 0,
  timeLimitSeconds: 0,
  timerId: null,
  dealTimers: [],
  startAfterDeal: false,
  memoryOpen: false,
  moveCount: 0,
  started: false,
  history: [],
  hintCount: 3,
  previewCount: 2,
  undoCount: 2,
  mergeGain: 0,
  toastTimer: null,
  victoryTimers: [],
  typeTimer: null,
  comic: null,
  galleryEpisodeIndex: 0,
  activeHerbTest: null,
  pendingNextEpisodeIndex: null,
  playedIntroChapterIds: new Set()
};

const homeScreen = document.getElementById("homeScreen");
const comicScreen = document.getElementById("comicScreen");
const mapScreen = document.getElementById("mapScreen");
const galleryScreen = document.getElementById("galleryScreen");
const taskScreen = document.getElementById("taskScreen");
const settingsScreen = document.getElementById("settingsScreen");
const gameScreen = document.getElementById("gameScreen");
const loadingScreen = document.getElementById("loadingScreen");
const loadingStoryImage = document.getElementById("loadingStoryImage");
const comicImage = document.getElementById("comicImage");
const comicTitle = document.getElementById("comicTitle");
const comicSubtitle = document.getElementById("comicSubtitle");
const comicDots = document.getElementById("comicDots");
const comicNextButton = document.getElementById("comicNextButton");
const comicSkipButton = document.getElementById("comicSkipButton");
const galleryBackButton = document.getElementById("galleryBackButton");
const galleryOverview = document.getElementById("galleryOverview");
const galleryReader = document.getElementById("galleryReader");
const galleryBottomNav = document.getElementById("galleryBottomNav");
const galleryChapterOneProgress = document.getElementById("galleryChapterOneProgress");
const storyChapterOneButton = document.getElementById("storyChapterOneButton");
const storyGalleryTab = document.getElementById("storyGalleryTab");
const galleryLockedButtons = document.querySelectorAll(".gallery-tab-locked, .gallery-chapter-locked");
const galleryReaderTitle = document.getElementById("galleryReaderTitle");
const galleryReaderImage = document.getElementById("galleryReaderImage");
const galleryReaderEpisodeName = document.getElementById("galleryReaderEpisodeName");
const galleryReaderCopy = document.getElementById("galleryReaderCopy");
const galleryPrevButton = document.getElementById("galleryPrevButton");
const galleryNextButton = document.getElementById("galleryNextButton");
const homeStart = document.getElementById("homeStart");
const homeProgressButton = document.getElementById("homeProgressButton");
const homeChapterButton = document.querySelector(".home-chapter");
const homeAlbumButton = document.querySelector(".home-album");
const homeTaskButton = document.querySelector(".home-task");
const homeSettingsButton = document.querySelector(".home-settings");
const mapBackButton = document.getElementById("mapBackButton");
const mapChapterOne = document.getElementById("mapChapterOne");
const lockedChapterButtons = document.querySelectorAll(".map-item:not(#mapChapterOne)");
const mapAlbumButton = document.querySelector(".map-nav-album");
const mapTaskButton = document.querySelector(".map-nav-task");
const mapSettingsButton = document.querySelector(".map-nav-settings");
const subBackButtons = document.querySelectorAll(".sub-back");
const navChapterButtons = document.querySelectorAll(".nav-chapters");
const navGalleryButtons = document.querySelectorAll(".nav-gallery");
const navTaskButtons = document.querySelectorAll(".nav-tasks");
const navSettingsButtons = document.querySelectorAll(".nav-settings");
const backHomeButton = document.getElementById("backHomeButton");
const board = document.getElementById("board");
const previewCanvas = document.getElementById("previewCanvas");
const pieceName = document.getElementById("pieceName");
const sceneCounter = document.getElementById("sceneCounter");
const gridLabel = document.getElementById("gridLabel");
const sceneTitle = document.getElementById("sceneTitle");
const sceneText = document.getElementById("sceneText");
const speakerName = document.getElementById("speakerName");
const storyButton = document.getElementById("storyButton");
const hintButton = document.getElementById("hintButton");
const memoryButton = document.getElementById("memoryButton");
const shuffleButton = document.getElementById("shuffleButton");
const undoButton = document.getElementById("undoButton");
const objective = document.getElementById("objective");
const timerText = document.getElementById("timerText");
const moveCount = document.getElementById("moveCount");
const mergeCount = document.getElementById("mergeCount");
const progressFill = document.getElementById("progressFill");
const completeOverlay = document.getElementById("completeOverlay");
const completeBadge = document.getElementById("completeBadge");
const completeTitle = document.getElementById("completeTitle");
const completeText = document.getElementById("completeText");
const nextButton = document.getElementById("nextButton");
const completeHomeButton = document.getElementById("completeHomeButton");
const chapterStrip = document.getElementById("chapterStrip");
const homeChapterText = document.getElementById("homeChapterText");
const homeEpisodeText = document.getElementById("homeEpisodeText");
const homeProgressText = document.getElementById("homeProgressText");
const mapProgressText = document.getElementById("mapProgressText");
const toast = document.getElementById("toast");
const musicToggle = document.getElementById("musicToggle");
const soundToggle = document.getElementById("soundToggle");
const vibrationToggle = document.getElementById("vibrationToggle");
const taskOne = document.getElementById("taskOne");
const taskHint = document.getElementById("taskHint");
const taskMerge = document.getElementById("taskMerge");
const taskGallery = document.getElementById("taskGallery");
const taskChapter = document.getElementById("taskChapter");

function currentPiece() {
  return story[state.pieceIndex];
}

function currentChapter() {
  return currentPiece().chapters[state.chapterIndex];
}

function currentEpisode() {
  return currentChapter().episodes[state.episodeIndex];
}

function currentPuzzleConfig() {
  return state.activeHerbTest || currentEpisode();
}

function currentCols() {
  return currentPuzzleConfig().gridSize;
}

function currentRows() {
  return currentPuzzleConfig().gridSize;
}

function currentTotal() {
  return currentCols() * currentRows();
}

function setupEpisode() {
  state.activeHerbTest = null;
  state.pendingNextEpisodeIndex = null;
  const episode = currentEpisode();
  stopTimer();
  drawEpisode(episode);
  completeBadge.textContent = "恭喜过关";
  pieceName.textContent = `${episode.pieceTitle} · 第一章`;
  sceneCounter.textContent = `第 ${String(episode.episodeNo).padStart(2, "0")} 回`;
  gridLabel.textContent = `${episode.gridSize}×${episode.gridSize}`;
  sceneTitle.textContent = episode.episodeTitle;
  speakerName.textContent = episode.dialogue[0].speaker;
  sceneText.textContent = episode.dialogue[0].text;
  objective.textContent = "阅读剧情，开始拼图";
  completeOverlay.hidden = true;
  completeOverlay.classList.remove("is-glowing", "is-story", "is-actions-ready");
  state.mode = "story";
  state.memoryOpen = false;
  state.moveCount = 0;
  state.history = [];
  state.hintCount = 3;
  state.previewCount = 2;
  state.undoCount = 2;
  state.mergeGain = 0;
  renderMoves();
  createPuzzle();
  renderChapterStrip();
  updatePersistentUi();
}

function setupHerbTest(herb) {
  stopTimer();
  clearDealTimers();
  clearVictoryTimers();
  state.activeHerbTest = herb;
  state.imageUrl = assetUrl(herb.imageAsset);
  pieceName.textContent = "莲安小考";
  sceneCounter.textContent = "草木残页";
  gridLabel.textContent = `${herb.gridSize}×${herb.gridSize}`;
  sceneTitle.textContent = herb.name;
  speakerName.textContent = "莲安";
  sceneText.textContent = `修复这页${herb.name}残图，完成后收入药典。`;
  objective.textContent = "莲安小考开始";
  completeBadge.textContent = "莲安小考";
  completeOverlay.hidden = true;
  completeOverlay.classList.remove("is-glowing", "is-story", "is-actions-ready");
  state.mode = "story";
  state.memoryOpen = false;
  state.moveCount = 0;
  state.history = [];
  state.hintCount = 3;
  state.previewCount = 1;
  state.undoCount = 1;
  state.mergeGain = 0;
  renderMoves();
  createPuzzle();
}

function drawEpisode(episode) {
  const ctx = previewCanvas.getContext("2d");
  const [deep, mid, accent, paper] = episode.palette;
  ctx.clearRect(0, 0, imageWidth, imageHeight);
  ctx.fillStyle = paper;
  ctx.fillRect(0, 0, imageWidth, imageHeight);

  ctx.fillStyle = deep;
  ctx.fillRect(0, 0, imageWidth, 150);
  ctx.fillStyle = accent;
  ctx.fillRect(0, imageHeight - 150, imageWidth, 150);
  ctx.fillStyle = "rgba(255,255,255,0.25)";
  for (let i = 0; i < 16; i += 1) {
    ctx.beginPath();
    ctx.arc(75 + i * 66, 78, 18 + (i % 4) * 5, 0, Math.PI * 2);
    ctx.fill();
  }

  drawBackground(ctx, episode.motif, episode.palette);
  drawCharacters(ctx, episode.motif, episode.palette);

  ctx.fillStyle = "rgba(255,250,240,0.9)";
  roundRect(ctx, 78, 1128, 924, 138, 14);
  ctx.fill();
  ctx.fillStyle = deep;
  ctx.font = "800 56px PingFang SC, Microsoft YaHei, sans-serif";
  ctx.fillText(episode.episodeTitle, 118, 1205);
  ctx.font = "500 30px PingFang SC, Microsoft YaHei, sans-serif";
  ctx.fillStyle = "#4d5b52";
  ctx.fillText(`${episode.pieceTitle} · ${episode.chapterTitle} · 第 ${episode.episodeNo} 回`, 118, 1248);
  if (episode.imageAsset) {
    state.imageUrl = assetUrl(episode.imageAsset);
    const art = new Image();
    art.onload = () => {
      ctx.clearRect(0, 0, imageWidth, imageHeight);
      ctx.drawImage(art, 0, 0, imageWidth, imageHeight);
    };
    art.onerror = () => {
      const fallback = assetUrl("img/tu1.png");
      state.imageUrl = fallback;
      const fallbackArt = new Image();
      fallbackArt.onload = () => {
        ctx.clearRect(0, 0, imageWidth, imageHeight);
        ctx.drawImage(fallbackArt, 0, 0, imageWidth, imageHeight);
        for (const tile of state.tiles) {
          tile.el.style.backgroundImage = `url(${fallback})`;
        }
      };
      fallbackArt.src = fallback;
    };
    art.src = state.imageUrl;
  } else {
    state.imageUrl = previewCanvas.toDataURL("image/png");
  }
}

function assetUrl(path) {
  if (/^(https?:|data:|\/)/.test(path)) return path;
  return new URL(path.replace(/^\.\//, ""), document.baseURI).href;
}

function showInitialLoading() {
  setScreen("home");
  updatePersistentUi();
  const randomIndex = Math.floor(Math.random() * allEpisodes().length);
  const episode = allEpisodes()[randomIndex];
  loadingStoryImage.src = assetUrl(episode.imageAsset);
  loadingStoryImage.alt = `加载画面：${episode.episodeTitle}`;
  window.setTimeout(() => {
    loadingScreen.classList.add("is-leaving");
  }, 1250);
  window.setTimeout(() => {
    loadingScreen.classList.add("is-hidden");
    loadingScreen.classList.remove("is-leaving");
    loadingScreen.remove();
  }, 1650);
}

function drawBackground(ctx, motif, palette) {
  const [deep, mid, accent] = palette;
  ctx.fillStyle = "rgba(255,255,255,0.42)";
  ctx.fillRect(0, 150, imageWidth, imageHeight - 300);

  if (["mountain", "gate", "master"].includes(motif)) {
    mountain(ctx, -20, 780, 430, deep);
    mountain(ctx, 260, 800, 520, mid);
    mountain(ctx, 640, 760, 410, accent);
    sun(ctx, 860, 280, 78, accent);
    if (motif === "gate") gate(ctx, 338, 570, deep, accent);
  } else if (["herb", "spirit"].includes(motif)) {
    herbSprig(ctx, 180, 850, 1.8, deep);
    herbSprig(ctx, 800, 780, 1.45, mid);
    lotus(ctx, 540, 440, accent, deep);
  } else if (["scroll", "box"].includes(motif)) {
    scroll(ctx, 220, 300, accent);
    if (motif === "box") medicineBox(ctx, 350, 700, deep, accent);
  } else if (["patient", "crowd"].includes(motif)) {
    house(ctx, 110, 680, deep, accent);
    house(ctx, 690, 720, mid, accent);
    herbSprig(ctx, 850, 920, 1.1, deep);
  } else {
    house(ctx, 140, 650, deep, accent);
    house(ctx, 470, 710, mid, accent);
    house(ctx, 770, 680, deep, accent);
  }
}

function drawCharacters(ctx, motif, palette) {
  const [deep, mid, accent, paper] = palette;
  person(ctx, 500, 610, "#4f6f59", "#23352c", "贾");
  if (["herb", "spirit", "gate"].includes(motif)) person(ctx, 700, 590, "#d8a14f", "#6b3f33", "莲");
  if (["master", "gate", "mountain"].includes(motif)) person(ctx, 320, 585, "#6f7b72", "#26302b", "师");
  if (["patient", "crowd"].includes(motif)) person(ctx, 300, 700, paper, deep, "民");
  if (motif === "mess") {
    for (let i = 0; i < 8; i += 1) herbLeaf(ctx, 220 + i * 90, 810 + (i % 3) * 42, i % 2 ? mid : deep);
  }
  if (motif === "hero") sun(ctx, 760, 420, 42, accent);
}

function person(ctx, x, y, robe, ink, mark) {
  ctx.fillStyle = ink;
  ctx.beginPath();
  ctx.arc(x, y - 108, 52, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#f0c79d";
  ctx.beginPath();
  ctx.arc(x, y - 92, 42, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = robe;
  roundRect(ctx, x - 68, y - 38, 136, 205, 42);
  ctx.fill();
  ctx.fillStyle = "rgba(255,250,240,0.94)";
  ctx.font = "800 42px PingFang SC, Microsoft YaHei, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(mark, x, y + 70);
  ctx.textAlign = "start";
}

function mountain(ctx, x, base, width, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, base);
  ctx.lineTo(x + width * 0.46, base - width * 0.72);
  ctx.lineTo(x + width, base);
  ctx.closePath();
  ctx.fill();
}

function sun(ctx, x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

function herbSprig(ctx, x, y, scale, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 10 * scale;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x + 34 * scale, y - 170 * scale, x - 18 * scale, y - 290 * scale, x + 72 * scale, y - 420 * scale);
  ctx.stroke();
  for (let i = 0; i < 8; i += 1) {
    herbLeaf(ctx, x + (i % 2 ? -48 : 52) * scale, y - 75 * scale - i * 48 * scale, color, scale);
  }
}

function herbLeaf(ctx, x, y, color, scale = 1) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x, y, 44 * scale, 20 * scale, x % 2 ? -0.55 : 0.55, 0, Math.PI * 2);
  ctx.fill();
}

function lotus(ctx, x, y, color, ink) {
  ctx.fillStyle = color;
  for (let i = 0; i < 8; i += 1) {
    ctx.beginPath();
    ctx.ellipse(x, y, 38, 96, (Math.PI / 8) * i, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = ink;
  ctx.beginPath();
  ctx.arc(x, y, 46, 0, Math.PI * 2);
  ctx.fill();
}

function scroll(ctx, x, y, color) {
  ctx.fillStyle = "rgba(255,250,240,0.94)";
  roundRect(ctx, x, y, 640, 330, 14);
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 10;
  for (let i = 0; i < 6; i += 1) {
    ctx.beginPath();
    ctx.moveTo(x + 72, y + 70 + i * 43);
    ctx.lineTo(x + 565, y + 70 + i * 43);
    ctx.stroke();
  }
}

function house(ctx, x, y, wall, roof) {
  ctx.fillStyle = wall;
  ctx.fillRect(x, y, 190, 145);
  ctx.fillStyle = roof;
  ctx.beginPath();
  ctx.moveTo(x - 28, y);
  ctx.lineTo(x + 95, y - 92);
  ctx.lineTo(x + 218, y);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgba(255,250,240,0.84)";
  ctx.fillRect(x + 65, y + 55, 58, 90);
}

function medicineBox(ctx, x, y, body, edge) {
  ctx.fillStyle = body;
  roundRect(ctx, x, y, 360, 260, 18);
  ctx.fill();
  ctx.strokeStyle = edge;
  ctx.lineWidth = 18;
  ctx.strokeRect(x + 34, y + 54, 292, 160);
}

function gate(ctx, x, y, body, accent) {
  ctx.fillStyle = body;
  ctx.fillRect(x, y, 70, 360);
  ctx.fillRect(x + 330, y, 70, 360);
  ctx.fillStyle = accent;
  ctx.fillRect(x - 35, y - 35, 470, 62);
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

function createPuzzle(options = {}) {
  const shouldDeal = options.deal === true;
  const cols = currentCols();
  const rows = currentRows();
  clearDealTimers();
  board.innerHTML = "";
  state.tiles = [];
  state.groups = [];
  state.drag = null;
  state.boardWidth = board.clientWidth || 812;
  state.boardHeight = board.clientHeight || 1012;
  state.tileWidth = state.boardWidth / cols;
  state.tileHeight = state.boardHeight / rows;
  board.parentElement.style.setProperty("--cell-width", `${state.tileWidth}px`);
  board.parentElement.style.setProperty("--cell-height", `${state.tileHeight}px`);
  board.parentElement.style.setProperty("--seam", `${cols >= 5 ? 2 : 3}px`);
  resetTimer();

  if (shouldDeal) {
    state.mode = "dealing";
    state.startAfterDeal = false;
    objective.textContent = "莲安正在发牌";
  }

  const positions = shuffledPositions(cols, rows);
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const id = row * cols + col;
      const pos = positions[id];
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.dataset.id = String(id);
      tile.style.width = `${state.tileWidth}px`;
      tile.style.height = `${state.tileHeight}px`;
      if (shouldDeal) {
        const pileX = state.boardWidth / 2 - state.tileWidth / 2;
        const pileY = -state.tileHeight * 1.35;
        tile.classList.add("card-deal", "card-back");
        tile.style.setProperty("--deal-x", `${pileX - pos.col * state.tileWidth}px`);
        tile.style.setProperty("--deal-y", `${pileY - pos.row * state.tileHeight}px`);
        tile.style.setProperty("--deal-delay", `${id * 44}ms`);
      }
      tile.style.backgroundImage = `url(${state.imageUrl})`;
      tile.style.backgroundSize = `${state.boardWidth}px ${state.boardHeight}px`;
      tile.style.backgroundPosition = `${-col * state.tileWidth}px ${-row * state.tileHeight}px`;
      tile.addEventListener("pointerdown", onPointerDown);
      tile.addEventListener("mousedown", onPointerDown);
      tile.addEventListener("touchstart", onPointerDown, { passive: false });
      board.appendChild(tile);
      state.tiles.push({
        id,
        correctRow: row,
        correctCol: col,
        posRow: pos.row,
        posCol: pos.col,
        groupId: id,
        el: tile
      });
    }
  }

  computeGroups();
  renderTiles();
  updateProgress();
  if (shouldDeal) playDealAnimation();
}

function shuffledPositions(cols, rows) {
  const cells = [];
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) cells.push({ row, col });
  }
  let attempts = 0;
  do {
    cells.sort(() => Math.random() - 0.5);
    attempts += 1;
  } while (
    attempts < 300 &&
    (cells.every((cell, index) => cell.row === Math.floor(index / cols) && cell.col === index % cols) ||
      hasInitialMerge(cells, cols))
  );
  return cells;
}

function hasInitialMerge(cells, cols) {
  for (let idA = 0; idA < cells.length; idA += 1) {
    for (let idB = idA + 1; idB < cells.length; idB += 1) {
      const posA = cells[idA];
      const posB = cells[idB];
      const boardDeltaRow = posB.row - posA.row;
      const boardDeltaCol = posB.col - posA.col;
      if (Math.abs(boardDeltaRow) + Math.abs(boardDeltaCol) !== 1) continue;
      const correctDeltaRow = Math.floor(idB / cols) - Math.floor(idA / cols);
      const correctDeltaCol = (idB % cols) - (idA % cols);
      if (boardDeltaRow === correctDeltaRow && boardDeltaCol === correctDeltaCol) return true;
    }
  }
  return false;
}

function playDealAnimation() {
  clearDealTimers();
  const total = state.tiles.length;
  const dealEndMs = total * 44 + 440;
  const revealEndMs = dealEndMs + 620;
  state.dealTimers.push(window.setTimeout(() => {
    for (const tile of state.tiles) tile.el.classList.add("is-flying");
  }, 40));
  state.dealTimers.push(window.setTimeout(() => {
    for (const tile of state.tiles) tile.el.classList.add("is-revealed");
    objective.textContent = "翻开卡牌，准备拼图";
  }, dealEndMs));
  state.dealTimers.push(window.setTimeout(() => {
    for (const tile of state.tiles) {
      tile.el.classList.remove("card-deal", "card-back", "is-flying", "is-revealed");
      tile.el.style.removeProperty("--deal-x");
      tile.el.style.removeProperty("--deal-y");
      tile.el.style.removeProperty("--deal-delay");
    }
    finishDealAnimation();
  }, revealEndMs));
}

function finishDealAnimation() {
  if (state.mode !== "dealing") return;
  if (state.startAfterDeal) {
    state.mode = "puzzle";
    sceneText.textContent = currentEpisode().introText;
    objective.textContent = "拖动拼块，与目标区域交换";
    startTimer();
  } else {
    state.mode = "story";
    objective.textContent = "阅读剧情，开始拼图";
  }
}

function clearDealTimers() {
  for (const timer of state.dealTimers) window.clearTimeout(timer);
  state.dealTimers = [];
  state.startAfterDeal = false;
}

function resetTimer() {
  state.timeLimitSeconds = state.activeHerbTest?.timeLimitSeconds || timeByGrid[currentEpisode().gridSize] || 300;
  state.remainingSeconds = state.timeLimitSeconds;
  renderTimer();
}

function startTimer() {
  stopTimer();
  state.timerId = window.setInterval(() => {
    if (state.mode !== "puzzle" && state.mode !== "preview") return;
    state.remainingSeconds -= 1;
    renderTimer();
    if (state.remainingSeconds <= 0) failLevel();
  }, 1000);
}

function stopTimer() {
  if (state.timerId) window.clearInterval(state.timerId);
  state.timerId = null;
}

function renderTimer() {
  timerText.textContent = formatTime(state.remainingSeconds);
}

function formatTime(seconds) {
  const minutes = Math.floor(Math.max(0, seconds) / 60);
  const rest = Math.max(0, seconds) % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

function failLevel() {
  stopTimer();
  clearVictoryTimers();
  completeOverlay.classList.remove("is-glowing", "is-story", "is-actions-ready");
  if (state.activeHerbTest) {
    state.mode = "herbFailed";
    objective.textContent = "小考暂未完成";
    completeBadge.textContent = "时间到了";
    completeTitle.textContent = "这页残图暂未修复";
    completeText.textContent = "莲安：“没关系，小考不误正事。等你想起来时，可以在章节回顾里再试。”";
    completeHomeButton.hidden = false;
    nextButton.hidden = false;
    completeHomeButton.textContent = "跳过并继续";
    nextButton.textContent = "重新挑战";
    completeOverlay.hidden = false;
    return;
  }
  state.mode = "failed";
  objective.textContent = "时间耗尽，重洗后再试";
  completeBadge.textContent = "时间到了";
  completeTitle.textContent = "莲安提醒";
  completeText.textContent = "先记住画面边缘和人物位置，再拖动碎片与目标格交换。正确相邻后会自动合并。";
  completeHomeButton.hidden = true;
  nextButton.textContent = "重新挑战";
  completeOverlay.hidden = false;
}

function renderTiles() {
  for (const tile of state.tiles) {
    tile.el.style.left = `${tile.posCol * state.tileWidth}px`;
    tile.el.style.top = `${tile.posRow * state.tileHeight}px`;
    tile.el.style.zIndex = String(tile.groupId === state.drag?.groupId ? 50 : groupById(tile.groupId).length);
    tile.el.classList.toggle("locked", groupById(tile.groupId).length > 1);
    applyTileSeams(tile);
  }
}

function applyTileSeams(tile) {
  const top = tileAt(tile.posRow - 1, tile.posCol);
  const right = tileAt(tile.posRow, tile.posCol + 1);
  const bottom = tileAt(tile.posRow + 1, tile.posCol);
  const left = tileAt(tile.posRow, tile.posCol - 1);
  tile.el.classList.toggle("no-top", top?.groupId === tile.groupId);
  tile.el.classList.toggle("no-right", right?.groupId === tile.groupId);
  tile.el.classList.toggle("no-bottom", bottom?.groupId === tile.groupId);
  tile.el.classList.toggle("no-left", left?.groupId === tile.groupId);
}

function computeGroups() {
  const visited = new Set();
  let groupId = 0;
  state.groups = [];

  for (const tile of state.tiles) {
    if (visited.has(tile.id)) continue;
    const group = [];
    const queue = [tile];
    visited.add(tile.id);
    tile.groupId = groupId;

    while (queue.length) {
      const current = queue.shift();
      group.push(current.id);
      for (const other of state.tiles) {
        if (visited.has(other.id) || !isMergedNeighbor(current, other)) continue;
        visited.add(other.id);
        other.groupId = groupId;
        queue.push(other);
      }
    }

    state.groups.push(group);
    groupId += 1;
  }
}

function isMergedNeighbor(a, b) {
  const boardDeltaRow = b.posRow - a.posRow;
  const boardDeltaCol = b.posCol - a.posCol;
  if (Math.abs(boardDeltaRow) + Math.abs(boardDeltaCol) !== 1) return false;
  return b.correctRow - a.correctRow === boardDeltaRow && b.correctCol - a.correctCol === boardDeltaCol;
}

function groupById(groupId) {
  return state.groups[groupId] || [];
}

function tilesInGroup(groupId) {
  const ids = new Set(groupById(groupId));
  return state.tiles.filter((tile) => ids.has(tile.id));
}

function tileAt(row, col) {
  return state.tiles.find((tile) => tile.posRow === row && tile.posCol === col);
}

function onPointerDown(event) {
  if (state.mode !== "puzzle" || state.drag) return;
  event.preventDefault();
  const tile = state.tiles.find((item) => item.id === Number(event.currentTarget.dataset.id));
  const point = getBoardPoint(event);
  const members = tilesInGroup(tile.groupId);
  state.drag = {
    groupId: tile.groupId,
    anchorId: tile.id,
    startX: point.x,
    startY: point.y,
    currentX: 0,
    currentY: 0,
    sourceCells: members.map((member) => ({ row: member.posRow, col: member.posCol })),
    targetCells: []
  };
  for (const member of members) member.el.classList.add("dragging");
  if (event.pointerId !== undefined && event.currentTarget.setPointerCapture) {
    event.currentTarget.setPointerCapture(event.pointerId);
  }
}

function onPointerMove(event) {
  if (!state.drag) return;
  event.preventDefault();
  const point = getBoardPoint(event);
  state.drag.currentX = point.x - state.drag.startX;
  state.drag.currentY = point.y - state.drag.startY;
  const target = cellFromPoint(point.x, point.y);
  state.drag.targetCells = getDestinationCells(target.row, target.col);
  clearTargets();
  for (const cell of state.drag.targetCells) {
    const tile = tileAt(cell.row, cell.col);
    if (tile && tile.groupId !== state.drag.groupId) tile.el.classList.add("target");
  }
  for (const tile of tilesInGroup(state.drag.groupId)) {
    tile.el.style.transform = `translate(${state.drag.currentX}px, ${state.drag.currentY}px)`;
  }
}

function onPointerUp(event) {
  if (!state.drag) return;
  event.preventDefault();
  const point = getBoardPoint(event);
  const target = cellFromPoint(point.x, point.y);
  const destination = getDestinationCells(target.row, target.col);
  const draggedTiles = tilesInGroup(state.drag.groupId);
  const groupsBefore = state.groups.length;

  if (isValidSwap(destination)) {
    pushHistory();
    swapGroup(destination);
    state.moveCount += 1;
    renderMoves();
  }
  for (const tile of draggedTiles) {
    tile.el.classList.remove("dragging");
    tile.el.style.transform = "";
  }
  clearTargets();
  state.drag = null;
  computeGroups();
  const gained = Math.max(0, groupsBefore - state.groups.length);
  if (gained) {
    state.mergeGain += gained;
    playerState.tasks.mergeCount = (playerState.tasks.mergeCount || 0) + gained;
    savePlayerState();
  }
  renderTiles();
  updateProgress();
  checkComplete();
}

function pushHistory() {
  state.history.push(state.tiles.map((tile) => ({
    id: tile.id,
    posRow: tile.posRow,
    posCol: tile.posCol
  })));
  if (state.history.length > 20) state.history.shift();
}

function undoMove() {
  if (state.mode !== "puzzle" || !state.history.length) return;
  if (state.undoCount <= 0) {
    showToast("撤回次数不足");
    return;
  }
  const snapshot = state.history.pop();
  for (const saved of snapshot) {
    const tile = state.tiles.find((item) => item.id === saved.id);
    tile.posRow = saved.posRow;
    tile.posCol = saved.posCol;
  }
  state.moveCount = Math.max(0, state.moveCount - 1);
  state.undoCount -= 1;
  renderMoves();
  computeGroups();
  renderTiles();
  updateProgress();
}

function addTime() {
  if (state.mode !== "puzzle" && state.mode !== "preview") {
    showToast("拼图开始后才能加时");
    return;
  }
  state.remainingSeconds += 60;
  renderTimer();
  showToast("已加时 1 分钟");
}

function getBoardPoint(event) {
  const touch = event.touches?.[0] || event.changedTouches?.[0];
  const rect = board.getBoundingClientRect();
  return {
    x: (touch ? touch.clientX : event.clientX) - rect.left,
    y: (touch ? touch.clientY : event.clientY) - rect.top
  };
}

function cellFromPoint(x, y) {
  return {
    row: Math.min(currentRows() - 1, Math.max(0, Math.floor(y / state.tileHeight))),
    col: Math.min(currentCols() - 1, Math.max(0, Math.floor(x / state.tileWidth)))
  };
}

function getDestinationCells(anchorRow, anchorCol) {
  const anchor = state.tiles.find((tile) => tile.id === state.drag.anchorId);
  return tilesInGroup(state.drag.groupId).map((tile) => ({
    row: anchorRow + tile.posRow - anchor.posRow,
    col: anchorCol + tile.posCol - anchor.posCol
  }));
}

function isValidSwap(destination) {
  const sourceKeys = new Set(state.drag.sourceCells.map(cellKey));
  if (destination.some((cell) => cell.row < 0 || cell.col < 0 || cell.row >= currentRows() || cell.col >= currentCols())) return false;
  const destinationKeys = new Set(destination.map(cellKey));
  if (destinationKeys.size !== destination.length) return false;
  if (destination.length !== state.drag.sourceCells.length) return false;
  if (destination.every((cell) => sourceKeys.has(cellKey(cell)))) return false;
  return true;
}

function swapGroup(destination) {
  const dragged = tilesInGroup(state.drag.groupId);
  const source = state.drag.sourceCells;
  const sourceKeys = new Set(source.map(cellKey));
  const destinationKeys = new Set(destination.map(cellKey));
  const draggedById = new Set(dragged.map((tile) => tile.id));
  const draggedMoves = new Map(dragged.map((tile, index) => [tile.id, destination[index]]));
  const sourceVacated = source.filter((cell) => !destinationKeys.has(cellKey(cell)));
  const destinationIncoming = destination.filter((cell) => !sourceKeys.has(cellKey(cell)));
  const incomingToSource = new Map(destinationIncoming.map((cell, index) => [cellKey(cell), sourceVacated[index]]));

  for (const tile of state.tiles) {
    if (draggedById.has(tile.id)) {
      const next = draggedMoves.get(tile.id);
      tile.posRow = next.row;
      tile.posCol = next.col;
      continue;
    }

    const key = cellKey({ row: tile.posRow, col: tile.posCol });
    if (incomingToSource.has(key)) {
      const next = incomingToSource.get(key);
      tile.posRow = next.row;
      tile.posCol = next.col;
    }
  }

  for (const tile of dragged) tile.el.style.transform = "";
}

function cellKey(cell) {
  return `${cell.row}:${cell.col}`;
}

function clearTargets() {
  for (const tile of state.tiles) tile.el.classList.remove("target");
}

function updateProgress() {
  const total = currentTotal();
  const largest = Math.max(...state.groups.map((group) => group.length));
  mergeCount.textContent = `${largest} / ${total}`;
  progressFill.style.width = `${(largest / total) * 100}%`;
}

function checkComplete() {
  if (state.mode === "complete") return;
  const total = currentTotal();
  const allGrouped = state.groups.length === 1 && state.groups[0].length === total;
  const allInCorrectPosition = state.tiles.every((tile) => tile.posRow === tile.correctRow && tile.posCol === tile.correctCol);
  if (!allGrouped && !allInCorrectPosition) return;
  if (state.activeHerbTest) {
    completeHerbTest();
    return;
  }
  const episode = currentEpisode();
  stopTimer();
  state.mode = "complete";
  sceneText.textContent = episode.completeText;
  objective.textContent = "本回已完成";
  completeBadge.textContent = "恭喜过关";
  completeTitle.textContent = episode.episodeTitle;
  completeText.textContent = "";
  const usedSeconds = Math.max(0, state.timeLimitSeconds - state.remainingSeconds);
  completeHomeButton.hidden = true;
  nextButton.hidden = true;
  completeHomeButton.textContent = hasPreviousEpisode() ? "上一关" : "回首页";
  nextButton.textContent = hasNextEpisode() ? "下一关" : "看终章";
  completeEpisode(episode.episodeId, state.moveCount, usedSeconds);
  completeOverlay.hidden = false;
  runVictorySequence(episode.completeText);
}

function completeHerbTest() {
  const herb = state.activeHerbTest;
  stopTimer();
  state.mode = "herbComplete";
  objective.textContent = "药图修复完成";
  completeBadge.textContent = "药图修复完成";
  completeTitle.textContent = `${herb.name}已收入药典`;
  completeText.textContent = "";
  markHerbTest(herb.id, "repaired");
  completeHomeButton.hidden = true;
  nextButton.hidden = true;
  nextButton.textContent = "继续主线";
  completeOverlay.hidden = false;
  runVictorySequence(`${herb.name}\n${herb.summary}\n莲安：“${herb.liananComment}”\n获得：药典条目 · ${herb.name}，草木印记 +1`);
}

function runVictorySequence(text) {
  clearVictoryTimers();
  completeOverlay.classList.remove("is-story", "is-actions-ready");
  completeOverlay.classList.add("is-glowing");
  state.victoryTimers.push(window.setTimeout(() => {
    completeOverlay.classList.add("is-story");
  }, 650));
  state.victoryTimers.push(window.setTimeout(() => {
    typeStoryText(text, () => {
      completeOverlay.classList.add("is-actions-ready");
      completeHomeButton.hidden = state.mode === "herbComplete";
      nextButton.hidden = false;
    });
  }, 1050));
}

function typeStoryText(text, onDone) {
  completeText.textContent = "";
  let index = 0;
  const chars = Array.from(text);
  function tick() {
    index += 1;
    completeText.textContent = chars.slice(0, index).join("");
    if (index >= chars.length) {
      state.typeTimer = null;
      onDone();
      return;
    }
    state.typeTimer = window.setTimeout(tick, 34);
  }
  tick();
}

function clearVictoryTimers() {
  for (const timer of state.victoryTimers) window.clearTimeout(timer);
  state.victoryTimers = [];
  if (state.typeTimer) {
    window.clearTimeout(state.typeTimer);
    state.typeTimer = null;
  }
}

function herbTestState(id) {
  return playerState.herbTests.items[id] || { status: "new" };
}

function markHerbTest(id, status) {
  playerState.herbTests.items[id] = {
    ...(playerState.herbTests.items[id] || {}),
    status,
    updatedAt: new Date().toISOString()
  };
  savePlayerState();
}

function findTriggeredHerbTest(episodeNo) {
  for (const herb of herbTests) {
    const [start, end] = herb.range;
    if (episodeNo < start || episodeNo > end) continue;
    const status = herbTestState(herb.id).status;
    if (status === "discovered" || status === "repaired") continue;
    if (herb.forceAfterEpisode === episodeNo) return herb;
    const mustTrigger = episodeNo === end;
    if (mustTrigger || Math.random() < 0.3) return herb;
  }
  return null;
}

function drawPreviewImage(imageUrl) {
  const ctx = previewCanvas.getContext("2d");
  const image = new Image();
  image.onload = () => {
    ctx.clearRect(0, 0, imageWidth, imageHeight);
    ctx.drawImage(image, 0, 0, imageWidth, imageHeight);
  };
  image.src = assetUrl(imageUrl);
}

function maybeOfferHerbTest() {
  const herb = findTriggeredHerbTest(currentEpisode().episodeNo);
  if (!herb) {
    continueMainAfterHerbTest();
    return;
  }
  state.activeHerbTest = herb;
  markHerbTest(herb.id, "discovered");
  showHerbPrompt(herb);
}

function showHerbPrompt(herb) {
  stopTimer();
  clearVictoryTimers();
  drawPreviewImage(herb.imageAsset);
  state.mode = "herbPrompt";
  completeOverlay.classList.remove("is-glowing");
  completeOverlay.classList.add("is-story", "is-actions-ready");
  completeBadge.textContent = playerState.herbTests.introSeen ? "莲安小考" : "莲安小考开启";
  completeTitle.textContent = playerState.herbTests.introSeen ? herb.subtitle : "草木残页";
  completeText.textContent = playerState.herbTests.introSeen
    ? `药箱里的残页亮起来了。\n发现一页新的草药残页：${herb.name}。\n完成后可收入药典，也可以跳过本次。`
    : `莲安从药箱底拖出一卷发黄的古籍残页，里面夹着几片干枯草叶。\n“青岚先生说，路上遇到合适的草木，就让我考考你。”\n莲安小考是随机支线，不影响主线；完成后可修复一页草药图谱，并收入药典。`;
  playerState.herbTests.introSeen = true;
  savePlayerState();
  completeHomeButton.hidden = false;
  nextButton.hidden = false;
  completeHomeButton.textContent = "跳过本次";
  nextButton.textContent = "开始小考";
  completeOverlay.hidden = false;
}

function startHerbTest() {
  if (!state.activeHerbTest) return;
  setupHerbTest(state.activeHerbTest);
  showGame();
  startPuzzle();
}

function skipHerbTest() {
  state.activeHerbTest = null;
  completeOverlay.hidden = true;
  continueMainAfterHerbTest();
}

function retryHerbTest() {
  if (!state.activeHerbTest) return;
  completeOverlay.hidden = true;
  setupHerbTest(state.activeHerbTest);
  showGame();
  startPuzzle();
}

function continueMainAfterHerbTest() {
  const nextIndex = state.pendingNextEpisodeIndex;
  state.activeHerbTest = null;
  state.pendingNextEpisodeIndex = null;
  completeOverlay.hidden = true;
  if (nextIndex == null || nextIndex >= currentChapter().episodes.length) {
    playChapterComic("outro", showHome);
    return;
  }
  state.episodeIndex = nextIndex;
  playerState.currentEpisodeId = episodeIdByIndex(state.episodeIndex);
  savePlayerState();
  openPuzzleDirect();
}

function playChapterComic(type, onDone) {
  const chapter = currentChapter();
  const frames = type === "outro" ? chapter.outroComics : chapter.introComics;
  if (!frames?.length) {
    onDone();
    return;
  }
  stopTimer();
  clearDealTimers();
  clearVictoryTimers();
  state.comic = {
    type,
    frames,
    index: 0,
    onDone
  };
  comicTitle.textContent = type === "outro" ? "本章终幕" : "章节过场";
  comicSubtitle.textContent = `${currentPiece().pieceTitle} · ${chapter.chapterTitle}`;
  renderComicFrame();
  setScreen("comic");
}

function renderComicFrame() {
  if (!state.comic) return;
  const { frames, index } = state.comic;
  comicImage.classList.remove("is-active");
  comicImage.src = assetUrl(frames[index]);
  comicImage.alt = `${comicTitle.textContent} ${index + 1}`;
  comicDots.innerHTML = "";
  frames.forEach((_, dotIndex) => {
    const dot = document.createElement("span");
    dot.className = dotIndex === index ? "active" : "";
    comicDots.appendChild(dot);
  });
  comicNextButton.textContent = index === frames.length - 1
    ? (state.comic.type === "outro" ? "返回首页" : "开始拼图")
    : "继续";
  window.setTimeout(() => {
    comicImage.classList.add("is-active");
  }, 30);
}

function finishChapterComic() {
  const done = state.comic?.onDone;
  state.comic = null;
  if (done) done();
}

function nextComicFrame() {
  if (!state.comic) return;
  if (state.comic.index >= state.comic.frames.length - 1) {
    finishChapterComic();
    return;
  }
  state.comic.index += 1;
  renderComicFrame();
}

function completeEpisode(episodeId, steps, timeSeconds) {
  if (!playerState.completedEpisodeIds.includes(episodeId)) {
    playerState.completedEpisodeIds.push(episodeId);
  }
  const oldStats = playerState.episodeStats[episodeId];
  playerState.episodeStats[episodeId] = {
    bestSteps: oldStats ? Math.min(oldStats.bestSteps, steps) : steps,
    bestTimeSeconds: oldStats ? Math.min(oldStats.bestTimeSeconds, timeSeconds) : timeSeconds,
    completedAt: new Date().toISOString()
  };
  if (hasNextEpisode()) {
    playerState.currentEpisodeId = currentChapter().episodes[state.episodeIndex + 1].episodeId;
  } else {
    playerState.currentEpisodeId = episodeId;
  }
  savePlayerState();
  updatePersistentUi();
}

function hasNextEpisode() {
  return state.episodeIndex + 1 < currentChapter().episodes.length;
}

function hasPreviousEpisode() {
  return state.episodeIndex > 0;
}

function previousEpisode() {
  if (state.memoryOpen) {
    closeMemory();
    return;
  }
  if (state.mode === "herbPrompt" || state.mode === "herbFailed") {
    skipHerbTest();
    return;
  }
  clearVictoryTimers();
  if (!hasPreviousEpisode()) {
    showHome();
    return;
  }
  state.episodeIndex -= 1;
  playerState.currentEpisodeId = episodeIdByIndex(state.episodeIndex);
  savePlayerState();
  setupEpisode();
  showGame();
  startPuzzle();
}

function openPuzzleDirect() {
  setupEpisode();
  showGame();
  startPuzzle();
}

function openPuzzleWithChapterIntro({ forceIntro = false } = {}) {
  const chapter = currentChapter();
  const shouldPlayIntro =
    state.episodeIndex === 0 &&
    chapter.introComics?.length &&
    (forceIntro || !state.playedIntroChapterIds.has(chapter.chapterId));
  if (!shouldPlayIntro) {
    openPuzzleDirect();
    return;
  }
  state.playedIntroChapterIds.add(chapter.chapterId);
  setupEpisode();
  playChapterComic("intro", () => {
    showGame();
    startPuzzle();
  });
}

function nextEpisode() {
  if (state.memoryOpen) {
    closeMemory();
    return;
  }
  if (state.mode === "herbPrompt") {
    startHerbTest();
    return;
  }
  if (state.mode === "herbFailed") {
    retryHerbTest();
    return;
  }
  if (state.mode === "herbComplete") {
    continueMainAfterHerbTest();
    return;
  }
  clearVictoryTimers();
  if (state.mode === "failed") {
    completeOverlay.hidden = true;
    createPuzzle({ deal: true });
    startPuzzle();
    return;
  }
  state.pendingNextEpisodeIndex = hasNextEpisode() ? state.episodeIndex + 1 : null;
  maybeOfferHerbTest();
  if (state.activeHerbTest) {
    return;
  }
  continueMainAfterHerbTest();
}

function renderChapterStrip() {
  if (!chapterStrip) return;
  chapterStrip.innerHTML = "";
  currentChapter().episodes.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.className = `chapter-dot${index <= state.episodeIndex ? " active" : ""}`;
    chapterStrip.appendChild(dot);
  });
}

function renderMoves() {
  moveCount.textContent = String(state.moveCount);
}

function findMergeHint() {
  for (const a of state.tiles) {
    for (const b of state.tiles) {
      if (a.id === b.id || a.groupId === b.groupId) continue;
      const originAdjacent = Math.abs(a.correctRow - b.correctRow) + Math.abs(a.correctCol - b.correctCol) === 1;
      if (originAdjacent) return [a, b];
    }
  }
  return null;
}

function showHint() {
  if (state.mode !== "puzzle") {
    showToast("开始拼图后才能使用提示");
    return;
  }
  if (state.hintCount <= 0) {
    showToast("提示次数不足");
    return;
  }
  const pair = findMergeHint();
  if (!pair) {
    showToast("暂时没有可提示的拼块");
    return;
  }
  state.hintCount -= 1;
  playerState.tasks.usedHint = Math.max(playerState.tasks.usedHint || 0, 1);
  savePlayerState();
  sceneText.textContent = `这两块原图相邻，找机会让它们靠在一起。剩余提示 ${state.hintCount} 次。`;
  for (const tile of pair) tile.el.classList.add("hinted");
  window.setTimeout(() => {
    for (const tile of pair) tile.el.classList.remove("hinted");
  }, 2000);
  updatePersistentUi();
}

function openMemory() {
  if (state.mode !== "puzzle") {
    showToast("开始拼图后才能忆图");
    return;
  }
  if (state.previewCount <= 0) {
    showToast("忆图次数不足");
    return;
  }
  state.previewCount -= 1;
  state.memoryOpen = true;
  state.mode = "preview";
  clearVictoryTimers();
  completeOverlay.classList.remove("is-glowing", "is-story", "is-actions-ready");
  completeTitle.textContent = "忆图";
  completeText.textContent = "观察完整漫画的位置、颜色和人物，再回到拼图继续。";
  completeHomeButton.hidden = true;
  nextButton.textContent = "收起";
  completeOverlay.hidden = false;
  window.setTimeout(() => {
    if (state.memoryOpen) closeMemory();
  }, 3000);
}

function closeMemory() {
  state.memoryOpen = false;
  completeOverlay.hidden = true;
  state.mode = "puzzle";
}

function showHome() {
  stopTimer();
  clearDealTimers();
  clearVictoryTimers();
  state.comic = null;
  state.activeHerbTest = null;
  state.pendingNextEpisodeIndex = null;
  setScreen("home");
  pushRoute("/");
  updatePersistentUi();
}

function showMap() {
  stopTimer();
  clearDealTimers();
  clearVictoryTimers();
  state.comic = null;
  state.activeHerbTest = null;
  state.pendingNextEpisodeIndex = null;
  setScreen("chapters");
  pushRoute("/chapters");
  updatePersistentUi();
}

function showGame() {
  setScreen("game");
  pushRoute(`/puzzle/${currentEpisode().episodeId}`);
  createPuzzle({ deal: true });
}

function showGallery() {
  stopTimer();
  clearDealTimers();
  clearVictoryTimers();
  state.comic = null;
  state.activeHerbTest = null;
  state.pendingNextEpisodeIndex = null;
  playerState.tasks.openedGallery = Math.max(playerState.tasks.openedGallery || 0, 1);
  savePlayerState();
  showGalleryOverview();
  setScreen("gallery");
  pushRoute("/gallery");
  updatePersistentUi();
}

function showGalleryOverview() {
  galleryScreen.classList.remove("is-reader");
  galleryOverview.hidden = false;
  galleryReader.hidden = true;
  galleryBottomNav.hidden = true;
}

function openStoryGallery() {
  const count = completedChapterCount();
  if (count <= 0) {
    showToast("完成拼图后解锁故事图鉴");
    return;
  }
  openGalleryReader(0);
}

function openGalleryReader(index) {
  const count = completedChapterCount();
  if (index < 0 || index >= count) {
    showToast("完成对应拼图后解锁");
    return;
  }
  state.galleryEpisodeIndex = index;
  galleryScreen.classList.add("is-reader");
  galleryOverview.hidden = true;
  galleryReader.hidden = false;
  galleryBottomNav.hidden = true;
  renderGalleryReader();
}

function renderGalleryReader() {
  const episode = allEpisodes()[state.galleryEpisodeIndex];
  const count = completedChapterCount();
  galleryReaderTitle.textContent = `第 ${String(episode.episodeNo).padStart(2, "0")} 回：${episode.episodeTitle}`;
  galleryReaderImage.src = assetUrl(episode.imageAsset);
  galleryReaderImage.alt = episode.episodeTitle;
  galleryReaderEpisodeName.textContent = episode.episodeTitle;
  galleryReaderCopy.textContent = episode.completeText;
  galleryPrevButton.disabled = state.galleryEpisodeIndex <= 0;
  galleryNextButton.disabled = state.galleryEpisodeIndex >= allEpisodes().length - 1;
  galleryPrevButton.classList.toggle("is-disabled", galleryPrevButton.disabled);
  galleryNextButton.classList.toggle("is-disabled", state.galleryEpisodeIndex >= count - 1);
}

function closeGalleryOrReader() {
  if (!galleryReader.hidden) {
    showGalleryOverview();
    return;
  }
  showHome();
}

function previousGalleryPage() {
  if (state.galleryEpisodeIndex <= 0) return;
  openGalleryReader(state.galleryEpisodeIndex - 1);
}

function nextGalleryPage() {
  const count = completedChapterCount();
  if (state.galleryEpisodeIndex >= count - 1) {
    showToast("完成下一回拼图后解锁");
    return;
  }
  openGalleryReader(state.galleryEpisodeIndex + 1);
}

function showTasks() {
  stopTimer();
  clearDealTimers();
  clearVictoryTimers();
  state.comic = null;
  state.activeHerbTest = null;
  state.pendingNextEpisodeIndex = null;
  setScreen("tasks");
  pushRoute("/tasks");
  updatePersistentUi();
}

function showSettings() {
  stopTimer();
  clearDealTimers();
  clearVictoryTimers();
  state.comic = null;
  state.activeHerbTest = null;
  state.pendingNextEpisodeIndex = null;
  setScreen("settings");
  pushRoute("/settings");
  updatePersistentUi();
}

function setScreen(name) {
  for (const screen of [homeScreen, comicScreen, mapScreen, galleryScreen, taskScreen, settingsScreen, gameScreen]) {
    screen.classList.add("is-hidden");
  }
  const target = {
    home: homeScreen,
    comic: comicScreen,
    chapters: mapScreen,
    gallery: galleryScreen,
    tasks: taskScreen,
    settings: settingsScreen,
    game: gameScreen
  }[name];
  target.classList.remove("is-hidden");
}

function pushRoute(route) {
  if (window.location.protocol === "file:") return;
  if (window.location.pathname === route) return;
  history.pushState({ route }, "", route);
}

function startPuzzle() {
  if (state.mode === "complete") return;
  if (state.mode === "dealing") {
    state.startAfterDeal = true;
    completeOverlay.hidden = true;
    return;
  }
  state.mode = "puzzle";
  completeOverlay.hidden = true;
  sceneText.textContent = currentEpisode().introText;
  objective.textContent = "拖动拼块，与目标区域交换";
  startTimer();
}

function currentEpisodeNoForProgress() {
  return Math.max(1, episodeIndexById(playerState.currentEpisodeId) + 1);
}

function completedChapterEpisodeIds() {
  const completed = new Set(playerState.completedEpisodeIds);
  return allEpisodes()
    .filter((episode) => completed.has(episode.episodeId))
    .map((episode) => episode.episodeId);
}

function completedChapterCount() {
  return completedChapterEpisodeIds().length;
}

function updatePersistentUi() {
  const episodeIndex = episodeIndexById(playerState.currentEpisodeId);
  const episode = allEpisodes()[episodeIndex] || allEpisodes()[0];
  const chapterTitle = episode.chapterTitle.replace(/^第一章：?/, "第一章：");
  homeChapterText.textContent = chapterTitle;
  homeEpisodeText.textContent = `第 ${String(episode.episodeNo).padStart(2, "0")} 回：${episode.episodeTitle}`;
  homeProgressText.textContent = `当前第 ${episode.episodeNo} / 20 回`;
  mapProgressText.textContent = `${currentEpisodeNoForProgress()} / 20 回`;

  const completed = new Set(playerState.completedEpisodeIds);
  const galleryCompleted = completedChapterCount();
  galleryChapterOneProgress.textContent = `${galleryCompleted} / 20 回`;
  storyChapterOneButton.classList.toggle("is-empty", galleryCompleted === 0);

  taskOne.textContent = `${Math.min(completed.size, 1)} / 1`;
  taskHint.textContent = `${Math.min(playerState.tasks.usedHint || 0, 1)} / 1`;
  taskMerge.textContent = `${Math.min(playerState.tasks.mergeCount || 0, 5)} / 5`;
  taskGallery.textContent = `${Math.min(playerState.tasks.openedGallery || 0, 1)} / 1`;
  taskChapter.textContent = `${completed.size >= 20 ? 1 : 0} / 1`;

  musicToggle.checked = playerState.settings.musicEnabled;
  soundToggle.checked = playerState.settings.soundEnabled;
  vibrationToggle.checked = playerState.settings.vibrationEnabled;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(state.toastTimer);
  state.toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1700);
}

function openCurrentPuzzle() {
  state.episodeIndex = episodeIndexById(playerState.currentEpisodeId);
  openPuzzleWithChapterIntro();
}

function restartFromBeginning() {
  playerState.currentPieceId = "downhill";
  playerState.currentChapterId = "downhill_ch01";
  playerState.currentEpisodeId = "downhill_ch01_ep001";
  playerState.completedEpisodeIds = [];
  playerState.episodeStats = {};
  playerState.tasks = {
    usedHint: 0,
    mergeCount: 0,
    openedGallery: 0
  };
  savePlayerState();
  state.episodeIndex = 0;
  openPuzzleWithChapterIntro({ forceIntro: true });
}

storyButton.addEventListener("click", startPuzzle);
comicNextButton.addEventListener("click", nextComicFrame);
comicSkipButton.addEventListener("click", finishChapterComic);
galleryBackButton.addEventListener("click", closeGalleryOrReader);
storyGalleryTab.addEventListener("click", () => showToast("故事图鉴已打开"));
storyChapterOneButton.addEventListener("click", openStoryGallery);
for (const button of galleryLockedButtons) {
  button.addEventListener("click", () => showToast("后续版本开放"));
}
galleryPrevButton.addEventListener("click", previousGalleryPage);
galleryNextButton.addEventListener("click", nextGalleryPage);
homeProgressButton.addEventListener("click", openCurrentPuzzle);
homeStart.addEventListener("click", restartFromBeginning);
homeChapterButton.addEventListener("click", showMap);
homeAlbumButton.addEventListener("click", showGallery);
homeTaskButton.addEventListener("click", showTasks);
homeSettingsButton.addEventListener("click", showSettings);
mapBackButton.addEventListener("click", showHome);
mapChapterOne.addEventListener("click", openCurrentPuzzle);
for (const button of lockedChapterButtons) {
  button.addEventListener("click", () => showToast("完成上一章后解锁"));
}
mapAlbumButton.addEventListener("click", showGallery);
mapTaskButton.addEventListener("click", showTasks);
mapSettingsButton.addEventListener("click", showSettings);
for (const button of subBackButtons) button.addEventListener("click", showHome);
for (const button of navChapterButtons) button.addEventListener("click", showMap);
for (const button of navGalleryButtons) button.addEventListener("click", showGallery);
for (const button of navTaskButtons) button.addEventListener("click", showTasks);
for (const button of navSettingsButtons) button.addEventListener("click", showSettings);
backHomeButton.addEventListener("click", showHome);

if (hintButton) hintButton.addEventListener("click", showHint);
memoryButton.addEventListener("click", openMemory);
undoButton.addEventListener("click", addTime);

shuffleButton.addEventListener("click", () => {
  completeOverlay.hidden = true;
  state.hintCount = 3;
  state.previewCount = 2;
  state.undoCount = 2;
  state.moveCount = 0;
  state.history = [];
  createPuzzle({ deal: true });
  startPuzzle();
});

nextButton.addEventListener("click", nextEpisode);
completeHomeButton.addEventListener("click", previousEpisode);
musicToggle.addEventListener("change", () => {
  playerState.settings.musicEnabled = musicToggle.checked;
  savePlayerState();
});
soundToggle.addEventListener("change", () => {
  playerState.settings.soundEnabled = soundToggle.checked;
  savePlayerState();
});
vibrationToggle.addEventListener("change", () => {
  playerState.settings.vibrationEnabled = vibrationToggle.checked;
  savePlayerState();
});
window.addEventListener("pointermove", onPointerMove);
window.addEventListener("pointerup", onPointerUp);
window.addEventListener("mousemove", onPointerMove);
window.addEventListener("mouseup", onPointerUp);
window.addEventListener("touchmove", onPointerMove, { passive: false });
window.addEventListener("touchend", onPointerUp, { passive: false });
window.addEventListener("resize", () => {
  if (!state.imageUrl || state.drag) return;
  if (state.mode === "dealing") return;
  const previousMode = state.mode;
  const previousRemaining = state.remainingSeconds;
  const previousLimit = state.timeLimitSeconds;
  createPuzzle();
  state.mode = previousMode;
  state.remainingSeconds = previousRemaining;
  state.timeLimitSeconds = previousLimit;
  renderTimer();
  if (state.mode === "puzzle" || state.mode === "preview") startTimer();
});

setupEpisode();
showInitialLoading();
