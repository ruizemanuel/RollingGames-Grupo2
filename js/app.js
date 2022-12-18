      // let swiper = new Swiper(".mySwiper", {
      //   effect: "coverflow",
      //   grabCursor: true,
      //   centeredSlides: true,
      //   slidesPerView: "auto",
      //   coverflowEffect: {
      //     rotate: 45,
      //     stretch: 0,
      //     depth: 100,
      //     modifier: 1,
      //     slideShadows: true,
      //   },
      //   pagination: {
      //     el: ".swiper-pagination",
      //   },
      // });


      let swiper = new Swiper(".mySwiper", {
        slidesPerView: 4,
        spaceBetween: 5,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });