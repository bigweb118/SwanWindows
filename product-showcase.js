/* ==========================================================================
   Swan Windows — Interactive Product Showcase & Motion Lab Engine
   Renders all 12 new flagship product pages with cinematic transitions,
   focal-zoom hotspot explorer, bespoke interactive demos & bilingual support.
   ========================================================================== */

(function () {
  function getLang() {
    return document.documentElement.dataset.lang === "zh" ? "zh" : "en";
  }

  function esc(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function biSpan(en, zh, tag = "span", cls = "") {
    const lang = getLang();
    const classAttr = cls ? ` class="${cls}"` : "";
    return `<${tag}${classAttr} data-en="${esc(en)}" data-zh="${esc(zh)}">${esc(lang === "zh" ? zh : en)}</${tag}>`;
  }

  function renderSpecRows(rows) {
    const lang = getLang();
    return rows
      .map(
        ([en, zh, val]) => `
        <tr>
          <td class="spec-title" data-en="${esc(en)}" data-zh="${esc(zh)}">${esc(lang === "zh" ? zh : en)}</td>
          <td class="spec-val">${esc(val)}</td>
        </tr>`
      )
      .join("");
  }

  function buildMotionLabMarkup(p) {
    switch (p.demoType) {
      case "sightline":
        return {
          modes: [
            { id: "standard", en: "Standard 115mm Frame", zh: "传统 115mm 宽边框" },
            { id: "slim", en: "Ultra-Slim 45mm (IS)", zh: "极窄 45mm 视线 (IS)" }
          ],
          defaultMode: "slim",
          telemetry: [
            { id: "glassArea", labelEn: "Daylight Area", labelZh: "净采光面积", val: "+26%" },
            { id: "faceWidth", labelEn: "Visible Frame", labelZh: "可视边框", val: "45 mm" }
          ],
          canvas: `
            <div class="demo-sightline-window is-slim" id="demoSightlineWin">
              <div class="demo-sightline-mullion"></div>
              <div class="demo-sightline-glare"></div>
              <div class="demo-sightline-badge" id="demoSightlineBadge">45mm Ultra-Slim • +26% Daylight</div>
            </div>`
        };

      case "outward":
        return {
          modes: [
            { id: "closed", en: "Storm Locked (E1200)", zh: "风暴锁闭 (E1200)" },
            { id: "awning", en: "Rain-Safe Vent (25°)", zh: "雨天微开悬窗 (25°)" },
            { id: "full", en: "Full Breeze (70°)", zh: "大角度通风 (70°)" }
          ],
          defaultMode: "awning",
          telemetry: [
            { id: "sealForce", labelEn: "Gasket Compression", labelZh: "胶条压合状态", val: "3x EPDM" },
            { id: "rainShield", labelEn: "Rain Deflection", labelZh: "防雨挡水", val: "100%" }
          ],
          canvas: `
            <svg class="demo-svg-stage" viewBox="0 0 640 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Outdoor / Indoor Divider -->
              <rect x="285" y="18" width="22" height="244" rx="4" fill="#1e293b" stroke="#64748b" stroke-width="1.5"/>
              <text x="90" y="34" fill="rgba(255,255,255,0.55)" font-size="12" font-weight="700">OUTDOOR • PERTH COASTAL STORM</text>
              <text x="415" y="34" fill="rgba(255,255,255,0.55)" font-size="12" font-weight="700">INDOOR • DRY &amp; QUIET</text>
              <!-- Rain Drops -->
              <g id="demoRainGroup" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" opacity="0.85">
                <line class="demo-rain-drop" x1="70" y1="60" x2="90" y2="85" style="animation-delay:0s"/>
                <line class="demo-rain-drop" x1="120" y1="45" x2="140" y2="70" style="animation-delay:0.25s"/>
                <line class="demo-rain-drop" x1="165" y1="70" x2="185" y2="95" style="animation-delay:0.5s"/>
                <line class="demo-rain-drop" x1="95" y1="125" x2="115" y2="150" style="animation-delay:0.15s"/>
                <line class="demo-rain-drop" x1="150" y1="140" x2="170" y2="165" style="animation-delay:0.4s"/>
              </g>
              <!-- Outward Pivoting Sash -->
              <g id="demoOutwardSash" style="transform-origin: 296px 56px; transition: transform 0.75s cubic-bezier(0.16, 1, 0.3, 1); transform: rotate(25deg);">
                <rect x="284" y="56" width="16" height="170" rx="3" fill="#0f172a" stroke="#4cc9f0" stroke-width="2.5"/>
                <rect x="289" y="68" width="6" height="146" fill="rgba(76, 201, 240, 0.45)"/>
              </g>
              <!-- Airflow Arrows -->
              <path id="demoOutwardFlow" class="demo-airflow-path" d="M220 228 C260 228, 305 210, 360 190 C410 172, 470 165, 540 165" stroke="#38d9a9" stroke-width="3" stroke-linecap="round" fill="none"/>
              <circle cx="296" cy="56" r="5" fill="#4cc9f0"/>
            </svg>`
        };

      case "heritage":
        return {
          modes: [
            { id: "exterior", en: "Classic Heritage View", zh: "古典线脚外观" },
            { id: "split", en: "50/50 X-Ray Split", zh: "50/50 透视对比" },
            { id: "xray", en: "Modern PA66 Core X-Ray", zh: "内部现代断桥透视" }
          ],
          defaultMode: "split",
          telemetry: [
            { id: "heatCut", labelEn: "Heat Reduction", labelZh: "隔热提升", val: "-75%" },
            { id: "maint", labelEn: "Repainting Needed", labelZh: "需刷漆维护", val: "0 yrs" }
          ],
          canvas: `
            <div class="demo-xray-box" id="demoXrayBox">
              <img src="${esc(p.heroImg)}" loading="lazy" decoding="async" width="1376" height="768" alt="Heritage exterior" class="demo-xray-layer">
              <img src="${esc(p.profileImg)}" loading="lazy" decoding="async" width="1376" height="768" alt="Modern PA66 thermal break core" class="demo-xray-layer demo-xray-core" id="demoXrayCore">
              <div class="demo-xray-line" id="demoXrayLine"></div>
            </div>`
        };

      case "ventilation":
        return {
          modes: [
            { id: "sealed", en: "Sealed (47 dB Quiet)", zh: "密闭隔热 (47 dB)" },
            { id: "night", en: "Night-Purge Cooling", zh: "夜间安全微通风" }
          ],
          defaultMode: "night",
          telemetry: [
            { id: "aperture", labelEn: "Vent Sash Width", labelZh: "极窄扇宽", val: "170 mm" },
            { id: "safety", labelEn: "Bug & Fall Shield", labelZh: "防虫防坠格栅", val: "ACTIVE" }
          ],
          canvas: `
            <svg class="demo-svg-stage" viewBox="0 0 640 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Giant Fixed Glass Pane -->
              <rect x="60" y="34" width="330" height="212" rx="8" fill="rgba(56, 189, 248, 0.12)" stroke="rgba(255,255,255,0.28)" stroke-width="2"/>
              <text x="150" y="145" fill="rgba(255,255,255,0.65)" font-size="14" font-weight="700">PANORAMIC FIXED GLASS</text>
              <!-- 170mm Narrow Vent Bay -->
              <rect x="406" y="34" width="66" height="212" rx="6" fill="#0f172a" stroke="#38d9a9" stroke-width="2"/>
              <!-- Perforated Stainless Mesh Pattern -->
              <g stroke="rgba(56,217,169,0.45)" stroke-width="1.5" stroke-dasharray="3 4">
                <line x1="418" y1="48" x2="418" y2="232"/>
                <line x1="430" y1="48" x2="430" y2="232"/>
                <line x1="442" y1="48" x2="442" y2="232"/>
                <line x1="454" y1="48" x2="454" y2="232"/>
              </g>
              <!-- Swinging Vent Door -->
              <g id="demoVentLeaf" style="transform-origin: 472px 140px; transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1); transform: scaleX(0.35);">
                <rect x="406" y="34" width="66" height="212" rx="6" fill="#1e293b" stroke="#ffffff" stroke-width="2"/>
              </g>
              <!-- Laminar Cool Airflow -->
              <g id="demoVentAir" stroke="#38d9a9" stroke-width="3" stroke-linecap="round">
                <path class="demo-airflow-path" d="M438 90 C485 90, 520 75, 585 75"/>
                <path class="demo-airflow-path" d="M438 140 C490 140, 525 140, 595 140"/>
                <path class="demo-airflow-path" d="M438 190 C485 190, 520 205, 585 205"/>
              </g>
            </svg>`
        };

      case "passive":
        return {
          modes: [
            { id: "summer", en: "Perth Peak Summer (44°C)", zh: "珀斯酷暑 44°C" },
            { id: "winter", en: "Winter Night (4°C)", zh: "寒冬深夜 4°C" }
          ],
          defaultMode: "summer",
          telemetry: [
            { id: "outdoorTemp", labelEn: "Outdoor", labelZh: "室外温度", val: "44°C" },
            { id: "indoorTemp", labelEn: "Indoor Stable", labelZh: "室内恒温", val: "22°C" }
          ],
          canvas: `
            <svg class="demo-svg-stage" viewBox="0 0 640 270" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect id="demoPassiveOutBg" x="24" y="26" width="190" height="218" rx="16" fill="rgba(239,68,68,0.18)" stroke="rgba(239,68,68,0.5)"/>
              <text id="demoPassiveOutTxt" x="119" y="128" text-anchor="middle" fill="#fca5a5" font-size="34" font-weight="800">44°C</text>
              <text x="119" y="156" text-anchor="middle" fill="rgba(255,255,255,0.65)" font-size="12" font-weight="700">OUTDOOR EXTREME</text>
              <!-- Triple Glazing + 90mm Thermal Core -->
              <rect x="246" y="26" width="18" height="218" rx="4" fill="rgba(56,189,248,0.35)" stroke="#38bdf8" stroke-width="2"/>
              <rect x="284" y="26" width="18" height="218" rx="4" fill="rgba(56,189,248,0.35)" stroke="#38bdf8" stroke-width="2"/>
              <rect x="322" y="26" width="18" height="218" rx="4" fill="rgba(56,189,248,0.35)" stroke="#38bdf8" stroke-width="2"/>
              <rect x="358" y="26" width="36" height="218" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
              <text x="319" y="260" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="800">TRIPLE LOW-E + 90MM PA66 FOAM CORE (Uf 0.70)</text>
              <!-- Indoor Comfort -->
              <rect x="426" y="26" width="190" height="218" rx="16" fill="rgba(56,217,169,0.14)" stroke="rgba(56,217,169,0.45)"/>
              <text x="521" y="128" text-anchor="middle" fill="#6ee7b7" font-size="34" font-weight="800">22°C</text>
              <text x="521" y="156" text-anchor="middle" fill="rgba(255,255,255,0.72)" font-size="12" font-weight="700">PASSIVE HOUSE COMFORT</text>
            </svg>`
        };

      case "acoustic":
        return {
          modes: [
            { id: "freeway", en: "Freeway Traffic (85 dB)", zh: "高速车流 (85 dB)" },
            { id: "airport", en: "Flight Path (90 dB)", zh: "航线噪音 (90 dB)" },
            { id: "storm", en: "Coastal Gale (78 dB)", zh: "沿海强风 (78 dB)" }
          ],
          defaultMode: "freeway",
          telemetry: [
            { id: "outDb", labelEn: "Outside Noise", labelZh: "室外噪音", val: "85 dB" },
            { id: "inDb", labelEn: "Inside SilentAir", labelZh: "室内实测", val: "33 dB" }
          ],
          canvas: `
            <div class="demo-acoustic-wrap">
              <div class="demo-wave-col">
                <div class="demo-wave-bars is-loud" id="demoLoudBars">
                  <span style="height:82px;animation-delay:0s"></span>
                  <span style="height:105px;animation-delay:0.15s"></span>
                  <span style="height:68px;animation-delay:0.3s"></span>
                  <span style="height:98px;animation-delay:0.1s"></span>
                  <span style="height:88px;animation-delay:0.25s"></span>
                  <span style="height:74px;animation-delay:0.4s"></span>
                </div>
                <strong id="demoOutDbLabel" style="color:#fca5a5;">85 dB Outdoor</strong>
              </div>
              <div class="demo-baffle-core">
                <div style="font-size:11px; letter-spacing:0.08em; color:var(--ps-accent); font-weight:800;">SILENTAIR LABYRINTH</div>
                <div style="font-size:26px; font-weight:900; color:#fff; margin:6px 0;">-52 dB</div>
                <div style="font-size:11px; color:rgba(255,255,255,0.65);">Fresh Air Flow ✓</div>
              </div>
              <div class="demo-wave-col">
                <div class="demo-wave-bars is-quiet">
                  <span style="height:18px;animation-delay:0.1s"></span>
                  <span style="height:24px;animation-delay:0.3s"></span>
                  <span style="height:14px;animation-delay:0.2s"></span>
                  <span style="height:22px;animation-delay:0.4s"></span>
                  <span style="height:16px;animation-delay:0s"></span>
                  <span style="height:20px;animation-delay:0.25s"></span>
                </div>
                <strong id="demoInDbLabel" style="color:#6ee7b7;">33 dB Library Calm</strong>
              </div>
            </div>`
        };

      case "armor":
        return {
          modes: [
            { id: "0", en: "1. Alu Shell", zh: "1. 建筑铝壳" },
            { id: "1", en: "2. EI60 Fire Seal", zh: "2. EI60 膨胀防火" },
            { id: "2", en: "3. FB6 Steel Core", zh: "3. FB6 防弹钢芯" },
            { id: "3", en: "4. BR6 Armor Glass", zh: "4. BR6 防弹玻璃" }
          ],
          defaultMode: "2",
          telemetry: [
            { id: "fireClass", labelEn: "Fire Rating", labelZh: "防火等级", val: "EI60 / BAL-FZ" },
            { id: "ballistic", labelEn: "Ballistic Class", labelZh: "防弹等级", val: "FB4 / FB6" }
          ],
          canvas: `
            <div class="demo-armor-stack" id="demoArmorStack">
              <div class="demo-armor-layer" data-layer="0"><span class="demo-armor-num">L1</span><strong>6060-T66 Shell</strong><p style="font-size:12px;opacity:0.75;margin:6px 0 0;">Seamless architectural finish</p></div>
              <div class="demo-armor-layer" data-layer="1"><span class="demo-armor-num">L2</span><strong>Intumescent Seal</strong><p style="font-size:12px;opacity:0.75;margin:6px 0 0;">10x heat expansion EI60</p></div>
              <div class="demo-armor-layer is-active" data-layer="2"><span class="demo-armor-num">L3</span><strong>Ballistic Steel</strong><p style="font-size:12px;opacity:0.75;margin:6px 0 0;">EN 1522 FB4/FB6 armor</p></div>
              <div class="demo-armor-layer" data-layer="3"><span class="demo-armor-num">L4</span><strong>BR6 Multi-Glass</strong><p style="font-size:12px;opacity:0.75;margin:6px 0 0;">Polycarbonate laminated</p></div>
            </div>`
        };

      case "load":
        return {
          modes: [
            { id: "1000", en: "Coastal Breeze (1000 Pa)", zh: "沿海阵风 (1000 Pa)" },
            { id: "3000", en: "Severe Gale (3000 Pa)", zh: "强风暴 (3000 Pa)" },
            { id: "5000", en: "Cyclonic Peak (5000 Pa)", zh: "飓风峰值 (5000 Pa)" }
          ],
          defaultMode: "3000",
          telemetry: [
            { id: "windPa", labelEn: "Wind Pressure", labelZh: "模拟风压", val: "3000 Pa" },
            { id: "sashLoad", labelEn: "Max Sash Load", labelZh: "单扇承重", val: "400 kg" }
          ],
          canvas: `
            <div class="demo-load-stage">
              <div class="demo-load-bars">
                <div class="demo-load-card">
                  <div style="font-size:12px;color:#fca5a5;font-weight:700;margin-bottom:8px;">Standard 60mm Profile</div>
                  <svg viewBox="0 0 220 90" width="100%" height="84">
                    <path id="demoBendStd" d="M20 45 Q110 72 200 45" stroke="#ef4444" stroke-width="6" fill="none" stroke-linecap="round"/>
                  </svg>
                  <div id="demoBendStdVal" style="font-size:13px;color:rgba(255,255,255,0.75);">Deflection: 16.4 mm (High Flex)</div>
                </div>
                <div class="demo-load-card" style="border-color:var(--ps-accent);">
                  <div style="font-size:12px;color:var(--ps-accent);font-weight:700;margin-bottom:8px;">Lambda 100 Structural</div>
                  <svg viewBox="0 0 220 90" width="100%" height="84">
                    <path id="demoBend100" d="M20 45 Q110 48 200 45" stroke="#eab308" stroke-width="8" fill="none" stroke-linecap="round"/>
                  </svg>
                  <div id="demoBend100Val" style="font-size:13px;color:#fff;font-weight:700;">Deflection: 1.8 mm (Rock Solid)</div>
                </div>
              </div>
              <div class="demo-load-slider-row">
                <span style="font-size:12px;color:rgba(255,255,255,0.7);">500 Pa</span>
                <input id="demoWindRange" type="range" min="500" max="5000" step="100" value="3000">
                <span style="font-size:12px;color:var(--ps-accent);font-weight:800;">5000 Pa</span>
              </div>
            </div>`
        };

      case "smoke":
        return {
          modes: [
            { id: "closed", en: "Standby Sealed", zh: "待机密闭" },
            { id: "daily", en: "Daily Comfort Vent", zh: "日常智能微通风" },
            { id: "fire", en: "FIRE ALARM: 60s Smoke Purge", zh: "火警触发：60s 极速排烟" }
          ],
          defaultMode: "fire",
          telemetry: [
            { id: "openAngle", labelEn: "Actuator Angle", labelZh: "驱动开启角", val: "65°" },
            { id: "smokeStatus", labelEn: "NSHEV Status", labelZh: "排烟状态", val: "ACTIVE PURGE" }
          ],
          canvas: `
            <svg class="demo-svg-stage" viewBox="0 0 640 270" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="80" y="210" width="480" height="16" rx="4" fill="#1e293b" stroke="#475569"/>
              <!-- Skylight / Facade Sash pivoting upward -->
              <g id="demoSmokeSash" style="transform-origin: 150px 210px; transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); transform: rotate(-42deg);">
                <rect x="150" y="196" width="320" height="14" rx="4" fill="#0f172a" stroke="#ef4444" stroke-width="2.5"/>
              </g>
              <!-- Concealed 24V Chain Actuator -->
              <line id="demoSmokeChain" x1="420" y1="210" x2="365" y2="82" stroke="#facc15" stroke-width="4" stroke-dasharray="6 4"/>
              <!-- Rising Smoke / Heat Extraction Plumes -->
              <g id="demoSmokePlumes" stroke="#fb923c" stroke-width="3.5" stroke-linecap="round">
                <path class="demo-airflow-path" d="M260 205 C280 155, 310 120, 345 42"/>
                <path class="demo-airflow-path" d="M330 205 C355 150, 390 115, 430 36"/>
                <path class="demo-airflow-path" d="M400 205 C425 155, 465 125, 515 48"/>
              </g>
            </svg>`
        };

      case "doorlock":
        return {
          modes: [
            { id: "unlocked", en: "Unlocked Glide (0mm Sill)", zh: "顺滑开启 (零门槛)" },
            { id: "locked", en: "3-Point Hook Locked (RC3)", zh: "三点钢钩闭锁 (RC3)" }
          ],
          defaultMode: "locked",
          telemetry: [
            { id: "lockState", labelEn: "Hook Bolts", labelZh: "不锈钢钩锁", val: "3 ENGAGED" },
            { id: "sillStep", labelEn: "Floor Threshold", labelZh: "门槛高度差", val: "0 mm Flush" }
          ],
          canvas: `
            <svg class="demo-svg-stage" viewBox="0 0 640 270" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Door Frame Jamb -->
              <rect x="330" y="24" width="44" height="222" rx="6" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
              <!-- Door Leaf -->
              <g id="demoDoorLeaf" style="transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1); transform: translateX(0px);">
                <rect x="130" y="28" width="194" height="214" rx="8" fill="rgba(182,134,75,0.14)" stroke="#b6864b" stroke-width="3"/>
                <text x="227" y="138" text-anchor="middle" fill="#fff" font-size="15" font-weight="800">A72 DOOR LEAF</text>
                <!-- 3 Stainless Steel Hook Bolts -->
                <g id="demoDoorHooks" style="transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1); transform: translateX(18px);">
                  <path d="M318 66 H348 V52" stroke="#facc15" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M318 135 H348 V121" stroke="#facc15" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M318 204 H348 V190" stroke="#facc15" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
              </g>
              <!-- Zero Threshold Floor Line -->
              <line x1="60" y1="246" x2="580" y2="246" stroke="#38d9a9" stroke-width="3" stroke-dasharray="8 6"/>
              <text x="480" y="236" fill="#38d9a9" font-size="12" font-weight="800">0mm FLUSH THRESHOLD</text>
            </svg>`
        };

      default: // "smart" (GEN 4.0)
        return {
          modes: [
            { id: "rain", en: "Rain Sensor Auto-Close", zh: "突发降雨自动关窗" },
            { id: "bio", en: "Biometric Unlock", zh: "指纹生物识别解锁" },
            { id: "vent", en: "CO2 Smart Micro-Vent", zh: "CO2 感应智能换气" },
            { id: "away", en: "Away All-Lock Mode", zh: "离家全屋自动反锁" }
          ],
          defaultMode: "rain",
          telemetry: [
            { id: "smartAction", labelEn: "Active Automation", labelZh: "当前自动化指令", val: "AUTO-SEAL" },
            { id: "smartNoise", labelEn: "Drive Acoustics", labelZh: "驱动噪音", val: "31 dB" }
          ],
          canvas: `
            <div style="width:100%;max-width:620px;display:grid;gap:18px;text-align:center;">
              <div id="demoSmartHub" style="padding:26px;border-radius:20px;background:rgba(34,211,238,0.1);border:1px solid rgba(34,211,238,0.45);transition:all 0.45s ease;">
                <div id="demoSmartIcon" style="font-size:40px;margin-bottom:8px;">🌧️</div>
                <div id="demoSmartStatus" style="font-size:20px;font-weight:800;color:#fff;">Rain Detected → Windows Closing &amp; Locking (1.2s)</div>
                <div id="demoSmartSub" style="font-size:13px;color:rgba(255,255,255,0.72);margin-top:6px;">24V Concealed Brushless Actuators • Push Alert Sent to Smartphone</div>
              </div>
              <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
                <div class="ps-telemetry-chip" style="justify-content:center;"><span>Motor:</span><strong id="demoSmartMotor">CLOSING</strong></div>
                <div class="ps-telemetry-chip" style="justify-content:center;"><span>Lock:</span><strong id="demoSmartLock">ENGAGED</strong></div>
                <div class="ps-telemetry-chip" style="justify-content:center;"><span>App Sync:</span><strong style="color:#38d9a9;">ONLINE</strong></div>
              </div>
            </div>`
        };
    }
  }

  function renderShowcase() {
    const slug = document.body.dataset.productSlug;
    const products = window.SWAN_PRODUCTS || {};
    const order = window.SWAN_PRODUCT_ORDER || [];
    const p = products[slug];
    const root = document.getElementById("productShowcaseRoot");
    if (!p || !root) return;

    // Apply product signature accent color
    document.documentElement.style.setProperty("--ps-accent", p.accent || "#b6864b");
    document.documentElement.style.setProperty("--ps-accent-glow", p.accentGlow || "rgba(182, 134, 75, 0.26)");
    document.body.classList.add("ps-showcase");

    const idx = order.indexOf(slug);
    const prevProduct = products[order[(idx - 1 + order.length) % order.length]];
    const nextProduct = products[order[(idx + 1) % order.length]];
    const lab = buildMotionLabMarkup(p);

    const hotspotPinsHtml = p.hotspots
      .map(
        (h, i) => `
        <button type="button" class="hotspot-pin${i === 0 ? " is-active" : ""}" data-tab="${i + 1}" style="left:${h.x}%; top:${h.y}%;" aria-label="${esc(h.titleEn)}">
          <span class="hotspot-pulse"></span>
          <span class="hotspot-num">${i + 1}</span>
        </button>`
      )
      .join("");

    const hotspotTabsHtml = p.hotspots
      .map(
        (h, i) => `
        <div class="tech-tab-item${i === 0 ? " is-active" : ""}" data-tab-target="${i + 1}">
          <div class="tab-header">
            <span class="tab-badge">0${i + 1}</span>
            ${biSpan(h.titleEn, h.titleZh, "h4")}
          </div>
          ${biSpan(h.descEn, h.descZh, "p")}
        </div>`
      )
      .join("");

    const bentoStatsHtml = p.bentoStats
      .map(
        (s) => `
        <div class="bento-card" data-reveal="up">
          ${biSpan(s.tagEn, s.tagZh, "span", "bento-tag")}
          <div class="bento-metric-large">
            ${s.prefix ? `${esc(s.prefix)}` : ""}<span data-counter="${s.val}" data-start="0" data-decimals="${s.decimals || 0}">${s.val}</span> <span class="unit">${esc(s.unit)}</span>
          </div>
          ${
            s.soundwave
              ? `<div class="soundwave-box">
                  <span class="sound-bar"></span><span class="sound-bar"></span><span class="sound-bar"></span><span class="sound-bar"></span>
                  ${biSpan("Acoustic Barrier →", "声学降噪屏障 →", "span", "")}
                  <span class="sound-bar sound-bar-dampened"></span><span class="sound-bar sound-bar-dampened"></span><span class="sound-bar sound-bar-dampened"></span>
                </div>`
              : ""
          }
          ${biSpan(s.titleEn, s.titleZh, "h3")}
          ${biSpan(s.descEn, s.descZh, "p")}
        </div>`
      )
      .join("");

    const modeButtonsHtml = lab.modes
      .map(
        (m) => `
        <button type="button" class="ps-mode-btn${m.id === lab.defaultMode ? " is-active" : ""}" data-demo-mode="${esc(m.id)}" data-en="${esc(m.en)}" data-zh="${esc(m.zh)}">${esc(getLang() === "zh" ? m.zh : m.en)}</button>`
      )
      .join("");

    const telemetryHtml = lab.telemetry
      .map(
        (t) => `
        <div class="ps-telemetry-chip">
          ${biSpan(t.labelEn, t.labelZh, "span")}
          <strong id="tel-${esc(t.id)}">${esc(t.val)}</strong>
        </div>`
      )
      .join("");

    root.innerHTML = `
      <!-- Sticky Sub-Navigation with Progress Bar -->
      <nav class="apple-subnav" id="appleSubnav">
        <div class="subnav-progress-bar" id="progressBar"></div>
        <div class="apple-subnav-content">
          <div class="subnav-title">
            ${biSpan(p.seriesEn, p.seriesZh, "span", "subnav-series")}
            <strong>${esc(p.name)}</strong>
          </div>
          <div class="subnav-links">
            <a href="#overview" class="subnav-item active" data-en="Overview" data-zh="概述">Overview</a>
            <a href="#engineering" class="subnav-item" data-en="Anatomy" data-zh="结构解剖">Anatomy</a>
            <a href="#motion-lab" class="subnav-item" data-en="Motion Lab" data-zh="动态演示">Motion Lab</a>
            <a href="#performance" class="subnav-item" data-en="Performance" data-zh="性能矩阵">Performance</a>
            <a href="#thermal-simulator" class="subnav-item" data-en="Comparison" data-zh="红外对比">Comparison</a>
            <a href="#tech-specs" class="subnav-item" data-en="Specs" data-zh="技术参数">Specs</a>
            <a href="index.html#contact" class="apple-subnav-cta" data-en="Get a Quote" data-zh="预约专属报价">Get a Quote</a>
          </div>
        </div>
      </nav>

      <main class="ps-page-enter">
        <!-- HERO SECTION -->
        <section id="overview" class="apple-hero-section">
          <div class="apple-hero-glow"></div>
          <div class="apple-hero-glow-secondary"></div>

          <div class="apple-hero-content">
            ${biSpan(p.eyebrowEn, p.eyebrowZh, "p", "apple-eyebrow-badge")}
            <h1 class="apple-hero-headline" data-reveal="up">
              <span class="gradient-text">${esc(p.name)}</span>
            </h1>
            ${biSpan(p.subheadEn, p.subheadZh, "p", "apple-hero-subhead")}

            <div class="apple-hero-actions" data-reveal="up">
              <a href="#motion-lab" class="apple-btn-primary" data-en="Launch Interactive Demo" data-zh="启动动态交互演示">Launch Interactive Demo</a>
              <a href="#engineering" class="apple-btn-secondary" data-en="Inspect Cross-Section →" data-zh="探索内部结构细节 →">Inspect Cross-Section →</a>
            </div>

            <div class="apple-hero-visual-wrapper" data-reveal="zoom">
              <div class="apple-hero-card-blur tilt-card ps-hero-visual-stage" id="heroTiltCard">
                <img src="${esc(p.heroImg)}" fetchpriority="high" decoding="async" width="1376" height="768" alt="${esc(p.name)}" class="apple-hero-img">
                <div class="ps-scan-beam"></div>
                <div class="hero-chip-floating">
                  ${biSpan(p.chipLabelEn, p.chipLabelZh, "span", "chip-label")}
                  <span class="chip-val">${biSpan(p.chipPrefixEn, p.chipPrefixZh, "span")} <span data-counter="${p.chipVal}" data-start="${p.chipStart}" data-decimals="${p.chipDecimals}">${p.chipVal}</span> ${esc(p.chipUnit)}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- SCROLL STORYTELLING -->
        <section class="apple-scroll-story">
          <div class="story-container" data-reveal="up">
            ${biSpan(p.storyLeadEn, p.storyLeadZh, "p", "story-lead")}
            <h2 class="story-headline">
              ${biSpan(p.storyHead1En, p.storyHead1Zh, "span", "story-word")}<br>
              ${biSpan(p.storyHead2En, p.storyHead2Zh, "span", "story-word highlight")}
            </h2>
            ${biSpan(p.storyBodyEn, p.storyBodyZh, "p", "story-body")}
          </div>
        </section>

        <!-- ENGINEERING EXPLORER WITH FOCAL ZOOM TRANSITIONS -->
        <section id="engineering" class="apple-engineering-section">
          <div class="section-container">
            <div class="apple-section-header" data-reveal="up">
              <p class="apple-eyebrow" data-en="INTERACTIVE STRUCTURAL ANATOMY" data-zh="交互式结构解剖">INTERACTIVE STRUCTURAL ANATOMY</p>
              <h2 class="apple-title-large" data-en="Zoom into every engineered detail." data-zh="聚焦每一处德系精工细节。">Zoom into every engineered detail.</h2>
              <p class="apple-desc" data-en="Click any structural hotspot to smoothly zoom and inspect how each chamber, gasket, and reinforcement layer performs." data-zh="点击任意结构热点，镜头将平滑缩放聚焦并为您详解每一道腔体、密封胶条与强化结构。">Click any structural hotspot to smoothly zoom and inspect how each chamber, gasket, and reinforcement layer performs.</p>
            </div>

            <div class="engineering-interactive-grid">
              <div class="engineering-sticky-col">
                <div class="engineering-visual-card" id="profileTiltCard">
                  <div class="ps-hotspot-stage" id="hotspotStage">
                    <div class="ps-hotspot-viewport" id="hotspotViewport">
                      <img src="${esc(p.profileImg)}" loading="lazy" decoding="async" width="1376" height="768" alt="${esc(p.name)} Cross-Section" class="engineering-profile-img">
                      ${hotspotPinsHtml}
                    </div>
                  </div>
                  <div class="ps-hotspot-controls">
                    <button type="button" class="ps-tour-pill is-active" id="toggleAutoTourBtn">
                      <span class="ps-tour-dot"></span>
                      <span data-en="Guided Detail Tour: ON" data-zh="自动细节巡检：开启">Guided Detail Tour: ON</span>
                    </button>
                    <button type="button" class="ps-tour-pill" id="resetZoomBtn" data-en="Reset Full View" data-zh="还原全景视图">Reset Full View</button>
                  </div>
                </div>
              </div>

              <div class="tech-tabs-wrapper" data-reveal="right">
                <div class="tech-tabs">${hotspotTabsHtml}</div>
              </div>
            </div>
          </div>
        </section>

        <!-- BESPOKE INTERACTIVE MOTION LAB -->
        <section id="motion-lab" class="ps-motion-section">
          <div class="section-container">
            <div class="apple-section-header" data-reveal="up">
              <p class="apple-eyebrow" data-en="LIVE INTERACTIVE MOTION LAB" data-zh="实时动态交互演示台">LIVE INTERACTIVE MOTION LAB</p>
              ${biSpan(p.demoTitleEn, p.demoTitleZh, "h2", "apple-title-large")}
              ${biSpan(p.demoDescEn, p.demoDescZh, "p", "apple-desc")}
            </div>

            <div class="ps-motion-shell" data-reveal="zoom">
              <div class="ps-motion-toolbar">
                <div class="ps-mode-pills">${modeButtonsHtml}</div>
                <div class="ps-telemetry-strip">${telemetryHtml}</div>
              </div>
              <div class="ps-motion-canvas">${lab.canvas}</div>
              <div class="ps-motion-caption" id="demoMotionCaption"></div>
            </div>
          </div>
        </section>

        <!-- PERFORMANCE BENTO GRID -->
        <section id="performance" class="apple-bento-section">
          <div class="section-container">
            <div class="apple-section-header" data-reveal="up">
              <p class="apple-eyebrow" data-en="PERFORMANCE BENTO" data-zh="硬核性能矩阵">PERFORMANCE BENTO</p>
              <h2 class="apple-title-large" data-en="Engineered numbers that hold up in Perth." data-zh="经得起西澳气候检验的硬核数据。">Engineered numbers that hold up in Perth.</h2>
            </div>

            <div class="apple-bento-grid">
              <div class="bento-card bento-card-hero" data-reveal="zoom">
                <div class="bento-hero-inner">
                  <div class="bento-hero-text">
                    ${biSpan(p.bentoHero.tagEn, p.bentoHero.tagZh, "span", "bento-tag")}
                    <div class="bento-giant-metric">
                      ${biSpan(p.bentoHero.prefixEn, p.bentoHero.prefixZh, "span", "unit")}
                      <span data-counter="${p.bentoHero.val}" data-start="${p.bentoHero.start}" data-decimals="${p.bentoHero.decimals}">${p.bentoHero.val}</span>
                      <span class="unit">${esc(p.bentoHero.unit)}</span>
                    </div>
                    ${biSpan(p.bentoHero.titleEn, p.bentoHero.titleZh, "h3")}
                    ${biSpan(p.bentoHero.descEn, p.bentoHero.descZh, "p")}
                    <div class="bento-hero-pills">
                      ${p.bentoHero.pillsEn.map((en, i) => biSpan(en, p.bentoHero.pillsZh[i], "span", "hero-pill")).join("")}
                    </div>
                  </div>

                  <div class="bento-hero-visual">
                    <div class="visual-header">
                      <span class="visual-tag" data-en="Perth Climate Shield" data-zh="西澳极端气候防护盾">Perth Climate Shield</span>
                    </div>
                    <img src="${esc(p.profileImg)}" loading="lazy" decoding="async" width="1376" height="768" alt="${esc(p.name)} Thermal Shield" class="bento-profile-thumb">
                    <div class="temp-gauge-container">
                      <div class="temp-chip outdoor">
                        <small data-en="Perth Sun" data-zh="室外烈日">Perth Sun</small>
                        <strong>42°C</strong>
                      </div>
                      <div class="temp-divider">
                        <span class="shield-icon">🛡️</span>
                        <small>${esc(p.bentoHero.shieldLabel)}</small>
                      </div>
                      <div class="temp-chip indoor">
                        <small data-en="Indoor Cool" data-zh="室内恒温">Indoor Cool</small>
                        <strong>21°C</strong>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bento-hero-bg-glow"></div>
              </div>

              ${bentoStatsHtml}
            </div>
          </div>
        </section>

        <!-- THERMAL INFRARED COMPARISON SLIDER -->
        <section id="thermal-simulator" class="apple-thermal-section">
          <div class="section-container">
            <div class="apple-section-header" data-reveal="up">
              <p class="apple-eyebrow" data-en="THERMAL & PERFORMANCE SPLIT COMPARISON" data-zh="热红外与性能滑动对比实验">THERMAL & PERFORMANCE SPLIT COMPARISON</p>
              <h2 class="apple-title-large" data-en="Slide to compare the engineering leap." data-zh="左右滑动，直观感受代际性能差距。">Slide to compare the engineering leap.</h2>
            </div>

            <div class="thermal-comparison-wrapper" id="thermalSlider" data-reveal="zoom" style="touch-action: pan-y; cursor: ew-resize;">
              <div class="thermal-panel panel-traditional">
                <img src="${esc(p.thermalImg)}" loading="lazy" decoding="async" width="1376" height="768" alt="Conventional Profile" class="thermal-img">
                <div class="thermal-overlay thermal-hot-overlay"></div>
                <div class="thermal-label-tag tag-left">
                  ${biSpan(p.thermalCompare.leftLabelEn, p.thermalCompare.leftLabelZh, "strong")}
                  ${biSpan(p.thermalCompare.leftSubEn, p.thermalCompare.leftSubZh, "span")}
                </div>
              </div>

              <div class="thermal-panel panel-hueck">
                <img src="${esc(p.thermalImg)}" loading="lazy" decoding="async" width="1376" height="768" alt="${esc(p.name)}" class="thermal-img">
                <div class="thermal-overlay thermal-cool-overlay"></div>
                <div class="thermal-label-tag tag-right">
                  ${biSpan(p.thermalCompare.rightLabelEn, p.thermalCompare.rightLabelZh, "strong")}
                  ${biSpan(p.thermalCompare.rightSubEn, p.thermalCompare.rightSubZh, "span")}
                </div>
              </div>

              <div class="thermal-handle" id="sliderHandle">
                <div class="handle-line"></div>
                <div class="handle-button">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 8L22 12L18 16M6 8L2 12L6 16"/></svg>
                </div>
                <div class="handle-line"></div>
              </div>
            </div>
          </div>
        </section>

        <!-- TABBED TECHNICAL SPECIFICATIONS -->
        <section id="tech-specs" class="apple-tech-specs-section">
          <div class="section-container">
            <div class="apple-section-header" data-reveal="up">
              <p class="apple-eyebrow" data-en="FULL SPECIFICATIONS" data-zh="全维度技术参数表">FULL SPECIFICATIONS</p>
              <h2 class="apple-title-large" data-en="${esc(p.name)} technical datasheet." data-zh="${esc(p.name)} 详细工程参数。">${esc(p.name)} technical datasheet.</h2>
            </div>

            <div class="spec-category-tabs" data-reveal="up">
              <button type="button" class="spec-tab-btn active" data-spec-tab="dims" data-en="Dimensions & Profiles" data-zh="结构尺寸与型材">Dimensions & Profiles</button>
              <button type="button" class="spec-tab-btn" data-spec-tab="thermal" data-en="Thermal & Weather" data-zh="保温与耐候等级">Thermal & Weather</button>
              <button type="button" class="spec-tab-btn" data-spec-tab="glass" data-en="Glazing & Acoustics" data-zh="玻璃与声学配置">Glazing & Acoustics</button>
              <button type="button" class="spec-tab-btn" data-spec-tab="finish" data-en="Surface Finishes" data-zh="表面处理与配色">Surface Finishes</button>
            </div>

            <div class="spec-table-card" data-reveal="up">
              <div class="spec-group-content active" id="spec-group-dims"><table class="apple-spec-table"><tbody>${renderSpecRows(p.specs.dims)}</tbody></table></div>
              <div class="spec-group-content" id="spec-group-thermal"><table class="apple-spec-table"><tbody>${renderSpecRows(p.specs.thermal)}</tbody></table></div>
              <div class="spec-group-content" id="spec-group-glass"><table class="apple-spec-table"><tbody>${renderSpecRows(p.specs.glass)}</tbody></table></div>
              <div class="spec-group-content" id="spec-group-finish"><table class="apple-spec-table"><tbody>${renderSpecRows(p.specs.finish)}</tbody></table></div>
            </div>
          </div>
        </section>

        <!-- CALL TO ACTION BANNER -->
        <section class="catalog-section product-contact" style="padding: 64px 24px;">
          <div class="section-inner" style="max-width:1160px; margin:0 auto; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:24px;">
            <div>
              <p class="eyebrow" data-en="PERTH SUPPLY-ONLY SPECIALIST" data-zh="珀斯德系断桥铝源头直供">PERTH SUPPLY-ONLY SPECIALIST</p>
              <h2 class="apple-headline" data-en="Specify ${esc(p.name)} for your WA project." data-zh="为您的西澳项目定制 ${esc(p.name)}。">Specify ${esc(p.name)} for your WA project.</h2>
              <p style="color:rgba(255,255,255,0.75); max-width:620px; margin-top:8px;" data-en="Send your PDF house plans or window schedule for an itemized Perth DDP landed quote within 48 hours, or book a corner sample viewing." data-zh="发送 PDF 建筑图纸或门窗表，48 小时内提供珀斯全包清关分项报价，或预约珀斯本地看样。">Send your PDF house plans or window schedule for an itemized Perth DDP landed quote within 48 hours, or book a corner sample viewing.</p>
            </div>
            <div style="display:flex; gap:12px; flex-wrap:wrap;">
              <button type="button" class="button primary open-estimator-btn" data-en="Instant Price Estimator" data-zh="在线智能估价">Instant Price Estimator</button>
              <a class="button secondary" href="index.html#contact" data-en="Request Formal Quote →" data-zh="获取正式分项报价 →">Request Formal Quote →</a>
            </div>
          </div>
        </section>

        <!-- NEXT / PREVIOUS SERIES SWITCHER -->
        <section class="ps-series-nav" aria-label="Browse other product systems">
          <div class="ps-series-grid">
            <a class="ps-nav-card" href="${esc(prevProduct.url)}">
              <img class="ps-nav-thumb" src="${esc(prevProduct.heroImg)}" loading="lazy" decoding="async" width="1376" height="768" alt="${esc(prevProduct.name)}">
              <div class="ps-nav-meta">
                <small data-en="← Previous System" data-zh="← 上一个系统">← Previous System</small>
                <strong>${esc(prevProduct.name)}</strong>
                <span>${esc(prevProduct.shortMetric || "")}</span>
              </div>
            </a>
            <a class="ps-nav-card is-next" href="${esc(nextProduct.url)}">
              <div class="ps-nav-meta">
                <small data-en="Next System →" data-zh="下一个系统 →">Next System →</small>
                <strong>${esc(nextProduct.name)}</strong>
                <span>${esc(nextProduct.shortMetric || "")}</span>
              </div>
              <img class="ps-nav-thumb" src="${esc(nextProduct.heroImg)}" loading="lazy" decoding="async" width="1376" height="768" alt="${esc(nextProduct.name)}">
            </a>
          </div>
          <div style="text-align:center; margin-top:28px;">
            <a href="products.html" class="ps-tour-pill" style="text-decoration:none;" data-en="View All 13 German Systems →" data-zh="返回全部 13 大德系产品目录 →">View All 13 German Systems →</a>
          </div>
        </section>
      </main>
    `;

    // Re-apply current language so all dynamically rendered elements match EN/ZH
    if (typeof window.setLanguage === "function") {
      window.setLanguage(getLang());
    }

    initShowcaseInteractions(p, lab);
  }

  function initShowcaseInteractions(p, lab) {
    // 1. Scroll Progress Bar & Subnav Highlight
    const progressBar = document.getElementById("progressBar");
    const subnavItems = document.querySelectorAll(".subnav-item");
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (progressBar && totalHeight > 0) {
        progressBar.style.width = `${(window.scrollY / totalHeight) * 100}%`;
      }
      let current = "";
      sections.forEach((sec) => {
        if (window.scrollY >= sec.offsetTop - 160) current = sec.id;
      });
      subnavItems.forEach((item) => {
        item.classList.toggle("active", item.getAttribute("href") === `#${current}`);
      });
    }, { passive: true });

    // 2. Scroll Reveal & Counters
    function animateCounter(el) {
      if (el.dataset.animated) return;
      el.dataset.animated = "true";
      const target = parseFloat(el.dataset.counter);
      const start = parseFloat(el.dataset.start || 0);
      const decimals = parseInt(el.dataset.decimals || 0, 10);
      const duration = 1400;
      const startTime = performance.now();
      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = (start + (target - start) * ease).toFixed(decimals);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target.toFixed(decimals);
      }
      requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          entry.target.querySelectorAll("[data-counter]").forEach(animateCounter);
          if (entry.target.hasAttribute("data-counter")) animateCounter(entry.target);
          if (entry.target.id === "thermalSlider" && !entry.target.dataset.swept) {
            entry.target.dataset.swept = "true";
            runThermalSweepDemo();
          }
        }
      });
    }, { threshold: 0, rootMargin: "180px 0px 180px 0px" });

    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    setTimeout(() => {
      document.querySelectorAll("#overview [data-reveal], .apple-hero-visual-wrapper").forEach((el) => {
        el.classList.add("revealed");
        el.querySelectorAll("[data-counter]").forEach(animateCounter);
      });
    }, 60);

    // 3. Bento Spotlight Border
    document.querySelectorAll(".bento-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--my", `${e.clientY - rect.top}px`);
      });
    });

    // 4. 3D Perspective Tilt
    document.querySelectorAll(".tilt-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rX = (-y / rect.height) * 10;
        const rY = (x / rect.width) * 10;
        card.style.transform = `perspective(1000px) rotateX(${rX.toFixed(2)}deg) rotateY(${rY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      });
    });

    // 5. Focal-Zoom Hotspot Explorer & Auto Tour
    const stage = document.getElementById("hotspotStage");
    const viewport = document.getElementById("hotspotViewport");
    const pins = document.querySelectorAll(".hotspot-pin");
    const tabs = document.querySelectorAll(".tech-tab-item");
    const tourBtn = document.getElementById("toggleAutoTourBtn");
    const resetZoomBtn = document.getElementById("resetZoomBtn");
    let activeTab = 1;
    let autoTourOn = true;

    function focusHotspot(tabId, shouldZoom = true) {
      activeTab = parseInt(tabId, 10);
      const h = p.hotspots[activeTab - 1];
      pins.forEach((pin) => pin.classList.toggle("is-active", pin.dataset.tab === String(activeTab)));
      tabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.tabTarget === String(activeTab)));
      if (stage && viewport && h) {
        viewport.style.transformOrigin = `${h.x}% ${h.y}%`;
        stage.classList.toggle("is-zoomed", shouldZoom);
      }
    }

    pins.forEach((pin) => {
      pin.addEventListener("click", () => {
        autoTourOn = false;
        updateTourBtn();
        focusHotspot(pin.dataset.tab, true);
      });
    });

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        autoTourOn = false;
        updateTourBtn();
        focusHotspot(tab.dataset.tabTarget, true);
      });
    });

    function updateTourBtn() {
      if (!tourBtn) return;
      tourBtn.classList.toggle("is-active", autoTourOn);
      const label = tourBtn.querySelector("span[data-en]");
      if (label) {
        label.dataset.en = autoTourOn ? "Guided Detail Tour: ON" : "Guided Detail Tour: PAUSED";
        label.dataset.zh = autoTourOn ? "自动细节巡检：开启" : "自动细节巡检：已暂停";
        label.textContent = getLang() === "zh" ? label.dataset.zh : label.dataset.en;
      }
    }

    if (tourBtn) {
      tourBtn.addEventListener("click", () => {
        autoTourOn = !autoTourOn;
        updateTourBtn();
      });
    }

    if (resetZoomBtn && stage) {
      resetZoomBtn.addEventListener("click", () => {
        autoTourOn = false;
        updateTourBtn();
        stage.classList.remove("is-zoomed");
      });
    }

    setInterval(() => {
      if (!autoTourOn) return;
      activeTab = (activeTab % p.hotspots.length) + 1;
      focusHotspot(activeTab, true);
    }, 3800);

    // 6. Bespoke Interactive Motion Lab Logic
    const modeBtns = document.querySelectorAll("[data-demo-mode]");
    const captionEl = document.getElementById("demoMotionCaption");

    function applyDemoMode(mode) {
      modeBtns.forEach((b) => b.classList.toggle("is-active", b.dataset.demoMode === mode));
      const isZh = getLang() === "zh";

      if (p.demoType === "sightline") {
        const win = document.getElementById("demoSightlineWin");
        const badge = document.getElementById("demoSightlineBadge");
        const isSlim = mode === "slim";
        if (win) win.classList.toggle("is-slim", isSlim);
        if (badge) badge.textContent = isSlim ? "45mm Ultra-Slim • +26% Daylight" : "115mm Standard Frame • Baseline";
        const t1 = document.getElementById("tel-glassArea");
        const t2 = document.getElementById("tel-faceWidth");
        if (t1) t1.textContent = isSlim ? "+26%" : "Baseline";
        if (t2) t2.textContent = isSlim ? "45 mm" : "115 mm";
        if (captionEl) captionEl.textContent = isSlim
          ? (isZh ? "极窄 45mm 可视边框释放额外 26% 净采光面积，同时保持 75/90mm 完整断桥隔热芯。" : "45mm razor-slim sightlines unlock +26% more glass area without reducing thermal break depth.")
          : (isZh ? "对比基准：传统 115mm 宽大铝框在视觉上形成厚重暗影与遮挡。" : "Baseline comparison: conventional 115mm frames create heavy mullions and shadow lines.");
      } else if (p.demoType === "outward") {
        const sash = document.getElementById("demoOutwardSash");
        const flow = document.getElementById("demoOutwardFlow");
        const rain = document.getElementById("demoRainGroup");
        const t1 = document.getElementById("tel-sealForce");
        const angleMap = { closed: 0, awning: 25, full: 68 };
        if (sash) sash.style.transform = `rotate(${angleMap[mode] ?? 25}deg)`;
        if (flow) flow.style.opacity = mode === "closed" ? "0" : "1";
        if (rain) rain.style.opacity = mode === "full" ? "0.2" : "0.9";
        if (t1) t1.textContent = mode === "closed" ? "E1200 LOCKED" : mode === "awning" ? "RAIN SHIELD" : "MAX AIRFLOW";
        if (captionEl) captionEl.textContent = mode === "closed"
          ? (isZh ? "风暴锁闭态：沿海正风压将外开窗扇更紧地压向三道 EPDM 胶条，滴水不漏。" : "Storm Locked: coastal wind pressure compresses the outward sash tighter against triple EPDM seals.")
          : mode === "awning"
          ? (isZh ? "雨天微开 25°：外悬扇化身天然雨篷，雨水被导离窗台，新鲜空气持续对流。" : "Rain-Safe 25° Awning: outward sash acts as a canopy shedding rain while fresh air flows underneath.")
          : (isZh ? "全开 70° 通风：彻底释放珀斯傍晚海风对流，且完全不占用室内窗帘空间。" : "Full 70° Breeze: captures Fremantle Doctor sea breezes without touching interior blinds.");
      } else if (p.demoType === "heritage") {
        const core = document.getElementById("demoXrayCore");
        const line = document.getElementById("demoXrayLine");
        const pct = mode === "exterior" ? 100 : mode === "xray" ? 0 : 50;
        if (core) core.style.clipPath = `inset(0 0 0 ${pct}%)`;
        if (line) line.style.left = `${pct}%`;
        if (captionEl) captionEl.textContent = mode === "xray"
          ? (isZh ? "X 光透视：古典线脚内部隐藏完整的 75mm PA66 断桥隔热腔与 RC3 钢锁。" : "X-Ray Core: beneath the heritage contours sits a modern 75mm PA66 thermal break and RC3 steel lock.")
          : (isZh ? "古典复古外框线脚与现代免维护断桥铝完美融合，兼顾历史建筑风貌与四季恒温。" : "Classic heritage mouldings preserve period charm while eliminating drafts, rot, and repainting.");
      } else if (p.demoType === "ventilation") {
        const leaf = document.getElementById("demoVentLeaf");
        const air = document.getElementById("demoVentAir");
        const isNight = mode === "night";
        if (leaf) leaf.style.transform = isNight ? "scaleX(0.28)" : "scaleX(1)";
        if (air) air.style.opacity = isNight ? "1" : "0";
        if (captionEl) captionEl.textContent = isNight
          ? (isZh ? "夜间微通风开启：170mm 极窄通道配合不锈钢防虫格栅，凉风入室且防虫防盗。" : "Night-Purge Active: cool air flows through the 170mm mesh-protected slit while bugs and intruders stay out.")
          : (isZh ? "密闭状态：高密度发泡实体扇与邻接落地玻璃融为一体，隔音高达 47 dB。" : "Sealed State: insulated foam-core vent panel locks flush for 47 dB quiet and Uf 0.92 efficiency.");
      } else if (p.demoType === "passive") {
        const bg = document.getElementById("demoPassiveOutBg");
        const txt = document.getElementById("demoPassiveOutTxt");
        const tOut = document.getElementById("tel-outdoorTemp");
        const isSum = mode === "summer";
        if (bg) {
          bg.setAttribute("fill", isSum ? "rgba(239,68,68,0.18)" : "rgba(56,189,248,0.18)");
          bg.setAttribute("stroke", isSum ? "rgba(239,68,68,0.5)" : "rgba(56,189,248,0.55)");
        }
        if (txt) {
          txt.textContent = isSum ? "44°C" : "4°C";
          txt.setAttribute("fill", isSum ? "#fca5a5" : "#7dd3fc");
        }
        if (tOut) tOut.textContent = isSum ? "44°C" : "4°C";
        if (captionEl) captionEl.textContent = isSum
          ? (isZh ? "珀斯 44°C 酷暑模式：三玻 Low-E 与 90mm 发泡断桥阻绝热浪，室内稳定维持 22°C。" : "Perth 44°C Summer: triple Low-E glass and 90mm foam break block radiant heat, keeping rooms at 22°C.")
          : (isZh ? "4°C 寒冬深夜：超低 0.70 Uf 锁住室内暖气，窗框表面温暖零结露。" : "4°C Winter Night: 0.70 Uf Passive House barrier locks warmth inside with zero condensation.");
      } else if (p.demoType === "acoustic") {
        const map = { freeway: [85, 33], airport: [90, 38], storm: [78, 26] };
        const [outV, inV] = map[mode] || [85, 33];
        const t1 = document.getElementById("tel-outDb");
        const t2 = document.getElementById("tel-inDb");
        const l1 = document.getElementById("demoOutDbLabel");
        const l2 = document.getElementById("demoInDbLabel");
        if (t1) t1.textContent = `${outV} dB`;
        if (t2) t2.textContent = `${inV} dB`;
        if (l1) l1.textContent = `${outV} dB Outdoor`;
        if (l2) l2.textContent = `${inV} dB Indoor Calm`;
        if (captionEl) captionEl.textContent = isZh
          ? `外界 ${outV} dB 强噪音经 SilentAir 声学迷宫与非对称三玻衰减 52 dB 后，室内仅余 ${inV} dB 图书馆级静谧。`
          : `External ${outV} dB noise collapses by 52 dB through the SilentAir baffle & acoustic triple glazing to ${inV} dB calm.`;
      } else if (p.demoType === "armor") {
        const layers = document.querySelectorAll(".demo-armor-layer");
        layers.forEach((l) => l.classList.toggle("is-active", l.dataset.layer === mode));
        const descMap = [
          [ "Layer 1 — Architectural 6060-T66 Aluminium Shell preserves seamless luxury aesthetics.", "第 1 层 — 建筑级 6060-T66 铝外壳，保持与常规高端门窗完全一致的优雅外观。" ],
          [ "Layer 2 — Intumescent Fire Seals expand 10x under flame heat to seal smoke & fire for EI60.", "第 2 层 — 遇热膨胀防火条在高温下瞬间膨胀 10 倍，60 分钟内严密封堵浓烟与烈焰。" ],
          [ "Layer 3 — Concealed EN 1522 FB4/FB6 Hardened Steel Core stops high-velocity ballistic rounds.", "第 3 层 — 隐蔽式 EN 1522 FB4/FB6 特种防弹钢芯，硬核抵御枪弹冲击。" ],
          [ "Layer 4 — Multi-Layer Polycarbonate-Laminated BR6 Glass prevents spalling and forced breach.", "第 4 层 — 多层聚碳酸酯复合 BR6 防弹玻璃，抗击穿且无飞溅碎屑。" ]
        ];
        const item = descMap[parseInt(mode, 10)] || descMap[2];
        if (captionEl) captionEl.textContent = isZh ? item[1] : item[0];
      } else if (p.demoType === "load") {
        const pa = parseInt(mode, 10) || 3000;
        const range = document.getElementById("demoWindRange");
        if (range) range.value = String(pa);
        updateLoadBend(pa);
      } else if (p.demoType === "smoke") {
        const sash = document.getElementById("demoSmokeSash");
        const chain = document.getElementById("demoSmokeChain");
        const plumes = document.getElementById("demoSmokePlumes");
        const t1 = document.getElementById("tel-openAngle");
        const t2 = document.getElementById("tel-smokeStatus");
        const cfg = {
          closed: { rot: 0, cy: 205, smoke: 0, ang: "0°", status: "SEALED", en: "Standby Sealed: thermally broken frame operates as an energy-saving window.", zh: "待机密闭态：断桥隔热窗体完全闭合，维持建筑高效保温。" },
          daily: { rot: -18, cy: 145, smoke: 0.35, ang: "18°", status: "DAILY VENT", en: "Daily Comfort Vent: silent 24V chain drive opens gently for fresh building airflow.", zh: "日常舒适换气：隐藏 24V 链式驱动轻柔开启 18°，提供自然新风。" },
          fire: { rot: -48, cy: 76, smoke: 1, ang: "65°", status: "60s PURGE", en: "FIRE EMERGENCY: Full 65° deployment within 60s rapidly clears toxic smoke and heat.", zh: "火警极速排烟：60 秒内全开至 65° 大角度，迅速抽排高温浓烟保障逃生安全。" }
        }[mode] || {};
        if (sash) sash.style.transform = `rotate(${cfg.rot}deg)`;
        if (chain) chain.setAttribute("y2", String(cfg.cy));
        if (plumes) plumes.style.opacity = String(cfg.smoke);
        if (t1) t1.textContent = cfg.ang;
        if (t2) t2.textContent = cfg.status;
        if (captionEl) captionEl.textContent = isZh ? cfg.zh : cfg.en;
      } else if (p.demoType === "doorlock") {
        const leaf = document.getElementById("demoDoorLeaf");
        const hooks = document.getElementById("demoDoorHooks");
        const t1 = document.getElementById("tel-lockState");
        const locked = mode === "locked";
        if (leaf) leaf.style.transform = locked ? "translateX(0px)" : "translateX(-42px)";
        if (hooks) hooks.style.transform = locked ? "translateX(18px)" : "translateX(-4px)";
        if (t1) t1.textContent = locked ? "3 ENGAGED" : "RETRACTED";
        if (captionEl) captionEl.textContent = locked
          ? (isZh ? "三点加厚不锈钢钩锁同步向上/向下咬合门框锁座，配门底自动升降封条，稳如金库。" : "3-point hardened steel hooks lock tightly into the jamb while the automatic bottom seal drops flush.")
          : (isZh ? "解锁轻推：250kg 重型不锈钢滑轮在 0mm 零阶梯平门槛上如丝滑行。" : "Unlocked Glide: 250kg stainless rollers glide effortlessly over the 0mm zero-barrier threshold.");
      } else if (p.demoType === "smart") {
        const icon = document.getElementById("demoSmartIcon");
        const st = document.getElementById("demoSmartStatus");
        const sub = document.getElementById("demoSmartSub");
        const mot = document.getElementById("demoSmartMotor");
        const lck = document.getElementById("demoSmartLock");
        const tel = document.getElementById("tel-smartAction");
        const map = {
          rain: { ic: "🌧️", stEn: "Rain Detected → Windows Closing & Locking (1.2s)", stZh: "感知降雨 → 全屋窗户 1.2 秒极速自动关闭上锁", subEn: "24V Concealed Brushless Actuators • Push Alert Sent to Smartphone", subZh: "24V 隐藏无刷驱动自动执行 • 手机 App 同步推送提醒", mot: "CLOSING", lck: "ENGAGED", tel: "AUTO-SEAL" },
          bio: { ic: "👆", stEn: "Biometric Verified → Entry Door Unlocks Smoothly", stZh: "指纹验证通过 → 入户大门自动解锁迎宾", subEn: "Flush Fingerprint & Apple HomeKey • Multi-Point Hook Retracted", subZh: "嵌入式指纹与 NFC 识别 • 多点电动钩锁瞬间收回", mot: "UNLOCKED", lck: "RELEASED", tel: "WELCOME" },
          vent: { ic: "🍃", stEn: "Elevated CO2 → Silent Micro-Ventilation Active", stZh: "室内 CO2 偏高 → 自动静音微开换气", subEn: "Whisper <32 dB Drive Opens High Clerestory Vents Automatically", subZh: "低于 32 分贝静音驱动自动微开高位天窗导入新风", mot: "VENTING 20%", lck: "VENT LOCK", tel: "FRESH AIR" },
          away: { ic: "🔒", stEn: "Away Mode Armed → All 14 Openings Verified Locked", stZh: "离家布防开启 → 全屋 14 处门窗确认自动反锁", subEn: "Magnetic Reed Telemetry • RC3 Auto-Deadbolt Active Across Home", subZh: "门窗磁实时回传状态 • 全屋 RC3 电动多点锁已激活", mot: "STANDBY", lck: "ALL LOCKED", tel: "ARMED RC3" }
        }[mode];
        if (map) {
          if (icon) icon.textContent = map.ic;
          if (st) st.textContent = isZh ? map.stZh : map.stEn;
          if (sub) sub.textContent = isZh ? map.subZh : map.subEn;
          if (mot) mot.textContent = map.mot;
          if (lck) lck.textContent = map.lck;
          if (tel) tel.textContent = map.tel;
        }
      }
    }

    function updateLoadBend(pa) {
      const stdBend = 45 + (pa / 5000) * 38;
      const l100Bend = 45 + (pa / 5000) * 4.5;
      const pStd = document.getElementById("demoBendStd");
      const p100 = document.getElementById("demoBend100");
      const vStd = document.getElementById("demoBendStdVal");
      const v100 = document.getElementById("demoBend100Val");
      const tPa = document.getElementById("tel-windPa");
      if (pStd) pStd.setAttribute("d", `M20 45 Q110 ${stdBend.toFixed(1)} 200 45`);
      if (p100) p100.setAttribute("d", `M20 45 Q110 ${l100Bend.toFixed(1)} 200 45`);
      if (vStd) vStd.textContent = `Deflection: ${((pa / 5000) * 26.5).toFixed(1)} mm`;
      if (v100) v100.textContent = `Deflection: ${((pa / 5000) * 2.9).toFixed(1)} mm (Rock Solid)`;
      if (tPa) tPa.textContent = `${pa} Pa`;
    }

    modeBtns.forEach((btn) => {
      btn.addEventListener("click", () => applyDemoMode(btn.dataset.demoMode));
    });

    const windRange = document.getElementById("demoWindRange");
    if (windRange) {
      windRange.addEventListener("input", () => updateLoadBend(parseInt(windRange.value, 10)));
    }

    document.querySelectorAll(".demo-armor-layer").forEach((layer) => {
      layer.addEventListener("click", () => applyDemoMode(layer.dataset.layer));
    });

    applyDemoMode(lab.defaultMode);

    // Refresh demo caption when language switches
    document.querySelectorAll("[data-set-lang]").forEach((btn) => {
      btn.addEventListener("click", () => {
        setTimeout(() => {
          const activeBtn = document.querySelector(".ps-mode-btn.is-active");
          if (activeBtn) applyDemoMode(activeBtn.dataset.demoMode);
          updateTourBtn();
        }, 20);
      });
    });

    // 7. Thermal Comparison Slider
    const slider = document.getElementById("thermalSlider");
    const handle = document.getElementById("sliderHandle");
    const panelHueck = document.querySelector(".panel-hueck");

    function setSliderPos(pct) {
      if (!handle || !panelHueck) return;
      pct = Math.max(0, Math.min(100, pct));
      handle.style.left = `${pct}%`;
      panelHueck.style.clipPath = `polygon(${pct}% 0, 100% 0, 100% 100%, ${pct}% 100%)`;
    }

    if (slider && handle && panelHueck) {
      let dragging = false;
      const moveX = (x) => {
        const rect = slider.getBoundingClientRect();
        setSliderPos(((x - rect.left) / rect.width) * 100);
      };
      slider.addEventListener("mousedown", (e) => { dragging = true; moveX(e.clientX); });
      window.addEventListener("mouseup", () => { dragging = false; });
      window.addEventListener("mousemove", (e) => { if (dragging) moveX(e.clientX); });
      slider.addEventListener("touchstart", (e) => { dragging = true; if (e.touches[0]) moveX(e.touches[0].clientX); }, { passive: true });
      window.addEventListener("touchend", () => { dragging = false; });
      window.addEventListener("touchmove", (e) => { if (dragging && e.touches[0]) moveX(e.touches[0].clientX); }, { passive: true });
    }

    function runThermalSweepDemo() {
      const startTime = performance.now();
      function step(now) {
        const p1 = Math.min((now - startTime) / 1100, 1);
        setSliderPos(50 - 30 * Math.sin((p1 * Math.PI) / 2));
        if (p1 < 1) requestAnimationFrame(step);
        else {
          const t2 = performance.now();
          function back(now2) {
            const p2 = Math.min((now2 - t2) / 900, 1);
            setSliderPos(20 + 30 * Math.sin((p2 * Math.PI) / 2));
            if (p2 < 1) requestAnimationFrame(back);
          }
          requestAnimationFrame(back);
        }
      }
      requestAnimationFrame(step);
    }

    // 8. Spec Category Tabs
    const specBtns = document.querySelectorAll(".spec-tab-btn");
    const specGroups = document.querySelectorAll(".spec-group-content");
    specBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        specBtns.forEach((b) => b.classList.remove("active"));
        specGroups.forEach((g) => g.classList.remove("active"));
        btn.classList.add("active");
        const target = document.getElementById(`spec-group-${btn.dataset.specTab}`);
        if (target) target.classList.add("active");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", renderShowcase);
})();
