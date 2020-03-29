// header menu action

const addOverlay = () => {  
  const contentWrapper = document.querySelector('.content');
  
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  contentWrapper.appendChild(overlay);
};

const closeMenu = () => {
  const contentWrapper = document.querySelector('.content');
  const menuButton = document.querySelector('.header__button');
  const menuWrapper = document.querySelector('.header__wrapper');
  const navigation = document.querySelector('.header__navigation');
  
  menuButton.classList.remove('header__button--opened');
  menuWrapper.classList.remove('header__wrapper--opened');
  navigation.classList.remove('header__navigation--opened');

  const overlay = contentWrapper.querySelector('.overlay');
  if (overlay) {    
    contentWrapper.removeChild(overlay);
  }
};

const headerMenuAction = () => {  
  const menuButton = document.querySelector('.header__button');
  const menuWrapper = document.querySelector('.header__wrapper');
  const navigation = document.querySelector('.header__navigation');
  const content = document.querySelector('.content');

  const openMenu = () => {
    menuButton.classList.add('header__button--opened');
    menuWrapper.classList.add('header__wrapper--opened');
    navigation.classList.add('header__navigation--opened');
    addOverlay();
  };

  navigation.addEventListener('click', ({target} = event) => {    
    if (target.classList.contains('navigation__item-link')) {
      closeMenu();
    }
  });

  menuButton.addEventListener('click', () => {
    if (menuButton.classList.contains('header__button--opened')) {
      closeMenu();
    } else {
      openMenu();
    } 
  });
};

// scroll event 

const scrollAction = () => {
  document.addEventListener('scroll', (event) => {
    const headerWrapper = document.querySelector('.header__wrapper');
    const popup = document.querySelector('.popup');

    if (popup) {
      event.preventDefault();
      window.scrollTo(0, 0);
    }

    if (headerWrapper.classList.contains('header__wrapper--opened')) {
      event.preventDefault();
      window.scrollTo(0, 0);
    } 
    
    const headerHeight = 94;
    const cursorPosition = window.scrollY + headerHeight;
    const sections = document.querySelectorAll('.content>section');
    const links = document.querySelectorAll('.navigation__item-link');

    sections.forEach((el) => {
      el.getAttribute('id');

      if (el.offsetTop <= cursorPosition && (el.offsetTop + el.offsetHeight) > cursorPosition) {
        links.forEach((link) => {
          link.classList.remove('navigation__item-link--active');
            
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

      const headerHeight = document.querySelector('.header').offsetHeight;
      
      const anchorValue = target.getAttribute('href');
      const elementOffsetTopValue = document.querySelector(anchorValue).offsetTop;

      window.scrollTo(0, elementOffsetTopValue - headerHeight);
    } 
    
    if (document.documentElement.clientWidth < 687) {
      closeMenu();
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
      document.querySelector('.form').reset();
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
  let isEnabled = true;

  const changeCurrentItem = (n) => {
    currentItem = (n + items.length) % items.length;
  };

  const hideItem = (direction) => {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener('animationend', function() {
      this.classList.remove('active', direction);
    });
  };

  const showItem = (direction) => {
    items[currentItem].classList.add('next', direction);
    items[currentItem].addEventListener('animationend', function() {
      this.classList.remove('next', direction);
      this.classList.add('active');
      isEnabled = true;
    });
  };

  const nextItem = (n) => {
    hideItem('to-left');
    changeCurrentItem(n + 1);
    showItem('from-right');
    
    changeBgColor();    
  };

  const previousItem = (n) => {
    hideItem('to-right');
    changeCurrentItem(n - 1);
    showItem('from-left');
    
    changeBgColor();    
  };

  const changeBgColor = () => {
    const activeItem = document.querySelector('.active');
    const sliderWrapper = document.querySelector('.slider');

    if (items[currentItem].classList.contains('slider__item--blue')) {
      sliderWrapper.classList.add('slider--bg-blue');
    } else {
      sliderWrapper.classList.remove('slider--bg-blue');
    }
  };

  document.querySelector('.slider__button--prev').addEventListener('click', () => {
    if (isEnabled) {
      previousItem(currentItem);
    }
  });

  document.querySelector('.slider__button--next').addEventListener('click', () => {
    if (isEnabled) {
      nextItem(currentItem);
    }
  });
};

const switchActiveProjectItem = () => {
  const projects = document.querySelector('.projects');

  const removeActiveItem = () => {
    const activeItem = projects.querySelector('.projects__item--active');
    if (activeItem) {      
      activeItem.classList.remove('projects__item--active');
    }
  };
  
  projects.addEventListener('click', (event) => {
    const target = event.path[1];
    removeActiveItem();

    if (target.classList.contains('projects__item')) {
      if (!target.classList.contains('projects__item--active')) {
        target.classList.add('projects__item--active');
      }
    }
  });
};

window.onload = () => {
  onNavigationClick();
  onTagsClick();
  addBlackScreen();
  popupAction();
  sliderAction();
  scrollAction();
  headerMenuAction();
  switchActiveProjectItem();
};
