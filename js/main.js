// ================= 1. 密码锁屏逻辑 =================
const lockScreen = document.getElementById('lock-screen');
const dots = document.querySelectorAll('.dot');
const keys = document.querySelectorAll('.key[data-num]');
const deleteKey = document.getElementById('key-delete');
const dotsContainer = document.getElementById('password-dots');

const rotateTipScreen = document.getElementById('rotate-tip-screen');
const sceneContainer = document.getElementById('scene-container');

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
    // 1. 密码正确，锁屏淡出
    lockScreen.classList.add('fade-out');
    
    setTimeout(() => {
      lockScreen.style.display = 'none';
      
      // 2. 显示黑底黄字“请横屏浏览”
      rotateTipScreen.classList.add('show');
      
      // 3. 停留 2.5 秒后
      setTimeout(() => {
        // 文字淡出
        rotateTipScreen.classList.remove('show');
        
        // 4. 主界面准备就绪，淡入显示
        sceneContainer.classList.add('show');
        
        setTimeout(() => {
          rotateTipScreen.style.display = 'none';
        }, 600);
        
      }, 2500); // 2.5秒停留时间
      
    }, 800); 
    
  } else {
    // 密码错误，抖动
    dotsContainer.classList.add('error');
    setTimeout(() => {
      dotsContainer.classList.remove('error');
      currentInput = "";
      updateDots();
    }, 500); 
  }
}


// ================= 2. 主界面“开始回忆”逻辑 =================
const startBtn = document.getElementById('start-btn');
let isTransitioning = false;

startBtn.addEventListener('click', () => {
  if (isTransitioning) return;
  isTransitioning = true;

  sceneContainer.classList.add('fade-out');

  setTimeout(() => {
    console.log("进入下一环节：加载联机大厅或游戏场景");
    alert("进入下一环节！(这里之后会替换成游戏大厅/房间)");
    
    isTransitioning = false;
    sceneContainer.classList.remove('fade-out');
  }, 800);
});
