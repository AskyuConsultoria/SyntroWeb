class NavContent extends HTMLElement {
  constructor() {
    super();

    // Wrapper principal
    const wrapper = document.createElement("div");
    wrapper.classList.add("nav-content");

    // Remove qualquer conteúdo padrão que possa gerar o ">"
    wrapper.textContent = "";

    // Container do título
    const titleContainer = document.createElement("div");
    titleContainer.classList.add("d-flex", "align-items-center");
    titleContainer.style.width = "250px"; // ajuste conforme necessário

    // Título clicável
    this.titleLink = document.createElement("a");
    this.titleLink.style.color = "#5e5959";
    this.titleLink.style.textDecoration = "none";
    this.titleLink.style.cursor = "pointer";
    this.titleLink.addEventListener("click", () => {
      const href = this.getAttribute("title-link");
      if (href) window.location.href = href;
    });

    // Subtítulo opcional
    this.subtitleSpan = document.createElement("span");
    this.subtitleSpan.style.color = "#5e5959";
    this.subtitleSpan.style.marginLeft = "5px";

    // Adiciona title e subtitle ao container
    titleContainer.appendChild(this.titleLink);
    titleContainer.appendChild(this.subtitleSpan);

    // Adiciona ao wrapper
    wrapper.appendChild(titleContainer);
    this.appendChild(wrapper);

    this.updateSpan();
  }

  static get observedAttributes() {
    return ["title", "subtitle", "title-link"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.updateSpan();
  }

  updateSpan() {
    const title = this.getAttribute("title") || "Meu acesso";
    const subtitle = this.getAttribute("subtitle");

    this.titleLink.textContent = title;
    this.subtitleSpan.textContent = subtitle && subtitle.trim() !== "" ? `| ${subtitle}` : "";
  }
}

customElements.define("nav-content", NavContent);
