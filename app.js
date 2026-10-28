// Food Dataset (At least 5 menus included with Name, Description, Price, Image & Ingredients)
const foodArray = [
    {
        id: 1,
        title: "มันฝรั่งพันเบคอน",
        description: "มันฝรั่งอบชุ่มฉ่ำ พันด้วยเบค่อนย่างกรอบๆ มีความหวานและหอมของซอสไวน์แดง",
        price: "ราคา 212 เยน",
        image: "https://static.wikia.nocookie.net/shokugekinosoma/images/b/b0/Roast_Pork%2C_Just_Kidding_%28anime%29.png/revision/latest/scale-to-width-down/1000?cb=20150419102847",
        fallbackImage: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=600&q=80",
        ingredients: ["มันฝรั่งบด", "เบคอน", "ไวน์แดง", "เนย", "เห็ดออรินจิ", "หัวหอมแดง"],
        umami: 5, spice: 1, richness: 5
    },
    {
        id: 2,
        title: "เสต็กข้าวด้งชาลิอาปิน",
        description: "เสต็กข้าวด้งที่เรียบง่าย ครบจบในถ้วยเดียว และบ๊วยที่เสิรมความสดชื่นของเมนูนี้",
        price: "ราคา 70 เยน",
        image: "https://static.wikia.nocookie.net/shokugekinosoma/images/1/1e/Chaliapin_Steak_Don_%28anime%29.png/revision/latest?cb=20150515215831",
        fallbackImage: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
        ingredients: ["ข้าวสวย", "เสต็กเนื้อ", "กระเทียมพริกไทย", "บ๊วยเปรี้ยว", "ต้นหอม"],
        umami: 5, spice: 2, richness: 4
    },
    {
        id: 3,
        title: "ข้าวหน้าผงโรยข้าวแปลงร่าง",
        description: "เมนูข้าวที่เน้นไข่เป็นหลัก ผงโรยข้าวนั้นจะทำให้เมนูนี้อร่อยขึ้นแบบเท่าตัว และผงโรยข้าวนั้นทำมาจากน้ำซุปปีกไก่ที่เคี่ยวไว้",
        price: "ราคา 95 เยน",
        image: "https://static.wikia.nocookie.net/shokugekinosoma/images/1/10/Transforming_Furikake_Gohan_%28anime%29.png/revision/latest?cb=20150411050442",
        fallbackImage: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80",
        ingredients: ["ต้นหอม", "หัวหอม", "น้ำซุกปีกไก่", "กระเทียม", "ไข่", "ข้าวสวยร้อนๆ"],
        umami: 4, spice: 1, richness: 3
    },
    {
        id: 4,
        title: "เต้าหู้เสฉวนเผ็ดพิเศษ",
        description: "ความเผ็ดซ่าๆจนชาที่ปาก และความกลมกล่อมที่ลงตัว เมนูเต้าหู้เผ็ดที่เพอร์เฟ็ค",
        price: "ราคา 160 เยน",
        image: "https://static.wikia.nocookie.net/shokugekinosoma/images/7/7d/Mapo_Doufu_Anime.jpg/revision/latest?cb=20171006221336",
        fallbackImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
        ingredients: ["เต้าหู้ไหม", "พริกเสฉวน", "เหล้าเซาชิง", "เนื้อหมู", "เต้าหู้เนื้อแน่น", "นมข้นหวาน"],
        umami: 4, spice: 5, richness: 4
    },
    {
        id: 5,
        title: "เกี๊ยวซ่าปีกไก่ราดซอสเปรี้ยวหวานตัดชีส",
        description: "ปีกไก่เกี๊ยวซ่าที่มีซอสเปรี้ยวหวาน ตัดกับความละมุนของชีส ขนาดที่พอดีคำและรับประทานได้ง่าย",
        price: "ราคา 40 เยน / ชิ้น",
        image: "https://static.wikia.nocookie.net/shokugekinosoma/images/e/e5/Cheese-Feathered_Hanetsuki_Gy%C5%8Dza_Anime.png/revision/latest/scale-to-width-down/1000?cb=20171124025541",
        fallbackImage: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80",
        ingredients: ["ปีกไก่", "แป้งเกี๊ยวซ่า", "ซอสเปรี้ยวหวาน", "ชีส", "เนื้อหมูบด"],
        umami: 4, spice: 2, richness: 5
    }
];

let isSpinning = false;
let currentIndex = 0;
let soundEnabled = true;

const foodImage = document.getElementById("foodImage");
const foodTitle = document.getElementById("foodTitle");
const foodDescription = document.getElementById("foodDescription");
const foodPrice = document.getElementById("foodPrice");
const foodIngredients = document.getElementById("foodIngredients");
const randomBtn = document.getElementById("randomBtn");
const foodCard = document.getElementById("foodCard");
const speedLines = document.getElementById("speedLines");
const dishCounter = document.getElementById("dishCounter");

const umamiStars = document.getElementById("umamiStars");
const spiceStars = document.getElementById("spiceStars");
const richStars = document.getElementById("richStars");

// Fallback handling for Wikia hotlinks
function handleImageError(img) {
    const currentItem = foodArray.find(f => f.title === foodTitle.textContent) || foodArray[currentIndex];
    if (currentItem && currentItem.fallbackImage && img.src !== currentItem.fallbackImage) {
        img.src = currentItem.fallbackImage;
    }
}

function handleMascotError(img) {
    img.onerror = null;
    img.src = "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=200&q=80";
}

// Web Audio Sound Engine
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playSound(type) {
    if (!soundEnabled) return;
    try {
        initAudio();
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const now = audioCtx.currentTime;

        if (type === 'tick') {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(300 + Math.random() * 200, now);
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now);
            osc.stop(now + 0.05);
        } 
        else if (type === 'boom') {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.exponentialRampToValueAtTime(40, now + 0.4);
            gain.gain.setValueAtTime(0.25, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now);
            osc.stop(now + 0.45);
        } 
        else if (type === 'fanfare') {
            const notes = [523.25, 659.25, 783.99, 1046.50];
            notes.forEach((freq, idx) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + idx * 0.08);
                gain.gain.setValueAtTime(0.12, now + idx * 0.08);
                gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now + idx * 0.08);
                osc.stop(now + idx * 0.08 + 0.35);
            });
        }
    } catch (e) {
        console.log("Audio not allowed", e);
    }
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    const soundIcon = document.getElementById("soundIcon");
    if (soundEnabled) {
        soundIcon.className = "fa-solid fa-volume-high text-xs";
    } else {
        soundIcon.className = "fa-solid fa-volume-xmark text-xs text-red-400";
    }
}

function renderStars(container, count) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= count) {
            html += `<i class="fa-solid fa-star"></i>`;
        } else {
            html += `<i class="fa-regular fa-star opacity-30"></i>`;
        }
    }
    container.innerHTML = html;
}

function renderFood(food) {
    foodImage.src = food.image;
    foodImage.alt = food.title;
    foodTitle.textContent = food.title;
    foodDescription.textContent = food.description;
    foodPrice.textContent = food.price;

    if (dishCounter) {
        dishCounter.textContent = `Dish ${food.id} / ${foodArray.length}`;
    }

    foodIngredients.innerHTML = food.ingredients.map(ingredient => `
        <span class="bg-gradient-to-r from-zinc-800 to-zinc-900 text-shokugeki-gold border border-shokugeki-gold/30 text-[11px] px-2.5 py-0.5 rounded-full font-light shadow-sm">
            ${ingredient}
        </span>
    `).join("");

    renderStars(umamiStars, food.umami || 4);
    renderStars(spiceStars, food.spice || 2);
    renderStars(richStars, food.richness || 4);
}

function randomizeFood() {
    if (isSpinning) return;

    initAudio();
    isSpinning = true;
    randomBtn.disabled = true;
    randomBtn.classList.add("opacity-75", "cursor-not-allowed", "brightness-75");

    speedLines.classList.add("active");
    foodImage.classList.add("randomize-spin");

    let counter = 0;
    const totalSpins = 20;
    const spinInterval = setInterval(() => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * foodArray.length);
        } while (randomIndex === currentIndex && foodArray.length > 1);

        renderFood(foodArray[randomIndex]);
        playSound('tick');
        counter++;

        if (counter >= totalSpins) {
            clearInterval(spinInterval);
            
            const finalIndex = Math.floor(Math.random() * foodArray.length);
            currentIndex = finalIndex;
            renderFood(foodArray[finalIndex]);

            foodImage.classList.remove("randomize-spin");
            speedLines.classList.remove("active");
            foodCard.classList.remove("pop-in");

            void foodCard.offsetWidth;
            foodCard.classList.add("pop-in");
            playSound('boom');
            setTimeout(() => playSound('fanfare'), 150);

            isSpinning = false;
            randomBtn.disabled = false;
            randomBtn.classList.remove("opacity-75", "cursor-not-allowed", "brightness-75");
        }
    }, 75);
}

function toggleMenuDrawer() {
    const drawer = document.getElementById('menuDrawer');
    if (drawer.classList.contains('opacity-0')) {
        drawer.classList.remove('opacity-0', 'pointer-events-none');
    } else {
        drawer.classList.add('opacity-0', 'pointer-events-none');
    }
}

function populateMenuList() {
    const menuList = document.getElementById('menuList');
    menuList.innerHTML = foodArray.map((food, idx) => `
        <div onclick="selectDishDirectly(${idx})" class="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-800/60 border border-white/5 hover:border-shokugeki-gold/50 transition-all cursor-pointer group">
            <img src="${food.image}" onerror="this.src='${food.fallbackImage}'" class="w-12 h-12 rounded-lg object-cover border border-shokugeki-gold/30">
            <div class="flex-1 text-left">
                <h4 class="text-sm font-bold text-gray-200 group-hover:text-shokugeki-gold transition-colors">${food.title}</h4>
                <p class="text-xs text-amber-400 font-medium">${food.price}</p>
            </div>
            <i class="fa-solid fa-chevron-right text-xs text-gray-500 group-hover:text-shokugeki-gold group-hover:translate-x-1 transition-all"></i>
        </div>
    `).join('');
}

function selectDishDirectly(index) {
    currentIndex = index;
    renderFood(foodArray[index]);
    foodCard.classList.remove("pop-in");
    void foodCard.offsetWidth;
    foodCard.classList.add("pop-in");
    playSound('fanfare');
    toggleMenuDrawer();
}

function initParticleCanvas() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class FlameParticle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 20;
            this.size = Math.random() * 3 + 1;
            this.speedY = Math.random() * 1.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.8;
            this.opacity = Math.random() * 0.6 + 0.2;
            this.color = Math.random() > 0.4 ? '#FF5349' : '#FFD700';
        }
        update() {
            this.y -= this.speedY;
            this.x += this.speedX;
            this.opacity -= 0.003;
            if (this.y < 0 || this.opacity <= 0) {
                this.reset();
            }
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = Math.max(0, this.opacity);
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 35; i++) {
        particles.push(new FlameParticle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

document.addEventListener("DOMContentLoaded", () => {
    renderFood(foodArray[0]);
    populateMenuList();
    initParticleCanvas();
});