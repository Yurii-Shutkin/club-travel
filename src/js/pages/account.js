import '@/js/layout/burger-menu.js';
import '@/js/layout/header-account-dropdown.js';
import '@/js/layout/header-scroll-state.js';

import {
  accountOrders as mockAccountOrders,
  accountUser as mockAccountUser,
} from '../../data/account-mock.js';

const ORDERS_PER_PAGE = 9;

const accountPage = document.querySelector('[data-account-page]');
const avatarElement = document.querySelector('[data-account-profile-avatar]');
const nameElement = document.querySelector('[data-account-profile-name]');
const ordersTable = document.querySelector('[data-account-orders-table]');
const ordersEmpty = document.querySelector('[data-account-orders-empty]');
const ordersFooter = document.querySelector('[data-account-orders-footer]');
const ordersBody = document.querySelector('[data-account-orders-body]');
const ordersCounter = document.querySelector('[data-account-orders-counter]');
const currentPageElement = document.querySelector('[data-account-orders-page]');
const totalPagesElement = document.querySelector(
  '[data-account-orders-total-pages]',
);
const prevButton = document.querySelector('[data-account-orders-prev]');
const nextButton = document.querySelector('[data-account-orders-next]');
const logoutButton = document.querySelector('[data-account-logout]');

const accountState = {
  user: null,
  orders: [],
  currentPage: 1,
};

const statusLabels = {
  paid: 'Оплачено',
  processing: 'В обработке',
};

function getCurrentUser() {
  return mockAccountUser;
}

function getUserOrders() {
  return mockAccountOrders;
}

function getUserFullName(user) {
  return `${user.firstName || ''} ${user.lastName || ''}`.trim();
}

function getUserInitials(user) {
  const firstInitial = user.firstName ? user.firstName[0] : '';
  const lastInitial = user.lastName ? user.lastName[0] : '';

  return `${firstInitial}${lastInitial}`.toUpperCase();
}

function renderUser(user) {
  if (!avatarElement || !nameElement || !user) {
    return;
  }

  const userFullName = getUserFullName(user);
  const userInitials = getUserInitials(user);

  nameElement.textContent = userFullName || 'Пользователь';

  if (user.avatar) {
    avatarElement.innerHTML = `
      <img
        class="account-profile__avatar-img"
        src="${user.avatar}"
        alt="${userFullName || 'Пользователь'}"
      />
    `;

    return;
  }

  avatarElement.innerHTML = `
    <span class="account-profile__avatar-initials">
      ${userInitials || 'U'}
    </span>
  `;
}

function getTotalPages() {
  return Math.ceil(accountState.orders.length / ORDERS_PER_PAGE);
}

function getVisibleOrders() {
  const startIndex = (accountState.currentPage - 1) * ORDERS_PER_PAGE;
  const endIndex = startIndex + ORDERS_PER_PAGE;

  return accountState.orders.slice(startIndex, endIndex);
}

function setOrdersEmptyState(isEmpty) {
  if (ordersTable) {
    ordersTable.hidden = isEmpty;
  }

  if (ordersFooter) {
    ordersFooter.hidden = isEmpty;
  }

  if (ordersEmpty) {
    ordersEmpty.hidden = !isEmpty;
  }
}

function renderOrders() {
  if (!ordersBody) {
    return;
  }

  if (accountState.orders.length === 0) {
    ordersBody.innerHTML = '';
    setOrdersEmptyState(true);
    return;
  }

  setOrdersEmptyState(false);

  const visibleOrders = getVisibleOrders();

  ordersBody.innerHTML = visibleOrders
    .map(order => {
      const statusText = statusLabels[order.status] || order.status;

      return `
        <tr class="account-orders__row">
          <td class="account-orders__cell">${order.id}</td>
          <td class="account-orders__cell">${order.amount}</td>
          <td class="account-orders__cell">${order.email}</td>
          <td class="account-orders__cell">
            <span class="account-orders__status account-orders__status_${order.status}">
              ${statusText}
            </span>
          </td>
          <td class="account-orders__cell">${order.date}</td>
        </tr>
      `;
    })
    .join('');
}

function renderPagination() {
  if (accountState.orders.length === 0) {
    return;
  }

  const totalPages = getTotalPages();
  const shownOrdersCount = Math.min(
    accountState.currentPage * ORDERS_PER_PAGE,
    accountState.orders.length,
  );

  if (ordersCounter) {
    ordersCounter.textContent = `Показано ${shownOrdersCount} из ${accountState.orders.length}`;
  }

  if (currentPageElement) {
    currentPageElement.textContent = accountState.currentPage;
  }

  if (totalPagesElement) {
    totalPagesElement.textContent = totalPages;
  }

  if (prevButton) {
    prevButton.disabled = accountState.currentPage === 1;
  }

  if (nextButton) {
    nextButton.disabled = accountState.currentPage === totalPages;
  }
}

function syncOrdersTableMinHeight() {
  if (!ordersTable || accountState.orders.length === 0) {
    return;
  }

  const activePage = accountState.currentPage;

  if (activePage !== 1) {
    accountState.currentPage = 1;
    renderOrders();
  }

  ordersTable.style.minHeight = '';
  const firstPageHeight = ordersTable.getBoundingClientRect().height;
  ordersTable.style.minHeight = `${Math.ceil(firstPageHeight)}px`;

  if (activePage !== 1) {
    accountState.currentPage = activePage;
    renderOrders();
  }
}

function updateOrdersView() {
  renderOrders();
  renderPagination();
}

function initPagination() {
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      if (accountState.currentPage === 1) {
        return;
      }

      accountState.currentPage -= 1;
      updateOrdersView();
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      if (accountState.currentPage === getTotalPages()) {
        return;
      }

      accountState.currentPage += 1;
      updateOrdersView();
    });
  }
}

function initLogout() {
  if (!logoutButton) {
    return;
  }

  logoutButton.addEventListener('click', () => {
    window.location.href = '/club-travel/';
  });
}

function initAccountPage() {
  accountState.user = getCurrentUser();
  accountState.orders = getUserOrders();
  accountState.currentPage = 1;

  renderUser(accountState.user);
  updateOrdersView();
  syncOrdersTableMinHeight();

  window.addEventListener('resize', syncOrdersTableMinHeight);

  initPagination();
  initLogout();
}

if (accountPage) {
  initAccountPage();
}
