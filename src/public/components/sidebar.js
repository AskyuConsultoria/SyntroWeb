class Sidebar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "sidebar");

    // Logo
    const logo = document.createElement("img");
    logo.src = "/assets/syntro_icon.svg";
    logo.classList.add("logo-icon");
    logo.style.height = "50px";
    logo.style.marginBottom = "20px";
    logo.style.cursor = "pointer";
    wrapper.appendChild(logo);

    // Menu
    const menu = document.createElement("ul");
    menu.classList.add("menu");
    var links = [];

    const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));

    if(usuarioLogado?.auditor == true){
      links = [
        { text: "Minhas notas", icon: "/assets/home.svg", href: ["/visualizacao","/upload","/individual"] },
        { text: "Serviços", icon: "/assets/box.svg", href: ["/servicos"] },
        { text: "Empresas", icon: "/assets/building-3.svg", href: ["/empresas"] },
        { text: "Cadastros", icon: "/assets/folder-add2.svg", href: ["/cadastros/home"] },
        { text: "Ajuda", icon: "/assets/info.svg", href: ["https://app.pipefy.com/organizations/301284564/portal?form=1bbad609-f3d5-4690-9d92-62cc8b34bc9f"] },
      ];
    } else if(usuarioLogado?.emissor == true){
      links = [
        { text: "Minhas notas", icon: "/assets/home.svg", href: ["/visualizacao","/upload","/individual"] },
        { text: "Serviços", icon: "/assets/box.svg", href: ["/servicos"] },
        { text: "Ajuda", icon: "/assets/info.svg", href: ["https://app.pipefy.com/organizations/301284564/portal?form=1bbad609-f3d5-4690-9d92-62cc8b34bc9f"] },
      ]
    } else {
      links = [
        { text: "Minhas notas", icon: "/assets/home.svg", href: ["/visualizacao","/upload","/individual"] },
        { text: "Serviços", icon: "/assets/box.svg", href: ["/servicos"] },
        { text: "Empresas", icon: "/assets/building-3.svg", href: ["/empresas"] },
        { text: "Cadastros", icon: "/assets/folder-add2.svg", href: ["/cadastros/home"] },
        { text: "Permissões", icon: "/assets/user-search.svg", href: ["/permissionamento"] },
        { text: "Controle", icon: "/assets/icons.svg", href: ["#"] },
        { text: "Ajuda", icon: "/assets/info.svg", href: ["https://app.pipefy.com/organizations/301284564/portal?form=1bbad609-f3d5-4690-9d92-62cc8b34bc9f"]},
      ]
    }

    links.forEach(item => {
      const li = document.createElement("li");
      const a = document.createElement("a");

      // Sempre pega o primeiro href para o <a>, mas armazena todos no dataset
      a.href = item.href[0];
      a.dataset.hrefs = item.href.join(",");

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
    logout.href = "#";

    const logoutIcon = document.createElement("img");
    logoutIcon.src = "/assets/logout.svg";
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
      .sidebar { display: flex; flex-direction: column; align-items: center; justify-content: space-between; background-color: white; height: calc(100vh - 40px); width: 240px; padding: 20px 10px; box-shadow: 2px 0 6px rgba(0,0,0,0.1); transition: width 0.3s; overflow: hidden; position: fixed; }
      .sidebar.collapsed { width: 60px; }
      ul.menu { list-style: none; padding: 0; margin: 0; width: 100%; }
      ul.menu li { display: flex; justify-content: center; margin: 8px 0; }
      a { display: flex; align-items: center; gap: 10px; width: 95%; padding: 12px 15px; text-decoration: none; font-size: 16px; color: black; border-radius: 8px; transition: background 0.3s; margin-left: 10%; box-sizing: border-box; }
      ul.menu li a:hover { background-color: #CED9F9; color: #1A2A80; border-radius:8px; }
      ul.menu li a.active { border-left: 6px solid #1A2A80; font-weight: 600; color: #1A2A80; }
      a .icon { height: 20px; width: 20px; }
      .sidebar.collapsed a span, .sidebar.collapsed .footer span { display: none; }
      .logo-icon { transition: transform 0.3s; }
      .sidebar.collapsed .logo-icon { transform: scale(0.6); }
      .footer { margin-top: auto; width: 100%; }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);

    // Evento do logo (colapsar)
    logo.addEventListener("click", () => {
      wrapper.classList.toggle("collapsed");
      this.dispatchEvent(new CustomEvent("toggle-sidebar", { bubbles: true, composed: true }));
    });

    // Função de ativar link atual
    const atualizarAtivo = () => {
      const currentPath = window.location.pathname.split("/").pop();
      const allLinks = menu.querySelectorAll("a");

      allLinks.forEach(link => {
        const hrefs = link.dataset.hrefs.split(",");
        if (hrefs.includes(currentPath)) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    };

    atualizarAtivo();
    window.addEventListener("popstate", atualizarAtivo);
    window.addEventListener("hashchange", atualizarAtivo);
    menu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setTimeout(atualizarAtivo, 100)));

    logout.addEventListener("click", () => {
      console.log("Faz logout!");
      window.location.href = "/";
    });
  }
}

customElements.define("side-bar", Sidebar);
