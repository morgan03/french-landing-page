class TypeWriter{
  constructor(txtElement, words, wait=3000){
    this.txtElement = txtElement;
    this.words = words;
    this.wait = wait;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type(){
    // get current index of word
    const currentI = this.wordIndex % this.words.length;
    // get full text of current word
    const fullText = this.words[currentI];

    // Check if deleting
    if (this.isDeleting){
      // remove char
      this.txt = fullText.substring(0, this.txt.length - 1);
    }
    else{
      // add char
      this.txt = fullText.substring(0, this.txt.length + 1);
    }

    // insert txt into element
    // created new span to add cursor effect
    this.txtElement.innerHTML =  `<span class="txt">${this.txt}</span>`

    // setting the typespeed
    let typeSpeed = 300;

    if (this.isDeleting){
      typeSpeed /= 2;
    }

    // if word is complete
    if (!this.isDeleting && this.txt === fullText){
      // pause at end
      typeSpeed = this.wait;
      this.isDeleting = true;
    }
    else if (this.isDeleting && this.txt === ''){
      this.isDeleting = false;
      this.wordIndex ++;
      // pause before typing again
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }

}

// initialise once dom has finished loading
window.addEventListener('DOMContentLoaded', init);

function init(){
  console.log('This works...');
  const txtElement = document.querySelector('.typewriter-element');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  new TypeWriter(txtElement, words, wait);
}
