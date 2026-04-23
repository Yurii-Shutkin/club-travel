const DESKTOP_BREAKPOINT = 1366;

function initHeaderAccountDropdown() {
  const accountMenu = document.querySelector(".header__account-menu");

  if (!accountMenu) {
    return;
  }

  const accountButton = accountMenu.querySelector(".header__account");
  const accountDropdown = accountMenu.querySelector(
    ".header__account-dropdown",
  );

  if (!accountButton || !accountDropdown) {
    return;
  }

  const isDesktop = () => window.innerWidth >= DESKTOP_BREAKPOINT;

  const openDropdown = () => {
    accountMenu.classList.add("header__account-menu_open");
    accountButton.setAttribute("aria-expanded", "true");
  };

  const closeDropdown = () => {
    accountMenu.classList.remove("header__account-menu_open");
    accountButton.setAttribute("aria-expanded", "false");
  };

  const toggleDropdown = () => {
    if (accountMenu.classList.contains("header__account-menu_open")) {
      closeDropdown();
      return;
    }

    openDropdown();
  };

  accountButton.addEventListener("click", (event) => {
    event.preventDefault();

    if (!isDesktop()) {
      return;
    }

    toggleDropdown();
  });

  document.addEventListener("click", (event) => {
    if (!accountMenu.contains(event.target)) {
      closeDropdown();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDropdown();
    }
  });

  accountDropdown.addEventListener("click", (event) => {
    const accountAction = event.target.closest(
      ".header__account-link, .header__account-logout",
    );

    if (accountAction) {
      closeDropdown();
    }
  });

  window.addEventListener("resize", () => {
    if (!isDesktop()) {
      closeDropdown();
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHeaderAccountDropdown);
} else {
  initHeaderAccountDropdown();
}
