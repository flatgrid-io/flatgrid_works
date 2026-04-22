document.addEventListener('DOMContentLoaded', function(){

    const menuSwiper = new Swiper('.menu_slider', {
        direction: 'horizontal',
        speed: 500,
        loop: false,
        slidesPerView: 'auto',
        spaceBetween: 12,
    });

    const visualSwiper = new Swiper('.visual_slider', {
        direction: 'vertical',
        speed: 500,
        loop: true,
        slidesPerView: 'auto',
        pagination: {
            el: ".swiper-pagination",
        },
    });

    const layerSwiper_1 = new Swiper('.__others', {
        direction: 'horizontal',
        speed: 500,
        loop: false,
        slidesPerView: 'auto',
        centeredSlides: false,
    });

    const layerSwiper_2 = new Swiper('.__last', {
        direction: 'horizontal',
        speed: 500,
        loop: false,
        slidesPerView: 'auto',
        centeredSlides: false,
    });

    const layerSwiper_3 = new Swiper('.__popular', {
        direction: 'horizontal',
        speed: 500,
        loop: false,
        slidesPerView: 'auto',
        centeredSlides: false,
    });
    

    (() => {
        const layerPopup = document.querySelector('.layer_popup');
        const dimmed = document.querySelector('.__dimmed');
        const handle = layerPopup?.querySelector('.__handle');

        if (!layerPopup || !dimmed) return;

        let startY = 0;
        let currentY = 0;
        let isDragging = false;
        let hasDragged = false;

        const threshold = 50;

        const openLayer = () => {
            layerPopup.classList.add('is-active');
            layerPopup.classList.remove('__shrink');
            dimmed.classList.add('is-active');
        };

        const closeLayer = () => {
            layerPopup.classList.remove('is-active');
            layerPopup.classList.add('__shrink');
            dimmed.classList.remove('is-active');
        };

        const toggleLayer = () => {
            if (layerPopup.classList.contains('is-active')) {
                closeLayer();
            } else {
                openLayer();
            }
        };

        /* 터치 이벤트 */
        layerPopup.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            isDragging = true;
            hasDragged = false;
        });

        layerPopup.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentY = e.touches[0].clientY;
            hasDragged = true;
        });

        layerPopup.addEventListener('touchend', () => {
            if (!isDragging) return;

            const diffY = startY - currentY;

            if (diffY > threshold) {
                openLayer();
            } else if (diffY < -threshold) {
                closeLayer();
            }

            isDragging = false;

            // 클릭 이벤트와 충돌 방지
            setTimeout(() => {
                hasDragged = false;
            }, 0);

            startY = 0;
            currentY = 0;
        });

        handle?.addEventListener('click', () => {
            if (hasDragged) return;
            toggleLayer();
        });

        layerPopup.addEventListener('click', (e) => {
            if (hasDragged) return;

            if (e.target.closest('a, button')) return;

            if (!layerPopup.classList.contains('is-active')) {
                openLayer();
            }
        });

        dimmed.addEventListener('click', closeLayer);

    })();

    // footer //
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

});