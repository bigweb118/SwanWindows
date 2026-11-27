const languageButtons = document.querySelectorAll("[data-set-lang]");
const translatableText = document.querySelectorAll("[data-en][data-zh]");
const translatablePlaceholders = document.querySelectorAll("[data-placeholder-en][data-placeholder-zh]");

function setLanguage(language) {
  const nextLanguage = language === "zh" ? "zh" : "en";

  document.documentElement.lang = nextLanguage === "zh" ? "zh-Hans" : "en-AU";
  document.documentElement.dataset.lang = nextLanguage;

  const translatableElements = document.querySelectorAll("[data-en][data-zh]");
  translatableElements.forEach((element) => {
    element.textContent = element.dataset[nextLanguage];
  });

  const translatablePlaceholders = document.querySelectorAll("[data-placeholder-en][data-placeholder-zh]");
  translatablePlaceholders.forEach((element) => {
    element.placeholder = element.dataset[`placeholder${nextLanguage === "zh" ? "Zh" : "En"}`];
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.setLang === nextLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  localStorage.setItem("site-language", nextLanguage);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.setLang);
  });
});

const urlLanguage = new URLSearchParams(window.location.search).get("lang");
setLanguage(urlLanguage || localStorage.getItem("site-language") || "en");

/* ==========================================================================
   Interactive Technical Cross-Section Hotspot & Tab Selector
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const hotspotPins = document.querySelectorAll(".hotspot-pin");
  const techTabs = document.querySelectorAll(".tech-tab-item");

  function activateTab(tabId) {
    hotspotPins.forEach((pin) => {
      pin.classList.toggle("is-active", pin.dataset.tab === String(tabId));
    });

    techTabs.forEach((tab) => {
      tab.classList.toggle("is-active", tab.dataset.tabTarget === String(tabId));
    });
  }

  hotspotPins.forEach((pin) => {
    pin.addEventListener("click", () => {
      activateTab(pin.dataset.tab);
    });
  });

  techTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activateTab(tab.dataset.tabTarget);
    });
  });


});




/* ==========================================================================
   Serverless Email & Instant Price Estimator System
   ========================================================================== */
class InstantPriceEstimator {
  constructor() {
    this.rates = {
      types: {
        awning: { base: 420, uValue: 1.2, db: 42, labelEn: "Awning Window", labelZh: "外悬/上悬窗" },
        casement: { base: 450, uValue: 1.1, db: 44, labelEn: "Casement Window", labelZh: "平开窗" },
        tilt_turn: { base: 480, uValue: 1.0, db: 45, labelEn: "Tilt & Turn Window", labelZh: "内开内倒窗" },
        lift_slide: { base: 650, uValue: 1.1, db: 40, labelEn: "Lift & Slide Door", labelZh: "提升推拉门" },
        stacking: { base: 520, uValue: 1.3, db: 38, labelEn: "Sliding Stacking Door", labelZh: "推拉联动门" },
        curtain_wall: { base: 780, uValue: 0.9, db: 48, labelEn: "Glass Curtain Wall", labelZh: "玻璃幕墙" }
      },
      series: {
        "75_std": { mult: 1.0, labelEn: "75mm Standard Series", labelZh: "75mm 德系标准系" },
        "75_slim": { mult: 1.1, labelEn: "75mm Slim Series", labelZh: "75mm 德系极窄系" },
        "90_passive": { mult: 1.35, labelEn: "90mm Passive House Series", labelZh: "90mm 德系被动房系" },
        "72_door": { mult: 1.15, labelEn: "72mm Door Series", labelZh: "72mm 德系高端门系" }
      },
      glass: {
        double_lowe: { mult: 1.0, uDelta: 0, dbDelta: 0, labelEn: "Double Low-E + Argon", labelZh: "Low-E 双玻充氩气" },
        triple_lowe: { mult: 1.25, uDelta: -0.3, dbDelta: 3, labelEn: "Triple Low-E + Argon", labelZh: "Low-E 三玻充氩气" },
        acoustic_lam: { mult: 1.18, uDelta: -0.1, dbDelta: 6, labelEn: "Acoustic Laminated Safety", labelZh: "声学夹胶安全玻璃" }
      }
    };
  }

  calculate(typeKey, seriesKey, glassKey, width, height, qty) {
    const t = this.rates.types[typeKey] || this.rates.types.awning;
    const s = this.rates.series[seriesKey] || this.rates.series["75_std"];
    const g = this.rates.glass[glassKey] || this.rates.glass.double_lowe;

    const areaM2 = (width / 1000) * (height / 1000);
    const unitCost = t.base * s.mult * g.mult;
    const rawTotal = Math.max(380, unitCost * areaM2) * qty;

    const minPrice = Math.round(rawTotal * 0.92);
    const maxPrice = Math.round(rawTotal * 1.12);

    const uVal = Math.max(0.7, (t.uValue + g.uDelta)).toFixed(1);
    const dbVal = Math.min(52, t.db + g.dbDelta);

    const lang = document.documentElement.dataset.lang || "en";
    const tLabel = lang === "zh" ? t.labelZh : t.labelEn;
    const sLabel = lang === "zh" ? s.labelZh : s.labelEn;
    const gLabel = lang === "zh" ? g.labelZh : g.labelEn;

    const summary = `${qty}x ${tLabel} (${width}mm × ${height}mm) — ${sLabel}, ${gLabel}`;

    return { minPrice, maxPrice, areaM2: (areaM2 * qty).toFixed(2), uVal, dbVal, summary };
  }
}

// Direct Contact Fallback Links (WhatsApp & Email) to prevent lost leads
const DIRECT_WHATSAPP_NUMBER = "61461324967";
const DIRECT_CONTACT_EMAIL = "info@swanwindows.com.au";

function buildDirectInquiryLinks(formData, lang) {
  const isZh = lang === "zh";
  const lines = [
    isZh ? "您好 Swan Windows，我想咨询门窗报价：" : "Hi Swan Windows, I would like to request a quote:",
    `${isZh ? "姓名" : "Name"}: ${formData.name || "-"}`,
    `${isZh ? "电话/WhatsApp" : "Phone / WhatsApp"}: ${formData.phone || "-"}`,
    `${isZh ? "邮箱" : "Email"}: ${formData.email || "-"}`,
    `${isZh ? "项目位置" : "Project Location"}: ${formData.location || "-"}`,
    `${isZh ? "项目类型" : "Project Type"}: ${formData.projectType || "-"}`,
    `${isZh ? "需求说明" : "Message"}: ${formData.message || "-"}`
  ];
  const bodyText = lines.join("\n");
  const subject = isZh
    ? `Swan Windows 门窗报价咨询 - ${formData.name || "客户"}`
    : `Swan Windows Quote Inquiry - ${formData.name || "Client"}`;

  return {
    whatsappUrl: `https://wa.me/${DIRECT_WHATSAPP_NUMBER}?text=${encodeURIComponent(bodyText)}`,
    mailtoUrl: `mailto:${DIRECT_CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`
  };
}

function showQuoteError(quoteForm, formData, result) {
  const lang = document.documentElement.dataset.lang === "zh" ? "zh" : "en";
  const { whatsappUrl, mailtoUrl } = buildDirectInquiryLinks(formData, lang);

  let errorBox = quoteForm.querySelector(".quote-form-error");
  if (!errorBox) {
    errorBox = document.createElement("div");
    errorBox.className = "quote-form-error full";
    errorBox.setAttribute("role", "alert");
    quoteForm.appendChild(errorBox);
  }

  const titleEn = result?.isTimeout
    ? "Submission timed out — your details are still here"
    : "Online submission failed — please send directly";
  const titleZh = result?.isTimeout
    ? "在线提交超时 — 您填写的内容已保留"
    : "在线提交暂时失败 — 请一键直发防漏单";

  const descEn = "Our online email service could not confirm your request right now. To make sure we don't miss your inquiry, send your pre-filled details directly via WhatsApp or Email in one click:";
  const descZh = "当前在线邮件服务未能确认接收您的询价。为避免漏单，您可以直接点击下方按钮，将已填好的信息一键通过 WhatsApp 或邮箱发送给我们：";

  errorBox.replaceChildren();

  const titleEl = document.createElement("strong");
  titleEl.className = "quote-error-title";
  titleEl.dataset.en = titleEn;
  titleEl.dataset.zh = titleZh;
  titleEl.textContent = lang === "zh" ? titleZh : titleEn;

  const descEl = document.createElement("p");
  descEl.className = "quote-error-desc";
  descEl.dataset.en = descEn;
  descEl.dataset.zh = descZh;
  descEl.textContent = lang === "zh" ? descZh : descEn;

  const actionsEl = document.createElement("div");
  actionsEl.className = "quote-error-actions";

  const waLink = document.createElement("a");
  waLink.className = "quote-fallback-btn quote-fallback-whatsapp";
  waLink.href = whatsappUrl;
  waLink.target = "_blank";
  waLink.rel = "noopener noreferrer";
  waLink.dataset.en = "Send via WhatsApp →";
  waLink.dataset.zh = "一键 WhatsApp 直发 →";
  waLink.textContent = lang === "zh" ? waLink.dataset.zh : waLink.dataset.en;

  const emailLink = document.createElement("a");
  emailLink.className = "quote-fallback-btn quote-fallback-email";
  emailLink.href = mailtoUrl;
  emailLink.dataset.en = "Send via Email →";
  emailLink.dataset.zh = "一键邮箱直发 →";
  emailLink.textContent = lang === "zh" ? emailLink.dataset.zh : emailLink.dataset.en;

  actionsEl.append(waLink, emailLink);
  errorBox.append(titleEl, descEl, actionsEl);
  errorBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function hideQuoteError(quoteForm) {
  const errorBox = quoteForm.querySelector(".quote-form-error");
  if (errorBox) {
    errorBox.remove();
  }
}

// High-Speed Edge Form Submitter via Cloudflare Pages Function & Resend
async function sendServerlessForm(payloadData) {
  const payload = {
    name: payloadData.name || "Client",
    phone: payloadData.phone || "Not provided",
    email: payloadData.email || "Not provided",
    location: payloadData.location || "Perth Metro",
    projectType: payloadData.projectType || "General Inquiry",
    message: payloadData.message || "Request for detailed window schedule and pricing."
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch("/api/send-quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const data = await res.json().catch(() => null);
    if (!res.ok || !data || data.success !== true) {
      const errorMsg = (data && (data.error || data.warning)) || `HTTP ${res.status}`;
      console.error("Resend Edge API failed:", res.status, data);
      return { success: false, status: res.status, error: errorMsg };
    }

    return data;
  } catch (err) {
    clearTimeout(timeoutId);
    const isTimeout = err && err.name === "AbortError";
    console.error("Edge API network/timeout error:", err);
    return {
      success: false,
      isTimeout,
      error: (err && err.message) || "Network request failed"
    };
  }
}

// Initialize Estimator & Modal Event Handlers
document.addEventListener("DOMContentLoaded", () => {
  const estimator = new InstantPriceEstimator();

  const estModal = document.getElementById("estimatorModal");
  const estOpenBtns = document.querySelectorAll(".open-estimator-btn");
  const estCloseBtn = document.getElementById("closeEstimatorBtn");

  const estType = document.getElementById("estType");
  const estSeries = document.getElementById("estSeries");
  const estGlass = document.getElementById("estGlass");
  const estWidth = document.getElementById("estWidth");
  const estHeight = document.getElementById("estHeight");
  const estQty = document.getElementById("estQty");

  const estWidthVal = document.getElementById("estWidthVal");
  const estHeightVal = document.getElementById("estHeightVal");
  const estPriceOut = document.getElementById("estPriceOut");
  const estUOut = document.getElementById("estUOut");
  const estDbOut = document.getElementById("estDbOut");
  const estSummaryOut = document.getElementById("estSummaryOut");
  const estTransferBtn = document.getElementById("estTransferBtn");

  function updateEstimatorUI() {
    if (!estType || !estPriceOut) return;

    const w = parseInt(estWidth.value, 10);
    const h = parseInt(estHeight.value, 10);
    const q = parseInt(estQty.value, 10);

    if (estWidthVal) estWidthVal.textContent = `${w} mm`;
    if (estHeightVal) estHeightVal.textContent = `${h} mm`;

    const res = estimator.calculate(
      estType.value,
      estSeries.value,
      estGlass.value,
      w, h, q
    );

    estPriceOut.textContent = `$${res.minPrice.toLocaleString()} – $${res.maxPrice.toLocaleString()} AUD`;
    if (estUOut) estUOut.textContent = `${res.uVal} W/m²K`;
    if (estDbOut) estDbOut.textContent = `-${res.dbVal} dB`;
    if (estSummaryOut) estSummaryOut.textContent = res.summary;

    if (estTransferBtn) {
      estTransferBtn.dataset.summary = res.summary;
      estTransferBtn.dataset.price = `$${res.minPrice} – $${res.maxPrice} AUD`;
    }
  }

  if (estOpenBtns.length) {
    estOpenBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (estModal) {
          estModal.classList.add("is-open");
          updateEstimatorUI();
        }
      });
    });
  }

  if (estCloseBtn && estModal) {
    estCloseBtn.addEventListener("click", () => estModal.classList.remove("is-open"));
    estModal.addEventListener("click", (e) => {
      if (e.target === estModal) estModal.classList.remove("is-open");
    });
  }

  [estType, estSeries, estGlass, estWidth, estHeight, estQty].forEach(elem => {
    if (elem) elem.addEventListener("input", updateEstimatorUI);
  });

  // Transfer estimate into main quote form
  if (estTransferBtn) {
    estTransferBtn.addEventListener("click", () => {
      if (estModal) estModal.classList.remove("is-open");

      const notesField = document.getElementById("formNotes") || document.querySelector("textarea[name='notes']");
      const targetSection = document.getElementById("contact") || document.querySelector(".contact");

      if (notesField) {
        notesField.value = `[Instant Estimator Summary]: ${estTransferBtn.dataset.summary || ""}
Estimated Budget: ${estTransferBtn.dataset.price || ""}`;
      }

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // Handle Quote Form Submit with Serverless Email
  const quoteForm = document.getElementById("quoteForm") || document.querySelector(".quote-form");
  const quoteModal = document.getElementById("quoteModal");
  const closeModalBtn = document.getElementById("closeModalBtn");

  if (quoteForm) {
    quoteForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      hideQuoteError(quoteForm);

      const submitBtn = quoteForm.querySelector("button[type='submit']");
      const origText = submitBtn ? submitBtn.textContent : "Submit";

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = document.documentElement.dataset.lang === "zh" ? "提交发送中..." : "Sending Inquiry...";
      }

      const formData = {
        name: quoteForm.querySelector("[name='name']")?.value || "",
        email: quoteForm.querySelector("[name='email']")?.value || "",
        phone: quoteForm.querySelector("[name='phone']")?.value || "",
        location: quoteForm.querySelector("[name='location']")?.value || quoteForm.querySelector("[name='suburb']")?.value || "",
        projectType: quoteForm.querySelector("[name='type']")?.value || quoteForm.querySelector("[name='opening_types']")?.value || "",
        message: quoteForm.querySelector("[name='message']")?.value || quoteForm.querySelector("#formNotes")?.value || quoteForm.querySelector("[name='notes']")?.value || ""
      };

      const result = await sendServerlessForm(formData);

      if (submitBtn) {
        const currentLang = document.documentElement.dataset.lang === "zh" ? "zh" : "en";
        submitBtn.disabled = false;
        submitBtn.textContent = submitBtn.dataset[currentLang] || origText;
      }

      if (result && result.success === true) {
        if (quoteModal) {
          quoteModal.classList.add("is-open");
        } else {
          alert(document.documentElement.dataset.lang === "zh" ? "您的询价申请已成功发送！我们将于24小时内联系您。" : "Thank you! Your quote request has been sent successfully.");
        }
        quoteForm.reset();
      } else {
        showQuoteError(quoteForm, formData, result);
      }
    });

    if (closeModalBtn && quoteModal) {
      closeModalBtn.addEventListener("click", () => quoteModal.classList.remove("is-open"));
    }
  }
});



  // Mobile Hamburger Menu Drawer Handler
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileNavDrawer = document.getElementById("mobileNavDrawer");
  const closeMobileNavBtn = document.getElementById("closeMobileNavBtn");

  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = mobileNavDrawer.classList.toggle("is-open");
      mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    if (closeMobileNavBtn) {
      closeMobileNavBtn.addEventListener("click", () => {
        mobileNavDrawer.classList.remove("is-open");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
      });
    }

    const mobileLinks = mobileNavDrawer.querySelectorAll("a, button");
    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (!link.classList.contains("open-estimator-btn")) {
          mobileNavDrawer.classList.remove("is-open");
          mobileMenuBtn.setAttribute("aria-expanded", "false");
        }
      });
    });
  }
