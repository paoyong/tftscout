(this.webpackJsonptftscout=this.webpackJsonptftscout||[]).push([[0],{126:function(t,e,a){},127:function(t,e,a){"use strict";a.r(e);var s=a(0),n=a(3),i=a.n(n),c=a(47),r=a.n(c),l=(a(53),a(14)),d=a(15),h=a(2),u=a(17),p=a(16),o=function(t){Object(u.a)(a,t);var e=Object(p.a)(a);function a(t){var s;return Object(l.a)(this,a),(s=e.call(this,t)).state={value:""},s}return Object(d.a)(a,[{key:"render",value:function(){var t="";switch(this.props.status){case"active":t="red";break;case"matched":t="green";break;case"eliminated":t="grey"}return Object(s.jsxs)("div",{className:"PlayerTile pure-g "+t,children:[Object(s.jsx)("div",{className:"pure-u-14-24",children:Object(s.jsx)("input",{className:t,id:this.props.id,type:"text",onChange:this.props.handleText,autocomplete:"off",value:this.props.name,onClick:this.props.handleMatch,disabled:this.props.renameMode})}),Object(s.jsx)("div",{className:"pure-u-10-24",children:Object(s.jsxs)("div",{className:"pure-button-group",role:"group","aria-label":"...",children:[Object(s.jsxs)("button",{className:"pure-button match-button",id:this.props.id,type:"button",onClick:this.props.handleMatch,tabindex:"-1",disabled:"eliminated"===this.props.status,children:["Match ",this.props.c]}),Object(s.jsx)("button",{className:"pure-button eliminate-button",id:this.props.id,onClick:this.props.handleEliminate,tabindex:"-1",disabled:"eliminated"===this.props.status,children:"Eliminate"})]})})]})}}]),a}(i.a.Component),b=a(4),m=a.n(b),j=(a(125),a(126),a.p+"static/media/teemo.f87a2123.png");function v(){return m()({rename:!0,past:{past:0,state:0},present:{players:[{id:"1",name:"",status:"active",c:0},{id:"2",name:"",status:"active",c:0},{id:"3",name:"",status:"active",c:0},{id:"4",name:"",status:"active",c:0},{id:"5",name:"",status:"active",c:0},{id:"6",name:"",status:"active",c:0},{id:"7",name:"",status:"active",c:0}],matchHistory:[]}})}var x=function(t){Object(u.a)(a,t);var e=Object(p.a)(a);function a(t){var s;return Object(l.a)(this,a),(s=e.call(this,t)).handleMatch=s.handleMatch.bind(Object(h.a)(s)),s.handleEliminate=s.handleEliminate.bind(Object(h.a)(s)),s.handleUndo=s.handleUndo.bind(Object(h.a)(s)),s.handleText=s.handleText.bind(Object(h.a)(s)),s.handleReset=s.handleReset.bind(Object(h.a)(s)),s.handleRename=s.handleRename.bind(Object(h.a)(s)),s.state=v(),s}return Object(d.a)(a,[{key:"handleText",value:function(t){var e=this.state.present.players;e[t.target.id-1].name=t.target.value,this.setState({players:e})}},{key:"handleRename",value:function(t){var e=!this.state.rename;this.setState({rename:e})}},{key:"handleReset",value:function(t){var e=v();this.setState({past:{past:e.past.past,state:e.past.state},present:{players:e.players,matchHistory:e.matchHistory}}),console.log(this.state)}},{key:"handleMatch",value:function(t){var e=this.state.present.players,a=m()(this.state.past),s=m()(this.state.present),n=t.target.id-1;e[n].status="matched",e[n].c++,this.setState({past:{past:a,state:s},players:e})}},{key:"handleEliminate",value:function(t){var e=this.state.present.players,a=m()(this.state.past),s=m()(this.state.present),n=t.target.id-1;e[n].status="eliminated",e[n].c=0,e.forEach((function(t){"matched"==t.status&&(t.status="active")})),this.setState({past:{past:a,state:s},players:e})}},{key:"handleUndo",value:function(t){var e=m()(this.state.past),a=m()(this.state.past.past);console.log(e),this.setState({past:a,present:{players:e.state.players,matchHistory:e.state.matchHistory}})}},{key:"render",value:function(){var t=this,e=this.state.present.players.map((function(e){if("eliminated"!=e.status)return Object(s.jsx)(o,{id:e.id,status:e.status,c:e.c,handleMatch:t.handleMatch,handleEliminate:t.handleEliminate,handleText:t.handleText,name:e.name})})),a=this.state.present.players.map((function(e){if("eliminated"===e.status)return Object(s.jsx)(o,{id:e.id,status:e.status,handleMatch:t.handleMatch,handleEliminate:t.handleEliminate,handleText:t.handleText,name:e.name})})),n=this.state.rename?"pure-button-active":"";return Object(s.jsx)("div",{className:"bg",children:Object(s.jsxs)("div",{className:"app",children:[Object(s.jsxs)("div",{className:"pure-g header",children:[Object(s.jsxs)("div",{className:"pure-u-19-24",children:[Object(s.jsx)("h1",{children:"TFT SCOUTER"}),Object(s.jsx)("p",{children:"Press TAB to quickly input player names"}),Object(s.jsx)("p",{children:"\ud83d\udd34 = possible to face them next round"})]}),Object(s.jsx)("div",{className:"pure-u-5-24",children:Object(s.jsx)("img",{className:"pure-img teemo-img",src:j,alt:""})})]}),e,a,Object(s.jsxs)("div",{class:"pure-button-group",role:"group","aria-label":"...",children:[Object(s.jsx)("button",{className:"undo-button pure-button",onClick:this.handleUndo,tabindex:"-1",disabled:0===this.state.past.past,children:"Undo"}),Object(s.jsx)("button",{className:"rename-button pure-button "+n,onClick:this.handleRename,tabindex:"-1",children:"Rename"}),Object(s.jsx)("button",{className:"reset-button pure-button",onClick:this.handleReset,tabindex:"-1",children:"Reset"})]})]})})}}]),a}(i.a.Component),O=function(t){t&&t instanceof Function&&a.e(3).then(a.bind(null,128)).then((function(e){var a=e.getCLS,s=e.getFID,n=e.getFCP,i=e.getLCP,c=e.getTTFB;a(t),s(t),n(t),i(t),c(t)}))};r.a.render(Object(s.jsx)(i.a.StrictMode,{children:Object(s.jsx)(x,{})}),document.getElementById("root")),O()},53:function(t,e,a){}},[[127,1,2]]]);
//# sourceMappingURL=main.91384f5b.chunk.js.map