(function() {
 let template = document.createElement("template");
 template.innerHTML = `
	 <form id="form">
	 <fieldset>
	 <legend>LeafletMap Properties</legend>
	 <table>
	 <tr>
	 <td>Data URL</td>
	 <td><input id="data_url" type="text" size="80"
	maxlength="200"></td>
	 </tr>
	 </table>
	 <input type="submit" style="display:none;">
	 </fieldset>
	 </form>
 `;
 class LeafletMapStylingPanel extends HTMLElement {
	constructor() {
	super();
	this._shadowRoot = this.attachShadow({mode: "open"});
	this._shadowRoot.appendChild(template.content.cloneNode(true));

	this._shadowRoot.getElementById("form").addEventListener("submit",
	this._submit.bind(this));
 }

 _submit(e) {
	e.preventDefault();
	this.dispatchEvent(new CustomEvent("propertiesChanged", {
	detail: {
		properties: {
		dataUrl: this.dataUrl
	}
 }
})
);

 }
 set dataUrl(newUrl) {
 this._shadowRoot.getElementById("data_url").value = newUrl;
 }
 get dataUrl() {
 return this._shadowRoot.getElementById("data_url").value;
 }
 }
customElements.define("com-sap-sample-schwarz-leaflet_map-styling", LeafletMapStylingPanel);