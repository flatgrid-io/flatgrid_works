document.addEventListener('DOMContentLoaded', function(){

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