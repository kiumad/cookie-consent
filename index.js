// TODO: unComment bottom line when this service completet !
document.addEventListener("DOMContentLoaded", () => {
  const ACCEPT_COOKIE_CONSENT = "COOKIE_CONSENT_ACCEPT";

  const hasCookieConsent = document.cookie.includes(`${ACCEPT_COOKIE_CONSENT}`);

  const hasAcceptedCookieConsent = document.cookie.includes(
    `${ACCEPT_COOKIE_CONSENT}=true`
  );

  const storeBlockedCookies = (cookieName) => {
    const ITEM_KEY = "cookiesBlockList";
    let cookiesBlockList = window.localStorage.getItem(ITEM_KEY);
    cookiesBlockList = cookiesBlockList && JSON.parse(cookiesBlockList);
    if (cookiesBlockList) {
      cookiesBlockList.push(cookieName);
      cookiesBlockList = JSON.stringify(cookiesBlockList);
      window.localStorage.setItem(ITEM_KEY, cookiesBlockList);
    } else {
      cookiesBlockList = [];
      cookiesBlockList.push(cookieName);
      cookiesBlockList = JSON.stringify(cookiesBlockList);
      window.localStorage.setItem(ITEM_KEY, cookiesBlockList);
    }
  };

  const thirdPartyCookies = document.cookie.split(";").filter((cookie) => {
    const cookieDomain = cookie.split(";")[0].split("=")[1];
    const currentDomain = window.location.hostname;
    return cookieDomain !== currentDomain;
  });

  const removeThirdPartyCookies = () => {
    const currentDomain = window.location.hostname;

    cookieStore.getAll().then((allCookies) => {
      allCookies.forEach((cookie) => {
        const cookieDomain = cookie.domain;

        if (
          cookieDomain !== currentDomain &&
          !cookie.name.includes(ACCEPT_COOKIE_CONSENT)
        ) {
          document.cookie = `${cookie.name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
      });
    });
  };

  const removeBlockedCookies = () => {
    const ITEM_KEY = "cookiesBlockList";
    let cookiesBlockList = window.localStorage.getItem(ITEM_KEY);
    cookiesBlockList = cookiesBlockList && JSON.parse(cookiesBlockList);

    if (cookiesBlockList) {
      for (let i = 0; i < cookiesBlockList.length; i++) {
        console.log(
          "from removeBlockedCookies: ",
          cookiesBlockList[i],
          " removed !"
        );
        document.cookie = `${cookiesBlockList[i]}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    } else {
      console.log("no have cookies !");
    }
  };

  // Function to open detail modal
  const openDetailModal = () => {
    const detailModal = document.createElement("div");
    detailModal.className = "detail-modal";
    detailModal.innerHTML = `
    <style>
      .detail-modal {
        width: 400px;
        background-color: white;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999999999999999999999999999;
        padding: 20px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      }

      .modal-content {
        position: relative;
      }

      .close {
        font-size: 1.5em;
        cursor: pointer;
        position: absolute;
        top: 10px;
        right: 10px;
      }

      .cookies {
        margin-top: 20px;
      }

      .cookie-category {
        margin-bottom: 20px;
      }

      .cookie-category h3 {
        font-size: 16px;
        font-weight: bold;
      }

      .cookies ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .cookies li {
        margin-bottom: 10px;
      }

      .cookies li label {
        display: flex;
        align-items: center;
      }

      .cookies li input[type="checkbox"] {
        margin-right: 10px;
      }
    </style>
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>جزئیات کوکی‌ها</h2>
      <div class="cookies">
        <div class="cookie-category">
          <h3>کوکی‌های وبسایت</h3>
          <ul class="website-cookies">
            <!-- Website cookies will be appended here -->
          </ul>
        </div>
        <div class="cookie-category">
          <h3>کوکی‌های ترکیبی</h3>
          <ul class="third-party-cookies">
            <!-- Third-party cookies will be appended here -->
          </ul>
        </div>
      </div>
    </div>
  `;

    const closeButton = document.createElement("span");
    closeButton.innerHTML = "&times;";
    closeButton.style =
      "font-size: 1.5em; cursor: pointer; position: absolute; top: 10px; right: 10px;";
    closeButton.onclick = () => {
      detailModal.remove();
    };

    const detailTitle = document.createElement("h3");
    detailTitle.innerText = "جزئیات کوکی‌های ترکیبی";
    detailTitle.style = "font-size: 18px; font-weight: bold; color: black;";

    // Here you can add details of third-party cookies
    const detailDescription = document.createElement("p");
    detailDescription.innerText = "Detail of third-party cookies here...";

    detailModal.appendChild(closeButton);
    detailModal.appendChild(detailTitle);
    detailModal.appendChild(detailDescription);

    document.body.appendChild(detailModal);
    populateCookies();
  };

  const populateCookies = () => {
    const websiteCookiesList = document.querySelector(".website-cookies");
    const thirdPartyCookiesList = document.querySelector(
      ".third-party-cookies"
    );

    // Get the current domain of the website
    const currentDomain = window.location.hostname;

    // Logic to fetch and populate cookies
    const allCookies = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .filter((cookie) => cookie !== "")
      .map((cookie) => {
        const [name, value] = cookie.split("=");
        const domain = document.cookie
          .split("; ")
          .find((row) => row.startsWith("Domain="))
          ?.split("=")[1];
        return { name, value, domain };
      });

    allCookies.forEach((cookie) => {
      const li = document.createElement("li");
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      let blockedCookiesList = window.localStorage.getItem("cookiesBlockList");
      blockedCookiesList = blockedCookiesList && JSON.parse(blockedCookiesList);
      checkbox.type = "checkbox";
      if (blockedCookiesList && blockedCookiesList.includes(cookie.name)) {
        checkbox.checked = false;
      } else {
        checkbox.checked = true;
      }

      // Check if the cookie belongs to the current domain (first-party cookie)
      const isWebsiteCookie = cookie.domain === currentDomain;

      // Set dataset attribute to identify the cookie name
      checkbox.dataset.cookieName = cookie.name;
      checkbox.dataset.cookieValue = cookie.value;
      checkbox.dataset.cookieDomain = cookie.domain;

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(cookie.name));
      li.appendChild(label);

      // Append the list item to the appropriate list
      if (isWebsiteCookie) {
        websiteCookiesList.appendChild(li);
      } else {
        thirdPartyCookiesList.appendChild(li);
      }
    });

    // Add event listener for toggling cookies
    [websiteCookiesList, thirdPartyCookiesList].forEach((list) => {
      list.addEventListener("change", (event) => {
        console.log("changed");
        if (
          event.target.tagName === "INPUT" &&
          event.target.type === "checkbox"
        ) {
          const cookieName = event.target.dataset.cookieName;
          const cookieValue = event.target.dataset.cookieValue;
          const isChecked = event.target.checked;
          toggleCookie(cookieName, cookieValue, isChecked);
        }
      });
    });
  };

  const toggleCookie = (cookieName, cookieValue, isChecked) => {
    console.log("toggle Cookie: ", { cookieName, isChecked });

    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1); // Set expiration for 1 year
    const expires = "expires=" + expirationDate.toUTCString();

    if (isChecked) {
      document.cookie = `${cookieName}=${cookieValue}; ${expires}; path=/`;
    } else {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      storeBlockedCookies(cookieName);
    }
  };

  const addCookieConsentModal = (container) => {
    console.log("container: ", container);
    const Wrapper = document.createElement("div");
    Wrapper.style =
      "width: 100%; max-width: 400px; background-color: white; position: fixed; bottom: 6px; right: 12px; z-index: 9999999999999999999999999999; padding: 20px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);direction: rtl;border-radius: 6px";
    Wrapper.classList = "cookie-consent-modal";

    const closeIcon = document.createElement("span");
    closeIcon.innerHTML = "&times;";
    closeIcon.style = "font-size: 1.5em; cursor: pointer;";
    closeIcon.onclick = () => {
      Wrapper.style.display = "none";
    };

    const titleRow = document.createElement("div");
    titleRow.style =
      "display: flex;justify-content: flex-end;align-items: center;margin-bottom: 10px;gap: 15px;flex-direction: row-reverse;";

    const title = document.createElement("h3");
    title.innerText = "سفر بهتر با کوکی‌ها";
    title.style = "font-size: 18px;font-weight: bold;color: black;";

    titleRow.appendChild(title);
    titleRow.appendChild(closeIcon);

    const description = document.createElement("p");
    description.innerText =
      "به عنوان یک قسمت اساسی از رعایت حریم خصوصی و اطلاعات شخصی، ما از کوکی‌ها برای بهبود تجربه شما در این وبسایت استفاده می‌کنیم. لطفاً موافقت خود را اعلام کرده و تصمیم بگیرید که آیا مایل به استفاده از کوکی‌ها هستید یا خیر. برای اطلاعات بیشتر، می‌توانید صفحه حریم خصوصی ما را مطالعه کنید.";
    description.style =
      "font-size: 15px;margin-bottom: 20px;font-family: inherit;color: gray;";

    const footer = document.createElement("div");
    footer.style =
      "display: flex; justify-content: space-between; align-items: center;";

    const rejectButton = document.createElement("button");
    rejectButton.innerText = "رد کوکی ها";
    rejectButton.style =
      "width: 100px; height: 40px; background-color: #fed812; color: #434343; border: none; cursor: pointer;font-weight: bold";
    rejectButton.onclick = rejectCookies;

    const readMoreLink = document.createElement("a");
    readMoreLink.href = "#";
    readMoreLink.innerText = "مطالعه بیشتر";
    readMoreLink.style =
      "text-decoration: none; color: #3498db; font-size: 1em;";

    // Create button to open detail modal
    const detailButton = document.createElement("button");
    detailButton.innerText = "جزئیات کوکی‌ها";
    detailButton.style =
      "width: 150px; height: 40px; background-color: #3498db; color: #fff; border: none; cursor: pointer; margin-top: 10px; font-weight: bold";
    detailButton.onclick = openDetailModal;

    footer.appendChild(rejectButton);
    footer.appendChild(detailButton);

    Wrapper.appendChild(titleRow);
    Wrapper.appendChild(description);
    Wrapper.appendChild(footer);

    container.appendChild(Wrapper);
  };

  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie += name + "=" + value + "; " + expires + "; path=/";
  };

  const rejectCookies = () => {
    setCookie(ACCEPT_COOKIE_CONSENT, "false", 365);
    removeThirdPartyCookies();
  };

  if (hasCookieConsent) {
    if (!hasAcceptedCookieConsent) {
      // removeThirdPartyCookies();
      removeBlockedCookies();
    }
  } else {
    setCookie(ACCEPT_COOKIE_CONSENT, "true", 365);
  }

  cookieStore.addEventListener("change", () => {
    if (hasCookieConsent) {
      if (!hasAcceptedCookieConsent) {
        // removeThirdPartyCookies();
        removeBlockedCookies();
      }
    }
  });

  // TODO: Write code for find the first child of body
  // to can append child to it
  const container = document.body;

  setTimeout(() => {
    addCookieConsentModal(container);
  }, 1000);
});
