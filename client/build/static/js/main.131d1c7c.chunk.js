(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{24:function(e,a){e.exports={deleteProperties:function(e,a){return a.map((function(a){return delete e[a]})),e},deepCopy:function(e){return JSON.parse(JSON.stringify(e))},adjustToTable:function(e){return Object.keys(e).map((function(a,t){return{field:a,value:e[a]}}))}}},28:function(e,a,t){},44:function(e,a,t){},45:function(e,a,t){},46:function(e,a,t){},56:function(e,a,t){e.exports=t(74)},65:function(e,a,t){},66:function(e,a,t){},68:function(e,a,t){},69:function(e,a,t){},71:function(e,a,t){},72:function(e,a,t){},73:function(e,a,t){},74:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(20),l=t.n(c),o=t(22),s=t(10),i=t(48),u=t(5),m={isAuthenticated:!1,id:null,username:null,based_in:null,email:null,fullname:null,number_of_posts:null,occupation:null,phone_number:null,picture:null,ready:!1},d=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:m,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"AUTH_USER":return Object(u.a)(Object(u.a)({},e),{},{isAuthenticated:!0,id:a.payload.id,username:a.payload.username,based_in:a.payload.based_in,email:a.payload.email,fullname:a.payload.fullname,number_of_posts:a.payload.number_of_posts,occupation:a.payload.occupation,phone_number:a.payload.phone_number,picture:a.payload.picture,ready:!0});case"UPDATE_PROFILE_PICTURE":return Object(u.a)(Object(u.a)({},e),{},{picture:a.payload.picture,ready:!0});case"UPDATE_PROFILE_INFO":default:return Object(u.a)(Object(u.a)({},e),{},{ready:!0})}},p={id:null,username:null,based_in:null,email:null,fullname:null,number_of_posts:null,occupation:null,phone_number:null,picture:null,ready:!1},E=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"SET_CURRENT_PAGE":return console.log({action:a}),Object(u.a)(Object(u.a)({},e),{},{id:a.payload.id,username:a.payload.username,based_in:a.payload.based_in,email:a.payload.email,fullname:a.payload.fullname,number_of_posts:a.payload.number_of_posts,occupation:a.payload.occupation,phone_number:a.payload.phone_number,picture:a.payload.picture,ready:!0});default:return Object(u.a)(Object(u.a)({},e),{},{ready:!0})}},b=Object(o.c)({loggedInUser:d,currentPage:E}),f=(t(65),t(66),t(17)),v=t(7),g=t(4),h=t.n(g),O=t(8),N=t(2),j=function(){var e=Object(n.useState)(!1),a=Object(N.a)(e,2),t=a[0],r=a[1],c=Object(n.useState)(!1),l=Object(N.a)(c,2),o=l[0],s=l[1];return{loading:t,error:o,request:Object(n.useCallback)(function(){var e=Object(O.a)(h.a.mark((function e(a){var t,n,c,l=arguments;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=l.length>1&&void 0!==l[1]?l[1]:{method:"GET"},e.prev=1,r(!0),e.next=5,fetch(a,t);case 5:if((n=e.sent).ok){e.next=9;break}throw s(!0),new Error("Something wrong with your request");case 9:return e.next=11,n.json();case 11:if(!(c=e.sent).success){e.next=14;break}return e.abrupt("return",c);case 14:return s(c.msg),e.abrupt("return",c);case 18:e.prev=18,e.t0=e.catch(1),s(e.t0),console.log(e.t0);case 22:return e.prev=22,r(!1),e.finish(22);case 25:case"end":return e.stop()}}),e,null,[[1,18,22,25]])})));return function(a){return e.apply(this,arguments)}}(),[])}},w=function(e){return{type:"UPDATE_PROFILE_PICTURE",payload:{picture:e}}},y=function(){var e=Object(s.b)(),a=Object(n.useState)(!0),t=Object(N.a)(a,2),r=t[0],c=t[1],l=j(),o=(l.error,l.request),i=Object(n.useCallback)(Object(O.a)(h.a.mark((function a(){var t,n,r,l,s,i,u,m,d,p,E,b,f;return h.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,o("/api/whoami");case 3:if(!(t=a.sent).success){a.next=13;break}return a.next=7,o("/api/user/".concat(t.data.username));case 7:n=a.sent,r=t.data,l=r.id,s=r.username,i=n.info,u=i.based_in,m=i.email,d=i.fullname,p=i.number_of_posts,E=i.occupation,b=i.phone_number,f=i.picture,e({type:"AUTH_USER",payload:{id:(v={id:l,username:s,based_in:u,email:m,fullname:d,number_of_posts:p,occupation:E,phone_number:b,picture:f}).id,username:v.username,based_in:v.based_in,email:v.email,fullname:v.fullname,number_of_posts:v.number_of_posts,occupation:v.occupation,phone_number:v.phone_number,picture:v.picture}}),a.next=14;break;case 13:e({type:"NOT_AUTH_USER"});case 14:c(!1),a.next=20;break;case 17:a.prev=17,a.t0=a.catch(0),console.log(a.t0);case 20:case"end":return a.stop()}var v}),a,null,[[0,17]])}))),[o,e]);return Object(n.useEffect)((function(){i()}),[i]),{loading:r}},_=t(21),x=(t(44),t(28),function(e){var a=e.form,t=e.changeHandler,n=e.submitHandler,c=e.err;return r.a.createElement("div",{className:"containerInput"},r.a.createElement("div",{className:"image"},r.a.createElement("h1",null,"Welcome To ",r.a.createElement("span",{className:"welcome"},"Mellowgram"))),r.a.createElement("div",{className:"content"},r.a.createElement("h1",null,"Login"),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Username"),r.a.createElement("br",null),r.a.createElement("input",{type:"text",className:"form-control",name:"username",id:"txt","aria-describedby":"helpId",value:a.username,onChange:t})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Password"),r.a.createElement("br",null),r.a.createElement("input",{type:"password",className:"form-control",name:"password",id:"txt",value:a.password,onChange:t})),r.a.createElement("a",{className:"fp",href:"/accounts/password/reset"},"Forgot Password?"),r.a.createElement("br",null),r.a.createElement("button",{type:"button",className:"btn green",onClick:n},r.a.createElement("a",null,"Login")),c&&r.a.createElement("h4",{className:"fp login-error"},c),r.a.createElement("hr",null),r.a.createElement("div",{className:"login"},"Or login with"),r.a.createElement("div",{className:"links"},r.a.createElement("div",{className:"google"},r.a.createElement("i",{className:"fa fa-google"},r.a.createElement("span",null,"Google"))),r.a.createElement("div",{className:"facebook"},r.a.createElement("i",{className:"fa fa-facebook-f"},r.a.createElement("span",null,"Facebook"))),r.a.createElement("div",{className:"instagram",onClick:function(){return console.log("instagram")}},r.a.createElement("i",{className:"fa fa-instagram"},r.a.createElement("span",null,"Instagram")))),r.a.createElement("div",{className:"signup"},"Don't have an account? \u200b",r.a.createElement("a",{href:"/signup"},"Sign up"))))}),k=(t(68),t(69),function(e){var a=e.options,t=e.isOpen,n=e.toggleOpen,c=e.selected,l=e.setSelected;return r.a.createElement("div",{className:"dropdown".concat(t?" open":""),onClick:n,tabIndex:"0"},r.a.createElement("span",{className:"current"},c),r.a.createElement("div",{className:"list"},r.a.createElement("ul",null,a.map((function(e,a){return r.a.createElement("li",{key:a,className:"option".concat(e.text===c?" selected":""),"data-value":e.value,"data-display-text":e.display,onClick:function(){return l(e.text)}},e.text)})))))}),S=function(e){var a=e.id,t=(e.label,e.defaultVal),c=e.options,l=Object(v.g)(),o=j(),s=(o.error,o.request),i=Object(n.useState)(!1),u=Object(N.a)(i,2),m=u[0],d=u[1],p=Object(n.useState)(""),E=Object(N.a)(p,2),b=E[0],f=E[1],g=function(){var e=Object(O.a)(h.a.mark((function e(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s("/api/logout");case 2:e.sent,l.push("/"),window.location.reload(!0);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return"Account"===b&&"/account"!==l.location.pathname&&(f(""),l.push("/account")),"Log Out"===b&&g(),r.a.createElement("div",{className:"fieldset"},r.a.createElement("div",{className:"form-element a-header"},r.a.createElement("span",null,r.a.createElement("select",{id:a},c.map((function(e,a){return r.a.createElement("option",{value:e.value,key:a,"data-display-text":e.display},e.text)}))),r.a.createElement(k,{options:c,isOpen:m,toggleOpen:function(){return d(!m)},selected:t,setSelected:f}))))},C=t(54),T=function(e){var a=e.handler,t=j().request,n=null,c=function(){var e=Object(O.a)(h.a.mark((function e(a){var r;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=function(e,a){return new Promise((function(t){clearTimeout(n),n=setTimeout(Object(O.a)(h.a.mark((function e(){var n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a();case 2:n=e.sent,t(n);case 4:case"end":return e.stop()}}),e)}))),e)}))},e.next=3,r(500,t.bind(null,"/api/findUser/".concat(a)));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return r.a.createElement(C.a,{placeholder:"Search...",cacheOptions:!0,noOptionsMessage:function(){return"No such user"},loadOptions:c,onChange:a})},P=[{text:"Account",value:"account",selected:!1},{text:"Log Out",value:"logout",selected:!1}],A=function(e){var a=e.handler;return r.a.createElement("div",{className:"hamburger",onClick:a},r.a.createElement("span",{className:"line"}),r.a.createElement("span",{className:"line"}),r.a.createElement("span",{className:"line"}))},U=function(){var e=Object(v.g)(),a=Object(s.c)((function(e){return e.loggedInUser})),t=Object(n.useState)(!1),c=Object(N.a)(t,2),l=c[0],o=c[1],i=Object(n.useState)(""),u=Object(N.a)(i,2),m=u[0],d=u[1];return m&&e.push("/".concat(m)),r.a.createElement("div",null,r.a.createElement("nav",{className:"header-nav"},r.a.createElement(A,{handler:function(){o((function(e){return!e}))}}),r.a.createElement("div",{className:"logo"},r.a.createElement(f.b,{to:"/"},"Mellowgram")),r.a.createElement("ul",{className:"nav-search"},r.a.createElement("li",{className:"nav-item search-field"},r.a.createElement(T,{handler:function(e){d(e.value)},selectedValue:m}))),r.a.createElement("ul",{className:l?"nav-items show":"nav-items"},r.a.createElement("li",{className:l?"nav-item fade open":"nav-item"},r.a.createElement(f.b,{to:"/about"},"About us")),r.a.createElement("li",{className:l?"disabled":""},"|"),r.a.createElement("li",{className:l?"nav-item fade open":"nav-item"},a.isAuthenticated?r.a.createElement("p",null,"Activity"):r.a.createElement(f.b,{to:"/login"},"Login")),r.a.createElement("li",{className:l?"nav-item fade open":"nav-item"},a.isAuthenticated?r.a.createElement(S,{id:"settings",label:"Settings",defaultVal:"Settings",options:P}):r.a.createElement(f.b,{to:"/signup"},"Sign up")))))},I=function(){var e=Object(v.g)(),a=Object(n.useState)({username:"",password:""}),t=Object(N.a)(a,2),c=t[0],l=t[1],o=j(),s=(o.loading,o.error),i=o.request,m=function(){var a=Object(O.a)(h.a.mark((function a(){return h.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return l({username:"",password:""}),a.next=3,i("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)});case 3:if(!a.sent.success){a.next=7;break}return e.push("/"),a.abrupt("return",window.location.reload(!0));case 7:case"end":return a.stop()}}),a)})));return function(){return a.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement(U,null),r.a.createElement("div",null,r.a.createElement(x,{err:s,form:c,changeHandler:function(e){var a=e.target,t=a.name,n=a.value;l((function(e){return Object(u.a)(Object(u.a)({},e),{},Object(_.a)({},t,n))}))},submitHandler:m})))},z=function(e){var a=e.err,t=e.form,n=e.changeHandler,c=e.submitHandler;return r.a.createElement("div",{className:"containerInput"},r.a.createElement("div",{className:"image"},r.a.createElement("h1",null,"Welcome To ",r.a.createElement("span",{className:"welcome"},"Mellowgram"))),r.a.createElement("div",{className:"content"},r.a.createElement("h3",null,"Sign up to meet new friends."),r.a.createElement("div",{className:"login"},"Login with"),r.a.createElement("div",{className:"links links-signup"},r.a.createElement("div",{className:"google"},r.a.createElement("i",{className:"fa fa-google"},r.a.createElement("span",null,"Google"))),r.a.createElement("div",{className:"facebook"},r.a.createElement("i",{className:"fa fa-facebook-f"},r.a.createElement("span",null,"Facebook"))),r.a.createElement("div",{className:"instagram",onClick:function(){return console.log("instagram")}},r.a.createElement("i",{className:"fa fa-instagram"},r.a.createElement("span",null,"Instagram")))),r.a.createElement("span",null,"OR"),r.a.createElement("div",{className:"form-group form-group-signup"},r.a.createElement("label",null,"Email"),r.a.createElement("br",null),r.a.createElement("input",{type:"text",className:"form-control",name:"email",id:"txt","aria-describedby":"helpId",value:t.email,onChange:n})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Full Name"),r.a.createElement("br",null),r.a.createElement("input",{type:"text",className:"form-control",name:"fullName",id:"txt",value:t.fullName,onChange:n})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Username"),r.a.createElement("br",null),r.a.createElement("input",{type:"text",className:"form-control",name:"username",id:"txt",value:t.username,onChange:n})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Password"),r.a.createElement("br",null),r.a.createElement("input",{type:"password",className:"form-control",name:"password",id:"txt",value:t.password,onChange:n})),r.a.createElement("button",{type:"button",className:"btn green",onClick:c},r.a.createElement("a",null,"Sign up")),a&&r.a.createElement("h4",{className:"fp login-error"},a),r.a.createElement("div",{className:"signup signup-signup"},"Have an account? \u200b",r.a.createElement("a",{href:"/login"},"Log in"))))},L=function(){var e=Object(v.g)(),a=Object(n.useState)({email:"",fullName:"",username:"",password:""}),t=Object(N.a)(a,2),c=t[0],l=t[1],o=j(),s=o.loading,i=o.error,m=o.request;console.log({form:c}),console.log({loading:s,error:i});var d=function(){var a=Object(O.a)(h.a.mark((function a(){var t;return h.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return l({email:"",fullName:"",username:"",password:""}),a.next=3,m("/api/signup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)});case 3:if(t=a.sent,console.log({responce:t}),!t.success){a.next=7;break}return a.abrupt("return",e.push("/login"));case 7:return a.abrupt("return");case 8:case"end":return a.stop()}}),a)})));return function(){return a.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement(U,{authorized:{isAuthenticated:!1}}),r.a.createElement(z,{err:i,form:c,changeHandler:function(e){var a=e.target,t=a.name,n=a.value;l((function(e){return Object(u.a)(Object(u.a)({},e),{},Object(_.a)({},t,n))}))},submitHandler:d}))},R=(t(45),t(71),function(e){var a=e.authorized;return r.a.createElement("div",{className:"nf"},r.a.createElement("div",null,r.a.createElement(U,{authorized:a})),r.a.createElement("div",{className:"not-available"},r.a.createElement("h2",null," Sorry, this page isn't available."),r.a.createElement("div",{className:"not-available-detail"},"The link you followed may be broken, or the page may have been removed. \u200b",r.a.createElement("a",{href:"/"},"Go back to Mellowgram."))))}),H=function(e){var a=e.params,t=a.year,n=a.company,c=a.profession,l=a.achievements;return r.a.createElement("div",{className:"card-item","data-year":t},r.a.createElement("div",{className:"card-item-title"},c," ",r.a.createElement("span",null,n)),r.a.createElement("div",{className:"card-item-desc"},l))},D=function(e){var a=e.experience;return r.a.createElement("div",{className:"card-timeline"},a.map((function(e){return r.a.createElement(H,{key:e.id,params:e})})))},M=function(e){var a=e.info,t=Object(n.useState)("is-active"),c=Object(N.a)(t,2),l=c[0],o=c[1],s=Object(n.useState)(""),i=Object(N.a)(s,2),u=i[0],m=i[1],d=Object(n.useState)(""),p=Object(N.a)(d,2),E=p[0],b=p[1],f=Object(n.useState)("card"),v=Object(N.a)(f,2),g=v[0],h=v[1],O=Object(n.useState)("card-section is-active"),j=Object(N.a)(O,2),w=j[0],y=j[1],_=Object(n.useState)("card-section"),x=Object(N.a)(_,2),k=x[0],S=x[1],C=Object(n.useState)("card-section"),T=Object(N.a)(C,2),P=T[0],A=T[1],U=Object(n.useState)("#about"),I=Object(N.a)(U,2),z=I[0],L=I[1],R=function(e){var a=e.target.getAttribute("data-section");h("#about"!==a?function(e){return e+" is-active"}:function(e){return e.replace(/is-active/g," ")}),L(a),y("card-section"),A("card-section"),S("card-section"),o(""),m(""),b(""),"#experience"===a?(S((function(e){return e+" is-active"})),m("is-active")):"#about"===a?(y((function(e){return e+" is-active"})),o("is-active")):(A((function(e){return e+" is-active"})),b("is-active"))};return a?r.a.createElement("div",{className:g,"data-state":z},r.a.createElement("div",{className:"card-header"},r.a.createElement("div",{className:"card-cover"}),r.a.createElement("img",{className:"card-avatar",src:a.picture,alt:"avatar"}),r.a.createElement("h1",{className:"card-fullname"},a.fullname),r.a.createElement("h2",{className:"card-jobtitle"},a.occupation)),r.a.createElement("div",{className:"card-main"},r.a.createElement("div",{className:w,id:"about"},r.a.createElement("div",{className:"card-content"},r.a.createElement("div",{className:"card-subtitle"},"ABOUT"),r.a.createElement("p",{className:"card-desc"},a.bio||"The user hasn't provided bio information")),r.a.createElement("div",{className:"card-social"},r.a.createElement("a",{href:"#"},r.a.createElement("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{d:"M15.997 3.985h2.191V.169C17.81.117 16.51 0 14.996 0c-3.159 0-5.323 1.987-5.323 5.639V9H6.187v4.266h3.486V24h4.274V13.267h3.345l.531-4.266h-3.877V6.062c.001-1.233.333-2.077 2.051-2.077z"}))),r.a.createElement("a",{href:"#"},r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},r.a.createElement("path",{d:"M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z"}))),r.a.createElement("a",{href:"#"},r.a.createElement("svg",{viewBox:"0 0 512 512",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{d:"M301 256c0 24.852-20.148 45-45 45s-45-20.148-45-45 20.148-45 45-45 45 20.148 45 45zm0 0"}),r.a.createElement("path",{d:"M332 120H180c-33.086 0-60 26.914-60 60v152c0 33.086 26.914 60 60 60h152c33.086 0 60-26.914 60-60V180c0-33.086-26.914-60-60-60zm-76 211c-41.355 0-75-33.645-75-75s33.645-75 75-75 75 33.645 75 75-33.645 75-75 75zm86-146c-8.285 0-15-6.715-15-15s6.715-15 15-15 15 6.715 15 15-6.715 15-15 15zm0 0"}),r.a.createElement("path",{d:"M377 0H135C60.562 0 0 60.563 0 135v242c0 74.438 60.563 135 135 135h242c74.438 0 135-60.563 135-135V135C512 60.562 451.437 0 377 0zm45 332c0 49.625-40.375 90-90 90H180c-49.625 0-90-40.375-90-90V180c0-49.625 40.375-90 90-90h152c49.625 0 90 40.375 90 90zm0 0"}))),r.a.createElement("a",{href:"#"},r.a.createElement("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{d:"M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 002.882 0z"}))))),r.a.createElement("div",{className:k,id:"experience"},r.a.createElement("div",{className:"card-content"},r.a.createElement("div",{className:"card-subtitle"},"WORK EXPERIENCE"),r.a.createElement(D,{experience:[{id:1,year:2021,company:"Spotify",profession:"JS Developer",achievements:"Developed new versions"},{id:2,year:2022,company:"Spotify",profession:"JS Developer",achievements:"New products"},{id:3,year:2023,company:"Spotify",profession:"JS Developer",achievements:"New app"}]}))),r.a.createElement("div",{className:P,id:"contact"},r.a.createElement("div",{className:"card-content"},r.a.createElement("div",{className:"card-subtitle"},"CONTACT"),r.a.createElement("div",{className:"card-contact-wrapper"},r.a.createElement("div",{className:"card-contact"},r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},r.a.createElement("path",{d:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"}),r.a.createElement("circle",{cx:"12",cy:"10",r:"3"})),a.based_in||"Not provided"),r.a.createElement("div",{className:"card-contact card-contact-center"},r.a.createElement("svg",{className:"svg-middle",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},r.a.createElement("path",{d:"M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"})),a.phone_number||"Not provided"),r.a.createElement("div",{className:"card-contact"},r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},r.a.createElement("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),r.a.createElement("path",{d:"M22 6l-10 7L2 6"})),a.email),r.a.createElement("button",{className:"green"},"WORK")))),r.a.createElement("hr",{className:"user-hr"}),r.a.createElement("div",{className:"card-buttons"},r.a.createElement("button",{"data-section":"#about",className:l,onClick:R},"ABOUT"),r.a.createElement("button",{className:u,"data-section":"#experience",onClick:R},"EXPERIENCE"),r.a.createElement("button",{className:E,"data-section":"#contact",onClick:R},"CONTACT")))):r.a.createElement("div",null)},V=function(e){var a=e.match,t=(e.authorized,Object(s.b)()),c=Object(s.c)((function(e){return e.currentPage})),l=a.params.username,o=Object(n.useState)(null),i=Object(N.a)(o,2),u=i[0],m=i[1],d=j(),p=d.loading,E=d.request,b=Object(n.useCallback)(Object(O.a)(h.a.mark((function e(){var a,n,r,c,o,s,i,u,d,p;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E("/api/user/".concat(l));case 2:a=e.sent,m(a.info),n=a.info,r=n.based_in,c=n.email,o=n.fullname,s=n.number_of_posts,i=n.occupation,u=n.phone_number,d=n.picture,p=a.info.person_id,t({type:"SET_CURRENT_PAGE",payload:{id:(b={id:p,username:l,based_in:r,email:c,fullname:o,number_of_posts:s,occupation:i,phone_number:u,picture:d}).id,username:b.username,based_in:b.based_in,email:b.email,fullname:b.fullname,number_of_posts:b.number_of_posts,occupation:b.occupation,phone_number:b.phone_number,picture:b.picture}});case 7:case"end":return e.stop()}var b}),e)}))),[l,E,t]);return Object(n.useEffect)((function(){b()}),[l,b]),console.log({userPage:u,currentUser:c}),void 0===u?r.a.createElement(R,null):p?r.a.createElement("div",null):r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement(U,null)),r.a.createElement(M,{info:u}))},B=(t(72),t(53)),F=t(15),J=t(91),q=t(92),G=t(97),W=t(90),X=t(93),K=t(94),Q=t(95),Y=t(96),Z=t(24),$=(t(46),Object(B.a)({typography:{fontFamily:["iCiel Gotham","-apple-system","BlinkMacSystemFont",'"Segoe UI"',"Roboto",'"Helvetica Neue"',"Arial","sans-serif",'"Apple Color Emoji"','"Segoe UI Emoji"','"Segoe UI Symbol"'].join(",")}})),ee=Object(F.a)((function(e){return{root:{border:"none",borderColor:"black"},body:{fontSize:14,backgroundColor:"rgb(44, 44, 44)",color:"rgb(177, 176, 176)"}}}))(G.a),ae=Object(F.a)((function(e){return{root:{border:"none",borderColor:"black"},body:{fontSize:14,backgroundColor:"rgb(44, 44, 44)",color:e.palette.common.white}}}))(G.a),te=Object(F.a)((function(e){return{root:{font:"iCiel Gotham","&:nth-of-type(odd)":{backgroundColor:e.palette.action.hover}}}}))(W.a),ne=Object(J.a)({table:{minWidth:200}}),re=function(e){var a=e.tab,t=e.data,n=e.handler,c=ne();console.log({data:t});var l=Object(Z.adjustToTable)(t);return r.a.createElement(q.a,{theme:$},r.a.createElement(X.a,{component:K.a},r.a.createElement(Q.a,{className:c.table,"aria-label":"simple table"},r.a.createElement(Y.a,null,l.map((function(e){return r.a.createElement(te,{key:e.field},r.a.createElement(ee,{align:"left"},e.field),r.a.createElement(ae,{align:"left"},"overview"===a?e.value:r.a.createElement("input",{id:"txt",name:e.field,value:e.value,onChange:n})))}))))))},ce=(t(73),function(){var e=Object(n.useState)(null),a=Object(N.a)(e,2),t=a[0],c=a[1],l=Object(n.useState)(!1),o=Object(N.a)(l,2),i=(o[0],o[1],Object(n.useState)(!1)),u=Object(N.a)(i,2),m=u[0],d=(u[1],Object(s.c)((function(e){return e.loggedInUser}))),p=d.username,E=d.picture,b=Object(s.b)();console.log({username:p,picture:E});var f=function(){var e=Object(O.a)(h.a.mark((function e(a){var n,r,l,o,s;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),(n=new FormData).append("profilePhoto",t),r=m?"DELETE":"POST",l="http://localhost:3000/api/user/".concat(p,"/addPicture"),m&&(l="http://localhost:3000/api/user/".concat(p,"/deletePicture")),e.next=8,fetch(l,{method:r,body:n});case 8:return o=e.sent,e.next=11,o.json();case 11:s=e.sent,console.log(s),b(w(s.src)),c(null);case 15:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement("div",{class:"UPLOAD_panel"},r.a.createElement("div",{class:"UPLOAD_button_outer"},t?r.a.createElement("div",{className:"newPictureBtns"},r.a.createElement("button",{className:"green",onClick:f},"Submit"),r.a.createElement("button",{className:"green red",onClick:function(e){e.preventDefault(),c(null)}},"Reset")):r.a.createElement("div",{class:"UPLOAD_btn_upload"},r.a.createElement("input",{type:"file",id:"UPLOAD_PROFILE_PICTURE",name:"",onChange:function(e){var a=e.target.files[0];c(a)}}),"Upload New Image"))))}),le=function(){var e=j(),a=e.request,t=(e.loading,e.error),c=Object(s.c)((function(e){return e.loggedInUser})),l=Object(n.useState)(0),o=Object(N.a)(l,2),i=o[0],m=o[1],d=Object(n.useState)({username:c.username,based_in:c.based_in,email:c.email,fullname:c.fullname,occupation:c.occupation,phone_number:c.phone_number}),p=Object(N.a)(d,2),E=p[0],b=p[1],f=Object(n.useState)(!1),v=Object(N.a)(f,2),g=v[0],w=v[1],y=function(){var e=Object(O.a)(h.a.mark((function e(n){var r;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),console.log({edit:E}),e.next=4,a("/api/user/info",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(E)});case 4:r=e.sent,console.log({responce:r,error:t}),(null===r||void 0===r?void 0:r.success)&&!t&&w(!0);case 7:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();console.log({edit:E});var x=Object(Z.deepCopy)(c),k=Object(Z.deepCopy)(c),S=Object(Z.deleteProperties)(x,["id","ready","isAuthenticated","picture"]),C=(Object(Z.deleteProperties)(k,["id","ready","isAuthenticated","picture","number_of_posts"]),function(e){return m(e)});return r.a.createElement("div",{className:"settings-container"},r.a.createElement("div",{className:"left-column"},r.a.createElement("ul",null,r.a.createElement("li",{onClick:C.bind(null,0)},r.a.createElement("i",{className:"fa fa-user"}),"Overview"),r.a.createElement("hr",{class:"HRsettings"}),r.a.createElement("li",{onClick:C.bind(null,1)},r.a.createElement("i",{className:"fa fa-lock"}),"Edit Profile"),r.a.createElement("hr",{class:"HRsettings"}),r.a.createElement("li",{onClick:C.bind(null,2)},r.a.createElement("i",{className:"fa fa-lock"}),"Change Password"),r.a.createElement("hr",{class:"HRsettings"}),r.a.createElement("li",{onClick:C.bind(null,3)},r.a.createElement("i",{className:"fa fa-minus-circle"}),"Delete profile"))),r.a.createElement("div",{className:"settings-tab"},0===i&&r.a.createElement("div",{className:"settings-overview"},r.a.createElement("h1",null,"Account overview"),r.a.createElement("div",{className:"settings-overview-img"},r.a.createElement("img",{src:c.picture}),r.a.createElement(ce,null)),r.a.createElement("div",{className:"settings-overview-table"},r.a.createElement(re,{tab:"overview",data:S}))),1===i&&r.a.createElement("form",{className:"settings-form"},r.a.createElement("div",{className:"settings-overview"},r.a.createElement("h1",null,"Edit profile"),r.a.createElement(re,{tab:"edit",data:E,handler:function(e){var a=e.target.name,t=e.target.value;b((function(e){return Object(u.a)(Object(u.a)({},e),{},Object(_.a)({},a,t))}))}}),r.a.createElement("button",{className:"btn green",onClick:y},"Submit"),t&&r.a.createElement("h2",{style:{color:"red",marginTop:"10px"}},"Error: ",t),g&&r.a.createElement("h2",{style:{color:"green",marginTop:"10px"}},"Information updated"))),2===i&&r.a.createElement("form",{onSubmit:function(){return console.log("Submitted")}},r.a.createElement("h1",null,"Change password"),r.a.createElement(re,{tab:"edit",data:{"Old Password":"","New Password":"","Confirm new password":""}}),r.a.createElement("button",{className:"btn green"},"Submit")),3===i&&r.a.createElement("form",null,r.a.createElement("h1",null,"Delete your profile"),r.a.createElement("h2",null,"Are you sure you want to delete your profile ?",r.a.createElement("br",null)," All your matchs will be lost..."),r.a.createElement("div",{className:"input-group"},r.a.createElement(re,{tab:"edit",data:{Password:""}}),r.a.createElement("button",{type:"button",className:"green"},"Submit")))))},oe=function(){return r.a.createElement("div",null,r.a.createElement(U,null),r.a.createElement(le,null))},se=function(e){var a=e.authorized;return r.a.createElement("div",null,r.a.createElement(U,{authorized:a}),"About page")},ie=function(){var e=Object(s.c)((function(e){return e.loggedInUser}));return y().loading?r.a.createElement("div",null):(console.log({userInfo:e}),e.isAuthenticated?r.a.createElement(f.a,null,r.a.createElement("div",{className:"container"},r.a.createElement(v.d,null,r.a.createElement(v.b,{exact:!0,path:"/header",render:function(e){return r.a.createElement(U,e)}}),r.a.createElement(v.a,{from:"/",exact:!0,to:"/".concat(e.username)}),r.a.createElement(v.a,{from:"/login",exact:!0,to:"/".concat(e.username)}),r.a.createElement(v.a,{from:"/signup",exact:!0,to:"/".concat(e.username)}),r.a.createElement(v.b,{exact:!0,path:"/account",render:function(a){return r.a.createElement(oe,Object.assign({},a,{authorized:e}))}}),r.a.createElement(v.b,{exact:!0,path:"/about",render:function(a){return r.a.createElement(se,Object.assign({},a,{authorized:e}))}}),r.a.createElement(v.b,{exact:!0,path:"/:username",render:function(a){return r.a.createElement(V,Object.assign({},a,{authorized:e}))}}),r.a.createElement(v.b,{render:function(a){return r.a.createElement(R,Object.assign({},a,{authorized:e}))}})))):r.a.createElement(f.a,null,r.a.createElement("div",{className:"container"},r.a.createElement(v.d,null,r.a.createElement(v.a,{path:"/",exact:!0,to:"/login"}),r.a.createElement(v.b,{exact:!0,path:"/signup",render:function(e){return r.a.createElement(L,e)}}),r.a.createElement(v.b,{exact:!0,path:"/header",render:function(e){return r.a.createElement(U,e)}}),r.a.createElement(v.b,{exact:!0,path:"/login",render:function(e){return r.a.createElement(I,e)}}),r.a.createElement(v.b,{exact:!0,path:"/about",render:function(a){return r.a.createElement(se,Object.assign({},a,{authorized:e}))}}),r.a.createElement(v.b,{exact:!0,path:"/:username",render:function(a){return r.a.createElement(V,Object.assign({},a,{authorized:e}))}}),r.a.createElement(v.b,{render:function(a){return r.a.createElement(R,Object.assign({},a,{authorized:e}))}})))))},ue=Object(o.e)(b,Object(o.d)(Object(o.a)(i.a),window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__())),me=r.a.createElement(s.a,{store:ue},r.a.createElement(r.a.StrictMode,null,r.a.createElement(ie,null)));l.a.render(me,document.getElementById("root"))}},[[56,1,2]]]);
//# sourceMappingURL=main.131d1c7c.chunk.js.map