(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{40:function(e,a,t){},44:function(e,a,t){},53:function(e,a,t){e.exports=t(69)},58:function(e,a,t){},59:function(e,a,t){},61:function(e,a,t){},69:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(9),l=t.n(c),s=(t(58),t(59),t(27)),o=t(7),i=t(14),m=t.n(i),u=t(19),d=t(8),E=function(){var e=Object(n.useState)(!1),a=Object(d.a)(e,2),t=a[0],r=a[1],c=Object(n.useState)(!1),l=Object(d.a)(c,2),s=l[0],o=l[1];return{loading:t,error:s,request:Object(n.useCallback)(function(){var e=Object(u.a)(m.a.mark((function e(a){var t,n,c,l=arguments;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=l.length>1&&void 0!==l[1]?l[1]:{method:"GET"},e.prev=1,r(!0),e.next=5,fetch(a,t);case 5:return n=e.sent,e.next=8,n.json();case 8:if((c=e.sent).success){e.next=12;break}return o(c.msg),e.abrupt("return",c);case 12:return o(!1),e.abrupt("return",c);case 16:e.prev=16,e.t0=e.catch(1),console.log(e.t0),o(e.t0);case 20:return e.prev=20,r(!1),e.finish(20);case 23:case"end":return e.stop()}}),e,null,[[1,16,20,23]])})));return function(a){return e.apply(this,arguments)}}(),[])}},p=t(18),v=function(e,a){var t=a.props,n=t.id,r=t.username;switch(a.type){case"fillOut":return{isAuthenticated:!0,id:n,username:r,ready:!0};default:return Object(p.a)(Object(p.a)({},e),{},{ready:!0})}},f=function(){var e=Object(n.useReducer)(v,{isAuthenticated:!1,id:null,username:"",ready:!1}),a=Object(d.a)(e,2),t=a[0],r=a[1],c=Object(n.useState)(!0),l=Object(d.a)(c,2),s=l[0],o=l[1],i=E(),p=(i.error,i.request),f=Object(n.useCallback)(Object(u.a)(m.a.mark((function e(){var a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p("/api/whoami");case 3:a=e.sent,console.log({responce:a}),a.success?r({type:"fillOut",props:{id:a.data.id,username:a.data.username}}):r({type:"unsuccessful",props:{id:t.id,username:t.username}}),o(!1),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])}))),[p]);return Object(n.useEffect)((function(){f()}),[f]),{info:t,loading:s}},g=t(22),b=(t(40),function(e){var a=e.form,t=e.changeHandler,n=e.submitHandler,c=e.err;return r.a.createElement("div",{className:"containerInput"},r.a.createElement("div",{className:"image"},r.a.createElement("h1",null,"Welcome To ",r.a.createElement("span",null,"Mellowgram"))),r.a.createElement("div",{className:"content"},r.a.createElement("h1",null,"Login"),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Username"),r.a.createElement("br",null),r.a.createElement("input",{type:"text",className:"form-control",name:"username",id:"txt","aria-describedby":"helpId",value:a.username,onChange:t})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Password"),r.a.createElement("br",null),r.a.createElement("input",{type:"password",className:"form-control",name:"password",id:"txt",value:a.password,onChange:t})),r.a.createElement("a",{className:"fp",href:"/accounts/password/reset"},"Forgot Password?"),r.a.createElement("br",null),r.a.createElement("button",{type:"button",className:"btn",onClick:n},r.a.createElement("a",null,"Login")),c&&r.a.createElement("h4",{className:"fp login-error"},c),r.a.createElement("hr",null),r.a.createElement("div",{className:"login"},"Or login with"),r.a.createElement("div",{className:"links"},r.a.createElement("div",{className:"google"},r.a.createElement("i",{className:"fa fa-google"},r.a.createElement("span",null,"Google"))),r.a.createElement("div",{className:"facebook"},r.a.createElement("i",{className:"fa fa-facebook-f"},r.a.createElement("span",null,"Facebook"))),r.a.createElement("div",{className:"instagram",onClick:function(){return console.log("instagram")}},r.a.createElement("i",{className:"fa fa-instagram"},r.a.createElement("span",null,"Instagram")))),r.a.createElement("div",{className:"signup"},"Don't have an account? \u200b",r.a.createElement("a",{href:"/signup"},"Sign up"))))}),h=(t(61),t(4)),w=t(100),N=t(101),O=t(48),x=t.n(O),j=function(e){var a=e.handler;return r.a.createElement("div",{className:"hamburger",onClick:a},r.a.createElement("span",{className:"line"}),r.a.createElement("span",{className:"line"}),r.a.createElement("span",{className:"line"}))},k=function(){var e=Object(n.useState)(!1),a=Object(d.a)(e,2),t=a[0],c=a[1],l=Object(h.a)({root:{background:"#ebe6e7",borderRadius:3,border:0,boxShadow:"0 3px 5px 2px rgba(255, 105, 135, .3)"}})(w.a);return r.a.createElement("div",null,r.a.createElement("nav",{className:"header-nav"},r.a.createElement(j,{handler:function(){c((function(e){return!e}))}}),r.a.createElement("div",{className:"logo"},r.a.createElement("a",{className:"a-header",href:"/"},"Mellowgram")),r.a.createElement("ul",{className:"nav-search"},r.a.createElement("li",{className:"nav-item search-field"},r.a.createElement(l,{onKeyPress:function(e){"Enter"===e.key&&console.log("Enter is pressed")},id:"input-with-icon-textfield",variant:"outlined",placeholder:"Search",InputProps:{startAdornment:r.a.createElement(N.a,{position:"start"},r.a.createElement(x.a,null))}}))),r.a.createElement("ul",{className:t?"nav-items show":"nav-items"},r.a.createElement("li",{className:t?"nav-item fade":"nav-item"},r.a.createElement("a",{className:"a-header",href:"#"},"About us")),r.a.createElement("li",{className:t?"disabled":""},"|"),r.a.createElement("li",{className:t?"nav-item fade":"nav-item"},r.a.createElement("a",{className:"a-header",href:"/login"},"Log in")),r.a.createElement("li",{className:t?"nav-item fade":"nav-item"},r.a.createElement("a",{className:"a-header",href:"/signup"},"Sign up")))))},y=function(){var e=Object(o.g)(),a=Object(n.useState)({username:"",password:""}),t=Object(d.a)(a,2),c=t[0],l=t[1],s=E(),i=s.loading,v=s.error,f=s.request;console.log({loading:i,error:v});var h=function(){var a=Object(u.a)(m.a.mark((function a(){var t;return m.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return l({username:"",password:""}),a.next=3,f("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)});case 3:if(!(t=a.sent).success){a.next=6;break}return a.abrupt("return",e.push("/".concat(t.username)));case 6:console.log({responce:t});case 7:case"end":return a.stop()}}),a)})));return function(){return a.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement(k,null),r.a.createElement("div",null,r.a.createElement(b,{err:v,form:c,changeHandler:function(e){var a=e.target,t=a.name,n=a.value;l((function(e){return Object(p.a)(Object(p.a)({},e),{},Object(g.a)({},t,n))}))},submitHandler:h})))},C=function(e){var a=e.err,t=e.form,n=e.changeHandler,c=e.submitHandler;return r.a.createElement("div",{className:"containerInput"},r.a.createElement("div",{className:"image"},r.a.createElement("h1",null,"Welcome To ",r.a.createElement("span",null,"Mellowgram"))),r.a.createElement("div",{className:"content"},r.a.createElement("h3",null,"Sign up to meet new friends."),r.a.createElement("div",{className:"login"},"Login with"),r.a.createElement("div",{className:"links links-signup"},r.a.createElement("div",{className:"google"},r.a.createElement("i",{className:"fa fa-google"},r.a.createElement("span",null,"Google"))),r.a.createElement("div",{className:"facebook"},r.a.createElement("i",{className:"fa fa-facebook-f"},r.a.createElement("span",null,"Facebook"))),r.a.createElement("div",{className:"instagram",onClick:function(){return console.log("instagram")}},r.a.createElement("i",{className:"fa fa-instagram"},r.a.createElement("span",null,"Instagram")))),r.a.createElement("span",null,"OR"),r.a.createElement("div",{className:"form-group form-group-signup"},r.a.createElement("label",null,"Email"),r.a.createElement("br",null),r.a.createElement("input",{type:"text",className:"form-control",name:"email",id:"txt","aria-describedby":"helpId",value:t.email,onChange:n})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Full Name"),r.a.createElement("br",null),r.a.createElement("input",{type:"text",className:"form-control",name:"fullName",id:"txt",value:t.fullName,onChange:n})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Username"),r.a.createElement("br",null),r.a.createElement("input",{type:"text",className:"form-control",name:"username",id:"txt",value:t.username,onChange:n})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Password"),r.a.createElement("br",null),r.a.createElement("input",{type:"password",className:"form-control",name:"password",id:"txt",value:t.password,onChange:n})),r.a.createElement("button",{type:"button",className:"btn",onClick:c},r.a.createElement("a",null,"Sign up")),a&&r.a.createElement("h4",{className:"fp login-error"},a),r.a.createElement("div",{className:"signup signup-signup"},"Have an account? \u200b",r.a.createElement("a",{href:"/login"},"Log in"))))},S=function(){var e=Object(o.g)(),a=Object(n.useState)({email:"",fullName:"",username:"",password:""}),t=Object(d.a)(a,2),c=t[0],l=t[1],s=E(),i=s.loading,v=s.error,f=s.request;console.log({form:c}),console.log({loading:i,error:v});var b=function(){var a=Object(u.a)(m.a.mark((function a(){var t;return m.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return l({email:"",fullName:"",username:"",password:""}),a.next=3,f("/api/signup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)});case 3:if(t=a.sent,console.log({responce:t}),!t.success){a.next=7;break}return a.abrupt("return",e.push("/login"));case 7:return a.abrupt("return");case 8:case"end":return a.stop()}}),a)})));return function(){return a.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement(k,null),r.a.createElement(C,{err:v,form:c,changeHandler:function(e){var a=e.target,t=a.name,n=a.value;l((function(e){return Object(p.a)(Object(p.a)({},e),{},Object(g.a)({},t,n))}))},submitHandler:b}))},H=(t(44),function(){var e=Object(n.useState)("is-active"),a=Object(d.a)(e,2),t=a[0],c=a[1],l=Object(n.useState)(""),s=Object(d.a)(l,2),o=s[0],i=s[1],m=Object(n.useState)(""),u=Object(d.a)(m,2),E=u[0],p=u[1],v=Object(n.useState)("card"),f=Object(d.a)(v,2),g=f[0],b=f[1],h=Object(n.useState)("card-section is-active"),w=Object(d.a)(h,2),N=w[0],O=w[1],x=Object(n.useState)("card-section"),j=Object(d.a)(x,2),k=j[0],y=j[1],C=Object(n.useState)("card-section"),S=Object(d.a)(C,2),H=S[0],M=S[1],T=Object(n.useState)("#about"),z=Object(d.a)(T,2),A=z[0],I=z[1],V=function(e){console.log(e.target);var a=e.target.getAttribute("data-section");console.log(a),b("#about"!==a?function(e){return e+" is-active"}:function(e){return console.log({prev:e}),e.replace(/is-active/g," ")}),I(a),O("card-section"),M("card-section"),y("card-section"),c(""),i(""),p(""),"#experience"===a?(y((function(e){return e+" is-active"})),i("is-active")):"#about"===a?(O((function(e){return e+" is-active"})),c("is-active")):(M((function(e){return e+" is-active"})),p("is-active"))};return r.a.createElement("div",{class:g,"data-state":A},r.a.createElement("div",{class:"card-header"},r.a.createElement("div",{class:"card-cover"}),r.a.createElement("img",{class:"card-avatar",src:"https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",alt:"avatar"}),r.a.createElement("h1",{class:"card-fullname"},"William Rocheald"),r.a.createElement("h2",{class:"card-jobtitle"},"UI Developer")),r.a.createElement("div",{class:"card-main"},r.a.createElement("div",{class:N,id:"about"},r.a.createElement("div",{class:"card-content"},r.a.createElement("div",{class:"card-subtitle"},"ABOUT"),r.a.createElement("p",{class:"card-desc"},"Whatever tattooed stumptown art party sriracha gentrify hashtag intelligentsia readymazcsaaaaaaaaaaaaaaaaaaaaacascsasacsacsacacscsacsccc")),r.a.createElement("div",{class:"card-social"},r.a.createElement("a",{href:"#"},r.a.createElement("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{d:"M15.997 3.985h2.191V.169C17.81.117 16.51 0 14.996 0c-3.159 0-5.323 1.987-5.323 5.639V9H6.187v4.266h3.486V24h4.274V13.267h3.345l.531-4.266h-3.877V6.062c.001-1.233.333-2.077 2.051-2.077z"}))),r.a.createElement("a",{href:"#"},r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},r.a.createElement("path",{d:"M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z"}))),r.a.createElement("a",{href:"#"},r.a.createElement("svg",{viewBox:"0 0 512 512",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{d:"M301 256c0 24.852-20.148 45-45 45s-45-20.148-45-45 20.148-45 45-45 45 20.148 45 45zm0 0"}),r.a.createElement("path",{d:"M332 120H180c-33.086 0-60 26.914-60 60v152c0 33.086 26.914 60 60 60h152c33.086 0 60-26.914 60-60V180c0-33.086-26.914-60-60-60zm-76 211c-41.355 0-75-33.645-75-75s33.645-75 75-75 75 33.645 75 75-33.645 75-75 75zm86-146c-8.285 0-15-6.715-15-15s6.715-15 15-15 15 6.715 15 15-6.715 15-15 15zm0 0"}),r.a.createElement("path",{d:"M377 0H135C60.562 0 0 60.563 0 135v242c0 74.438 60.563 135 135 135h242c74.438 0 135-60.563 135-135V135C512 60.562 451.437 0 377 0zm45 332c0 49.625-40.375 90-90 90H180c-49.625 0-90-40.375-90-90V180c0-49.625 40.375-90 90-90h152c49.625 0 90 40.375 90 90zm0 0"}))),r.a.createElement("a",{href:"#"},r.a.createElement("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{d:"M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 002.882 0z"}))))),r.a.createElement("div",{class:k,id:"experience"},r.a.createElement("div",{class:"card-content"},r.a.createElement("div",{class:"card-subtitle"},"WORK EXPERIENCE"),r.a.createElement("div",{class:"card-timeline"},r.a.createElement("div",{class:"card-item","data-year":"2014"},r.a.createElement("div",{class:"card-item-title"},"Front-end Developer at ",r.a.createElement("span",null,"JotForm")),r.a.createElement("div",{class:"card-item-desc"},"Disrupt stumptown retro everyday carry unicorn.")),r.a.createElement("div",{class:"card-item","data-year":"2016"},r.a.createElement("div",{class:"card-item-title"},"UI Developer at ",r.a.createElement("span",null,"GitHub")),r.a.createElement("div",{class:"card-item-desc"},"Developed new conversion funnels and disrupt.")),r.a.createElement("div",{class:"card-item","data-year":"2018"},r.a.createElement("div",{class:"card-item-title"},"Illustrator at ",r.a.createElement("span",null,"Google")),r.a.createElement("div",{class:"card-item-desc"},"Onboarding illustrations for App.")),r.a.createElement("div",{class:"card-item","data-year":"2020"},r.a.createElement("div",{class:"card-item-title"},"Full-Stack Developer at ",r.a.createElement("span",null,"CodePen")),r.a.createElement("div",{class:"card-item-desc"},"Responsible for the encomposing brand expreience."))))),r.a.createElement("div",{class:H,id:"contact"},r.a.createElement("div",{class:"card-content"},r.a.createElement("div",{class:"card-subtitle"},"CONTACT"),r.a.createElement("div",{class:"card-contact-wrapper"},r.a.createElement("div",{class:"card-contact"},r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},r.a.createElement("path",{d:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"}),r.a.createElement("circle",{cx:"12",cy:"10",r:"3"})),"Algonquin Rd, Three Oaks Vintage, MI, 49128"),r.a.createElement("div",{class:"card-contact"},r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewbox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},r.a.createElement("path",{d:"M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"})),"(269) 756-9809"),r.a.createElement("div",{class:"card-contact"},r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},r.a.createElement("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),r.a.createElement("path",{d:"M22 6l-10 7L2 6"})),"william@rocheald.com"),r.a.createElement("button",{class:"contact-me"},"WORK TOGETHER")))),r.a.createElement("hr",null),r.a.createElement("div",{class:"card-buttons"},r.a.createElement("button",{"data-section":"#about",class:t,onClick:V},"ABOUT"),r.a.createElement("button",{className:o,"data-section":"#experience",onClick:V},"EXPERIENCE"),r.a.createElement("button",{className:E,"data-section":"#contact",onClick:V},"CONTACT"))))}),M=function(e){e.match.params.username;return r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement(k,null)),r.a.createElement(H,null))},T=function(){return r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement(k,null)),r.a.createElement("h2",null,"Sorry, this page isn't available."),r.a.createElement("div",{className:"detail"},"The link you followed may be broken, or the page may have been removed. \u200b",r.a.createElement("a",{href:"/"},"Go back to Mellowgram.")))},z=function(){var e=f(),a=e.info,t=e.loading;return console.log({info:a,loading:t}),t?r.a.createElement("div",null):a.isAuthenticated?r.a.createElement(s.a,null,r.a.createElement("div",{className:"container"},r.a.createElement(o.d,null,r.a.createElement(o.b,{exact:!0,path:"/header",render:function(e){return r.a.createElement(k,e)}}),r.a.createElement(o.a,{from:"/",exact:!0,to:"/".concat(a.username)}),r.a.createElement(o.a,{from:"/login",exact:!0,to:"/".concat(a.username)}),r.a.createElement(o.a,{from:"/signup",exact:!0,to:"/".concat(a.username)}),r.a.createElement(o.b,{exact:!0,path:"/:username",render:function(e){return r.a.createElement(M,e)}}),r.a.createElement(o.b,{render:function(e){return r.a.createElement(T,e)}})))):r.a.createElement(s.a,null,r.a.createElement("div",{className:"container"},r.a.createElement(o.d,null,r.a.createElement(o.a,{path:"/",exact:!0,to:"/login"}),r.a.createElement(o.b,{exact:!0,path:"/",component:r.a.createElement("h1",null,"asd")}),r.a.createElement(o.b,{exact:!0,path:"/signup",render:function(e){return r.a.createElement(S,e)}}),r.a.createElement(o.b,{exact:!0,path:"/header",render:function(e){return r.a.createElement(k,e)}}),r.a.createElement(o.b,{exact:!0,path:"/login",render:function(e){return r.a.createElement(y,e)}}),r.a.createElement(o.b,{exact:!0,path:"/:username",render:function(e){return r.a.createElement(M,e)}}))))};l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(z,null)),document.getElementById("root"))}},[[53,1,2]]]);
//# sourceMappingURL=main.358a5c09.chunk.js.map