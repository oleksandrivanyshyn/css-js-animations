let pattern = document.querySelector('.bg');

window.addEventListener('scroll', () => {console.log(pattern.style.backgroundPosition); pattern.style.backgroundPosition = window.scrollY + 'px'  });
