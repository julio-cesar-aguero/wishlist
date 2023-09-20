import { LitElement, html, css } from "lit";

export class TareasList extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];
  static get properties() {
    return {
      miDato: { type: String },
      listaTareas: { type: Array },
    };
  }

  constructor() {
    super();
    this.miDato = " ";
    this.todoName = "items";
    this.listaTareas = [];
    this.todos = {};
    this.timers = [];
  }

  render() {
    var listaTareasArr = [];
    this.listaTareas.forEach((tareas, index) => {
      listaTareasArr.push(html`<input
          type="checkbox"
          class="item"
          id="cb_${this.miDato}"
          @change=${(event) => this.setTimer(event, index)}
        /><label class="label" id="label">${tareas}</label><br />`);

      try {
        if (index === this.listaTareas.length - 1) {
          this.timers[index] = {
            timeout1: setTimeout(() => {
              console.log("1");
              this.colors(index, "#9AD576");
            }, 2000),
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
    //return html` <div>tareas_: ${listaTareasArr}</div> `;
  }
}
