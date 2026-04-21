// scroll magic
var ctrl = new ScrollMagic.Controller();
gsap.registerPlugin(ScrollTrigger);


window.onload = function(){
    const mainSwiper = new Swiper('.main_swiper', {
        direction: 'horizontal',
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        speed: 500,
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 0,
        pagination: {
            el: '.swiper-pagination',
            type: 'progressbar',
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });


    const topSwiper = new Swiper('.swiper-top', {
        direction: 'horizontal',
        speed: 500,
        loop: false,
        slidesPerView: 'auto',
        spaceBetween: 16,
        /*scrollbar: {
            el: '.swiper-top .swiper-scrollbar ',
            hide: false
        }*/
    });

    const onepieceSwiper = new Swiper('.swiper-onepiece', {
        direction: 'horizontal',
        speed: 500,
        loop: false,
        slidesPerView: 'auto',
        spaceBetween: 16,
        /*scrollbar: {
            el: '.swiper-onepiece .swiper-scrollbar ',
            hide: false
        }*/
    });

    const accSwiper = new Swiper('.swiper-acc', {
        direction: 'horizontal',
        speed: 500,
        loop: false,
        slidesPerView: 'auto',
        spaceBetween: 16,
        /*scrollbar: {
            el: '.swiper-acc .swiper-scrollbar ',
            hide: false
        }*/
    });


    // coupon //
    TweenMax.set('.coupon_area', { display: 'none', autoAlpha: 0, height: 0, y: -70 });
    TweenMax.set('.coupon_area .__cart', { display: 'none', autoAlpha: 0 });

    var coupon_area = new TimelineLite()
    .to('.coupon_area', 0.01, { display: 'block' }, 1.5)
    .to('.coupon_area', 0.6, { autoAlpha: 1, height:'auto', opacity: 1, y: 0, ease: Power2.easeOut }, 1.5)

    var coupon_area_inner = new ScrollMagic.Scene({
        triggerElement: '.coupon_trigger',
        triggerHook: 0.8,
        reverse: false
    })
    .setTween(coupon_area)
    .addTo(ctrl);



    
    document.querySelector('.btn_close_coupon').addEventListener('click', function() {
        var coupon = new TimelineLite()
        .to('.coupon_area', 0.3, { autoAlpha: 0, height: 0, y: 70, padding: 0 }, 0.1)
        .to('.coupon_area', 0.01, { display: 'none' }, 0.5)
    });

    document.querySelector('.__coupon').addEventListener('click', function() {
        var download = new TimelineLite()
        .to('.coupon_area .__coupon i', 0.3, { autoAlpha: 0 }, 0.1)
        .set('.coupon_area .__coupon i', { backgroundImage: 'url(./img/ic_check.svg)' }, 0.4)        
        .to('.coupon_area .__coupon i', 0.5, { autoAlpha: 1 }, 0.4)

        .to('.coupon_msg', 0.3, { autoAlpha: 0 }, 0.1)
        .set('.coupon_msg', { textContent: '쿠폰 다운이 완료되었습니다.' }, 0.4)
        .to('.coupon_msg', 0.5, { autoAlpha: 1 }, 0.4)

        .to('.coupon_area .__coupon', 0.3, { autoAlpha: 0 }, 2)
        .set('.coupon_area .__cart', { display:'flex' }, 2.3)        
        .to('.coupon_area .__cart', 0.5, { autoAlpha: 1 }, 2.3)

        .to('.coupon_msg', 0.3, { autoAlpha: 0 }, 2)
        .set('.coupon_msg', { textContent: '보고 있던 상품을 장바구니에 담을까요?' }, 2.3)
        .to('.coupon_msg', 0.5, { autoAlpha: 1 }, 2.3)
    });


    function syncFooterWidth() {
    const footerUl = document.querySelector('.footer ul');
    const footInners = document.querySelectorAll('.foot_inner');

    if (!footerUl) return;

    const width = footerUl.getBoundingClientRect().width;

    footInners.forEach(el => {
        el.style.width = width + 'px';
    });
    }
    syncFooterWidth();

    window.addEventListener('resize', syncFooterWidth);




    document.querySelectorAll('.footer li > a').forEach(link => {
        link.addEventListener('click', function(e){
        e.preventDefault();

        const li = this.parentElement;
        const box = li.querySelector('.foot_wrap');
        if(!box) return;

        const isOpen = li.classList.contains('active');

        document.querySelectorAll('.footer li').forEach(item => {
            const b = item.querySelector('.foot_wrap');
            if(b && item !== li){
            item.classList.remove('active');

            b.style.transform = 'translateY(0)';
            b.style.display = 'block';
            b.style.opacity = '0';

            setTimeout(() => {
                b.style.display = 'none';
            }, 300);
            }
        });

        if(!isOpen){
            li.classList.add('active');

            box.style.display = 'block';

            const h = box.offsetHeight;

            // 초기 위치 세팅
            box.style.transform = 'translateY(0)';
            box.style.opacity = '0';

            requestAnimationFrame(() => {
            box.style.transform = `translateY(-${(h + 50)}px)`;
            box.style.opacity = '1';
            });

        } 
        else {
            li.classList.remove('active');

            const h = box.offsetHeight;

            // 현재 위치 고정 후 내려가기
            box.style.transform = `translateY(-${(h + 50)}px)`;

            requestAnimationFrame(() => {
            box.style.transform = 'translateY(0)';
            box.style.opacity = '0';
            });

            setTimeout(() => {
            box.style.display = 'none';
            }, 300);
        }
        });
    });

}