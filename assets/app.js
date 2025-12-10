/* assets/script.js */

document.addEventListener('DOMContentLoaded', () => {
    // ตรวจสอบว่าในหน้านั้นมี container หรือไม่ (กัน Error)
    const container = document.querySelector('.book-container');
    const dotsContainer = document.getElementById('dotsContainer');
    
    if (!container || !dotsContainer) return; // ถ้าไม่มีให้จบการทำงาน

    const pages = document.querySelectorAll('.page');

    // 1. สร้างจุด (Dots) ตามจำนวนหน้าจริง
    pages.forEach((page, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        
        // จุดแรกให้ Active เสมอ
        if (index === 0) dot.classList.add('active'); 

        // ฟังก์ชัน: กดจุดแล้วเลื่อนไปหน้านั้น
        dot.addEventListener('click', () => {
            page.scrollIntoView({ behavior: 'smooth' });
        });

        dotsContainer.appendChild(dot);
    });

    // 2. ใช้ Intersection Observer จับว่าเลื่อนถึงหน้าไหนแล้ว
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // หา index ของหน้าที่โชว์อยู่
                const index = Array.from(pages).indexOf(entry.target);

                // ลบ active เก่าออก แล้วใส่ active ใหม่
                const allDots = document.querySelectorAll('.dot');
                if (allDots.length > 0) {
                    allDots.forEach(d => d.classList.remove('active'));
                    if (allDots[index]) {
                        allDots[index].classList.add('active');
                    }
                }
            }
        });
    }, {
        root: container,
        threshold: 0.5 // เห็นหน้าเกิน 50% ให้ถือว่าอยู่หน้านั้น
    });

    pages.forEach(page => observer.observe(page));
});