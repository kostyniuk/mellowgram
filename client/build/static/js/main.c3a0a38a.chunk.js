(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{39:function(e,a,t){},51:function(e,a,t){e.exports=t(67)},56:function(e,a,t){},57:function(e,a,t){},59:function(e,a,t){},67:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),r=t(8),c=t.n(r),s=(t(56),t(57),t(47)),m=t(7),o=t(21),i=t.n(o),u=t(25),E=t(26),d=t(32),p=t(16),f=function(){var e=Object(n.useState)(!1),a=Object(p.a)(e,2),t=a[0],l=a[1],r=Object(n.useState)(!1),c=Object(p.a)(r,2),s=c[0],m=c[1];return{loading:t,error:s,request:Object(n.useCallback)(function(){var e=Object(u.a)(i.a.mark((function e(a){var t,n,r,c=arguments;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=c.length>1&&void 0!==c[1]?c[1]:{method:"GET"},e.prev=1,l(!0),e.next=5,fetch(a,t);case 5:return n=e.sent,e.next=8,n.json();case 8:if((r=e.sent).success){e.next=12;break}return m(r.msg),e.abrupt("return",r);case 12:return m(!1),e.abrupt("return",r);case 16:e.prev=16,e.t0=e.catch(1),console.log(e.t0),m(e.t0);case 20:return e.prev=20,l(!1),e.finish(20);case 23:case"end":return e.stop()}}),e,null,[[1,16,20,23]])})));return function(a){return e.apply(this,arguments)}}(),[])}},g=(t(39),function(e){var a=e.form,t=e.changeHandler,n=e.submitHandler,r=e.err;return l.a.createElement("div",{className:"containerInput"},l.a.createElement("div",{className:"image"},l.a.createElement("h1",null,"Welcome To ",l.a.createElement("span",null,"Mellowgram"))),l.a.createElement("div",{className:"content"},l.a.createElement("h1",null,"Login"),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Username"),l.a.createElement("br",null),l.a.createElement("input",{type:"text",autoComplete:"off",value:a.username,className:"form-control",name:"username",id:"txt","aria-describedby":"helpId",onChange:t})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Password"),l.a.createElement("br",null),l.a.createElement("input",{type:"password",className:"form-control",name:"password",value:a.password,id:"txt",onChange:t})),l.a.createElement("a",{className:"fp",href:"/accounts/password/reset"},"Forgot Password?"),l.a.createElement("br",null),l.a.createElement("button",{type:"button",className:"btn",onClick:n},l.a.createElement("a",{href:"#"},"Login")),r&&l.a.createElement("h4",{className:"fp login-error"},r),l.a.createElement("hr",null),l.a.createElement("div",{className:"login"},"Or login with"),l.a.createElement("div",{className:"links"},l.a.createElement("div",{className:"google"},l.a.createElement("i",{className:"fa fa-google"},l.a.createElement("span",null,"Google"))),l.a.createElement("div",{className:"facebook"},l.a.createElement("i",{className:"fa fa-facebook-f"},l.a.createElement("span",null,"Facebook"))),l.a.createElement("div",{className:"instagram",onClick:function(){return console.log("instagram")}},l.a.createElement("i",{className:"fa fa-instagram"},l.a.createElement("span",null,"Instagram")))),l.a.createElement("div",{className:"signup"},"Don't have an account? \u200b",l.a.createElement("a",{href:"/signup"},"Sign up"))))}),v=(t(59),t(4)),b=t(99),N=t(100),h=t(46),x=t.n(h),w=function(e){var a=e.handler;return l.a.createElement("div",{className:"hamburger",onClick:a},l.a.createElement("span",{className:"line"}),l.a.createElement("span",{className:"line"}),l.a.createElement("span",{className:"line"}))},k=function(){var e=Object(n.useState)(!1),a=Object(p.a)(e,2),t=a[0],r=a[1],c=Object(v.a)({root:{background:"#ebe6e7",borderRadius:3,border:0,boxShadow:"0 3px 5px 2px rgba(255, 105, 135, .3)"}})(b.a);return l.a.createElement("div",null,l.a.createElement("nav",{className:"header-nav"},l.a.createElement(w,{handler:function(){r((function(e){return!e}))}}),l.a.createElement("div",{className:"logo"},l.a.createElement("a",{className:"a-header",href:"/"},"Mellowgram")),l.a.createElement("ul",{className:"nav-search"},l.a.createElement("li",{className:"nav-item search-field"},l.a.createElement(c,{onKeyPress:function(e){"Enter"===e.key&&console.log("Enter is pressed")},id:"input-with-icon-textfield",variant:"outlined",placeholder:"Search",InputProps:{startAdornment:l.a.createElement(N.a,{position:"start"},l.a.createElement(x.a,null))}}))),l.a.createElement("ul",{className:t?"nav-items show":"nav-items"},l.a.createElement("li",{className:t?"nav-item fade":"nav-item"},l.a.createElement("a",{className:"a-header",href:"#"},"About us")),l.a.createElement("li",{className:t?"disabled":""},"|"),l.a.createElement("li",{className:t?"nav-item fade":"nav-item"},l.a.createElement("a",{className:"a-header",href:"/login"},"Log in")),l.a.createElement("li",{className:t?"nav-item fade":"nav-item"},l.a.createElement("a",{className:"a-header",href:"/signup"},"Sign up")))))},O=function(){var e=Object(n.useState)({username:"",password:""}),a=Object(p.a)(e,2),t=a[0],r=a[1],c=Object(n.useState)(null),s=Object(p.a)(c,2),m=(s[0],s[1],f()),o=m.loading,v=m.error,b=m.request;console.log({loading:o,error:v});var N=function(){var e=Object(u.a)(i.a.mark((function e(){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r({username:"",password:""}),e.next=3,b("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});case 3:a=e.sent,console.log({responce:a});case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return l.a.createElement("div",null,l.a.createElement(k,null),l.a.createElement("div",null,l.a.createElement(g,{err:v,form:t,changeHandler:function(e){var a=e.target,t=a.name,n=a.value;r((function(e){return Object(d.a)(Object(d.a)({},e),{},Object(E.a)({},t,n))}))},submitHandler:N})))},j=function(){return l.a.createElement("div",{className:"containerInput"},l.a.createElement("div",{className:"image"},l.a.createElement("h1",null,"Welcome To ",l.a.createElement("span",null,"Mellowgram"))),l.a.createElement("div",{className:"content"},l.a.createElement("h3",null,"Sign up to meet new friends."),l.a.createElement("div",{className:"login"},"Login with"),l.a.createElement("div",{className:"links links-signup"},l.a.createElement("div",{className:"google"},l.a.createElement("i",{className:"fa fa-google"},l.a.createElement("span",null,"Google"))),l.a.createElement("div",{className:"facebook"},l.a.createElement("i",{className:"fa fa-facebook-f"},l.a.createElement("span",null,"Facebook"))),l.a.createElement("div",{className:"instagram",onClick:function(){return console.log("instagram")}},l.a.createElement("i",{className:"fa fa-instagram"},l.a.createElement("span",null,"Instagram")))),l.a.createElement("span",null,"OR"),l.a.createElement("div",{className:"form-group form-group-signup"},l.a.createElement("label",null,"Email"),l.a.createElement("br",null),l.a.createElement("input",{type:"text",className:"form-control",name:"email",id:"txt","aria-describedby":"helpId"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Full Name"),l.a.createElement("br",null),l.a.createElement("input",{type:"text",className:"form-control",name:"fullName",id:"txt"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Username"),l.a.createElement("br",null),l.a.createElement("input",{type:"text",className:"form-control",name:"userName",id:"txt"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Password"),l.a.createElement("br",null),l.a.createElement("input",{type:"text",className:"form-control",name:"password",id:"txt"})),l.a.createElement("button",{type:"button",className:"btn"},l.a.createElement("a",{href:"index.html"},"Sign up")),l.a.createElement("div",{className:"signup signup-signup"},"Have an account? \u200b",l.a.createElement("a",{href:"/login"},"Log in"))))},y=function(){return l.a.createElement("div",null,l.a.createElement(k,null),l.a.createElement(j,null))};var S=function(){return l.a.createElement(s.a,null,l.a.createElement("div",{className:"container"},l.a.createElement(m.d,null,l.a.createElement(m.a,{path:"/",exact:!0,to:"/login"}),l.a.createElement(m.b,{exact:!0,path:"/signup",render:function(e){return l.a.createElement(y,e)}}),l.a.createElement(m.b,{exact:!0,path:"/header",render:function(e){return l.a.createElement(k,e)}}),l.a.createElement(m.b,{exact:!0,path:"/login",render:function(e){return l.a.createElement(O,e)}}))))};c.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(S,null)),document.getElementById("root"))}},[[51,1,2]]]);
//# sourceMappingURL=main.c3a0a38a.chunk.js.map