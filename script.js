// scroll event 

const scrollAction = () => {
  document.addEventListener('scroll', () => {
    const headerHeight = 94;
    const cursorPosition = window.scrollY + headerHeight;
    const sections = document.querySelectorAll('.content>section');
    const links = document.querySelectorAll('.navigation__item-link');

    sections.forEach((el) => {
      console.log(el.getAttribute('id'));
      el.getAttribute('id');
      console.log('link',links,links[0].getAttribute('href'))

      if (el.offsetTop <= cursorPosition && (el.offsetTop + el.offsetHeight) > cursorPosition) {
        links.forEach((link) => {
          link.classList.remove('navigation__item-link--active');
          console.log(link.getAttribute('href').substring(1))
          if(el.getAttribute('id') === link.getAttribute('href').substring(1)) {
            link.classList.add('navigation__item-link--active');
          }
        });
      }
    });
  });
};

// header navigation

const onNavigationClick = () => {
  document.querySelector('.navigation').addEventListener('click', ({target} = event) => {
    event.preventDefault();

    const activeItem = document.querySelector('.navigation__item-link--active');

    if (target.classList.contains('navigation__item-link')) {
      activeItem.classList.remove('navigation__item-link--active');
      target.classList.add('navigation__item-link--active');
      
      const headerHeight = 94;
      const anchorValue = target.getAttribute('href');
      const elementOffsetTopValue = document.querySelector(anchorValue).offsetTop;

      window.scrollTo(0, elementOffsetTopValue - headerHeight);
    }  
  });
};

// tags action

const onTagsClick = () => {
  const projectsWrapper = document.querySelector('.projects');
  document.querySelector('.portfolio__tags').addEventListener('click', ({target} = event) => {
    const activeTag = document.querySelector('.tag--active');

    if (target.classList.contains('tag')) {
      activeTag.classList.remove('tag--active');
      target.classList.add('tag--active');
      
      const reorderedProjectList = reorderProjectsItems();

      projectsWrapper.innerHTML = '';
      const template = document.createDocumentFragment();
 
      reorderedProjectList.forEach((element) => {
        template.appendChild(element);
      });
    
      projectsWrapper.appendChild(template);
    }  
  });
};

const reorderProjectsItems = () => {
  const projects = document.querySelectorAll('.projects .projects__item');

  const projectsArr = [...projects].reverse();
  return projectsArr;
};


// iphone screens action

const addBlackScreen = () => {  
  const firstBlackScreen = document.querySelector('.slider__black-screen--first');
  const secondBlackScreen = document.querySelector('.slider__black-screen--second');

  document.querySelector('.slider__images').addEventListener('click', ({target} = event) => {

    if (target.classList.contains('slider__phone-button--first')) {
      if (firstBlackScreen.classList.contains('invisible')) {
        firstBlackScreen.classList.remove('invisible');
      } else {
        firstBlackScreen.classList.add('invisible');
      }      
    } 
    
    if (target.classList.contains('slider__phone-button--second')) {
      if (secondBlackScreen.classList.contains('invisible')) {
        secondBlackScreen.classList.remove('invisible');
      } else {
        secondBlackScreen.classList.add('invisible');
      }      
    }

    if (target.classList.contains('slider__black-screen')) {
      if (target.classList.contains('invisible')) {
        target.classList.remove('invisible');
      } else {
        target.classList.add('invisible');
      }
    } 
  });
};

// form popup

const popupAction = () => {  
  document.querySelector('.form').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const subject = document.querySelector('.input__subject').value;
    const description = document.querySelector('.textarea').value;
    
    let subjectTemplate;
    let descriptionTemplate;

    if (subject) {
      subjectTemplate = `<p class='popup__subject'>Subject: <span class='popup__name'>${subject}</span></p>`;
    } else {
      subjectTemplate = `<p>Without subject</p>`;
    }

    if (description) {
      descriptionTemplate = `<p class='popup__desc'>Description: <span class='popup__desc-name'>${description}</span></p>`
    } else {
      descriptionTemplate = `<p>Without description</p>`;
    }

    const template = `
      <div class='popup'>
        <div class='popup__content'>      
          <p class='popup__title'>The letter was sent</p>
          ${subjectTemplate}
          ${descriptionTemplate}
          <button class='button popup__button'>OK</button>
        </div>
      </div>`;

      const contentWrapper = document.querySelector('.content');
      const popup = createElement(template);

      contentWrapper.appendChild(popup);
      closePopup();
  });  
};

const createElement = (template) => {
  const newElement = document.createElement('template');
  newElement.innerHTML = template;
  return newElement.content.children[0];
};

const closePopup = () => {
  document.querySelector('.popup__button').addEventListener('click', () => {
    const popup = document.querySelector('.popup');
    document.querySelector('.content').removeChild(popup);    
  })
};

// slider

const sliderAction = () => {
  const items = document.querySelectorAll('.slider__item');
  let currentItem = 0;  

  document.querySelector('.slider__button--prev').addEventListener('click', () => {
    items[currentItem].classList.add('hidden');
  
    if (items[currentItem - 1]) {
      items[currentItem - 1].classList.remove('hidden');
      currentItem -= 1;
    } else {
      items[items.length - 1].classList.remove('hidden');
      currentItem = items.length - 1;
    } 

    changeSliderBackground(currentItem);
  });

  document.querySelector('.slider__button--next').addEventListener('click', () => {
    items[currentItem].classList.add('hidden');
  
    if (items[currentItem + 1]) {
      items[currentItem + 1].classList.remove('hidden');
      currentItem += 1;
    } else {
      items[0].classList.remove('hidden');
      currentItem = 0;
    }
    
    changeSliderBackground(currentItem);
  });

  const changeSliderBackground = (number) => {
    const slider = document.querySelector('.slider');

    if (number === 1) {
      slider.style.backgroundColor = '#648bf0';
    } else {      
      slider.style.backgroundColor = '#f06c64'; 
    }
  };
};

window.onload = () => {
  onNavigationClick();
  onTagsClick();
  addBlackScreen();
  popupAction();
  sliderAction();
  scrollAction();
};
