let newValue;
let word = [];
let letters;

document.querySelector('button').addEventListener('click', function () {
  let inputValue = document.querySelector('input').value;

  newValue = inputValue;
  for (var i = 0; i < newValue.length; i++) {
    word.push(newValue.charAt(i));
  }

  letters = word.map(letter => `<span class="word_inner">${letter}</span><br>`);
  document.querySelector('form').insertAdjacentHTML('afterEnd', letters.join(' '));
  document.querySelector('input').value = '';
  word = [];
  letters = '';

  if (document.querySelectorAll('.word_inner')) {
    for (let i = 0; i < document.querySelectorAll('.word_inner').length; i++) {
      let charItem = document.querySelectorAll('.word_inner')[i];
      charItem.onmousedown = function (event) {
        let shiftX = event.clientX - charItem.getBoundingClientRect().left;
        let shiftY = event.clientY - charItem.getBoundingClientRect().top;
        charItem.style.position = 'absolute';
        charItem.style.zIndex = 1000;
        document.body.append(charItem);
        moveAt(event.pageX, event.pageY);
        // moves the word at (pageX, pageY) coordinates
        // taking initial shifts into account
        function moveAt(pageX, pageY) {
          charItem.style.left = pageX - shiftX + 'px';
          charItem.style.top = pageY - shiftY + 'px';
        }
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }
        // move the word on mousemove
        document.addEventListener('mousemove', onMouseMove);
        // drop the word, remove unneeded handlers
        charItem.onmouseup = function () {
          document.removeEventListener('mousemove', onMouseMove);
          charItem.onmouseup = null;
        };
      };
    }
    document.querySelectorAll('.word_inner').ondragstart = function () {
      return false;
    };
  }
});
