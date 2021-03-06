/*! For license information please see main.js.LICENSE.txt */
(()=>{const e=typeof window!=="undefined"&&window.customElements!=null&&void 0!==window.customElements.polyfillWrapFlushCallback; const t=(e,t,s=null)=>{for(;t!==s;){const s=t.nextSibling;e.removeChild(t),t=s}}; const s=`{{lit-${String(Math.random()).slice(2)}}}`; const i=`\x3c!--${s}--\x3e`; const n=new RegExp(`${s}|${i}`); const r="$lit$";class o{constructor(e,t){this.parts=[],this.element=t;const i=[]; const o=[]; const l=document.createTreeWalker(t.content,133,null,!1);let c=0; let p=-1; let u=0;const{strings:m,values:{length:f}}=e;for(;u<f;){const e=l.nextNode();if(e!==null){if(p++,e.nodeType===1){if(e.hasAttributes()){const t=e.attributes; const {length:s}=t;let i=0;for(let e=0;e<s;e++)a(t[e].name,r)&&i++;for(;i-- >0;){const t=m[u]; const s=h.exec(t)[2]; const i=s.toLowerCase()+r; const o=e.getAttribute(i);e.removeAttribute(i);const a=o.split(n);this.parts.push({type:"attribute",index:p,name:s,strings:a}),u+=a.length-1}}e.tagName==="TEMPLATE"&&(o.push(e),l.currentNode=e.content)}else if(e.nodeType===3){const t=e.data;if(t.indexOf(s)>=0){const s=e.parentNode; const o=t.split(n); const l=o.length-1;for(let t=0;t<l;t++){let i; let n=o[t];if(n==="")i=d();else{const e=h.exec(n);e!==null&&a(e[2],r)&&(n=n.slice(0,e.index)+e[1]+e[2].slice(0,-r.length)+e[3]),i=document.createTextNode(n)}s.insertBefore(i,e),this.parts.push({type:"node",index:++p})}o[l]===""?(s.insertBefore(d(),e),i.push(e)):e.data=o[l],u+=l}}else if(e.nodeType===8)if(e.data===s){const t=e.parentNode;e.previousSibling!==null&&p!==c||(p++,t.insertBefore(d(),e)),c=p,this.parts.push({type:"node",index:p}),e.nextSibling===null?e.data="":(i.push(e),p--),u++}else{let t=-1;for(;(t=e.data.indexOf(s,t+1))!==-1;)this.parts.push({type:"node",index:-1}),u++}}else l.currentNode=o.pop()}for(const e of i)e.parentNode.removeChild(e)}}const a=(e,t)=>{const s=e.length-t.length;return s>=0&&e.slice(s)===t}; const l=e=>e.index!==-1; const d=()=>document.createComment(""); const h=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function c(e,t){const{element:{content:s},parts:i}=e; const n=document.createTreeWalker(s,133,null,!1);let r=u(i); let o=i[r]; let a=-1; let l=0;const d=[];let h=null;for(;n.nextNode();){a++;const e=n.currentNode;for(e.previousSibling===h&&(h=null),t.has(e)&&(d.push(e),h===null&&(h=e)),h!==null&&l++;void 0!==o&&o.index===a;)o.index=h!==null?-1:o.index-l,r=u(i,r),o=i[r]}d.forEach((e=>e.parentNode.removeChild(e)))}const p=e=>{let t=e.nodeType===11?0:1;const s=document.createTreeWalker(e,133,null,!1);for(;s.nextNode();)t++;return t}; const u=(e,t=-1)=>{for(let s=t+1;s<e.length;s++){const t=e[s];if(l(t))return s}return-1}; const m=new WeakMap; const f=e=>typeof e==="function"&&m.has(e); const y={}; const _={};class g{constructor(e,t,s){this.__parts=[],this.template=e,this.processor=t,this.options=s}

update(e){let t=0;for(const s of this.__parts)void 0!==s&&s.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}

_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0); const s=[]; const i=this.template.parts; const n=document.createTreeWalker(t,133,null,!1);let r; let o=0; let a=0; let d=n.nextNode();for(;o<i.length;)if(r=i[o],l(r)){for(;a<r.index;)a++,d.nodeName==="TEMPLATE"&&(s.push(d),n.currentNode=d.content),(d=n.nextNode())===null&&(n.currentNode=s.pop(),d=n.nextNode());if(r.type==="node"){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(d.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(d,r.name,r.strings,this.options));o++}else this.__parts.push(void 0),o++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}const v=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}); const S=` ${s} `;class w{constructor(e,t,s,i){this.strings=e,this.values=t,this.type=s,this.processor=i}

getHTML(){const e=this.strings.length-1;let t=""; let n=!1;for(let o=0;o<e;o++){const e=this.strings[o]; const a=e.lastIndexOf("\x3c!--");n=(a>-1||n)&&e.indexOf("--\x3e",a+1)===-1;const l=h.exec(e);t+=l===null?e+(n?S:i):e.substr(0,l.index)+l[1]+l[2]+r+l[3]+s}return t+=this.strings[e],t}

getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==v&&(t=v.createHTML(t)),e.innerHTML=t,e}}const x=e=>e===null||!(typeof e==="object"||typeof e==="function"); const b=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class P{constructor(e,t,s){this.dirty=!0,this.element=e,this.name=t,this.strings=s,this.parts=[];for(let e=0;e<s.length-1;e++)this.parts[e]=this._createPart()}

_createPart(){return new N(this)}

_getValue(){const e=this.strings; const t=e.length-1; const s=this.parts;if(t===1&&e[0]===""&&e[1]===""){const e=s[0].value;if(typeof e==="symbol")return String(e);if(typeof e==="string"||!b(e))return e}let i="";for(let n=0;n<t;n++){i+=e[n];const t=s[n];if(void 0!==t){const e=t.value;if(x(e)||!b(e))i+=typeof e==="string"?e:String(e);else for(const t of e)i+=typeof t==="string"?t:String(t)}}return i+=e[t],i}

commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class N{constructor(e){this.value=void 0,this.committer=e}

setValue(e){e===y||x(e)&&e===this.value||(this.value=e,f(e)||(this.committer.dirty=!0))}

commit(){for(;f(this.value);){const e=this.value;this.value=y,e(this)}this.value!==y&&this.committer.commit()}}class C{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}

appendInto(e){this.startNode=e.appendChild(d()),this.endNode=e.appendChild(d())}

insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}

appendIntoPart(e){e.__insert(this.startNode=d()),e.__insert(this.endNode=d())}

insertAfterPart(e){e.__insert(this.startNode=d()),this.endNode=e.endNode,e.endNode=this.startNode}

setValue(e){this.__pendingValue=e}

commit(){if(this.startNode.parentNode===null)return;for(;f(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=y,e(this)}const e=this.__pendingValue;e!==y&&(x(e)?e!==this.value&&this.__commitText(e):e instanceof w?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):b(e)?this.__commitIterable(e):e===_?(this.value=_,this.clear()):this.__commitText(e))}

__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}

__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}

__commitText(e){const t=this.startNode.nextSibling; const s=typeof(e=e==null?"":e)==="string"?e:String(e);t===this.endNode.previousSibling&&t.nodeType===3?t.data=s:this.__commitNode(document.createTextNode(s)),this.value=e}

__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof g&&this.value.template===t)this.value.update(e.values);else{const s=new g(t,e.processor,this.options); const i=s._clone();s.update(e.values),this.__commitNode(i),this.value=s}}

__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let s; let i=0;for(const n of e)s=t[i],void 0===s&&(s=new C(this.options),t.push(s),i===0?s.appendIntoPart(this):s.insertAfterPart(t[i-1])),s.setValue(n),s.commit(),i++;i<t.length&&(t.length=i,this.clear(s&&s.endNode))}

clear(e=this.startNode){t(this.startNode.parentNode,e.nextSibling,this.endNode)}}class E{constructor(e,t,s){if(this.value=void 0,this.__pendingValue=void 0,s.length!==2||s[0]!==""||s[1]!=="")throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=s}

setValue(e){this.__pendingValue=e}

commit(){for(;f(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=y,e(this)}if(this.__pendingValue===y)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=y}}class T extends P{constructor(e,t,s){super(e,t,s),this.single=s.length===2&&s[0]===""&&s[1]===""}

_createPart(){return new A(this)}

_getValue(){return this.single?this.parts[0].value:super._getValue()}

commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class A extends N{}let V=!1;(()=>{try{const e={get capture(){return V=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class k{constructor(e,t,s){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=s,this.__boundHandleEvent=e=>this.handleEvent(e)}

setValue(e){this.__pendingValue=e}

commit(){for(;f(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=y,e(this)}if(this.__pendingValue===y)return;const e=this.__pendingValue; const t=this.value; const s=e==null||t!=null&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive); const i=e!=null&&(t==null||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=U(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=y}

handleEvent(e){typeof this.value==="function"?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const U=e=>e&&(V?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);function M(e){let t=$.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},$.set(e.type,t));let i=t.stringsArray.get(e.strings);if(void 0!==i)return i;const n=e.strings.join(s);return i=t.keyString.get(n),void 0===i&&(i=new o(e,e.getTemplateElement()),t.keyString.set(n,i)),t.stringsArray.set(e.strings,i),i}const $=new Map; const O=new WeakMap; const R=new class{handleAttributeExpressions(e,t,s,i){const n=t[0];return n==="."?new T(e,t.slice(1),s).parts:n==="@"?[new k(e,t.slice(1),i.eventContext)]:n==="?"?[new E(e,t.slice(1),s)]:new P(e,t,s).parts}

handleTextExpression(e){return new C(e)}};typeof window!=="undefined"&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const j=(e,...t)=>new w(e,t,"html",R); const q=(e,t)=>`${e}--${t}`;let L=!0;void 0===window.ShadyCSS?L=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),L=!1);const I=e=>t=>{const i=q(t.type,e);let n=$.get(i);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},$.set(i,n));let r=n.stringsArray.get(t.strings);if(void 0!==r)return r;const a=t.strings.join(s);if(r=n.keyString.get(a),void 0===r){const s=t.getTemplateElement();L&&window.ShadyCSS.prepareTemplateDom(s,e),r=new o(t,s),n.keyString.set(a,r)}return n.stringsArray.set(t.strings,r),r}; const z=["html","svg"]; const B=new Set;window.JSCompiler_renameProperty=(e,t)=>e;const D={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return e!==null;case Number:return e===null?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}}; const F=(e,t)=>t!==e&&(t==t||e==e); const H={attribute:!0,type:String,converter:D,reflect:!1,hasChanged:F};class W extends HTMLElement{constructor(){super(),this.initialize()}

static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,s)=>{const i=this._attributeNameForProperty(s,t);void 0!==i&&(this._attributeToPropertyMap.set(i,s),e.push(i))})),e}

static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}

static createProperty(e,t=H){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const s=typeof e==="symbol"?Symbol():`__${e}`; const i=this.getPropertyDescriptor(e,s,t);void 0!==i&&Object.defineProperty(this.prototype,e,i)}

static getPropertyDescriptor(e,t,s){return{get(){return this[t]},set(i){const n=this[e];this[t]=i,this.requestUpdateInternal(e,n,s)},configurable:!0,enumerable:!0}}

static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||H}

static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties; const t=[...Object.getOwnPropertyNames(e),...typeof Object.getOwnPropertySymbols==="function"?Object.getOwnPropertySymbols(e):[]];for(const s of t)this.createProperty(s,e[s])}}

static _attributeNameForProperty(e,t){const s=t.attribute;return!1===s?void 0:typeof s==="string"?s:typeof e==="string"?e.toLowerCase():void 0}

static _valueHasChanged(e,t,s=F){return s(e,t)}

static _propertyValueFromAttribute(e,t){const s=t.type; const i=t.converter||D; const n=typeof i==="function"?i:i.fromAttribute;return n?n(e,s):e}

static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const s=t.type; const i=t.converter;return(i&&i.toAttribute||D.toAttribute)(e,s)}

initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}

_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}

_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}

connectedCallback(){this.enableUpdating()}

enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}

disconnectedCallback(){}

attributeChangedCallback(e,t,s){t!==s&&this._attributeToProperty(e,s)}

_propertyToAttribute(e,t,s=H){const i=this.constructor; const n=i._attributeNameForProperty(e,s);if(void 0!==n){const e=i._propertyValueToAttribute(t,s);if(void 0===e)return;this._updateState=8|this._updateState,e==null?this.removeAttribute(n):this.setAttribute(n,e),this._updateState=-9&this._updateState}}

_attributeToProperty(e,t){if(8&this._updateState)return;const s=this.constructor; const i=s._attributeToPropertyMap.get(e);if(void 0!==i){const e=s.getPropertyOptions(i);this._updateState=16|this._updateState,this[i]=s._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}

requestUpdateInternal(e,t,s){let i=!0;if(void 0!==e){const n=this.constructor;s=s||n.getPropertyOptions(e),n._valueHasChanged(this[e],t,s.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==s.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,s))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}

requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}

async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return e!=null&&await e,!this._hasRequestedUpdate}

get _hasRequestedUpdate(){return 4&this._updateState}

get hasUpdated(){return 1&this._updateState}

performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}

_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}

get updateComplete(){return this._getUpdateComplete()}

_getUpdateComplete(){return this._updatePromise}

shouldUpdate(e){return!0}

update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}

updated(e){}

firstUpdated(e){}}W.finalized=!0;const J=Element.prototype;J.msMatchesSelector||J.webkitMatchesSelector;const G=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype; const K=Symbol();class Q{constructor(e,t){if(t!==K)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}

get styleSheet(){return void 0===this._styleSheet&&(G?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}

toString(){return this.cssText}}const X=(e,...t)=>{const s=t.reduce(((t,s,i)=>t+(e=>{if(e instanceof Q)return e.cssText;if(typeof e==="number")return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+e[i+1]),e[0]);return new Q(s,K)};(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const Y={};class Z extends W{static getStyles(){return this.styles}

static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,s)=>e.reduceRight(((e,s)=>Array.isArray(s)?t(s,e):(e.add(s),e)),s); const s=t(e,new Set); const i=[];s.forEach((e=>i.unshift(e))),this._styles=i}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!G){const t=Array.prototype.slice.call(e.cssRules).reduce(((e,t)=>e+t.cssText),"");return new Q(String(t),K)}return e}))}

initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}

createRenderRoot(){return this.attachShadow({mode:"open"})}

adoptStyles(){const e=this.constructor._styles;e.length!==0&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?G?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}

connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}

update(e){const t=this.render();super.update(e),t!==Y&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}

render(){return Y}}Z.finalized=!0,Z.render=(e,s,i)=>{if(!i||typeof i!=="object"||!i.scopeName)throw new Error("The `scopeName` option is required.");const n=i.scopeName; const r=O.has(s); const o=L&&s.nodeType===11&&!!s.host; const a=o&&!B.has(n); const l=a?document.createDocumentFragment():s;if(((e,s,i)=>{let n=O.get(s);void 0===n&&(t(s,s.firstChild),O.set(s,n=new C({templateFactory:M,...i})),n.appendInto(s)),n.setValue(e),n.commit()})(e,l,{templateFactory:I(n),...i}),a){const e=O.get(l);O.delete(l);((e,t,s)=>{B.add(e);const i=s?s.element:document.createElement("template"); const n=t.querySelectorAll("style"); const {length:r}=n;if(r===0)return void window.ShadyCSS.prepareTemplateStyles(i,e);const o=document.createElement("style");for(let e=0;e<r;e++){const t=n[e];t.parentNode.removeChild(t),o.textContent+=t.textContent}(e=>{z.forEach((t=>{const s=$.get(q(t,e));void 0!==s&&s.keyString.forEach((e=>{const{element:{content:t}}=e; const s=new Set;Array.from(t.querySelectorAll("style")).forEach((e=>{s.add(e)})),c(e,s)}))}))})(e);const a=i.content;s?function(e,t,s=null){const{element:{content:i},parts:n}=e;if(s==null)return void i.appendChild(t);const r=document.createTreeWalker(i,133,null,!1);let o=u(n); let a=0; let l=-1;for(;r.nextNode();)for(l++,r.currentNode===s&&(a=p(t),s.parentNode.insertBefore(t,s));o!==-1&&n[o].index===l;){if(a>0){for(;o!==-1;)n[o].index+=a,o=u(n,o);return}o=u(n,o)}}(s,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(i,e);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&l!==null)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(s){a.insertBefore(o,a.firstChild);const e=new Set;e.add(o),c(s,e)}})(n,l,e.value instanceof g?e.value.template:void 0),t(s,s.firstChild),s.appendChild(l),O.set(s,e)}!r&&o&&window.ShadyCSS.styleElement(s.host)},window.customElements.define("player-memorama",class extends Z{static get styles(){return X`
      #player {
        border: solid 3px;
        width: 120px;
        height: 48px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        color: #fff;
        font-size: 20px;
        box-shadow: 0px 0px 3px #888888;
        background: #dadada;
        cursor: default;
        transition: all 1s;
      }
      #player.active {
        transition: all 1s;
        box-shadow: 0px 0px 15px #888888;
        background: rgba(33, 150, 243, 0.8);
      }
      span {
        padding-left: 8px;
        padding-right: 8px;
      }
      span:first-child {
        border-right: 2px solid;
      }
    `}

static get properties(){return{name:{type:String},active:{type:Boolean},score:{type:Number}}}

constructor(){super(),this.name="Player",this.active=!1,this.score=0}

render(){return j`
      <div id="player" class="${this.active?"active":""}">
        <span>${this.name}</span>
        <span>${this.score}</span>
      </div>
    `}}),window.customElements.define("card-memorama",class extends Z{static get styles(){return X`
      #card {
        border-radius: 8px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 100px;
        font-size: 4rem;
        margin: 8px;
        cursor: pointer;
        background: #fff;
        box-shadow: 0px 0px 15px #888888;
      }
      .transparent {
        opacity: 0;
      }
      #card.hide {
        display: none;
      }
    `}

static get properties(){return{icon:{type:String},index:{type:Number},open:{type:Boolean},hide:{type:Boolean}}}

constructor(){super(),this.icon="??????",this.index="",this.open=!1,this.hide=!1}

firstUpdated(){this.addEventListener("hide",(()=>{this.hide=!0})),this.addEventListener("open",(()=>{this.open=!this.open})),this.addEventListener("reset",(()=>{this.hide=!1,this.open=!1}))}

render(){return j`
      <div id="card" class="${this.hide?"hide":""}">
        <span class="${this.open?"":"transparent"}">${this.icon}</span>
      </div>
    `}}),window.customElements.define("lit-memorama",class extends Z{static get styles(){return X`
      :host {
        display: block;
      }
      .table {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        align-content: center;
        justify-items: center;
        max-width: 700px;
        background: rgba(33, 150, 243, 0.8);
        padding: 16px;
        border: 5px solid #dadada;
        border-style: solid;
        margin: 16px auto;
        border-radius: 30px;
        overflow: auto;
      }
      button,
      select {
        width: 100px;
        height: 48px;
        padding: 8px;
        margin: 0 4px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        font-weight: bold;
        color: #fff;
        background: #ff9800;
        outline: none;
        text-transform: capitalize;
      }
      .container{
        max-width: 700px;
        margin: 0 auto;
        display: flex;
        flex-flow: row;
        justify-content: space-between;
      }
    `}

static get properties(){return{deck:{type:Array},gameDifficulties:{type:Array},gameDifficulty:{type:Number},opened:{type:Array},canMove:{type:Boolean},turn:{type:Number}}}

constructor(){super(),this.gameDifficulties=["easy","medium","hard"],this.icons=["????","????","????","????","????","????","????","????","????","??????","????","????","????","????","????"],this._init()}

_init(){this.shuffle(),this.canMove=!0,this.gameDifficulty=0,this.opened=[],this.score={0:0,1:0},this.turn=0,this.reset()}

shuffle(){const e=this.icons.slice(0,this.gameDifficulty);this.deck=e.concat(e).sort((()=>Math.random()-.5))}

onChange(){this.gameDifficulty=5*(Number(this.shadowRoot.querySelector("#sel").value)+1),this._init()}

_closeCards(e){return new Promise((t=>{setTimeout((()=>{this.opened[0].target.dispatchEvent(new Event(e)),this.opened[1].target.dispatchEvent(new Event(e)),this.opened=[],this.canMove=!0,t()}),1e3)}))}

_played(){this.canMove=!1,this.opened[0].icon===this.opened[1].icon?(this._closeCards("hide"),this.score[this.turn%2]+=1,this.score[0]+this.score[1]===this.gameDifficulty&&alert(`Ganador ${this.turn%2==0?"Player 1":"Player 2"}`)):(this._closeCards("open"),this.turn+=1)}

_openCard(e){this.canMove&&((this.opened.length>0&&this.opened.length<2&&this.opened[0].index!==e.target.index||!this.opened.length)&&(e.target.dispatchEvent(new Event("open")),this.opened.push({icon:e.target.icon,index:e.target.index,target:e.target})),this.opened.length===2&&this._played())}

reset(){const e=this.shadowRoot.querySelectorAll("card-memorama");for(const t of e)t.dispatchEvent(new Event("reset"))}

render(){return j`
      <div class="container">
        <player-memorama
          name="P1"
          .active="${this.turn%2==0}"
          score="${this.score[0]}"
        ></player-memorama>
        <player-memorama
          name="P2"
          .active="${this.turn%2==1}"
          score="${this.score[1]}"
        ></player-memorama>
        <select id="sel" @change="${this.onChange}">
          ${this.gameDifficulties.map(((e,t)=>j`<option value="${t}" selected="${this.selected===e}">
                ${e}
              </option>`))}
        </select>
        <button @click="${this.reset}">Reset</button>
      </div>
      <div class="table">
        ${this.deck.map(((e,t)=>j`<card-memorama
              icon="${e}"
              index="${t}"
              @click="${this._openCard}"
            ></card-memorama>`))}
      </div>
    `}}),document.body.appendChild(document.createElement("lit-memorama"))})();