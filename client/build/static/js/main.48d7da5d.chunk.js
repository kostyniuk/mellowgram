(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{40:function(e,a,t){},51:function(e,a,t){e.exports=t(67)},56:function(e,a,t){},57:function(e,a,t){},59:function(e,a,t){},67:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(8),c=t.n(l),s=(t(56),t(57),t(28)),m=t(7),o=t(17),u=t.n(o),i=t(20),E=t(21),p=t(24),d=t(16),f=function(){var e=Object(n.useState)(!1),a=Object(d.a)(e,2),t=a[0],r=a[1],l=Object(n.useState)(!1),c=Object(d.a)(l,2),s=c[0],m=c[1];return{loading:t,error:s,request:Object(n.useCallback)(function(){var e=Object(i.a)(u.a.mark((function e(a){var t,n,l,c=arguments;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=c.length>1&&void 0!==c[1]?c[1]:{method:"GET"},e.prev=1,r(!0),e.next=5,fetch(a,t);case 5:return n=e.sent,e.next=8,n.json();case 8:if((l=e.sent).success){e.next=12;break}return m(l.msg),e.abrupt("return",l);case 12:return m(!1),e.abrupt("return",l);case 16:e.prev=16,e.t0=e.catch(1),console.log(e.t0),m(e.t0);case 20:return e.prev=20,r(!1),e.finish(20);case 23:case"end":return e.stop()}}),e,null,[[1,16,20,23]])})));return function(a){return e.apply(this,arguments)}}(),[])}},g=(t(40),function(e){var a=e.form,t=e.changeHandler,n=e.submitHandler,l=e.err;return r.a.createElement("div",{className:"containerInput"},r.a.createElement("div",{className:"image"},r.a.createElement("h1",null,"Welcome To ",r.a.createElement("span",null,"Mellowgram"))),r.a.createElement("div",{className:"content"},r.a.createElement("h1",null,"Login"),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Username"),r.a.createElement("br",null),r.a.createElement("input",{type:"text",className:"form-control",name:"username",id:"txt","aria-describedby":"helpId",value:a.username,onChange:t})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Password"),r.a.createElement("br",null),r.a.createElement("input",{type:"password",className:"form-control",name:"password",id:"txt",value:a.password,onChange:t})),r.a.createElement("a",{className:"fp",href:"/accounts/password/reset"},"Forgot Password?"),r.a.createElement("br",null),r.a.createElement("button",{type:"button",className:"btn",onClick:n},r.a.createElement("a",null,"Login")),l&&r.a.createElement("h4",{className:"fp login-error"},l),r.a.createElement("hr",null),r.a.createElement("div",{className:"login"},"Or login with"),r.a.createElement("div",{className:"links"},r.a.createElement("div",{className:"google"},r.a.createElement("i",{className:"fa fa-google"},r.a.createElement("span",null,"Google"))),r.a.createElement("div",{className:"facebook"},r.a.createElement("i",{className:"fa fa-facebook-f"},r.a.createElement("span",null,"Facebook"))),r.a.createElement("div",{className:"instagram",onClick:function(){return console.log("instagram")}},r.a.createElement("i",{className:"fa fa-instagram"},r.a.createElement("span",null,"Instagram")))),r.a.createElement("div",{className:"signup"},"Don't have an account? \u200b",r.a.createElement("a",{href:"/signup"},"Sign up"))))}),b=(t(59),t(4)),v=t(99),h=t(100),N=t(47),w=t.n(N),x=function(e){var a=e.handler;return r.a.createElement("div",{className:"hamburger",onClick:a},r.a.createElement("span",{className:"line"}),r.a.createElement("span",{className:"line"}),r.a.createElement("span",{className:"line"}))},O=function(){var e=Object(n.useState)(!1),a=Object(d.a)(e,2),t=a[0],l=a[1],c=Object(b.a)({root:{background:"#ebe6e7",borderRadius:3,border:0,boxShadow:"0 3px 5px 2px rgba(255, 105, 135, .3)"}})(v.a);return r.a.createElement("div",null,r.a.createElement("nav",{className:"header-nav"},r.a.createElement(x,{handler:function(){l((function(e){return!e}))}}),r.a.createElement("div",{className:"logo"},r.a.createElement("a",{className:"a-header",href:"/"},"Mellowgram")),r.a.createElement("ul",{className:"nav-search"},r.a.createElement("li",{className:"nav-item search-field"},r.a.createElement(c,{onKeyPress:function(e){"Enter"===e.key&&console.log("Enter is pressed")},id:"input-with-icon-textfield",variant:"outlined",placeholder:"Search",InputProps:{startAdornment:r.a.createElement(h.a,{position:"start"},r.a.createElement(w.a,null))}}))),r.a.createElement("ul",{className:t?"nav-items show":"nav-items"},r.a.createElement("li",{className:t?"nav-item fade":"nav-item"},r.a.createElement("a",{className:"a-header",href:"#"},"About us")),r.a.createElement("li",{className:t?"disabled":""},"|"),r.a.createElement("li",{className:t?"nav-item fade":"nav-item"},r.a.createElement("a",{className:"a-header",href:"/login"},"Log in")),r.a.createElement("li",{className:t?"nav-item fade":"nav-item"},r.a.createElement("a",{className:"a-header",href:"/signup"},"Sign up")))))},j=function(){var e=Object(m.g)(),a=Object(n.useState)({username:"",password:""}),t=Object(d.a)(a,2),l=t[0],c=t[1],s=f(),o=s.loading,b=s.error,v=s.request;console.log({loading:o,error:b});var h=function(){var a=Object(i.a)(u.a.mark((function a(){var t;return u.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return c({username:"",password:""}),a.next=3,v("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)});case 3:if(!(t=a.sent).success){a.next=6;break}return a.abrupt("return",e.push("/".concat(t.username)));case 6:console.log({responce:t});case 7:case"end":return a.stop()}}),a)})));return function(){return a.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement(O,null),r.a.createElement("div",null,r.a.createElement(g,{err:b,form:l,changeHandler:function(e){var a=e.target,t=a.name,n=a.value;c((function(e){return Object(p.a)(Object(p.a)({},e),{},Object(E.a)({},t,n))}))},submitHandler:h})))},k=function(e){var a=e.err,t=e.form,n=e.changeHandler,l=e.submitHandler;return r.a.createElement("div",{className:"containerInput"},r.a.createElement("div",{className:"image"},r.a.createElement("h1",null,"Welcome To ",r.a.createElement("span",null,"Mellowgram"))),r.a.createElement("div",{className:"content"},r.a.createElement("h3",null,"Sign up to meet new friends."),r.a.createElement("div",{className:"login"},"Login with"),r.a.createElement("div",{className:"links links-signup"},r.a.createElement("div",{className:"google"},r.a.createElement("i",{className:"fa fa-google"},r.a.createElement("span",null,"Google"))),r.a.createElement("div",{className:"facebook"},r.a.createElement("i",{className:"fa fa-facebook-f"},r.a.createElement("span",null,"Facebook"))),r.a.createElement("div",{className:"instagram",onClick:function(){return console.log("instagram")}},r.a.createElement("i",{className:"fa fa-instagram"},r.a.createElement("span",null,"Instagram")))),r.a.createElement("span",null,"OR"),r.a.createElement("div",{className:"form-group form-group-signup"},r.a.createElement("label",null,"Email"),r.a.createElement("br",null),r.a.createElement("input",{type:"text",className:"form-control",name:"email",id:"txt","aria-describedby":"helpId",value:t.email,onChange:n})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Full Name"),r.a.createElement("br",null),r.a.createElement("input",{type:"text",className:"form-control",name:"fullName",id:"txt",value:t.fullName,onChange:n})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Username"),r.a.createElement("br",null),r.a.createElement("input",{type:"text",className:"form-control",name:"username",id:"txt",value:t.username,onChange:n})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Password"),r.a.createElement("br",null),r.a.createElement("input",{type:"password",className:"form-control",name:"password",id:"txt",value:t.password,onChange:n})),r.a.createElement("button",{type:"button",className:"btn",onClick:l},r.a.createElement("a",null,"Sign up")),a&&r.a.createElement("h4",{className:"fp login-error"},a),r.a.createElement("div",{className:"signup signup-signup"},"Have an account? \u200b",r.a.createElement("a",{href:"/login"},"Log in"))))},y=function(){var e=Object(m.g)(),a=Object(n.useState)({email:"",fullName:"",username:"",password:""}),t=Object(d.a)(a,2),l=t[0],c=t[1],s=f(),o=s.loading,g=s.error,b=s.request;console.log({form:l}),console.log({loading:o,error:g});var v=function(){var a=Object(i.a)(u.a.mark((function a(){var t;return u.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return c({email:"",fullName:"",username:"",password:""}),a.next=3,b("/api/signup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)});case 3:if(t=a.sent,console.log({responce:t}),!t.success){a.next=7;break}return a.abrupt("return",e.push("/login"));case 7:return a.abrupt("return");case 8:case"end":return a.stop()}}),a)})));return function(){return a.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement(O,null),r.a.createElement(k,{err:g,form:l,changeHandler:function(e){var a=e.target,t=a.name,n=a.value;c((function(e){return Object(p.a)(Object(p.a)({},e),{},Object(E.a)({},t,n))}))},submitHandler:v}))},S=function(e){var a=e.match.params.username;return r.a.createElement("div",null,r.a.createElement("h1",null,"User ",a))};var C=function(){return r.a.createElement(s.a,null,r.a.createElement("div",{className:"container"},r.a.createElement(m.d,null,r.a.createElement(m.a,{path:"/",exact:!0,to:"/login"}),r.a.createElement(m.b,{exact:!0,path:"/signup",render:function(e){return r.a.createElement(y,e)}}),r.a.createElement(m.b,{exact:!0,path:"/header",render:function(e){return r.a.createElement(O,e)}}),r.a.createElement(m.b,{exact:!0,path:"/login",render:function(e){return r.a.createElement(j,e)}}),r.a.createElement(m.b,{exact:!0,path:"/:username",render:function(e){return r.a.createElement(S,e)}}))))};c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(C,null)),document.getElementById("root"))}},[[51,1,2]]]);
//# sourceMappingURL=main.48d7da5d.chunk.js.map