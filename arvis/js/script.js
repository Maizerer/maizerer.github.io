let statNums;
async function getNums() {
  let response = await fetch('https://arvis.ru.com/api/usersData.php');

  if (response.ok) { 
    statNums = await response.json();
    const arObjects = document.querySelector('.object-nums')
    const cityWrapper = document.querySelector('.city-nums')
    const clientsWrapper = document.querySelector('.client-nums')

    setNums(arObjects, 'object-num', statNums.markersCount)
    setNums(cityWrapper, 'stat-num', statNums.allCitiesCount)
    setNums(clientsWrapper, 'stat-num', statNums.allUsersCount)
  } else{
    console.error('Ошибка при получении данных с API')
  }
}
function setNums(numsWrapper, numClass, nums){
  let tempString = nums + ''
  let arr = tempString.split("");
  let htmlText = '';
  for ( let i=0; i<arr.length; i++ ){
    htmlText += `<div class="${numClass}">${arr[i]}</div>`
  }
  numsWrapper.innerHTML = htmlText
}
document.addEventListener('DOMContentLoaded', async ()=>{
    getNums()
    MicroModal.init();
    const swiper = new Swiper('.swiper-container', {
        // If we need pagination
        slidesPerView: 1,
        spaceBetween: 15,
        navigation: {
          nextEl: '.demo-next',
          prevEl: '.demo-prev',
        },
      });
      const commentsSlider = new Swiper('.comments-slider', {
        navigation: {
          nextEl: '.comment-next',
          prevEl: '.comment-prev',
        },
      }) 
      commentsSlider.destroy(false, true)
      // if (window.matchMedia("(max-width: 767px)").matches) {
      //   commentsSlider.destroy(false, true)
      // }
      swiper.slideNext(0, false)
      const faqLinks = document.querySelectorAll('.faq-item-icon')
      const faqAnswers = document.querySelectorAll('.faq-item-answer')
      let activeAnswer;
      faqLinks.forEach(element => {
        element.addEventListener('click',()=>{
          const itemId = element.dataset.index
          faqAnswers.forEach(answer => {
            const answerId = answer.dataset.for
            if(itemId === answerId){
              answer.classList.add('active')
              activeAnswer = answer
            }
          });
        })
      });
      const faqBackBtns = document.querySelectorAll('.faq-answer-back')
      faqBackBtns.forEach(element => {
        element.addEventListener('click', ()=>{
          activeAnswer.classList.remove('active')
        })
      });
      const hamMenu = document.querySelector('.ham-menu')
      const mobileMenu = document.querySelector('.mobile-nav')
      const cross = document.querySelector('.cross')
      hamMenu.addEventListener('click', ()=>{
        mobileMenu.classList.add('active')
      })
      cross.addEventListener('click', ()=>{
        mobileMenu.classList.remove('active')
      })
      const mobileAnchors = document.querySelectorAll('.mob-anchor')
      mobileAnchors.forEach(element => {
        element.addEventListener('click', ()=>{
          mobileMenu.classList.remove('active')
        })
      });
      const ruLangBtn = document.querySelectorAll('.ru-btn')
      const enLangBtn = document.querySelectorAll('.en-btn')
      const LangBtns = document.querySelectorAll('.lang-btn')
      LangBtns.forEach(element => {
        element.addEventListener('click', event=>{
          event.preventDefault()
          if(event.target.closest('.en-btn')){
            enLangBtn.forEach(element => {
              element.classList.add('active')
            });
            ruLangBtn.forEach(element => {
              element.classList.remove('active')
            });
          }else{
            ruLangBtn.forEach(element => {
              element.classList.add('active')
            });
            enLangBtn.forEach(element => {
              element.classList.remove('active')
            });
          }
        })
      });
      const anchors = document.querySelectorAll('.anchor')
      for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()
            let blockID;
            if (anchor.getAttribute('href')){
              blockID = anchor.getAttribute('href').substr(1)
              document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              })
            } 
        })
      }
      const demoBtns = document.querySelectorAll('.demo-btn')
      const demoSlider = document.querySelector('.comment-slides')
      demoBtns.forEach(element => {
        element.addEventListener('click', ()=>{
          demoSlider.classList.toggle('change')
        })
      });
      const commBtns = document.querySelectorAA('.Scomment-btn')
      const commSlider = document.querySelector('.comment-slides')
      commBtns.forEach(element => {
        element.addEventListener('click', ()=>{
          commSlider.classList.toggle('change')
        })
      });
})