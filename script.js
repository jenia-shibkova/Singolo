window.onload = () => {
  onNavigationClick();
  onTagsClick();
  addBlackScreen();
}


const onNavigationClick = () => {
  document.querySelector('.navigation').addEventListener('click', ({target} = event) => {
    const activeItem = document.querySelector('.navigation__item-link--active');

    if (target.classList.contains('navigation__item-link')) {
      activeItem.classList.remove('navigation__item-link--active');
      target.classList.add('navigation__item-link--active');
    }  
  });  
};

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