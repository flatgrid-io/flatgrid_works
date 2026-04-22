document.addEventListener('DOMContentLoaded', function(){

    const topSwiper = new Swiper('.swiper-top', {
        direction: 'horizontal',
        speed: 500,
        loop: false,
        slidesPerView: 'auto',
        spaceBetween: 16,
        scrollbar: {
            el: '.swiper-top .swiper-scrollbar ',
            hide: false
        }
    });

    const onepieceSwiper = new Swiper('.swiper-onepiece', {
        direction: 'horizontal',
        speed: 500,
        loop: false,
        slidesPerView: 'auto',
        spaceBetween: 16,
        scrollbar: {
            el: '.swiper-onepiece .swiper-scrollbar ',
            hide: false
        }
    });

    const accSwiper = new Swiper('.swiper-acc', {
        direction: 'horizontal',
        speed: 500,
        loop: false,
        slidesPerView: 'auto',
        spaceBetween: 16,
        scrollbar: {
            el: '.swiper-acc .swiper-scrollbar ',
            hide: false
        }
    });


    // popup //
    const wrap = document.querySelector('.select_wrap');
    const btn = wrap.querySelector('.select_btn');
    const list = wrap.querySelector('.select_list');
    const select = wrap.querySelector('.real_select');
    const popup = document.querySelector('.popup');

    const initialValue = select.value || "3";

    btn.addEventListener('click', () => {
        popup.classList.contains('is-active') ? closePopup() : openPopup();
    });

    function openPopup() {
        popup.classList.add('is-show');

        requestAnimationFrame(() => {
            popup.classList.add('is-active');
        });
    }

    function closePopup() {
        popup.classList.remove('is-active');

        setTimeout(() => {
            popup.classList.remove('is-show');
        }, 300);
    }


    const grid = document.querySelector('.item_wrap');
    const itemWrap = document.querySelector('.item_wrap ul');

    const gridConfig = {
        1: 12,
        2: 12,
        3: 12,
        4: 24,
        5: 35,
        6: 48
    };

    // create //
    const totalItems = 48;

    function createItems() {
        for (let num = 1; num <= totalItems; num++) {
            const li = document.createElement('li');
            li.className = '__item';

            li.innerHTML = `
                <article>
                    <a href="#">
                        <div class="visual_area"> 
                            <img src="./img/item_${String(num).padStart(2, '0')}.png" alt="item ${num}">
                            <button type="button" class="btn_plus" aria-label="상품 보기">
                                <span aria-hidden="true">plus</span>
                            </button>
                        </div>
                    </a>
                </article>
            `;

            itemWrap.appendChild(li);
        }
    }

    // grid //
    function updateGridClass(value) {
        grid.classList.forEach(cls => {
            if (cls.startsWith('grid_')) {
                grid.classList.remove(cls);
            }
        });

        grid.classList.add(`grid_${value}`);
    }

    function updateItemLength(value) {
        const items = document.querySelectorAll('.item_wrap .__item');
        const visibleCount = gridConfig[value];

        items.forEach((item, index) => {
            item.style.display = index < visibleCount ? 'block' : 'none';
        });
    }

    // list //
    list.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', () => {
            const value = item.dataset.value;

            select.value = value;
            select.dispatchEvent(new Event('change'));

            updateGridClass(value);
            updateItemLength(value);

            closePopup();
        });
    });

    createItems();

    updateGridClass(initialValue);
    updateItemLength(initialValue);


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