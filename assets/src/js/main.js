// main.js - تشغيل دورة تغيير الكلمة (بسرعة مريحة)
(function() {
  function initWordCycler() {
    const wordElement = document.getElementById('dynamicWord');
    if (!wordElement) {
      console.error('Element with id "dynamicWord" not found');
      return;
    }
    
    const wordList = ['brand', 'portfolio', 'market'];
    let currentIndex = 0;
    
    function updateWord(nextIndex) {
      const nextWord = wordList[nextIndex];
      
      // 1. إضافة حركة الخروج
      wordElement.classList.remove('enter');
      wordElement.classList.add('exit');
      
      // 2. بعد 350 مللي ثانية (نصف مدة الحركة تقريباً)، استبدل النص وابدأ الدخول
      setTimeout(() => {
        wordElement.textContent = nextWord;
        wordElement.classList.remove('exit');
        wordElement.classList.add('enter');
        
        // 3. إزالة كلاس الدخول بعد انتهاء الحركة (500 مللي)
        setTimeout(() => wordElement.classList.remove('enter'), 500);
      }, 350);
    }
    
    function cycle() {
      const nextIndex = (currentIndex + 1) % wordList.length;
      updateWord(nextIndex);
      currentIndex = nextIndex;
    }
    
    // ▶️ زيادة الفاصل الزمني إلى 6 ثوانٍ (6000 مللي)
    setInterval(cycle, 3000);
  }
  
  document.addEventListener('DOMContentLoaded', initWordCycler);
})();