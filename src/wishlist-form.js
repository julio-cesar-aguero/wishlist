import { LitElement, css, html } from "lit";
import "./components";
export class WishListForm extends LitElement {
  static get properties() {
    return {
      miDato: { type: String },
      listaTareas: { type: Array },
    };
  }
  
  static get styles() {
    return css`
      .container__principal {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 50px auto;
        width: 500px;
        height: auto;
        border-radius: 5px;
        background-color: #fbfdff;
        overflow: scroll;
        box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
      }
      .titulo {
        text-align: center;
        color: #000000;
      }
      .input {
        width: 100%;
        border-radius: 1em;
        width: 300px;
      }
      .tareas__container {
        width: 100%;
        padding: 1em;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
      .item {
        margin-left: 20px;
        cursor: pointer;
        width: 20px;
        height: 25px;
        text-align: start;
      }

      .btn-delete {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 150px;
        height: 30px;
        font-family: "Courier New", Courier, monospace;
        background-color: #f2f2f2;
        border-radius: 10px;
        cursor: pointer;
        border: none;
        text-transform: uppercase;
        color: #3e3e3e;
        padding: 2em;
        font-weight: 800;
        font-size: 1.2em;
        transition: all 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045);
      }
      .btn-delete:hover {
        background-color: #3e3e3e;
        color: #f2f2f2;
      }
      .btn-delete:active {
        box-shadow: 0 2px #666;
        transform: translateY(4px);
      }
      .btn-container {
        padding: 60px;
        text-align: right;
      }

      .item__container{
        position: relative;
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: space-between
      }

      .item,
      .label {
        display: flex;
        align-items: center;
        height: 50px;
        vertical-align: middle;
      }
      .label {

        text-align: center;
        width: 100%;
        font-size: 1.7em;
        transition: background-color 1s ease;
        font-size: 50px;
        margin: 0 auto;
        padding: 0.3em 0.2em;
        margin: 0.5em;
        border-radius: 10px;
        color: white;
        font-weight: 800;
        text-align: center;
      }
      .item{
        padding: 1em 2em;
        border: none;
      }
    `;
  }



  constructor() {
    super();
    this.miDato = "";
    this.todoName = "items";
    this.listaTareas = [];
    this.todos = {};
    this.timers = [];
  }

  connectedCallback() {
    super.connectedCallback();
    let localItems = localStorage.getItem(this.todoName);
    this.todos = JSON.parse(localItems);
    this.listaTareas = this.todos;
  }

  render() {
    var lista = [];

    this.listaTareas.map((item, index) => {
      lista.push(html`
        <div class="item__container">
          <input
            type="checkbox"
            class="item"
            id="${this.miDato}"
            @change=${(event) => this.setTimer(event, index)}
          />
          
          <label class="label" id="label">${item}</label><br />
        </div>
      `);
      try {
        if (index === this.listaTareas.length - 1) {
          this.timers[index] = {
            timeout1: setTimeout(() => {
              this.colors(index, "#9AD576");
            }, 30),
            timeout2: setTimeout(() => {
              this.colors(index, "#F6FF99");
            }, 5000),
            timeout3: setTimeout(() => {
              this.colors(index, "#F97171");
            }, 8000),
          };
        }
      } catch (error) {
        alert("Opps ha ocurrido un error!!!");
      }
    });

    return html`
      <div class="container__principal">
        <h1 class="titulo">Agregue una tarea</h1>
        <wishlist-input-component
          class="input"
          id="inputText"
          value=${this.miDato}
          @keydown="${this.inputKeyDown}"
        ></wishlist-input-component>
        <div class="tareas__container">${lista}</div>
        <div class="btn-container">
          <button class="btn-delete" @click=${this.removeCheckBox}>
            Limpiar
          </button>
        </div>
      </div>
    `;
  }
  inputKeyDown(e) {
    if (e.key === "Enter") {
      this.miDato = e.target.value;
      this.listaTareas.push(this.miDato);
      this.resetTexto(e);
      this.refreshStorage();
    }
  }
  refreshStorage() {
    this.todos = localStorage.setItem(
      this.todoName,
      JSON.stringify(this.listaTareas)
    );
  }
  resetTexto(e) {
    this.miDato = "";
    e.target.value = "";
  }
  setTimer(event, index) {
    console.log(event.target);
    const labels = this.shadowRoot.querySelectorAll(".item + .label");
    const checkbox = event.target;

    if (!checkbox.checked) {
      labels[index].style.textDecoration = "none";
    } else {
      labels[index].style.color = "black";
      labels[index].style.textDecoration = "line-through";
      labels[index].style.background = "none";
      clearTimeout(this.timers[index].timeout1);
      clearTimeout(this.timers[index].timeout2);
      clearTimeout(this.timers[index].timeout3);
    }
  }
  colors(index, color) {
    try {
      const label = this.shadowRoot.querySelectorAll(".item + .label");
      label[index].style.background = color;
    } catch (error) {}
  }
  removeCheckBox() {
    this.listaTareas = [];
    this.refreshStorage();
  }
}
window.customElements.define("wishlist-form", WishListForm);
