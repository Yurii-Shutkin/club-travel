import { accountOrders, accountUser } from '../../data/account-mock.js';

const ORDERS_PER_PAGE = 9;

const accountPage = document.querySelector('[data-account-page]');
const avatarElement = document.querySelector('[data-account-profile-avatar]');
const nameElement = document.querySelector('[data-account-profile-name]');
const emailElement = document.querySelector('[data-account-profile-email]');
const ordersBody = document.querySelector('[data-account-orders-body]');
const ordersCounter = document.querySelector('[data-account-orders-counter]');
const currentPageElement = document.querySelector('[data-account-orders-page]');
const totalPagesElement = document.querySelector(
  '[data-account-orders-total-pages]',
);
const prevButton = document.querySelector('[data-account-orders-prev]');
const nextButton = document.querySelector('[data-account-orders-next]');
const logoutButton = document.querySelector('[data-account-logout]');

let currentPage = 1;

const statusLabels = {
  paid: 'Оплачено',
  processing: 'В обработке',
};

function getUserFullName(user) {
  return `${user.firstName || ''} ${user.lastName || ''}`.trim();
}

function getUserInitials(user) {
  const firstInitial = user.firstName ? user.firstName[0] : '';
  const lastInitial = user.lastName ? user.lastName[0] : '';

  return `${firstInitial}${lastInitial}`.toUpperCase();
}

function renderUser(user) {
  if (!avatarElement || !nameElement) {
    return;
  }

  const userFullName = getUserFullName(user);
  const userInitials = getUserInitials(user);

  nameElement.textContent = userFullName || 'Пользователь';

  if (emailElement) {
    emailElement.textContent = user.email || '';
  }

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
  return Math.ceil(accountOrders.length / ORDERS_PER_PAGE);
}

function getVisibleOrders() {
  const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
  const endIndex = startIndex + ORDERS_PER_PAGE;

  return accountOrders.slice(startIndex, endIndex);
}

function renderOrders() {
  if (!ordersBody) {
    return;
  }

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
  const totalPages = getTotalPages();
  const shownOrdersCount = Math.min(
    currentPage * ORDERS_PER_PAGE,
    accountOrders.length,
  );

  if (ordersCounter) {
    ordersCounter.textContent = `Показано ${shownOrdersCount} из ${accountOrders.length}`;
  }

  if (currentPageElement) {
    currentPageElement.textContent = currentPage;
  }

  if (totalPagesElement) {
    totalPagesElement.textContent = totalPages;
  }

  if (prevButton) {
    prevButton.disabled = currentPage === 1;
  }

  if (nextButton) {
    nextButton.disabled = currentPage === totalPages;
  }
}

function updateOrdersView() {
  renderOrders();
  renderPagination();
}

function initPagination() {
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      if (currentPage === 1) {
        return;
      }

      currentPage -= 1;
      updateOrdersView();
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      if (currentPage === getTotalPages()) {
        return;
      }

      currentPage += 1;
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

if (accountPage) {
  renderUser(accountUser);
  updateOrdersView();
  initPagination();
  initLogout();
}
