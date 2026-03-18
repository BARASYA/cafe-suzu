document.addEventListener('DOMContentLoaded', () => {

    // 監視する要素（fade-inクラスがついているもの）を取得
    const fadeElements = document.querySelectorAll('.fade-in');

    // オプション設定
    const options = {
        root: null, // ビューポートをルートとする
        rootMargin: '0px',
        threshold: 0.1 // 要素が10%見えたら発火
    };

    // 交差監視（IntersectionObserver）の定義
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // 画面に入ったら
            if (entry.isIntersecting) {
                // visibleクラスをつけてCSSアニメーションを開始
                entry.target.classList.add('visible');
                // 一度表示したら監視を解除
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // 各要素を監視対象に登録
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // スムーズスクロール（ページ内リンクをクリックした時の動き）
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});