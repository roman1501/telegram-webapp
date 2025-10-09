  
  const tg = window.Telegram.WebApp;
  
tg.ready();

// if (typeof tg.requestFullscreen === 'function') {
//   tg.requestFullscreen();
// } else {
//   console.warn('Fullscreen not supported, falling back to expand()');
//   tg.expand?.();
// }

// tg.onEvent('fullscreen_changed', event => {
//   console.log('Fullscreen state:', event.is_fullscreen);
// });

// tg.onEvent('fullscreen_failed', event => {
//   console.warn('Fullscreen failed:', event.error);
// });

  const supabaseUrl = 'https://mftgqxilushpzewpqkvi.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mdGdxeGlsdXNocHpld3Bxa3ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMDQxMzMsImV4cCI6MjA2Njg4MDEzM30.qRsUDDHSFuP6hIQZwv0mVsfS-ZZDPPbDU5Zl55Hoezw';

  let user = tg.initDataUnsafe?.user || { id: 123456789, first_name: "Тест" };
  const userId = user.id;
  const userName = user.first_name || "Гість";
  document.getElementById("username").innerText = userName;

  const counterEl = document.getElementById("counter");
  const inventoryListEl = document.querySelector("#inventory-tab .bonus-list");

  const confirmModal = document.getElementById("confirmModal");

  const confirmBtn = document.getElementById("confirmActivate");
  const cancelBtn = document.getElementById("cancelActivate");
  let isHappyHour = false;

    const happyHourStart = 21; // 17:00
const happyHourEnd = 22;   // 18:00
  // 👇 заміни на свій юзернейм бота

  const availableBonuses = [
    {
      name: "gyros",
      title: "-50% на гірос",
      description: "Смачна знижка на гірос у Greek House",
      price: 1000,
      image: "gyros.jpeg",
      expiresAt: "2025-10-15"
    },
    {
      name: "bigPotato",
      title: "Велика картопля за 40 грн",
      description: "Обміняй кліки на хрустку картоплю!",
      price: 700,
      image: "kartoplafrivelyka.jpeg",
      expiresAt: "2025-10-15"
    },
    {
      name: "pitaGrylZChederom",
      title: "-50% на піту гриль з чедером",
      description: "Скуштуй улюблену піту в 2 рази дешевше!",
      price: 750,
      image: "pitagrylichederini.png",
      expiresAt: "2025-10-09"
    },
    {
      name: "gyrosPlusRB",
      title: "Red Bull в подарунок до гіроса",
      description: "Береш гірос? Прихопи і Red Bull за 0 грн!",
      price: 950,
      image: "gyrosPlusRB.png",
      expiresAt: "2025-10-16"
    },
    {
      name: "kalmarPytaGyros",
      title: "-50% на піту або гірос з кальмаром",
      description: "240грн - задорого? Тоді тримай улюблену страву за 120грн!",
      price: 850,
      image: "kalmarPytaGyros.jpg",
      expiresAt: "2025-10-16"
    },
    {
      name: "pytaTynez",
      title: "Нова піта з тунцем за пів ціни",
      description: "-50% на новинку, піту з тунцем!",
      price: 850,
      image: "pytaTynez.jpg",
      expiresAt: "2025-10-5"  
    },
      {
    name: "kalmarPyta",
    title: "-50% на піту з кальмаром",
    description: "Піта з кальмаром за пів ціни!",
    price: 850,
    image: "kalmarPytaGyros.jpg",
    expiresAt: "2025-10-10"
  },
  {
    name: "kalmarGyros",
    title: "-50% на гірос з кальмаром",
    description: "Гірос з кальмаром за пів ціни!",
    price: 850,
    image: "kalmarPytaGyros.jpg",
    expiresAt: "2025-10-10"
  },
  ];
  
function getDaysLeft(expireDate) {
  const now = new Date();
  const end = new Date(expireDate);
  const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}
function pluralDaysUa(n) {
  const a = Math.abs(n) % 100, b = a % 10;
  if (a > 10 && a < 20) return 'днів';
  if (b > 1 && b < 5) return 'дні';
  if (b === 1) return 'день';
  return 'днів';
}



  let clicks = 0;

const happyEl = document.getElementById("happyHourTimer");
// function showBlur() {
//   const blur = document.getElementById("blurOverlay");
//   blur.style.opacity = "1";
// }

// function hideBlur() {
//   const blur = document.getElementById("blurOverlay");
//   blur.style.opacity = "0";
// }


  
function updateHappyHourTimer() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentSeconds = now.getSeconds();

  const tapImg = document.querySelector("#tapBtn img");
  const tapBtn = document.getElementById("tapBtn");
  tapBtn.classList.add("rotated");
  if (currentHour >= happyHourStart && currentHour < happyHourEnd) {
    const minutesLeft = 59 - currentMinutes;
    const secondsLeft = 59 - currentSeconds;
    happyEl.innerText = `🎉 Happy Hour! +2 кліки! Залишилось: ${minutesLeft} хв ${secondsLeft} сек`;
    happyEl.style.display = "block";
    isHappyHour = true;

    // 🟡 Золота монетка + видалити нахил
    if (tapImg.src.includes("greenCoin.png")) {
      tapImg.src = "goldCoin.png";
    }
    tapBtn.classList.remove("rotated");

  } else {
    const nextHappy = new Date();
    nextHappy.setHours(happyHourStart, 0, 0, 0);
    if (now >= nextHappy) nextHappy.setDate(nextHappy.getDate() + 1);
    const diffMs = nextHappy - now;
  const totalSeconds = Math.floor(diffMs / 1000);
const hours = Math.floor(totalSeconds / 3600);
const minutes = Math.floor((totalSeconds % 3600) / 60);
const seconds = totalSeconds % 60;

if (hours > 0) {
  happyEl.innerText = `⏳ Happy Hour через: ${hours} год ${minutes} хв`;
} else if (minutes > 0) {
  happyEl.innerText = `⏳ Happy Hour через: ${minutes} хв`;
} else {
  happyEl.innerText = `⏳ Happy Hour вже зовсім скоро!`;
}


    happyEl.style.display = "block";
    isHappyHour = false;

    // 🟢 Зелена монетка + повертаємо нахил
    if (tapImg.src.includes("goldCoin.png")) {
      tapImg.src = "greenCoin.png";
    }
    tapBtn.classList.add("rotated");
  }
}

function animateCoinRain(count = 100, reward = 100) {
  const counter = document.getElementById("counter");
  const counterRect = counter.getBoundingClientRect();
  let added = 0;

  for (let i = 0; i < count && added < reward; i++) {
    setTimeout(() => {
      // 1. Монетка з’являється
      const coin = document.createElement("div");
      coin.classList.add("coin-fly");

      const startX = window.innerWidth / 2 + (Math.random() * 80 - 40);
      const startY = window.innerHeight / 2 + (Math.random() * 80 - 40);
      coin.style.left = `${startX}px`;
      coin.style.top = `${startY}px`;

      const dx = counterRect.left + counterRect.width / 2 - startX;
      const dy = counterRect.top + counterRect.height / 2 - startY;
      coin.style.setProperty("--dx", `${dx}px`);
      coin.style.setProperty("--dy", `${dy}px`);

      document.body.appendChild(coin);

      // 2. Збільшуємо лічильник ПО 1
      clicks++;
      added++;
      updateDisplay();

      // 3. Зберігаємо, коли всі додалися
      if (added === reward) {
        saveUserData();
      }

      // 4. Монетка зникає через 900мс (анімка)
      setTimeout(() => coin.remove(), 900);
    }, i * 15); // затримка між монетками (можеш змінити на швидше чи повільніше)
  }
}




setInterval(updateHappyHourTimer, 1000);

updateHappyHourTimer(); // запустити одразу при завантаженні

const tapBtn = document.getElementById("tapBtn");

tapBtn.addEventListener("touchstart", () => {
  tapBtn.classList.add("active");
});
tapBtn.addEventListener("touchend", () => {
  tapBtn.classList.remove("active");
});
tapBtn.addEventListener("mousedown", () => {
  tapBtn.classList.add("active");
});
tapBtn.addEventListener("mouseup", () => {
  tapBtn.classList.remove("active");
});

async function checkDailyReward() {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  const res = await fetch(`${supabaseUrl}/rest/v1/daily_rewards?user_id=eq.${userId}`, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`
    }
  });

  const data = await res.json();
  const lastRewardDate = data[0]?.last_claimed?.split('T')[0]; // Теж беремо тільки дату
  
  if (false) {
      // showBlur();
    // Додати +100 кліків
    updateDisplay();
    await saveUserData();

    // Показати модалку
    document.getElementById("dailyRewardModal").style.display = "flex";
    document.getElementById("dailyRewardBlur").classList.add("active");

    if (data.length === 0) {
      // Створити запис
      await fetch(`${supabaseUrl}/rest/v1/daily_rewards`, {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ user_id: userId, last_claimed: today })
      });
    } else {
      // Оновити запис
      await fetch(`${supabaseUrl}/rest/v1/daily_rewards?user_id=eq.${userId}`, {
        method: "PATCH",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ last_claimed: today })
      });
    }
       // setTimeout(() => hideBlur(), 300);
  }
}






function closeDailyRewardModal() {
  document.getElementById("dailyRewardBlur").classList.remove("active");
  document.getElementById("dailyRewardModal").style.display = "none";

   animateCoinRain(100);
}

  async function fetchUserData() {
    const res = await fetch(`${supabaseUrl}/rest/v1/clicks?user_id=eq.${userId}`, {
      headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` }
    });
    const data = await res.json();
    if (data.length > 0) clicks = data[0].clicks;
    else {
      await fetch(`${supabaseUrl}/rest/v1/clicks`, {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ user_id: userId, clicks: 0 })
      });
    }
    updateDisplay();
    await checkDailyReward();
  }

  function updateDisplay() {
    counterEl.innerText = `Кліків: ${clicks}`;
  }

  async function saveUserData() {
    await fetch(`${supabaseUrl}/rest/v1/clicks?user_id=eq.${userId}`, {
      method: "PATCH",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ clicks })
    });
  }

  function generateRandomCode() {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'GH-';
    for (let i = 0; i < 5; i++) {
      code += charset[Math.floor(Math.random() * charset.length)];
    }
    return code;
  }

  async function loadInventory() {
    const res = await fetch(`${supabaseUrl}/rest/v1/bonuses?user_id=eq.${userId}`, {
      headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` }
    });
    const bonuses = await res.json();

    bonuses.sort((a, b) => a.used - b.used); // Готові спочатку, використані — знизу

    inventoryListEl.innerHTML = "";

    for (const bonus of bonuses) {
      const bonusData = availableBonuses.find(b => b.name === bonus.name);
      if (!bonusData) continue;

      const card = document.createElement("div");
      card.className = "bonus-card";
      if (bonus.used) card.classList.add("used");

      card.innerHTML = `
        <img src="${bonusData.image}" alt="${bonusData.title}">
        <div class="bonus-title">${bonusData.title}</div>
        <div class="bonus-description">${bonusData.description}</div>
        <div class="bonus-price">Статус: <strong>${bonus.used ? "Використано" : "Готовий до активації"}</strong></div>
        ${!bonus.used ? '<button>Активувати</button>' : ''}
      `;

      if (!bonus.used) {
        const btn = card.querySelector("button");
        btn.addEventListener("click", () => {
          confirmModal.classList.add("active");
confirmModal.style.display = "flex";


          const closeModal = () => {
            confirmModal.classList.remove("active");
confirmModal.style.display = "none";

            confirmBtn.onclick = null;
            cancelBtn.onclick = null;
          };

          cancelBtn.onclick = closeModal;

          confirmBtn.onclick = async () => {
            const code = generateRandomCode();

            const codeRes = await fetch(`${supabaseUrl}/rest/v1/discount_codes`, {
              method: "POST",
              headers: {
                apikey: supabaseKey,
                Authorization: `Bearer ${supabaseKey}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                user_id: userId,
                code,
                used: false,
                bonus_name: bonusData.title
              })
            });

            const updateRes = await fetch(`${supabaseUrl}/rest/v1/bonuses?id=eq.${bonus.id}`, {
              method: "PATCH",
              headers: {
                apikey: supabaseKey,
                Authorization: `Bearer ${supabaseKey}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ used: true })
            });

            closeModal();

            if (codeRes.ok && updateRes.ok) {
              alert(`🎉 Ваш код: ${code}`);
              loadInventory();
            } else {
              alert("Помилка при активації бонусу.");
            }
          };
        });
      }

      inventoryListEl.appendChild(card);
    }
  }

function showKalmarChoice(onPick) {
  const modal = document.getElementById('kalmarChoiceModal');
  const btnPita = document.getElementById('btnKalmarPita');
  const btnGyros = document.getElementById('btnKalmarGyros');
  const btnCancel = document.getElementById('btnKalmarCancel');

  const close = () => { modal.style.display = 'none';
    btnPita.onclick = btnGyros.onclick = btnCancel.onclick = null;
  };

  btnPita.onclick = () => { close(); onPick('pita'); };
  btnGyros.onclick = () => { close(); onPick('gyros'); };
  btnCancel.onclick = close;

  modal.style.display = 'flex';
}

async function purchaseBonus(bonusObj) {
  // Перевірка балансу
  if (clicks < bonusObj.price) {
    alert(`Недостатньо кліків. Потрібно ${bonusObj.price}`);
    return;
  }

  // Списуємо і зберігаємо
  clicks -= bonusObj.price;
  updateDisplay();
  await saveUserData();

  // Зберігаємо бонус у таблицю 'bonuses'
  const res = await fetch(`${supabaseUrl}/rest/v1/bonuses`, {
    method: "POST",
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id: userId,
      name: bonusObj.name,   // важливо: збережеться kalmarPyta або kalmarGyros
      price: bonusObj.price,
      used: false
    })
  });

  if (res.ok) {
    alert(`🎁 Ви отримали бонус: ${bonusObj.title}`);
    loadInventory();
  } else {
    alert("Помилка при збереженні бонусу.");
  }
}

function setupMarketButtons() {
  const marketCards = document.querySelectorAll("#market-tab .bonus-card");

  marketCards.forEach((card, index) => {
    if (card.dataset.rowWired === "1") return;
    card.dataset.rowWired = "1";

    const btn = card.querySelector("button");
    const priceEl = card.querySelector(".bonus-price");
    const descEl = card.querySelector(".bonus-description");
    const bonus = availableBonuses[index];

    // Якщо price немає — підстрахуємось
    if (!priceEl) {
      const fallbackPrice = document.createElement("div");
      fallbackPrice.className = "bonus-price";
      fallbackPrice.textContent = `${bonus?.price ?? '-'} кліків`;
      card.insertBefore(fallbackPrice, btn);
    }

    // Створюємо бейдж (якщо є дедлайн)
    let labelEl = null;
    if (bonus?.expiresAt) {
      const daysLeft = getDaysLeft(bonus.expiresAt);
      labelEl = document.createElement("span");
      labelEl.className = "expiry-label" + (daysLeft > 0 ? "" : " expired");
      labelEl.innerHTML = daysLeft > 0
        ? `<span class="icon">⏰</span><span class="txt">${daysLeft} ${pluralDaysUa(daysLeft)}</span>`
        : `<span class="icon">⛔</span><span class="txt">Закінчилась</span>`;
    }

    // НОВА структура:
    // bonus-row: [ bonus-left | expiry-label ]
    // bonus-left: price (рядок "** кліків"), нижче — кнопка "Отримати"
    const row = document.createElement("div");
    row.className = "bonus-row";

    const leftCol = document.createElement("div");
    leftCol.className = "bonus-left";

    const priceNode = card.querySelector(".bonus-price"); // існуючий вузол
    leftCol.appendChild(priceNode);
    leftCol.appendChild(btn);

    row.appendChild(leftCol);
    if (labelEl) row.appendChild(labelEl);

    // Вставляємо новий рядок одразу після опису
    if (descEl && descEl.nextSibling) {
      card.insertBefore(row, descEl.nextSibling);
    } else {
      card.appendChild(row);
    }
// Якщо бонус прострочений — блокуємо
if (bonus?.expiresAt && getDaysLeft(bonus.expiresAt) <= 0) {
  btn.disabled = true;
  btn.classList.add("expired-btn");
}

    // Клік "Отримати"
    btn.addEventListener("click", async () => {
      if (bonus.name === 'kalmarPytaGyros') {
        showKalmarChoice(async (variant) => {
          const chosen = variant === 'pita'
            ? availableBonuses.find(b => b.name === 'kalmarPyta')
            : availableBonuses.find(b => b.name === 'kalmarGyros');

          if (!chosen) {
            alert('Не знайдено обраний варіант бонусу.');
            return;
          }
          await purchaseBonus(chosen);
        });
        return;
      }
      await purchaseBonus(bonus);
    });
  });
}

setInterval(() => {
  document.querySelectorAll("#market-tab .bonus-card").forEach((card, index) => {
    const bonus = availableBonuses[index];
    if (!bonus?.expiresAt) return;

    const label = card.querySelector(".expiry-label");
    if (!label) return;

    const d = getDaysLeft(bonus.expiresAt);
    label.classList.toggle("expired", d <= 0);
    label.innerHTML = d > 0 ? `⏰ ${d} ${pluralDaysUa(d)}` : `⛔ Закінчилась`;
  });
}, 60 * 60 * 1000); // оновлюємо щогодини




  
document.getElementById("tapBtn").addEventListener("click", (e) => {
Telegram.WebApp.HapticFeedback.impactOccurred('medium');


  const addAmount = isHappyHour ? 2 : 1;
  clicks += addAmount;
  updateDisplay();
  saveUserData();

  const plus = document.createElement("div");
  plus.className = "plus-one";
  plus.innerText = `+${addAmount}`;
  document.body.appendChild(plus);

  const rect = e.target.getBoundingClientRect();
  plus.style.left = rect.left + rect.width / 2 + "px";
  plus.style.top = rect.top + "px";

  setTimeout(() => {
    plus.remove();
  }, 800);
});


  function showTab(tabId, buttonEl) {
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
    document.getElementById(tabId).classList.add("active");
    document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
    buttonEl.classList.add("active");
    if (tabId === "inventory-tab") loadInventory();
  }
const fortuneBtn = document.getElementById("fortuneBtn");
const fortuneModal = document.getElementById("fortuneModal");
const closeFortuneModal = document.getElementById("closeFortuneModal");

// Відкрити модалку
fortuneBtn.addEventListener('click', () => {
  fortuneModal.style.display = 'flex';
  document.body.style.overflow = "hidden"; // блокуємо прокрутку фону
});

// Закрити модалку кнопкою
closeFortuneModal.addEventListener('click', () => {
  fortuneModal.style.display = 'none';
  document.body.style.overflow = ""; // повертаємо прокрутку
});

// Закрити модалку кліком по фону
fortuneModal.addEventListener('click', e => {
  if (e.target === fortuneModal) {
    fortuneModal.style.display = 'none';
    document.body.style.overflow = "";
  }
});
/* ===== Mini Café logic ===== */
const mcIngredientsEl = document.getElementById('mcIngredients');
const mcPlateEl = document.getElementById('mcPlate');
const mcMsgEl = document.getElementById('mcMsg');
const mcOrderEl = document.getElementById('mcOrder');
const mcResetBtn = document.getElementById('mcReset');
const miniCafeEl = document.getElementById('miniCafe');

function scrollMiniCafeToBottom() {
  // чекаємо, поки DOM оновиться (повідомлення вже вставилось)
  requestAnimationFrame(() => {
    const target = miniCafeEl.scrollHeight - miniCafeEl.clientHeight;

    // пробуємо нативний smooth
    try {
      miniCafeEl.scrollTo({ top: target, behavior: 'smooth' });
    } catch (e) {
      // fallback: м’яка анімація вручну
      const start = miniCafeEl.scrollTop;
      const dist = target - start;
      const dur = 350;
      let t0 = null;
      function step(ts) {
        if (!t0) t0 = ts;
        const p = Math.min((ts - t0) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3); // easeOutCubic
        miniCafeEl.scrollTop = start + dist * ease;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
  });
}
  function scrollMiniCafeToBottomSafe() {
  scrollMiniCafeToBottom();          // одразу після повідомлення
  setTimeout(scrollMiniCafeToBottom, 520); // вдруге після додавання останнього чіпа
}


/** Набір «рецептів» — можна розширювати */
const RECIPES = [
  {
    id: 'gyros',
    title: 'Гірос класичний',
    rewardClicks: 50,
    steps: ['лаваш','мʼясо','овочі','соус'],
  },
  {
    id: 'cheddarPita',
    title: 'Піта з чедером',
    rewardClicks: 65,
    steps: ['піта','сир чедер','овочі','соус'],
  }
];

/** Пул інгредієнтів з мінімальними іконками */
const ALL_ING = [
  { key:'лаваш', label:'Лаваш', img:'lavash.png' },
  { key:'мʼясо', label:'Мʼясо', img:'meat.png' },
  { key:'овочі', label:'Овочі', img:'veggies.png' },
  { key:'соус', label:'Соус', img:'sauce.png' },
  { key:'піта', label:'Піта', img:'pita.png' },
  { key:'сир чедер', label:'Чедер', img:'cheddar.png' },
];

let currentRecipe = null;
let progress = 0;

function pickRecipe() {
  // оберемо випадковий рецепт при кожному відкритті
  currentRecipe = RECIPES[Math.floor(Math.random()*RECIPES.length)];
  mcOrderEl.textContent = 'Замовлення: ' + currentRecipe.title;
  progress = 0;
  mcMsgEl.innerHTML = '';
  renderIngredients();
  mcPlateEl.innerHTML = '';
  miniCafeEl.scrollTop = 0;
  renderRecipeHint();
mcRecipeHint.classList.remove('show');
mcHintToggle.textContent = 'Підглянути рецепт';
}

function renderIngredients() {
  mcIngredientsEl.innerHTML = '';
  const poolKeys = new Set([...currentRecipe.steps]); // показуємо потрібні + пару зайвих, щоб було цікавіше
  // додамо 2 будь-які зайві
  while (poolKeys.size < currentRecipe.steps.length + 2) {
    const extra = ALL_ING[Math.floor(Math.random()*ALL_ING.length)].key;
    poolKeys.add(extra);
  }

  // зібрати обʼєкти і трохи перемішати
  const items = Array.from(poolKeys).map(k => ALL_ING.find(i => i.key===k)).filter(Boolean);
  items.sort(()=>Math.random()-.5);

  for (const ing of items) {
    const btn = document.createElement('button');
    btn.className = 'ingredient';
    btn.dataset.key = ing.key;
    btn.innerHTML = `<img src="${ing.img}" alt="${ing.label}"><div>${ing.label}</div>`;
    btn.addEventListener('click', () => onIngredientClick(btn, ing));
    mcIngredientsEl.appendChild(btn);
  }
}
function lockNonRecipeIngredients() {
  const allowed = new Set(currentRecipe.steps);
  mcIngredientsEl.querySelectorAll('.ingredient').forEach(btn => {
    if (!allowed.has(btn.dataset.key)) {
      btn.classList.add('locked');
      btn.disabled = true; 
      btn.setAttribute('aria-disabled','true');
      btn.setAttribute('tabindex','-1');
    }
  });
}

function onIngredientClick(btn, ing) {
  // якщо рецепт уже зібраний – ігноруємо будь-які кліки
  if (!currentRecipe || progress >= currentRecipe.steps.length) return;

  const needed = currentRecipe.steps[progress];
  if (ing.key === needed) {
    btn.classList.add('used');
    flyToPlate(btn, ing);
    progress++;
    mcMsgEl.innerHTML = `<div class="success-msg">Добре! ${progress}/${currentRecipe.steps.length}</div>`;
    Telegram.WebApp.HapticFeedback.impactOccurred('light');

    if (progress === currentRecipe.steps.length) {
      onRecipeComplete();
    }
  } else {
    mcMsgEl.innerHTML = `<div class="err-msg">Поспішив 😅. Спочатку: <b>${needed}</b></div>`;
    Telegram.WebApp.HapticFeedback.notificationOccurred('warning');
    mcRecipeHint.classList.add('show');
    mcHintToggle.textContent = 'Сховати рецепт';
    mcRecipeHint.scrollIntoView({ block:'nearest', behavior:'smooth' });
  }
}

async function onRecipeComplete() {
  const reward = currentRecipe.rewardClicks;
  clicks += reward;
  updateDisplay();
  await saveUserData();

  mcMsgEl.innerHTML = `<div class="success-msg">🎉 Готово! +${reward} кліків за «${currentRecipe.title}»</div>`;
  scrollMiniCafeToBottomSafe();
  Telegram.WebApp.HapticFeedback.notificationOccurred('success');

  // після завершення — заблокуємо все, чого не було в рецепті
  lockNonRecipeIngredients();
}


function flyToPlate(btn, ing) {
  const rect = btn.getBoundingClientRect();
  const plateRect = mcPlateEl.getBoundingClientRect();

  const ghost = document.createElement('img');
  ghost.src = ALL_ING.find(i=>i.key===ing.key)?.img || '';
  ghost.className = 'fly';
  ghost.style.left = rect.left + 'px';
  ghost.style.top  = rect.top + 'px';
  document.body.appendChild(ghost);

  requestAnimationFrame(() => {
    const dx = plateRect.left + plateRect.width/2 - rect.left - 24;
    const dy = plateRect.top + plateRect.height/2 - rect.top  - 24;
    ghost.style.transform = `translate(${dx}px, ${dy}px) scale(.6)`;
    ghost.style.opacity = '0.1';
  });

  setTimeout(() => {
    ghost.remove();
    const chip = document.createElement('img');
    chip.src = ALL_ING.find(i=>i.key===ing.key)?.img || '';
    chip.style.width = '36px';
    chip.style.height = '36px';
    chip.style.borderRadius = '8px';
    mcPlateEl.appendChild(chip);
  }, 460);
}

mcResetBtn.addEventListener('click', () => {
  pickRecipe();
});
const mcCloseBtn = document.getElementById('mcClose');
mcCloseBtn.addEventListener('click', () => {
  fortuneModal.style.display = 'none';
  document.body.style.overflow = "";
});
  
/** Коли відкривається твоя модалка — стартуємо гру */
fortuneBtn.addEventListener('click', () => {
  pickRecipe();
});
  const mcHintToggle = document.getElementById('mcHintToggle');
const mcRecipeHint = document.getElementById('mcRecipeHint');

function renderRecipeHint(){
  const parts = currentRecipe.steps.map(step=>{
    const ing = ALL_ING.find(i=>i.key===step);
    return `<span class="step-chip">${ing?.img ? `<img src="${ing.img}" alt="">` : ''}<span>${ing?.label || step}</span></span>`;
  });
  mcRecipeHint.innerHTML = parts.join('<span class="step-arrow">→</span>');
}

mcHintToggle.addEventListener('click', ()=>{
  const show = !mcRecipeHint.classList.contains('show');
  mcRecipeHint.classList.toggle('show', show);
  mcHintToggle.textContent = show ? 'Сховати рецепт' : 'Підглянути рецепт';
  if (show) mcRecipeHint.scrollIntoView({ block:'nearest', behavior:'smooth' });
});


fetchUserData().then(async () => {
  setupMarketButtons();
  loadInventory();
});