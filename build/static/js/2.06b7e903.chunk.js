(this["webpackJsonptrx-mlm-smart-contract-20113748-react"]=this["webpackJsonptrx-mlm-smart-contract-20113748-react"]||[]).push([[2],{108:function(e,t,n){"use strict";t.a=n.p+"static/media/xtronlong.12848e6d.png"},113:function(e,t,n){"use strict";var a=n(99),r=n.n(a),s=n(109),c={tronWeb:!1,contract:!1,setTronWeb:function(e){var t=this;return Object(s.a)(r.a.mark((function n(){return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t.tronWeb=e,n.next=3,e.contract().at("TWDECXnA4oAGrDYRNS7ex1izx3Mgys9SRp");case 3:t.contract=n.sent;case 4:case"end":return n.stop()}}),n)})))()}};t.a=c},114:function(e,t,n){"use strict";var a=n(1),r=(n(0),n(111));t.a=function(e){var t=e.autoClose,n=void 0===t?3e3:t;return Object(a.jsx)(r.a,{position:"top-center",autoClose:n,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0})}},130:function(e,t){},131:function(e,t){},132:function(e,t){},133:function(e,t){},325:function(e,t,n){"use strict";n.r(t);var a=n(99),r=n.n(a),s=n(109),c=n(17),o=n(1),i=n(0),l=n(108),d=n(2),u=n(13),b=n(120),j=n.n(b),p=n(111),x=n(105),O=n(114),h=n(113),g=n(26);t.default=function(e){var t=e.location&&e.location.state,n=Object(d.g)(),a=Object(i.useState)(""),b=Object(c.a)(a,2),m=b[0],f=b[1],v=Object(i.useState)(!1),w=Object(c.a)(v,2),k=w[0],E=w[1],y=Object(i.useState)(!1),N=Object(c.a)(y,2),S=N[0],I=N[1],T=Object(i.useState)({installed:!1,loggedIn:!1}),W=Object(c.a)(T,2),C=(W[0],W[1]),R=Object(d.h)().id,P=function(){return Object(o.jsx)("p",{children:"Please login to your Tronlink account"})};Object(i.useEffect)(Object(s.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e){var t={installed:!!window.tronWeb,loggedIn:window.tronWeb&&window.tronWeb.ready};if(t.installed)return C(t),e();var n=0,a=setInterval((function(){if(n>=10){var r=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_NETWORK;return window.tronWeb=new j.a(r,r,r),C({installed:!1,loggedIn:!1}),clearInterval(a),e()}if(t.installed=!!window.tronWeb,t.loggedIn=window.tronWeb&&window.tronWeb.ready,!t.installed)return n++;clearInterval(a),C(t),e()}),100)}));case 2:return e.next=4,h.a.setTronWeb(window.tronWeb);case 4:E(!0);case 5:case"end":return e.stop()}}),e)}))),[]);var D=function(){var e=Object(s.a)(r.a.mark((function e(){var a,s,c;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a="Porfavor no actualice la p\xe1gina y espere mientras su pago es procesado. Esto puede tardar unos minutos.",localStorage.removeItem("backOfficeID"),""===m&&void 0===R){e.next=29;break}if(!k){e.next=26;break}return e.prev=4,I(!0),"English"===t&&(a="Please do not refresh the page and wait while your payment is processed. This may take a few minutes."),p.b.warn(a,{position:"top-center",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!1,draggable:!0,progress:void 0}),e.next=10,h.a.contract.idToAddress(m).call();case 10:return s=e.sent,c=j.a.address.fromHex(s),e.next=14,h.a.contract.registrationExt(c).send({feeLimit:1e8,callValue:44e7,shouldPollResponse:!0});case 14:I(!1),n.push({pathname:"/back-office-main",state:{lang:t}}),window.location.reload(!1),e.next=24;break;case 19:e.prev=19,e.t0=e.catch(4),I(!1),console.log(e.t0),p.b.error("error",e.t0);case 24:e.next=27;break;case 26:p.b.error(P);case 27:e.next=30;break;case 29:"English"===t?p.b.warn("Enter your sponsor's ID"):p.b.warn("Ingrese el ID de su patrocinador");case 30:case"end":return e.stop()}}),e,null,[[4,19]])})));return function(){return e.apply(this,arguments)}}();return Object(o.jsxs)("div",{className:"",id:"backofficewrap",children:[Object(o.jsx)(O.a,{}),Object(o.jsxs)("div",{className:"container",children:[Object(o.jsx)("div",{className:"text-center logo-payment-wrap",children:S?Object(o.jsx)("div",{className:"logo-payment-link",children:Object(o.jsx)("img",{className:"logo-payment",src:l.a,alt:"logo xtron"})}):Object(o.jsx)(u.b,{to:{pathname:"/",state:t},className:"logo-payment-link",children:Object(o.jsx)("img",{className:"logo-payment",src:l.a,alt:"logo xtron"})})}),Object(o.jsx)("div",{className:"row ",id:"",children:Object(o.jsx)("div",{className:"registration-main",style:{width:"100%"},children:Object(o.jsx)("div",{className:"xwrap",children:Object(o.jsxs)("div",{className:"text-center registration-items",children:["English"===t?Object(o.jsx)("h2",{children:"Registration Area"}):Object(o.jsx)("h2",{children:"\xc1rea de registro"}),"English"===t?Object(o.jsx)("h4",{children:"If you don't have a sponsor, use 1"}):Object(o.jsx)("h4",{children:"Si no tiene un patrocinador, use 1"}),Object(o.jsx)(g.a,{active:S}),R?Object(o.jsx)("div",{className:"registration-input",children:Object(o.jsx)("input",{type:"text",value:R,className:"sponsor-input-box text-center",onChange:function(e){return f(e.target.value)},readOnly:!0})}):Object(o.jsx)("div",{className:"registration-input",children:Object(o.jsx)("input",{type:"text",value:m,className:"sponsor-input-box text-center",onChange:function(e){return f(e.target.value)}})}),Object(o.jsx)("div",{className:"registration-btn",children:Object(o.jsx)("button",{className:"btn btn-success custombtn",onClick:function(){return D()},disabled:S,children:"English"===t?"REGISTER":"REGISTRO"})}),"English"===t?Object(o.jsxs)("h4",{children:[Object(o.jsx)(x.d,{})," Please confirm your sponsor's ID before making a payment."]}):Object(o.jsxs)("h4",{children:[Object(o.jsx)(x.d,{})," Verifique el ID de su patrocinador antes de realizar un pago."]}),Object(o.jsx)("div",{className:"h20"}),S?Object(o.jsx)("span",{children:Object(o.jsxs)("h4",{children:[Object(o.jsx)(x.k,{})," Login"]})}):Object(o.jsx)(u.b,{to:{pathname:"/login",state:t},children:Object(o.jsxs)("h4",{children:[Object(o.jsx)(x.k,{})," Login"]})})]})})})})]})]})}}}]);
//# sourceMappingURL=2.06b7e903.chunk.js.map