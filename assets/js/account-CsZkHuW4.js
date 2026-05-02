import"./header-scroll-state-QTP0zqH0.js";import"./main-B0L2erZ_.js";var $={firstName:"Еле",lastName:"Колонаева",email:"admin@admin.ee",avatar:""},n=[{id:"1588665993",amount:"554.00",email:"admin@admin.ee",status:"paid",date:"18 июня 2020 15:01"},{id:"1588665993",amount:"554.00",email:"admin@admin.ee",status:"processing",date:"18 июня 2020 15:01"},{id:"1588665993",amount:"554.00",email:"admin@admin.ee",status:"processing",date:"18 июня 2020 15:01"},{id:"1588665993",amount:"554.00",email:"admin@admin.ee",status:"processing",date:"18 июня 2020 15:01"},{id:"1588665993",amount:"554.00",email:"admin@admin.ee",status:"processing",date:"18 июня 2020 15:01"},{id:"1588665993",amount:"554.00",email:"admin@admin.ee",status:"processing",date:"18 июня 2020 15:01"},{id:"1588665993",amount:"554.00",email:"admin@admin.ee",status:"processing",date:"18 июня 2020 15:01"},{id:"1588665993",amount:"554.00",email:"admin@admin.ee",status:"processing",date:"18 июня 2020 15:01"},{id:"1588665993",amount:"554.00",email:"admin@admin.ee",status:"processing",date:"18 июня 2020 15:01"},{id:"1588665993",amount:"554.00",email:"admin@admin.ee",status:"processing",date:"18 июня 2020 15:01"},{id:"1588665993",amount:"554.00",email:"admin@admin.ee",status:"processing",date:"18 июня 2020 15:01"},{id:"1588665993",amount:"554.00",email:"admin@admin.ee",status:"processing",date:"18 июня 2020 15:01"},{id:"1588665993",amount:"554.00",email:"admin@admin.ee",status:"processing",date:"18 июня 2020 15:01"}],i=9,y=document.querySelector("[data-account-page]"),o=document.querySelector("[data-account-profile-avatar]"),d=document.querySelector("[data-account-profile-name]"),u=document.querySelector("[data-account-profile-email]"),m=document.querySelector("[data-account-orders-body]"),l=document.querySelector("[data-account-orders-counter]"),g=document.querySelector("[data-account-orders-page]"),f=document.querySelector("[data-account-orders-total-pages]"),r=document.querySelector("[data-account-orders-prev]"),s=document.querySelector("[data-account-orders-next]"),p=document.querySelector("[data-account-logout]"),a=1,S={paid:"Оплачено",processing:"В обработке"};function q(t){return`${t.firstName||""} ${t.lastName||""}`.trim()}function E(t){return`${t.firstName?t.firstName[0]:""}${t.lastName?t.lastName[0]:""}`.toUpperCase()}function x(t){if(!o||!d)return;const e=q(t),_=E(t);if(d.textContent=e||"Пользователь",u&&(u.textContent=t.email||""),t.avatar){o.innerHTML=`
      <img
        class="account-profile__avatar-img"
        src="${t.avatar}"
        alt="${e||"Пользователь"}"
      />
    `;return}o.innerHTML=`
    <span class="account-profile__avatar-initials">
      ${_||"U"}
    </span>
  `}function v(){return Math.ceil(n.length/i)}function N(){const t=(a-1)*i,e=t+i;return n.slice(t,e)}function P(){m&&(m.innerHTML=N().map(t=>{const e=S[t.status]||t.status;return`
        <tr class="account-orders__row">
          <td class="account-orders__cell">${t.id}</td>
          <td class="account-orders__cell">${t.amount}</td>
          <td class="account-orders__cell">${t.email}</td>
          <td class="account-orders__cell">
            <span class="account-orders__status account-orders__status_${t.status}">
              ${e}
            </span>
          </td>
          <td class="account-orders__cell">${t.date}</td>
        </tr>
      `}).join(""))}function C(){const t=v(),e=Math.min(a*i,n.length);l&&(l.textContent=`Показано ${e} из ${n.length}`),g&&(g.textContent=a),f&&(f.textContent=t),r&&(r.disabled=a===1),s&&(s.disabled=a===t)}function c(){P(),C()}function L(){r&&r.addEventListener("click",()=>{a!==1&&(a-=1,c())}),s&&s.addEventListener("click",()=>{a!==v()&&(a+=1,c())})}function h(){p&&p.addEventListener("click",()=>{window.location.href="/club-travel/"})}y&&(x($),c(),L(),h());
