window.onload = () => {
  onNavigationClick();
  onTagsClick();
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