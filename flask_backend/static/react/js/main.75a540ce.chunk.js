(this.webpackJsonpreact_frontend=this.webpackJsonpreact_frontend||[]).push([[0],{10:function(c,e,n){"use strict";n.r(e);var t=n(1),s=n.n(t),r=n(4),a=n.n(r),o=n(0);var i=function(){return Object(o.jsx)("nav",{class:"navbar navbar-expand-lg navbar-dark bg-secondary fixed-top",children:Object(o.jsx)("div",{class:"container col-lg-12",children:Object(o.jsx)("a",{class:"navbar-brand",href:"/",children:"VocabGREview"})})})},b=n(2);var j=function(c){var e=Object(t.useState)("secondary"),n=Object(b.a)(e,2),s=n[0],r=n[1];return Object(t.useEffect)((function(){r("secondary")}),c.hooks),Object(o.jsx)("button",{class:"btn btn-"+s+" btn-block",onClick:function(e){c.checkAnswer(e)?r("success"):r("danger")},disabled:"secondary"!==s,children:c.choice})};var l=function(){var c=Object(t.useState)({blank_sentence:"",choices:[],answer:""}),e=Object(b.a)(c,2),n=e[0],s=e[1];function r(c){return c.target.innerText===n.answer}function a(){fetch("/api/question").then((function(c){return c.json()})).then((function(c){s(c)})).catch((function(c){console.log(c)}))}return Object(t.useEffect)(a,[]),Object(o.jsxs)("div",{children:[Object(o.jsx)("div",{class:"jumbotron jumbotron-fluid",children:Object(o.jsxs)("div",{class:"container",children:[Object(o.jsx)("p",{class:"lead",children:n.blank_sentence}),Object(o.jsx)("hr",{class:"my-4"}),Object(o.jsx)("div",{class:"container col-lg-10",children:n.choices.map((function(c){return Object(o.jsx)(j,{choice:c,checkAnswer:r,hooks:[a]},c.id)}))})]})}),Object(o.jsx)("div",{class:"row",children:Object(o.jsx)("div",{class:"col",children:Object(o.jsx)("button",{class:"btn btn-secondary btn-block",onClick:a,children:"Next Question"})})})]})};var d=function(){return Object(o.jsx)("main",{class:"container col-lg-8 my-5 py-5",children:Object(o.jsx)(l,{})})};a.a.render(Object(o.jsxs)(s.a.StrictMode,{children:[Object(o.jsx)(i,{}),Object(o.jsx)(d,{})]}),document.getElementById("root"))}},[[10,1,2]]]);
//# sourceMappingURL=main.75a540ce.chunk.js.map