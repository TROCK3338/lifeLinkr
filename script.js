document.addEventListener('DOMContentLoaded', function() {
    // Calendar functionality
    function generateCalendar() {
        const datesContainer = document.getElementById('calendarDates');
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        
        
        const firstDay = new Date(year, month, 1).getDay();
    
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        datesContainer.innerHTML = '';
        
        // Empty cells for days before first day
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('date');
            datesContainer.appendChild(emptyCell);
        }
        
        // Add dates
        for (let day = 1; day <= daysInMonth; day++) {
            const dateCell = document.createElement('div');
            dateCell.classList.add('date');
            dateCell.textContent = day;
            
            if ([5, 12, 19, 26].includes(day)) {
                dateCell.style.backgroundColor = '#dbeafe';
                dateCell.style.color = '#2563eb';
            }
            
            dateCell.addEventListener('click', function() {
                document.querySelectorAll('.date.selected').forEach(el => {
                    el.classList.remove('selected');
                });
                this.classList.add('selected');
            });
            
            datesContainer.appendChild(dateCell);
        }
    }

    // Enhanced calendar visibility control
    function handleCalendarVisibility() {
        const trustedSection = document.getElementById('trustedSection');
        const footerSection = document.getElementById('footerSection');
        const calendarWidget = document.getElementById('calendarWidget');
        
        if (!trustedSection || !footerSection || !calendarWidget) return;
        
        const trustedBottom = trustedSection.offsetTop + trustedSection.offsetHeight;
        const footerTop = footerSection.offsetTop;
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        
        const calendarBottomPosition = scrollY + 520; 
        
        
        const footerBuffer = 100;
        
        
        if (scrollY >= trustedBottom && calendarBottomPosition < (footerTop - footerBuffer)) {
            calendarWidget.classList.add('show');
        } else {
            calendarWidget.classList.remove('show');
        }
    }

    // FAQ Load More functionality
    const loadMoreBtn = document.getElementById('loadMoreFaqs');
    let faqCount = 4;
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            const accordion = document.getElementById('faqAccordion');
            
            const newFaqs = [
                {
                    question: "How long does implementation typically take?",
                    answer: "Most clinics are fully operational within 2-4 weeks, depending on size and complexity."
                },
                {
                    question: "Do you offer customized modules?",
                    answer: "Yes, we develop custom modules to meet specific clinic workflows and requirements."
                },
                {
                    question: "What ongoing costs are involved?",
                    answer: "We offer flexible subscription plans with no hidden fees. Pricing is based on clinic size and features needed."
                }
            ];
            
            newFaqs.forEach((faq, index) => {
                const newId = faqCount + index + 1;
                const faqItem = document.createElement('div');
                faqItem.className = 'accordion-item mb-3';
                faqItem.innerHTML = `
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq${newId}">
                            ${faq.question}
                        </button>
                    </h2>
                    <div id="faq${newId}" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                        <div class="accordion-body">
                            ${faq.answer}
                        </div>
                    </div>
                `;
                accordion.appendChild(faqItem);
            });
            
            faqCount += newFaqs.length;
            
            if (faqCount >= 7) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }
    
    // Initialize
    generateCalendar();
    window.addEventListener('scroll', handleCalendarVisibility);
    window.addEventListener('resize', handleCalendarVisibility); 
    handleCalendarVisibility(); 
});
