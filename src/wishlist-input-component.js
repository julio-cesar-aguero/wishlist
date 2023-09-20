import { LitElement, css, html } from "lit";

export class WishListInput extends LitElement {
  static get styles() {
    return css`
      .input-text {
        border: none;
        width: 100%;
        height: 100px;
        font-size: 20px;
        overflow: hidden;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
          rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
        border-radius: 20px;
      }
      div {
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
      }
    `;
  }
  static get properties() {
    return {
      value: { type: String },
    };
  }

  render() {
    return html`
      <div>
        <input
          class="input-text"
          type="text"
          .value="${this.value}"
          @input="${this.inputKeyDown}"
        />
      </div>
    `;
  }
  inputKeyDown(e) {
    this.value = e.target.value;
    this.dispatchEvent(
      new CustomEvent("keydown", {
        detail: this.target,
      })
    );
  }
}
