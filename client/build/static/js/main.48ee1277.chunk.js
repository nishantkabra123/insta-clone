(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{19:function(e,t,a){e.exports=a(30)},24:function(e,t,a){},25:function(e,t,a){},30:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),o=a(17),c=a.n(o),r=(a(24),a(2)),i=(a(25),a(1)),s=a(4),u=function(){var e=Object(n.useContext)(y),t=e.state,a=e.dispatch,o=Object(i.f)();return l.a.createElement("nav",null,l.a.createElement("div",{className:"nav-wrapper back-color"},l.a.createElement(s.b,{to:t?"/":"/signin",className:"brand-logo left"},"Picstagram"),l.a.createElement("ul",{id:"nav-mobile",className:"right"},t?[l.a.createElement("li",null,l.a.createElement(s.b,{to:"/profile"},"Profile")),l.a.createElement("li",null,l.a.createElement(s.b,{to:"/create"},"Create Post")),l.a.createElement("li",null,l.a.createElement("button",{onClick:function(){localStorage.clear(),a({type:"CLEAR"}),o.push("/signin")},className:"btn waves-effect waves-light",type:"submit",name:"action"},"Logout"))]:[l.a.createElement("li",null,l.a.createElement(s.b,{to:"/signin"},"Signin")),l.a.createElement("li",null,l.a.createElement(s.b,{to:"/signup"},"Signup"))])))},m=function(){var e=Object(n.useState)([]),t=Object(r.a)(e,2),a=t[0],o=t[1],c=Object(n.useContext)(y),i=c.state;c.dispatch;Object(n.useEffect)((function(){fetch("/allpost",{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){return e.json()})).then((function(e){console.log(e),o(e.posts)}))}),[]);return l.a.createElement("div",{className:"home"},a.map((function(e){return l.a.createElement("div",{className:"card home-card",key:e._id},l.a.createElement("h5",null,l.a.createElement(s.b,{to:e.postedBy._id!==i._id?"/profile/"+e.postedBy._id:"/profile"},e.postedBy.name)," ",e.postedBy._id==i._id&&l.a.createElement("i",{className:"material-icons",onClick:function(){var t;t=e._id,fetch("/deletepost/".concat(t),{method:"delete",headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){return e.json()})).then((function(e){console.log(e);var t=a.filter((function(t){return t._id!==e._id}));o(t)}))},style:{float:"right"}},"delete")),l.a.createElement("div",{className:"card-image"},l.a.createElement("img",{src:e.photo})),l.a.createElement("div",{className:"card-content"},e.likes.includes(i._id)?l.a.createElement("i",{className:"material-icons",onClick:function(){return t=e._id,void fetch("/unlike",{method:"put",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({postId:t})}).then((function(e){return e.json()})).then((function(e){var t=a.map((function(t){return t._id==e._id?e:t}));o(t)})).catch((function(e){return console.log(e)}));var t}},"thumb_down"):l.a.createElement("i",{className:"material-icons",onClick:function(){var t;t=e._id,fetch("/like",{method:"put",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({postId:t})}).then((function(e){return e.json()})).then((function(e){console.log(e);var t=a.map((function(t){return t._id==e._id?e:t}));o(t)})).catch((function(e){return console.log(e)}))}},"thumb_up"),l.a.createElement("h6",null,e.likes.length," likes"),l.a.createElement("h6",null,e.title),l.a.createElement("p",null,e.body),e.comments.map((function(t){return l.a.createElement("h6",{key:t._id},l.a.createElement("span",{style:{fontWeight:"500"}},t.postedBy.name)," ",t.text,t.postedBy._id==i._id&&l.a.createElement("i",{className:"material-icons",onClick:function(){var n,l;n=e._id,l=t._id,fetch("/deletecomment/".concat(n,"/").concat(l),{method:"delete",headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){return e.json()})).then((function(e){var t=a.map((function(t){return t._id==e._id?e:t}));o(t)}))},style:{float:"right"}},"delete"))})),l.a.createElement("form",{onSubmit:function(t){var n,l;t.preventDefault(),n=t.target[0].value,l=e._id,fetch("/comment",{method:"put",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({postId:l,text:n})}).then((function(e){return e.json()})).then((function(e){console.log(e);var t=a.map((function(t){return t._id==e._id?e:t}));o(t)})).catch((function(e){console.log(e)})),t.target[0].value=""}},l.a.createElement("input",{type:"text",placeholder:"add a comment"}))))})))},d=a(8),p=a.n(d),h=function(){var e=Object(n.useContext)(y),t=(e.state,e.dispatch),a=Object(i.f)(),o=Object(n.useState)(""),c=Object(r.a)(o,2),u=c[0],m=c[1],d=Object(n.useState)(""),h=Object(r.a)(d,2),f=h[0],g=h[1];return l.a.createElement("div",null,l.a.createElement("div",{className:"card auth-card"},l.a.createElement("h2",{className:"brand-logo"},"Picstagram"),l.a.createElement("input",{type:"text",placeholder:"email",value:f,onChange:function(e){return g(e.target.value)}}),l.a.createElement("input",{type:"password",placeholder:"password",value:u,onChange:function(e){return m(e.target.value)}}),l.a.createElement("button",{onClick:function(){/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(f)?fetch("/signin",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:u,email:f})}).then((function(e){return e.json()})).then((function(e){console.log(e),e.error?p.a.toast({html:e.error,classes:"#ef5350 red lighten-1"}):(localStorage.setItem("jwt",e.token),localStorage.setItem("user",JSON.stringify(e.user)),t({type:"USER",payload:e.user}),p.a.toast({html:"signedin success",classes:"#9fa8da indigo lighten-3"}),a.push("/"))})).catch((function(e){console.log(e)})):p.a.toast({html:"invalid email",classes:"#ef5350 red lighten-1"})},className:"btn waves-effect waves-light",type:"submit",name:"action"},"Sign In"),l.a.createElement("h6",null,l.a.createElement(s.b,{to:"/signup"},"Dont have an account ? Click here"))))},f=function(){var e=Object(i.f)(),t=Object(n.useState)(""),a=Object(r.a)(t,2),o=a[0],c=a[1],u=Object(n.useState)(""),m=Object(r.a)(u,2),d=m[0],h=m[1],f=Object(n.useState)(""),g=Object(r.a)(f,2),E=g[0],b=g[1];return l.a.createElement("div",null,l.a.createElement("div",{className:"card auth-card"},l.a.createElement("h2",{className:"brand-logo"},"Picstagram"),l.a.createElement("input",{type:"text",placeholder:"name",value:o,onChange:function(e){return c(e.target.value)}}),l.a.createElement("input",{type:"text",placeholder:"email",value:E,onChange:function(e){return b(e.target.value)}}),l.a.createElement("input",{type:"password",placeholder:"password",value:d,onChange:function(e){return h(e.target.value)}}),l.a.createElement("button",{onClick:function(){/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(E)?fetch("/signup",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:o,password:d,email:E})}).then((function(e){return e.json()})).then((function(t){t.error?p.a.toast({html:t.error,classes:"#ef5350 red lighten-1"}):(p.a.toast({html:t.message,classes:"#9fa8da indigo lighten-3"}),e.push("/signin"))})).catch((function(e){console.log(e)})):p.a.toast({html:"invalid email",classes:"#ef5350 red lighten-1"})},className:"btn waves-effect waves-light",type:"submit",name:"action"},"Sign Up"),l.a.createElement("h6",null,l.a.createElement(s.b,{to:"/signin"},"Already have an account ? Click here"))))},g=function(){var e=Object(n.useState)([]),t=Object(r.a)(e,2),a=t[0],o=t[1],c=Object(n.useContext)(y),i=c.state;c.dispatch;return Object(n.useEffect)((function(){fetch("/mypost",{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){return e.json()})).then((function(e){o(e.posts)}))}),[]),l.a.createElement("div",{style:{maxWidth:"60vw",margin:"0px auto"}},l.a.createElement("div",{style:{display:"flex",margin:"18px 0px",borderBottom:"1px solid grey"}},l.a.createElement("div",{style:{margin:"10px 60px 10px 20px"}},l.a.createElement("img",{style:{width:"160px",height:"160px",borderRadius:"80px"},src:"https://images.unsplash.com/photo-1555169062-013468b47731?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"})),l.a.createElement("div",null,l.a.createElement("h5",null,i?i.name:"loading"),l.a.createElement("div",{style:{display:"flex",justifyContent:"space-between",width:"108%"}},l.a.createElement("h6",null,a.length>0?a.length:""," posts"),l.a.createElement("h6",null,"followers"),l.a.createElement("h6",null,"following")))),l.a.createElement("div",{className:"gallery"},a.map((function(e){return l.a.createElement("img",{key:e._id,className:"item",src:e.photo,alt:e.title})}))))},E=function(){var e=Object(i.f)(),t=Object(n.useState)(""),a=Object(r.a)(t,2),o=a[0],c=a[1],s=Object(n.useState)(""),u=Object(r.a)(s,2),m=u[0],d=u[1],h=Object(n.useState)(""),f=Object(r.a)(h,2),g=f[0],E=f[1],b=Object(n.useState)(""),v=Object(r.a)(b,2),y=(v[0],v[1]);return l.a.createElement("div",{className:"card input-field create-post"},l.a.createElement("input",{type:"text",value:o,onChange:function(e){return c(e.target.value)},placeholder:"title"}),l.a.createElement("input",{type:"text",value:m,onChange:function(e){return d(e.target.value)},placeholder:"body"}),l.a.createElement("div",{className:"file-field input-field"},l.a.createElement("div",{className:"btn"},l.a.createElement("span",null,"Upload Image"),l.a.createElement("input",{type:"file",onChange:function(e){return E(e.target.files[0])}})),l.a.createElement("div",{className:"file-path-wrapper"},l.a.createElement("input",{className:"file-path validate",type:"text"}))),l.a.createElement("button",{className:"btn waves-effect waves-light",onClick:function(){return function(){var t=new FormData;t.append("file",g),t.append("upload_preset","insta-clone"),t.append("cloud_name","nishant123"),console.log("hi"),console.log("hello"),fetch("https://api.cloudinary.com/v1_1/nishant123/image/upload",{method:"post",body:t}).then((function(e){return e.json()})).then((function(t){y(t.url),fetch("/createpost",{method:"post",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({title:o,body:m,pic:t.url})}).then((function(e){return e.json()})).then((function(t){console.log("inside createpost then"),console.log(t),t.error?(console.log("data error "+t.error),p.a.toast({html:t.error,classes:"#ef5350 red lighten-1"})):(p.a.toast({html:"created post successfully",classes:"#9fa8da indigo lighten-3"}),e.push("/"))})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)}))}()},type:"submit",name:"action",style:{margin:"0 40%"}},"Submit Post"))},b=function(e,t){return"USER"==t.type?t.payload:"CLEAR"==t.type?null:e},v=function(){var e=Object(n.useState)(null),t=Object(r.a)(e,2),a=t[0],o=t[1],c=Object(n.useContext)(y),s=(c.state,c.dispatch,Object(i.g)().userid);return console.log(s),Object(n.useEffect)((function(){fetch("/user/".concat(s),{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){return e.json()})).then((function(e){console.log(e),o(e)}))}),[]),l.a.createElement(l.a.Fragment,null,a?l.a.createElement("div",{style:{maxWidth:"60vw",margin:"0px auto"}},l.a.createElement("div",{style:{display:"flex",margin:"18px 0px",borderBottom:"1px solid grey"}},l.a.createElement("div",{style:{margin:"10px 60px 10px 20px"}},l.a.createElement("img",{style:{width:"160px",height:"160px",borderRadius:"80px"},src:"https://images.unsplash.com/photo-1555169062-013468b47731?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"})),l.a.createElement("div",null,l.a.createElement("h5",null,a.user.name),l.a.createElement("h5",null,a.user.email),l.a.createElement("div",{style:{display:"flex",justifyContent:"space-between",width:"108%"}},l.a.createElement("h6",null,a.posts.length," posts"),l.a.createElement("h6",null,"followers"),l.a.createElement("h6",null,"following")))),l.a.createElement("div",{className:"gallery"},a.posts.map((function(e){return l.a.createElement("img",{key:e._id,className:"item",src:e.photo,alt:e.title})})))):l.a.createElement("h2",null,"loading...!"))},y=Object(n.createContext)(),j=function(){var e=Object(n.useContext)(y),t=(e.state,e.dispatch),a=Object(i.f)();return Object(n.useEffect)((function(){var e=JSON.parse(localStorage.getItem("user"));e?t({type:"USER",payload:e}):a.push("/signin")}),[]),l.a.createElement(i.c,null,l.a.createElement(i.a,{exact:!0,path:"/"},l.a.createElement(m,null)),l.a.createElement(i.a,{path:"/signin"},l.a.createElement(h,null)),l.a.createElement(i.a,{exact:!0,path:"/profile"},l.a.createElement(g,null)),l.a.createElement(i.a,{path:"/signup"},l.a.createElement(f,null)),l.a.createElement(i.a,{path:"/create"},l.a.createElement(E,null)),l.a.createElement(i.a,{path:"/profile/:userid"},l.a.createElement(v,null)))};var O=function(){var e=Object(n.useReducer)(b,null),t=Object(r.a)(e,2),a=t[0],o=t[1];return l.a.createElement(y.Provider,{value:{state:a,dispatch:o}},l.a.createElement(s.a,null,l.a.createElement(u,null),l.a.createElement(j,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(O,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[19,1,2]]]);
//# sourceMappingURL=main.48ee1277.chunk.js.map