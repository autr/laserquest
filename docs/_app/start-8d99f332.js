var t=Object.prototype.hasOwnProperty,e=Object.getOwnPropertySymbols,r=Object.prototype.propertyIsEnumerable,s=Object.assign;import{S as n,i as o,s as a,e as i,t as c,c as l,a as u,b as h,d as p,f,g as d,h as g,j as m,k as y,l as $,n as b,m as v,o as w,p as x,q as E,r as _,u as R,v as S,w as O,x as k,y as L,z as q,A as j,B as T,C as P,D as N,E as U,F as A,_ as D}from"./chunks/preload-helper-922df9d2.js";function C(t){let e,r,s=t[1].stack+"";return{c(){e=i("pre"),r=c(s)},l(t){e=l(t,"PRE",{});var n=u(e);r=h(n,s),n.forEach(p)},m(t,s){f(t,e,s),d(e,r)},p(t,e){2&e&&s!==(s=t[1].stack+"")&&g(r,s)},d(t){t&&p(e)}}}function I(t){let e,r,s,n,o,a,v,w=t[1].message+"",x=t[1].stack&&C(t);return{c(){e=i("h1"),r=c(t[0]),s=m(),n=i("p"),o=c(w),a=m(),x&&x.c(),v=y()},l(i){e=l(i,"H1",{});var c=u(e);r=h(c,t[0]),c.forEach(p),s=$(i),n=l(i,"P",{});var f=u(n);o=h(f,w),f.forEach(p),a=$(i),x&&x.l(i),v=y()},m(t,i){f(t,e,i),d(e,r),f(t,s,i),f(t,n,i),d(n,o),f(t,a,i),x&&x.m(t,i),f(t,v,i)},p(t,[e]){1&e&&g(r,t[0]),2&e&&w!==(w=t[1].message+"")&&g(o,w),t[1].stack?x?x.p(t,e):(x=C(t),x.c(),x.m(v.parentNode,v)):x&&(x.d(1),x=null)},i:b,o:b,d(t){t&&p(e),t&&p(s),t&&p(n),t&&p(a),x&&x.d(t),t&&p(v)}}}function V(t,e,r){let{status:s}=e,{error:n}=e;return t.$$set=t=>{"status"in t&&r(0,s=t.status),"error"in t&&r(1,n=t.error)},[s,n]}class B extends n{constructor(t){super(),o(this,t,V,I,a,{status:0,error:1})}}function K(t){let e,r,s;const n=[t[4]||{}];var o=t[2][1];function a(t){let e={};for(let r=0;r<n.length;r+=1)e=v(e,n[r]);return{props:e}}return o&&(e=new o(a())),{c(){e&&x(e.$$.fragment),r=y()},l(t){e&&E(e.$$.fragment,t),r=y()},m(t,n){e&&_(e,t,n),f(t,r,n),s=!0},p(t,s){const i=16&s?R(n,[S(t[4]||{})]):{};if(o!==(o=t[2][1])){if(e){P();const t=e;k(t.$$.fragment,1,0,(()=>{L(t,1)})),N()}o?(e=new o(a()),x(e.$$.fragment),O(e.$$.fragment,1),_(e,r.parentNode,r)):e=null}else o&&e.$set(i)},i(t){s||(e&&O(e.$$.fragment,t),s=!0)},o(t){e&&k(e.$$.fragment,t),s=!1},d(t){t&&p(r),e&&L(e,t)}}}function M(t){let e,r;return e=new B({props:{status:t[0],error:t[1]}}),{c(){x(e.$$.fragment)},l(t){E(e.$$.fragment,t)},m(t,s){_(e,t,s),r=!0},p(t,r){const s={};1&r&&(s.status=t[0]),2&r&&(s.error=t[1]),e.$set(s)},i(t){r||(O(e.$$.fragment,t),r=!0)},o(t){k(e.$$.fragment,t),r=!1},d(t){L(e,t)}}}function z(t){let e,r,s,n;const o=[M,K],a=[];function i(t,e){return t[1]?0:1}return e=i(t),r=a[e]=o[e](t),{c(){r.c(),s=y()},l(t){r.l(t),s=y()},m(t,r){a[e].m(t,r),f(t,s,r),n=!0},p(t,n){let c=e;e=i(t),e===c?a[e].p(t,n):(P(),k(a[c],1,1,(()=>{a[c]=null})),N(),r=a[e],r?r.p(t,n):(r=a[e]=o[e](t),r.c()),O(r,1),r.m(s.parentNode,s))},i(t){n||(O(r),n=!0)},o(t){k(r),n=!1},d(t){a[e].d(t),t&&p(s)}}}function W(t){let e,r=t[6]&&Y(t);return{c(){e=i("div"),r&&r.c(),this.h()},l(t){e=l(t,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,class:!0});var s=u(e);r&&r.l(s),s.forEach(p),this.h()},h(){w(e,"id","svelte-announcer"),w(e,"aria-live","assertive"),w(e,"aria-atomic","true"),w(e,"class","svelte-1j55zn5")},m(t,s){f(t,e,s),r&&r.m(e,null)},p(t,s){t[6]?r?r.p(t,s):(r=Y(t),r.c(),r.m(e,null)):r&&(r.d(1),r=null)},d(t){t&&p(e),r&&r.d()}}}function Y(t){let e,r;return{c(){e=c("Navigated to "),r=c(t[7])},l(s){e=h(s,"Navigated to "),r=h(s,t[7])},m(t,s){f(t,e,s),f(t,r,s)},p(t,e){128&e&&g(r,t[7])},d(t){t&&p(e),t&&p(r)}}}function F(t){let e,r,s,n;const o=[t[3]||{}];let a={$$slots:{default:[z]},$$scope:{ctx:t}};for(let c=0;c<o.length;c+=1)a=v(a,o[c]);e=new t[8]({props:a});let i=t[5]&&W(t);return{c(){x(e.$$.fragment),r=m(),i&&i.c(),s=y()},l(t){E(e.$$.fragment,t),r=$(t),i&&i.l(t),s=y()},m(t,o){_(e,t,o),f(t,r,o),i&&i.m(t,o),f(t,s,o),n=!0},p(t,[r]){const n=8&r?R(o,[S(t[3]||{})]):{};2071&r&&(n.$$scope={dirty:r,ctx:t}),e.$set(n),t[5]?i?i.p(t,r):(i=W(t),i.c(),i.m(s.parentNode,s)):i&&(i.d(1),i=null)},i(t){n||(O(e.$$.fragment,t),n=!0)},o(t){k(e.$$.fragment,t),n=!1},d(t){L(e,t),t&&p(r),i&&i.d(t),t&&p(s)}}}function G(t,e,r){let{status:s}=e,{error:n}=e,{stores:o}=e,{page:a}=e,{components:i}=e,{props_0:c=null}=e,{props_1:l=null}=e;const u=i[0];q("__svelte__",o),j(o.page.notify);let h=!1,p=!1,f=null;return T((()=>{const t=o.page.subscribe((()=>{h&&(r(6,p=!0),r(7,f=document.title))}));return r(5,h=!0),t})),t.$$set=t=>{"status"in t&&r(0,s=t.status),"error"in t&&r(1,n=t.error),"stores"in t&&r(9,o=t.stores),"page"in t&&r(10,a=t.page),"components"in t&&r(2,i=t.components),"props_0"in t&&r(3,c=t.props_0),"props_1"in t&&r(4,l=t.props_1)},t.$$.update=()=>{1536&t.$$.dirty&&o.page.set(a)},[s,n,i,c,l,h,p,f,u,o,a]}class H extends n{constructor(t){super(),o(this,t,G,F,a,{status:0,error:1,stores:9,page:10,components:2,props_0:3,props_1:4})}}function J(t){let e;const r=t[1].default,s=U(r,t,t[0],null);return{c(){s&&s.c()},l(t){s&&s.l(t)},m(t,r){s&&s.m(t,r),e=!0},p(t,[e]){s&&s.p&&1&e&&A(s,r,t,t[0],e,null,null)},i(t){e||(O(s,t),e=!0)},o(t){k(s,t),e=!1},d(t){s&&s.d(t)}}}function X(t,e,r){let{$$slots:s={},$$scope:n}=e;return t.$$set=t=>{"$$scope"in t&&r(0,n=t.$$scope)},[n,s]}var Q=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:class extends n{constructor(t){super(),o(this,t,X,J,a,{})}}});const Z=[{pattern:/^\/$/,params:()=>({}),parts:[[()=>D((()=>import("./pages/index.svelte-3fe9f5ab.js")),["/_app/pages/index.svelte-3fe9f5ab.js","/_app/chunks/preload-helper-922df9d2.js","/_app/chunks/index-ce0f8a7d.js"])][0]]}],tt=[];function et(t){for(;t&&"A"!==t.nodeName.toUpperCase();)t=t.parentNode;return t}const rt=[];function st(t,e=b){let r;const s=[];function n(e){if(a(t,e)&&(t=e,r)){const e=!rt.length;for(let r=0;r<s.length;r+=1){const e=s[r];e[1](),rt.push(e,t)}if(e){for(let t=0;t<rt.length;t+=2)rt[t][0](rt[t+1]);rt.length=0}}}return{set:n,update:function(e){n(e(t))},subscribe:function(o,a=b){const i=[o,a];return s.push(i),1===s.length&&(r=e(n)||b),o(t),()=>{const t=s.indexOf(i);-1!==t&&s.splice(t,1),0===s.length&&(r(),r=null)}}}}function nt(){return{x:pageXOffset,y:pageYOffset}}class ot{constructor({base:t,host:e,pages:r,ignore:s}){this.base=t,this.host=e,this.pages=r,this.ignore=s,this.history=window.history||{pushState:()=>{},replaceState:()=>{},scrollRestoration:"auto"}}init(t){let e;this.renderer=t,t.router=this,"scrollRestoration"in this.history&&(this.history.scrollRestoration="manual"),addEventListener("beforeunload",(()=>{this.history.scrollRestoration="auto"})),addEventListener("load",(()=>{this.history.scrollRestoration="manual"})),addEventListener("scroll",(()=>{clearTimeout(e),e=setTimeout((()=>{const t=s(s({},history.state||{}),{"sveltekit:scroll":nt()});history.replaceState(t,document.title,window.location.href)}),50)})),addEventListener("click",(t=>{if(1!==function(t){return null===t.which?t.button:t.which}(t))return;if(t.metaKey||t.ctrlKey||t.shiftKey||t.altKey)return;if(t.defaultPrevented)return;const e=et(t.target);if(!e)return;if(!e.href)return;const r="object"==typeof e.href&&"SVGAnimatedString"===e.href.constructor.name,s=String(r?e.href.baseVal:e.href);if(s===location.href)return void(location.hash||t.preventDefault());if(e.hasAttribute("download")||"external"===e.getAttribute("rel"))return;if(r?e.target.baseVal:e.target)return;const n=new URL(s);if(n.pathname===location.pathname&&n.search===location.search)return;const o=this.select(n);if(o){const r=e.hasAttribute("sveltekit:noscroll");this.renderer.notify(o),this.history.pushState({},"",n.href),this.navigate(o,r?nt():null,[],n.hash),t.preventDefault()}})),addEventListener("popstate",(t=>{if(t.state){const e=new URL(location.href),r=this.select(e);r?this.navigate(r,t.state["sveltekit:scroll"],[]):location.href=location.href}})),document.body.setAttribute("tabindex","-1"),this.history.replaceState({},"",location.href);const r=this.select(new URL(location.href));if(r)return this.renderer.start(r)}select(t){if(t.origin!==location.origin)return null;if(!t.pathname.startsWith(this.base))return null;let e=t.pathname.slice(this.base.length);if(""===e&&(e="/"),!this.ignore.some((t=>t.test(e))))for(const r of this.pages){const s=r.pattern.exec(e);if(s){const n=new URLSearchParams(t.search),o=r.params(s),a={host:this.host,path:e,query:n,params:o};return{href:t.href,route:r,match:s,page:a}}}}async goto(t,{noscroll:e=!1,replaceState:r=!1}={},s){const n=new URL(t,function(t){let e=t.baseURI;if(!e){const r=t.getElementsByTagName("base");e=r.length?r[0].href:t.URL}return e}(document)),o=this.select(n);return o?(this.renderer.notify(o),this.history[r?"replaceState":"pushState"]({},"",t),this.navigate(o,e?nt():null,s,n.hash)):(location.href=t,new Promise((()=>{})))}async navigate(t,e,r,s){location.pathname.endsWith("/")&&"/"!==location.pathname&&history.replaceState({},"",`${location.pathname.slice(0,-1)}${location.search}`),await this.renderer.render(t,r),document.body.focus();const n=s&&document.getElementById(s.slice(1));e?scrollTo(e.x,e.y):n?scrollTo(0,n.getBoundingClientRect().top+scrollY):scrollTo(0,0)}}function at(t){if(t.error){const e="string"==typeof t.error?new Error(t.error):t.error,r=t.status;return e instanceof Error?!r||r<400||r>599?(console.warn('"error" returned from load() without a valid status code — defaulting to 500'),{status:500,error:e}):{status:r,error:e}:{status:500,error:new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof e}"`)}}if(t.redirect){if(!t.status||3!==Math.floor(t.status/100))return{status:500,error:new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')};if("string"!=typeof t.redirect)return{status:500,error:new Error('"redirect" property returned from load() must be a string')}}return t}function it(t){const e=st(t);let r=!0;return{notify:function(){r=!0,e.update((t=>t))},set:function(t){r=!1,e.set(t)},subscribe:function(t){let s;return e.subscribe((e=>{(void 0===s||r&&e!==s)&&t(s=e)}))}}}class ct{constructor({Root:t,layout:e,target:r,error:s,status:n,session:o}){this.Root=t,this.layout=e,this.layout_loader=()=>e,this.router=null,this.target=r,this.initial={error:s,status:n},this.current={page:null,query:null,session_changed:!1,nodes:[],contexts:[]},this.caches=new Map,this.prefetching={href:null,promise:null},this.stores={page:it({}),navigating:st(null),session:st(o)},this.$session=null,this.root=null;const a=t=>{const e=et(t.target);e&&e.hasAttribute("sveltekit:prefetch")&&this.prefetch(new URL(e.href))};let i;addEventListener("touchstart",a),addEventListener("mousemove",(t=>{clearTimeout(i),i=setTimeout((()=>{a(t)}),20)}));let c=!1;this.stores.session.subscribe((async t=>{if(this.$session=t,!c)return;this.current.session_changed=!0;const e=this.router.select(new URL(location.href));this.render(e)})),c=!0}async start(t){const e={stores:this.stores,error:this.initial.error,status:this.initial.status,page:t.page};if(this.initial.error)e.components=[this.layout.default];else{const r=await this.hydrate(t);if(r.redirect)throw new Error("TODO client-side redirects");Object.assign(e,r.props),this.current=r.state}this.root=new this.Root({target:this.target,props:e,hydrate:!0}),this.initial=null}notify(t){this.stores.navigating.set({from:this.current.page,to:t.page})}async render(t,e){const r=this.token={},s=await this.hydrate(t);if(this.token===r){if(s.redirect){if(!(e.length>10||e.includes(this.current.page.path)))return void this.router.goto(s.redirect,{replaceState:!0},[...e||[],this.current.page.path]);s.props.status=500,s.props.error=new Error("Redirect loop")}this.current=s.state,this.root.$set(s.props),this.stores.navigating.set(null)}}async hydrate({route:n,page:o}){const a={status:200,error:null,components:[]},i=(s,n)=>{if(this.initial){const n=document.querySelector(`script[type="svelte-data"][url="${s}"]`);if(n){const s=JSON.parse(n.textContent),{body:o}=s,a=((s,n)=>{var o={};for(var a in s)t.call(s,a)&&n.indexOf(a)<0&&(o[a]=s[a]);if(null!=s&&e)for(var a of e(s))n.indexOf(a)<0&&r.call(s,a)&&(o[a]=s[a]);return o})(s,["body"]);return Promise.resolve(new Response(o,a))}}return fetch(s,n)},c=o.query.toString(),l={page:o,query:c,session_changed:!1,nodes:[],contexts:[]},u=[this.layout_loader(),...n.parts.map((t=>t()))],h=[];let p,f;const d={params:Object.keys(o.params).filter((t=>!this.current.page||this.current.page.params[t]!==o.params[t])),query:c!==this.current.query,session:this.current.session_changed,context:!1};try{for(let t=0;t<u.length;t+=1){const e=this.current.nodes[t],r=this.current.contexts[t],{default:n,preload:g,load:m}=await u[t];if(a.components[t]=n,g)throw new Error("preload has been deprecated in favour of load. Please consult the documentation: https://kit.svelte.dev/docs#load");if(!e||n!==e.component||d.params.some((t=>e.uses.params.has(t)))||d.query&&e.uses.query||d.session&&e.uses.session||d.context&&e.uses.context){const e=o.path+c,r=this.caches.get(n),a=r&&r.get(e);let u,g;if(!a||d.context&&a.node.uses.context){u={component:n,uses:{params:new Set,query:!1,session:!1,context:!1}};const t={};for(const r in o.params)Object.defineProperty(t,r,{get:()=>(u.uses.params.add(r),o.params[r]),enumerable:!0});const e=this.$session;g=m&&await m.call(null,{page:{host:o.host,path:o.path,params:t,get query(){return u.uses.query=!0,o.query}},get session(){return u.uses.session=!0,e},get context(){return u.uses.context=!0,s({},p)},fetch:i})}else({node:u,loaded:g}=a);if(g){if(g=at(g),g.error)throw g.error.status=g.status,g.error;if(g.redirect){f=g.redirect;break}if(g.context&&(d.context=!0,p=s(s({},p),g.context)),g.maxage){this.caches.has(n)||this.caches.set(n,new Map);const t=this.caches.get(n),r={node:u,loaded:g};t.set(e,r);let s=!1;const o=setTimeout((()=>{a()}),1e3*g.maxage),a=()=>{t.get(e)===r&&t.delete(e),i(),clearTimeout(o)},i=this.stores.session.subscribe((()=>{s&&a()}));s=!0}h[t]=g.props}l.nodes[t]=u,l.contexts[t]=p}else l.nodes[t]=e,l.contexts[t]=p=r}(await Promise.all(h)).forEach(((t,e)=>{t&&(a[`props_${e}`]=t)})),this.current.page&&o.path===this.current.page.path||(a.page=o)}catch(g){a.error=g,a.status=g.status||500,l.nodes=[]}return{redirect:f,props:a,state:l}}async prefetch(t){const e=this.router.select(t);if(e)return t.href!==this.prefetching.href&&(this.prefetching={href:t.href,promise:this.hydrate(e)}),this.prefetching.promise;throw new Error(`Could not prefetch ${t.href}`)}}async function lt({paths:t,target:e,host:r,session:s,error:n,status:o}){const a=new ot({base:t.base,host:r,pages:Z,ignore:tt}),i=new ct({Root:H,layout:Q,target:e,error:n,status:o,session:s});await a.init(i)}export{lt as start};
