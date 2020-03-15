const navigationBar = document.querySelector('.header__navigation');

const onClick = ({ target } = event) => {
  const activeNavLink = document.querySelector('.navigation__item-link--active');

  if (target.classList.contains('navigation__item-link')) {
      console.log('link')
    activeNavLink.classList.remove('navigation__item-link--active');
    target.classList.add('navigation__item-link--active');
  }
};

document.addEventListener('click', onClick);
