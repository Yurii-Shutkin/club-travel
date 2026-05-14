import '@/js/layout/burger-menu.js';
import '@/js/layout/header-account-dropdown.js';
import '@/js/layout/header-scroll-state.js';

const filterInputs = document.querySelectorAll('.sidebar-direction__input');
const cards = document.querySelectorAll('.direction-card');
const filterContainer = document.querySelector('.direction');

filterInputs.forEach(input => {
    input.addEventListener('change', handleFilter);
});

function handleFilter() {
    const allCheckbox = document.querySelector('[value="all"]');
    const checkedInputs = [...filterInputs].filter(i => i.checked && i.value !== 'all');

    freezeHeight();

    if (this.value === 'all') {
        filterInputs.forEach(i => { if (i.value !== 'all') i.checked = false; });
        showCards([...cards]);
        unfreezeHeight();
        return;
    }

    allCheckbox.checked = false;

    const selected = checkedInputs.map(i => i.dataset.country);

    if (selected.length === 0) {
        allCheckbox.checked = true;
        showCards([...cards]);
        unfreezeHeight();
        return;
    }

    const visible = [...cards].filter(card =>
        selected.includes(card.dataset.country)
    );
    const hidden = [...cards].filter(card =>
        !selected.includes(card.dataset.country)
    );

    showCards(visible);
    hideCards(hidden);
    unfreezeHeight();
}

function showCards(list) {
    list.forEach(card => {
        card.style.display = '';
    });
}

function hideCards(list) {
    list.forEach(card => {
        card.style.display = 'none';
    });
}

function freezeHeight() {
    filterContainer.style.minHeight = filterContainer.offsetHeight + 'px';
}

function unfreezeHeight() {
    requestAnimationFrame(() => {
        filterContainer.style.minHeight = '';
    });
}