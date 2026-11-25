document.addEventListener('DOMContentLoaded', ()=>{
    const lessonsActiveSlide = document.querySelector('.less-active')
    const lessonsSlideLength = document.querySelector('.less-length')

    const webinarsActiveSlide = document.querySelector('.web-active')
    const webinarsSlideLength = document.querySelector('.web-length')

    const otherActiveSlide = document.querySelector('.other-active')
    const otherSlideLength = document.querySelector('.other-length')

    const priceActiveSlide = document.querySelector('.price-active')
    const priceSlideLength = document.querySelector('.price-length')

    const sliderTabs = document.querySelectorAll('.slider-tab')
    const sliders = document.querySelectorAll('.swiper-outher')

    function changeSliderNums(activeSlide, slideLength, sliderIndex){
      activeSlide.innerHTML = `0${swiper[sliderIndex].activeIndex +1}`
      slideLength.innerHTML = `/0${swiper[sliderIndex].slides.length}`
    }

    const pricePagination = document.querySelector('.price-pagination')

    
    function changeSliderNumsPrice(activeSlide, slideLength){
      activeSlide.innerHTML = `0${priceSwiper.activeIndex +1}`
      slideLength.innerHTML = `/0${pricePagination.children.length}`
    }
    const swiper = new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination',
        },
        navigation: {
          nextEl: '.slider-button-next',
          prevEl: '.slider-button-prev',
        },
        grabCursor: true,
        init: false
      });
      window.addEventListener('resize', ()=>{
        changeSliderNumsPrice(priceActiveSlide, priceSlideLength)
      })
      const priceSwiper = new Swiper('.price-swiper',{
        autoHeight: true,
        navigation: {
          nextEl: '.price-next',
          prevEl: '.price-prev',
        },
        pagination: {
          el: '.price-pagination',
        },
        breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 25
          },
          // when window width is >= 480px
          768: {
            slidesPerView: 2,
            spaceBetween: 25
          },
          // when window width is >= 640px
          1200: {
            slidesPerView: 3,
            spaceBetween: 25
          }
        }

      })
      priceSwiper.init()
      swiper[0].init()
      changeSliderNums(lessonsActiveSlide, lessonsSlideLength, 0)

      swiper[0].on('slideChange', ()=>{
        changeSliderNums(lessonsActiveSlide, lessonsSlideLength, 0)
      })
      swiper[1].on('slideChange', ()=>{
        changeSliderNums(webinarsActiveSlide, webinarsSlideLength, 1)
      })
      swiper[2].on('slideChange', ()=>{
        changeSliderNums(otherActiveSlide, otherSlideLength, 2)
      })

      priceSwiper.on('slideChange', ()=>{
        changeSliderNumsPrice(priceActiveSlide, priceSlideLength)
      })
      const webinarMobile = document.querySelectorAll('.webinar-slide-mobile')
      const otherMobile = document.querySelectorAll('.other-slide-mobile')

      const webinarDesktop = document.querySelectorAll('.webinar-slide')
      const otherDesktop = document.querySelectorAll('.other-slide')

      let webinarFlag = true
      let otherFlag = true
      let firstFlag = true

      sliderTabs.forEach(tab => {
        tab.addEventListener('click', ()=>{
          sliderTabs.forEach(el => {
            el.classList.remove('active')
          })
          tab.classList.add('active')

          const activeIndex = tab.dataset.index
          sliders.forEach(el => {
            el.classList.remove('active')
          })
          sliders.forEach(slider => {
            if(slider.dataset.index === activeIndex){
              slider.classList.add('active')
              swiper[activeIndex].init()
              if(activeIndex == 1 || activeIndex == 2){
                if(window.matchMedia('(min-width: 576px)').matches){
                  swiper[activeIndex].pagination.destroy()
                  if(activeIndex == 1){
                    webinarMobile.forEach(slide => {
                      slide.remove()
                      swiper[activeIndex].update()
                    })
                  }else{
                    otherMobile.forEach(slide => {
                      slide.remove()
                      swiper[activeIndex].update()
                    })
                  }
                }else if(firstFlag){
                  if(activeIndex == 1 && webinarFlag){
                    webinarDesktop.forEach(slide => {
                      slide.remove()
                      swiper[activeIndex].update()
                    })
                    webinarFlag = false
                  }else if(otherFlag){
                    otherDesktop.forEach(slide => {
                      slide.remove()
                      swiper[activeIndex].update()
                    })
                    otherFlag = false
                  }
                  if(!webinarFlag && !otherFlag){
                    firstFlag = false
                  }
                }
                if(activeIndex == 1){
                  changeSliderNums(webinarsActiveSlide, webinarsSlideLength, 1)
                }else{
                  changeSliderNums(otherActiveSlide, otherSlideLength, 2)
                }
              }
            }
          });
        })
      })

    const thingsButtons = document.querySelectorAll('.th-item-name')

    thingsButtons.forEach(element => {
        element.addEventListener('click', ()=>{
            element.classList.toggle('active')
        })
    });
    const introTitle = document.querySelector('.intro-title')
    const underSection = document.querySelector('.understand')
    const developSection = document.querySelector('.development')
    const compareSection = document.querySelector('.compare')
    const reviewsSection = document.querySelector('.reviews')
    const footerSection = document.querySelector('.footer')
    const underNavigation = document.querySelector('.understand-pagination')
    const activeSection = underNavigation.querySelector('.under-active')
    const priceSection = document.querySelector('.price')
    let understandObserver = new IntersectionObserver(entries => {  
      entries.forEach(entry => {
        if(entry.isIntersecting){
          underNavigation.style.opacity = 1
          
          activeSection.innerHTML = '02'
        }
    })
    }, {  
      root: null,
      rootMargin: '0px', 
      threshold: 0.2
  });
  understandObserver.observe(underSection);

  let titleObserver = new IntersectionObserver(entries => {  
    entries.forEach(entry => {
      if(entry.isIntersecting){
        underNavigation.style.opacity = 0
      }
  })
  }, {  
    root: null,
    rootMargin: '0px', 
    threshold: 0.7
  })
  titleObserver.observe(introTitle);

  let developObserver = new IntersectionObserver(entries => {  
    entries.forEach(entry => {
      if(entry.isIntersecting){
        underNavigation.style.opacity = 1
        
        activeSection.innerHTML = '03'
      }
  })
  }, {  
    root: null,
    rootMargin: '0px', 
    threshold: 0.7
  })
  developObserver.observe(developSection);

  let compareObserver = new IntersectionObserver(entries => {  
    entries.forEach(entry => {
      if(entry.isIntersecting){
        underNavigation.style.opacity = 1
        
        activeSection.innerHTML = '04'
      }
  })
  }, {  
    root: null,
    rootMargin: '0px', 
    threshold: 0.3
  })
  compareObserver.observe(compareSection);

  let reviewsObserver = new IntersectionObserver(entries => {  
    entries.forEach(entry => {
      if(entry.isIntersecting){
        underNavigation.style.opacity = 1
        
        activeSection.innerHTML = '05'
      }
  })
  }, {  
    root: null,
    rootMargin: '0px', 
    threshold: 0.2
  })
  reviewsObserver.observe(reviewsSection);

  let priceObserver = new IntersectionObserver(entries => {  
    entries.forEach(entry => {
      if(entry.isIntersecting){
        underNavigation.style.opacity = 1
        
        activeSection.innerHTML = '06'
      }
  })
  }, {  
    root: null,
    rootMargin: '0px', 
    threshold: 0.2
  })
  priceObserver.observe(priceSection);

  let footerObserver = new IntersectionObserver(entries => {  
    entries.forEach(entry => {
      if(entry.isIntersecting){
        underNavigation.style.opacity = 1
        
        activeSection.innerHTML = '07'
      }
  })
  }, {  
    root: null,
    rootMargin: '0px', 
    threshold: 0.2
  })
  footerObserver.observe(footerSection);
})