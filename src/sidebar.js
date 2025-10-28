class Sidebar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    // Wrapper da sidebar
    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "sidebar");

    // Logo
    const logo = document.createElement("img");
    logo.src = "assets/syntro_icon.svg";
    logo.classList.add("logo-icon");
    logo.style.height = "50px";
    logo.style.marginBottom = "20px";
    logo.style.cursor = "pointer";
    wrapper.appendChild(logo);

    // Menu
    const menu = document.createElement("ul");
    menu.classList.add("menu");

    const links = [
      { text: "Meu acesso", icon: "assets/home.svg" },
      { text: "Serviços", icon: "assets/box.svg" },
      { text: "Repres.", icon: "assets/people.svg" },
      { text: "Empresas", icon: "assets/building-3.svg" },
      { text: "Cadastros", icon: "assets/paperclip-2.svg" },
      { text: "Notas fiscais", icon: "assets/folder-add2.svg" },
      { text: "Permissões", icon: "assets/user-search.svg" },
      { text: "Controle", icon: "assets/icons.svg" },
      { text: "Ajuda", icon: "assets/info.svg" },
    ];

    links.forEach(item => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    
    if(item.text === "Meu acesso") {
      a.href = "#";
    } else if(item.text === "Serviços") {
      a.href = "#";
    } else if(item.text === "Repres.") {
      a.href = "#";
    } else if(item.text === "Empresas") {
      a.href = "#";
    } else if(item.text === "Cadastros") {
      a.href = "cadastros-home.html";
    } else if(item.text === "Notas fiscais") {
      a.href = "#";
    } else if(item.text === "Permissões") {
      a.href = "#";
    } else if(item.text === "Controle") {
      a.href = "#";
    } else if(item.text === "Ajuda") {
      a.href = "#";
    } else {
      a.href = "#";
    }

      const img = document.createElement("img");
      img.src = item.icon;
      img.alt = item.text;
      img.classList.add("icon");

      const span = document.createElement("span");
      span.textContent = item.text;

      a.appendChild(img);
      a.appendChild(span);
      li.appendChild(a);
      menu.appendChild(li);
    });

    wrapper.appendChild(menu);

    // Footer
    const footer = document.createElement("div");
    footer.classList.add("footer");
    const logout = document.createElement("a");
    logout.href = "index.html";

    const logoutIcon = document.createElement("img");
    logoutIcon.src = "assets/logout.svg";
    logoutIcon.alt = "Sair";
    logoutIcon.classList.add("icon");

    const logoutText = document.createElement("span");
    logoutText.textContent = "Sair";

    logout.appendChild(logoutIcon);
    logout.appendChild(logoutText);
    footer.appendChild(logout);

    wrapper.appendChild(footer);

    // Estilos
    const style = document.createElement("style");
    style.textContent = `
      .sidebar {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        background-color: white;
        height: calc(100vh - 40px);
        width: 240px;
        padding: 20px 10px;
        box-shadow: 2px 0 6px rgba(0,0,0,0.1);
        transition: width 0.3s;
        overflow: hidden;
        position: fixed;
      }
      .sidebar.collapsed { width: 60px; }
      ul.menu { list-style: none; padding: 0; margin: 0; width: 100%; }
      ul.menu li { display: flex; justify-content: center; margin: 8px 0; }
      a { display: flex; align-items: center; gap: 10px; width: 95%; padding: 12px 15px; text-decoration: none; font-size: 16px; color: black; border-radius: 8px; transition: background 0.3s; margin-left: 10%; box-sizing: border-box; }
      ul.menu li a:hover { background-color: #CED9F9; color: #1A2A80; border-radius:8px; }
      li:active { border-left: 6px solid #1A2A80; font-weight: 600; }
      a .icon { height: 20px; width: 20px; }
      .sidebar.collapsed a span, .sidebar.collapsed .footer span { display: none; }
      .logo-icon { transition: transform 0.3s; }
      .sidebar.collapsed .logo-icon { transform: scale(0.6); }
      .footer { margin-top: auto; width: 100%; }
    `;

    // Append no shadow DOM
    shadow.appendChild(style);
    shadow.appendChild(wrapper);

    // Evento do logo
    logo.addEventListener("click", () => {
      wrapper.classList.toggle("collapsed");
      this.dispatchEvent(new CustomEvent("toggle-sidebar", {
        bubbles: true,
        composed: true
      }));
    });
  }
}

customElements.define("side-bar", Sidebar);
