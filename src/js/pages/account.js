import '@/js/layout/burger-menu.js';
import '@/js/layout/header-account-dropdown.js';
import '@/js/layout/header-scroll-state.js';
import { initGuard } from '@/js/services/user/guard.js';
import { auth } from '@/js/services/user/auth.js';

import {
  accountOrders as mockAccountOrders,
  accountUser as mockAccountUser,
} from '../../data/account-mock.js';

const ORDERS_PER_PAGE = 9;
const STATUS_LABELS = { paid: 'Оплачено', processing: 'В обработке' };

const accountPage = document.querySelector('[data-account-page]');

if (accountPage) {
  const state = { user: mockAccountUser, orders: mockAccountOrders, page: 1 };

  const elements = {
    avatar: document.querySelector('[data-account-profile-avatar]'),
    name: document.querySelector('[data-account-profile-name]'),
    table: document.querySelector('[data-account-orders-table]'),
    empty: document.querySelector('[data-account-orders-empty]'),
    footer: document.querySelector('[data-account-orders-footer]'),
    body: document.querySelector('[data-account-orders-body]'),
    counter: document.querySelector('[data-account-orders-counter]'),
    currentPage: document.querySelector('[data-account-orders-page]'),
    totalPages: document.querySelector('[data-account-orders-total-pages]'),
    prev: document.querySelector('[data-account-orders-prev]'),
    next: document.querySelector('[data-account-orders-next]'),
    logout: document.querySelector('[data-account-logout]'),
  };

  const totalPages = () => Math.ceil(state.orders.length / ORDERS_PER_PAGE);
  const visibleOrders = () => {
    const start = (state.page - 1) * ORDERS_PER_PAGE;
    return state.orders.slice(start, start + ORDERS_PER_PAGE);
  };

  const fullName = ({ firstName = '', lastName = '' }) =>
    `${firstName} ${lastName}`.trim() || 'Пользователь';

  const initials = ({ firstName = '', lastName = '' }) =>
    `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase() || 'U';

  const renderUser = user => {
    if (!elements.avatar || !elements.name || !user) return;

    const name = fullName(user);
    elements.name.textContent = name;
    elements.avatar.innerHTML = user.avatar
      ? `<img class="account-profile__avatar-img" src="${user.avatar}" alt="${name}" />`
      : `<span class="account-profile__avatar-initials">${initials(user)}</span>`;
  };

  const setEmptyState = isEmpty => {
    if (elements.table) elements.table.hidden = isEmpty;
    if (elements.footer) elements.footer.hidden = isEmpty;
    if (elements.empty) elements.empty.hidden = !isEmpty;
  };

  const renderOrders = () => {
    if (!elements.body) return;
    if (!state.orders.length) {
      elements.body.innerHTML = '';
      setEmptyState(true);
      return;
    }

    setEmptyState(false);
    elements.body.innerHTML = visibleOrders()
      .map(
        ({ id, amount, email, status, date }) => `
          <tr class="account-orders__row">
            <td class="account-orders__cell">${id}</td>
            <td class="account-orders__cell">${amount}</td>
            <td class="account-orders__cell">${email}</td>
            <td class="account-orders__cell">
              <span class="account-orders__status account-orders__status_${status}">
                ${STATUS_LABELS[status] || status}
              </span>
            </td>
            <td class="account-orders__cell">${date}</td>
          </tr>
        `,
      )
      .join('');
  };

  const renderPagination = () => {
    if (!state.orders.length) return;

    const pages = totalPages();
    const shown = Math.min(state.page * ORDERS_PER_PAGE, state.orders.length);

    if (elements.counter) {
      elements.counter.textContent = `Показано ${shown} из ${state.orders.length}`;
    }
    if (elements.currentPage) elements.currentPage.textContent = state.page;
    if (elements.totalPages) elements.totalPages.textContent = pages;
    if (elements.prev) elements.prev.disabled = state.page === 1;
    if (elements.next) elements.next.disabled = state.page === pages;
  };

  const render = () => {
    renderOrders();
    renderPagination();
  };

  const syncTableHeight = () => {
    if (!elements.table || !state.orders.length) return;

    const activePage = state.page;
    if (activePage !== 1) {
      state.page = 1;
      renderOrders();
    }

    elements.table.style.minHeight = '';
    const height = elements.table.getBoundingClientRect().height;
    elements.table.style.minHeight = `${Math.ceil(height)}px`;

    if (activePage !== 1) {
      state.page = activePage;
      renderOrders();
    }
  };

  const changePage = delta => {
    const nextPage = state.page + delta;
    if (nextPage < 1 || nextPage > totalPages()) return;
    state.page = nextPage;
    render();
  };

  if (elements.prev)
    elements.prev.addEventListener('click', () => changePage(-1));
  if (elements.next)
    elements.next.addEventListener('click', () => changePage(1));
  if (elements.logout) {
    elements.logout.addEventListener('click', () => {
      window.location.href = '/club-travel/';
    });
  }

  renderUser(state.user);
  render();
  syncTableHeight();
  window.addEventListener('resize', syncTableHeight);
}
