// ================= 1. 密码锁屏逻辑 =================
const lockScreen = document.getElementById('lock-screen');
const dots = document.querySelectorAll('.dot');
const keys = document.querySelectorAll('.key[data-num]');
const deleteKey = document.getElementById('key-delete');
const dotsContainer = document.getElementById('password-dots');

const CORRECT_PASSWORD = "0728"; 
let currentInput = "";

keys.forEach(key => {
  key.addEventListener('click', (e) => {
    e.stopPropagation(); 
    if (currentInput.length < 4) {
      currentInput += key.dataset.num;
      updateDots();
      if (currentInput.length === 4) setTimeout(checkPassword, 200);
    }
  });
});

deleteKey.addEventListener('click', (e) => {
  e.stopPropagation();
  if (currentInput.length > 0) {
    currentInput = currentInput.slice(0, -1);
    updateDots();
  }
});

function updateDots() {
  dots.forEach((dot, index) => {
    if (index < currentInput.length) dot.classList.add('active');
    else dot.classList.remove('active');
  });
}

function checkPassword() {
  if (currentInput === CORRECT_PASSWORD) {
    lockScreen.classList.add('fade-out');
    setTimeout(() => { lockScreen.style.display = 'none'; }, 800); 
  } else {
    dotsContainer.classList.add('error');
    setTimeout(() => {
      dotsContainer.classList.remove('error');
      currentInput = "";
      updateDots();
    }, 500); 
  }
}


// ================= 2. 主界面“开始回忆”逻辑 =================
const sceneContainer = document.getElementById('scene-container');
const startBtn = document.getElementById('start-btn');

let isTransitioning = false;

// 现在只监听“开始回忆”按钮的点击，不再监听全局
startBtn.addEventListener('click', () => {
  if (isTransitioning) return;
  isTransitioning = true;

  // 触发整个场景淡出
  sceneContainer.classList.add('fade-out');

  setTimeout(() => {
    console.log("进入下一环节：加载联机大厅或游戏场景");
    
    alert("进入下一环节！(这里之后会替换成游戏大厅/房间)");
    
    // 仅供本地反复测试用的重置逻辑
    isTransitioning = false;
    sceneContainer.classList.remove('fade-out');
    
  }, 800);
});