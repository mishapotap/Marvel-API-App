(this.webpackJsonpmarvel=this.webpackJsonpmarvel||[]).push([[6],{206:function(t,e,n){},213:function(t,e,n){"use strict";n.r(e);var r=n(37),c=n(57),a=n(32),i=n(4),s=n(1),o=n(5),u=n(24),l=n(9),b=n(22),p=(n(206),n(0)),m=function(){var t=Object(s.useState)([]),e=Object(i.a)(t,2),n=e[0],r=e[1],c=Object(s.useState)(!1),m=Object(i.a)(c,2),f=m[0],d=m[1],j=Object(s.useState)(0),h=Object(i.a)(j,2),v=h[0],O=h[1],g=Object(s.useState)(!1),x=Object(i.a)(g,2),y=x[0],w=x[1],_=Object(u.a)(),k=_.loading,C=_.error,N=_.getAllComics;Object(s.useEffect)((function(){A(v,!0)}),[]);var A=function(t,e){d(!e),N(t).then(S)},S=function(t){var e=!1;t.length<8&&(e=!0),r((function(e){return[].concat(Object(a.a)(e),Object(a.a)(t))})),d(!1),O((function(t){return t+8})),w(e)};var E=function(t){var e=t.map((function(t,e){return Object(p.jsx)("li",{className:"comics__item",tabIndex:0,children:Object(p.jsxs)(o.b,{to:"/comics/".concat(t.id),children:[Object(p.jsx)("img",{src:t.thumbnail,alt:t.title,className:"comics__item-img"}),Object(p.jsx)("div",{className:"comics__item-name",children:t.title}),Object(p.jsx)("div",{className:"comics__item-price",children:t.price})]})},e)}));return Object(p.jsx)("ul",{className:"comics__grid",children:e})}(n),I=C?Object(p.jsx)(b.a,{}):null,q=k&&!f?Object(p.jsx)(l.a,{}):null;return Object(p.jsxs)("div",{className:"comics__list",children:[I,q,E,Object(p.jsx)("button",{disabled:f,style:{display:y?"none":"block"},onClick:function(){A(v)},className:"button button__main button__long",children:Object(p.jsx)("div",{className:"inner",children:"load more"})})]})};e.default=function(){return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(r.b,{children:Object(p.jsxs)(r.a,{children:[Object(p.jsx)("meta",{name:"description",content:"Page with a list of comics"}),Object(p.jsx)("title",{children:"Comics page"})]})}),Object(p.jsx)(c.a,{}),Object(p.jsx)(m,{})]})}},22:function(t,e,n){"use strict";var r=n.p+"static/media/error.42292aa1.gif",c=n(0);e.a=function(){return Object(c.jsx)("img",{style:{display:"block",width:"250px",height:"250px",objectFit:"contain",margin:"0 auto"},src:r,alt:"Error_image"})}},24:function(t,e,n){"use strict";var r=n(26),c=n.n(r),a=n(27),i=n(4),s=n(1);e.a=function(){var t=function(){var t=Object(s.useState)(!1),e=Object(i.a)(t,2),n=e[0],r=e[1],o=Object(s.useState)(null),u=Object(i.a)(o,2),l=u[0],b=u[1];return{loading:n,error:l,request:Object(s.useCallback)(function(){var t=Object(a.a)(c.a.mark((function t(e){var n,a,i,s,o,u=arguments;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=u.length>1&&void 0!==u[1]?u[1]:"GET",a=u.length>2&&void 0!==u[2]?u[2]:null,i=u.length>3&&void 0!==u[3]?u[3]:{"Content-type":"application/json"},r(!0),t.prev=4,t.next=7,fetch(e,{method:n,body:a,headers:i});case 7:if((s=t.sent).ok){t.next=10;break}throw new Error("Couldn't fetch ".concat(e,", status: ").concat(s.status));case 10:return t.next=12,s.json();case 12:return o=t.sent,r(!1),t.abrupt("return",o);case 17:throw t.prev=17,t.t0=t.catch(4),r(!1),b(t.t0.message),t.t0;case 22:case"end":return t.stop()}}),t,null,[[4,17]])})));return function(e){return t.apply(this,arguments)}}(),[]),clearError:Object(s.useCallback)((function(){return b(null)}),[])}}(),e=t.loading,n=t.request,r=t.error,o=t.clearError,u="https://gateway.marvel.com:443/v1/public/",l="apikey=42666d0364f9ef05a9229fe8de769fa3",b=function(){var t=Object(a.a)(c.a.mark((function t(){var e,r,a=arguments;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=a.length>0&&void 0!==a[0]?a[0]:210,t.next=3,n("".concat(u,"characters?limit=9&offset=").concat(e,"&").concat(l));case 3:return r=t.sent,t.abrupt("return",r.data.results.map(j));case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),p=function(){var t=Object(a.a)(c.a.mark((function t(e){var r;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n("".concat(u,"characters?name=").concat(e,"&").concat(l));case 2:return r=t.sent,t.abrupt("return",r.data.results.map(j));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),m=function(){var t=Object(a.a)(c.a.mark((function t(e){var r;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n("".concat(u,"characters/").concat(e,"?").concat(l));case 2:return r=t.sent,t.abrupt("return",j(r.data.results[0]));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),f=function(){var t=Object(a.a)(c.a.mark((function t(){var e,r,a=arguments;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=a.length>0&&void 0!==a[0]?a[0]:0,t.next=3,n("".concat(u,"comics?limit=8&offset=").concat(e,"&").concat(l));case 3:return r=t.sent,t.abrupt("return",r.data.results.map(h));case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),d=function(){var t=Object(a.a)(c.a.mark((function t(e){var r;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n("".concat(u,"comics/").concat(e,"?").concat(l));case 2:return r=t.sent,t.abrupt("return",h(r.data.results[0]));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),j=function(t){return{id:t.id,name:t.name,description:t.description?"".concat(t.description.slice(0,210),"..."):"Unfortunately this character has no description",thumbnail:t.thumbnail.path+"."+t.thumbnail.extension,homepage:t.urls[0].url,wiki:t.urls[1].url,comics:t.comics.items.slice(0,10)}},h=function(t){return{id:t.id,title:t.title,description:t.description||"Unfortunately this comics has no description",pageCount:t.pageCount?"".concat(t.pageCount," pages"):"No information about the number of pages",thumbnail:t.thumbnail.path+"."+t.thumbnail.extension,language:t.textObjects.language||"en-us",price:0===t.prices[0].price?"Price not found":"".concat(t.prices[0].price,"$")}};return{loading:e,error:r,getAllCharacters:b,getCharacter:m,clearError:o,getAllComics:f,getComic:d,getCharacterByName:p}}},32:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var r=n(8);var c=n(6);function a(t){return function(t){if(Array.isArray(t))return Object(r.a)(t)}(t)||function(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(c.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},56:function(t,e,n){},57:function(t,e,n){"use strict";n(56);var r=n.p+"static/media/Avengers.4065c8f9.png",c=n.p+"static/media/Avengers_logo.9eaf2193.png",a=n(0);e.a=function(){return Object(a.jsxs)("div",{className:"app__banner",children:[Object(a.jsx)("img",{src:r,alt:"Avengers"}),Object(a.jsxs)("div",{className:"app__banner-text",children:["New comics every week!",Object(a.jsx)("br",{}),"Stay tuned!"]}),Object(a.jsx)("img",{src:c,alt:"Avengers logo"})]})}}}]);
//# sourceMappingURL=6.ad3d1760.chunk.js.map