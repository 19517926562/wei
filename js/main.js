// ================= 1. 密码锁屏逻辑 =================
const lockScreen = document.getElementById('lock-screen');
const dots = document.querySelectorAll('.dot');
const keys = document.querySelectorAll('.key[data-num]');
const deleteKey = document.getElementById('key-delete');
const dotsContainer = document.getElementById('password-dots');

const rotateTipScreen = document.getElementById('rotate-tip-screen');
const gameWrapper = document.getElementById('game-wrapper');
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
        rotateTipScreen.classList.remove('show');
        
        // 4. 主界面准备就绪，先执行一次旋转检测，再淡入显示
        updateOrientation();
        sceneContainer.classList.add('show');
        
        setTimeout(() => {
          rotateTipScreen.style.display = 'none';
        }, 600);
        
      }, 2500); 
      
    }, 800); 
    
  } else {
    dotsContainer.classList.add('error');
    setTimeout(() => {
      dotsContainer.classList.remove('error');
      currentInput = "";
      updateDots();
    }, 500); 
  }
}


// ================= 2. 强制横屏逻辑 =================
function updateOrientation() {
  if (!gameWrapper) return;
  
  // 判断是否为移动端（屏幕较窄）
  const isMobile = window.innerWidth < 1024;
  
  if (isMobile) {
    gameWrapper.classList.add('mobile-landscape');
    
    // 如果物理屏幕是竖屏（高 > 宽），则强制旋转
    if (window.innerHeight > window.innerWidth) {
      gameWrapper.classList.add('force-landscape');
    } else {
      gameWrapper.classList.remove('force-landscape');
    }
  } else {
    // 电脑端不需要旋转
    gameWrapper.classList.remove('mobile-landscape');
    gameWrapper.classList.remove('force-landscape');
  }
}

// 监听窗口大小改变和屏幕旋转事件
window.addEventListener('resize', updateOrientation);
window.addEventListener('orientationchange', () => {
  // 延迟一小点执行，确保浏览器已经更新了宽高数据
  setTimeout(updateOrientation, 100);
});


// ================= 3. 主界面“开始回忆”逻辑 =================
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
