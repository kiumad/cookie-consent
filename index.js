// TODO: unComment bottom line when this service completet !
document.addEventListener("DOMContentLoaded", () => {
  const ACCEPT_COOKIE_CONSENT = "COOKIE_CONSENT_ACCEPT";

  const hasCookieConsent = document.cookie.includes(`${ACCEPT_COOKIE_CONSENT}`);

  const hasAcceptedCookieConsent = document.cookie.includes(
    `${ACCEPT_COOKIE_CONSENT}=true`
  );

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

    footer.appendChild(rejectButton);
    footer.appendChild(readMoreLink);

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
      removeThirdPartyCookies();
    }
  } else {
    setCookie(ACCEPT_COOKIE_CONSENT, "true", 365);
  }

  cookieStore.addEventListener("change", () => {
    if (hasCookieConsent) {
      if (!hasAcceptedCookieConsent) {
        removeThirdPartyCookies();
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
