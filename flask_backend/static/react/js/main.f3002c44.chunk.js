(this["webpackJsonpreact-frontend"]=this["webpackJsonpreact-frontend"]||[]).push([[0],{10:function(e,n,c){"use strict";c.r(n);var t=c(1),a=c.n(t),s=c(4),r=c.n(s),o=c(0);var l=function(){return Object(o.jsx)("nav",{class:"navbar navbar-expand-lg navbar-dark bg-secondary fixed-top",children:Object(o.jsxs)("div",{class:"container col-lg-12",children:[Object(o.jsx)("a",{class:"navbar-brand",href:"/",children:"VocabGREview"}),Object(o.jsx)("button",{class:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(o.jsx)("span",{class:"navbar-toggler-icon"})}),Object(o.jsx)("div",{class:"collapse navbar-collapse",id:"navbarSupportedContent",children:Object(o.jsx)("ul",{class:"navbar-nav mr-auto mt-2 mt-lg-0"})})]})})},i=c(2);var b=function(e){var n=Object(t.useState)("secondary"),c=Object(i.a)(n,2),a=c[0],s=c[1];return Object(t.useEffect)((function(){s("secondary")}),e.hooks),Object(o.jsx)("button",{class:"btn btn-"+a+" btn-block",onClick:function(n){e.checkAnswer(n)?s("success"):s("danger")},disabled:"secondary"!==a,children:e.choice})};var j=function(){var e=Object(t.useState)({blank_sentence:"",choices:[],answer:""}),n=Object(i.a)(e,2),c=n[0],a=n[1];function s(e){return e.target.innerText===c.answer}function r(){fetch("/api/question").then((function(e){return e.json()})).then((function(e){a(e)})).catch((function(e){console.log(e)}))}return Object(t.useEffect)(r,[]),Object(o.jsxs)("div",{children:[Object(o.jsx)("div",{class:"jumbotron jumbotron-fluid",children:Object(o.jsxs)("div",{class:"container",children:[Object(o.jsx)("p",{class:"lead",children:c.blank_sentence}),Object(o.jsx)("hr",{class:"my-4"}),Object(o.jsx)("div",{class:"container col-lg-10",children:c.choices.map((function(e){return Object(o.jsx)(b,{choice:e,checkAnswer:s,hooks:[r]},e.id)}))})]})}),Object(o.jsx)("div",{class:"row",children:Object(o.jsx)("div",{class:"col",children:Object(o.jsx)("button",{class:"btn btn-secondary btn-block",onClick:r,children:"Next Question"})})})]})};var d=function(){return Object(o.jsx)("main",{class:"container col-lg-8 my-5 py-5",children:Object(o.jsx)(j,{})})};r.a.render(Object(o.jsxs)(a.a.StrictMode,{children:[Object(o.jsx)(l,{}),Object(o.jsx)(d,{})]}),document.getElementById("root"))}},[[10,1,2]]]);
//# sourceMappingURL=main.f3002c44.chunk.js.map