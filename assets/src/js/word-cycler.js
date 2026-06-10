export function createWordCycler(intervalMs = 3400) {
  const wordElement = document.getElementById('dynamicWord');
  if (!wordElement) throw new Error('Word element not found');
  
  // ⚠️ تأكد من تعريف قائمة الكلمات هنا أو استيرادها من خارج
  const wordList = ['brand', 'portfolio', 'market'];
  
  let currentIndex = 0;
  
  function updateWord(nextIndex) {
    const nextWord = wordList[nextIndex];
    wordElement.classList.remove('enter');
    wordElement.classList.add('exit');
    
    setTimeout(() => {
      wordElement.textContent = nextWord;
      wordElement.classList.remove('exit');
      wordElement.classList.add('enter');
      setTimeout(() => wordElement.classList.remove('enter'), 500);
    }, 295);
  }
  
  function cycle() {
    const nextIndex = (currentIndex + 1) % wordList.length;
    updateWord(nextIndex);
    currentIndex = nextIndex;
  }
  
  const intervalId = setInterval(cycle, intervalMs);
  return { stop: () => clearInterval(intervalId) };
}