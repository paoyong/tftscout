(this.webpackJsonptftscout=this.webpackJsonptftscout||[]).push([[0],{125:function(e,t,a){},126:function(e,t,a){"use strict";a.r(t);var s=a(0),n=a(3),i=a.n(n),r=a(47),c=a.n(r),l=a(8),o=a(9),h=a(4),u=a(11),d=a(10),p=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){return Object(l.a)(this,a),t.call(this,e)}return Object(o.a)(a,[{key:"render",value:function(){return"eliminated"===this.props.status?Object(s.jsx)("input",{className:this.props.color+" rename-off",id:this.props.id,type:"text",autocomplete:"off",value:this.props.name,disabled:!0}):this.props.rename?Object(s.jsx)("input",{className:this.props.color+" rename-on",placeholder:"<input name>",id:this.props.id,type:"text",onChange:this.props.handleText,autocomplete:"off",value:this.props.name}):Object(s.jsx)("input",{className:this.props.color+" rename-off "+this.props.status,id:this.props.id,autocomplete:"off",value:this.props.name,onMouseDown:this.props.handlePlayerTileClick,onContextMenu:function(e){return e.preventDefault()},readonly:"readonly",unselectable:"on",tabindex:"-1"})}}]),a}(i.a.Component),m=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){return Object(l.a)(this,a),t.call(this,e)}return Object(o.a)(a,[{key:"render",value:function(){var e="";switch(this.props.status){case"active":e="red";break;case"matched":e="green";break;case"eliminated":e="grey"}return Object(s.jsx)("div",{className:"PlayerTile pure-g ",children:Object(s.jsx)(p,{rename:this.props.rename,color:e,id:this.props.id,handleText:this.props.handleText,handlePlayerTileClick:this.props.handlePlayerTileClick,name:this.props.name,status:this.props.status,handleEliminate:this.props.handleEliminate})})}}]),a}(i.a.Component),b=a(1),j=a.n(b);a(124),a(125);function f(){return j()({rename:!0,past:{past:0,state:0},present:{elim_c:0,players:[{id:"1",name:"",status:"active",c:0},{id:"2",name:"",status:"active",c:0},{id:"3",name:"",status:"active",c:0},{id:"4",name:"",status:"active",c:0},{id:"5",name:"",status:"active",c:0},{id:"6",name:"",status:"active",c:0},{id:"7",name:"",status:"active",c:0}],matchHistory:[]},future:{future:0,state:0}})}var y=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var s;return Object(l.a)(this,a),(s=t.call(this,e)).handlePlayerTileClick=s.handlePlayerTileClick.bind(Object(h.a)(s)),s.handleUndo=s.handleUndo.bind(Object(h.a)(s)),s.handleRedo=s.handleRedo.bind(Object(h.a)(s)),s.handleText=s.handleText.bind(Object(h.a)(s)),s.handleReset=s.handleReset.bind(Object(h.a)(s)),s.renameToggle=s.renameToggle.bind(Object(h.a)(s)),s.state=f(),s}return Object(o.a)(a,[{key:"handleText",value:function(e){var t=this.state.present.players;t[e.target.id-1].name=e.target.value,this.setState({players:t})}},{key:"renameToggle",value:function(){var e=!this.state.rename;this.setState({rename:e})}},{key:"handleReset",value:function(e){var t=f();this.setState({rename:t.rename,past:{past:t.past.past,state:t.past.state},present:{elim_c:t.present.elim_c,players:t.present.players,matchHistory:t.present.matchHistory},future:{future:t.future.future,state:t.future.state}})}},{key:"handlePlayerTileClick",value:function(e){var t=this,a=e.target.id-1,s=this.state.present.players,n=j()(this.state.past),i=j()(this.state.present),r=j()(this.state.present.matchHistory),c=j()(s[a]);1===e.buttons?(s[a].status="matched",s.forEach((function(e,s){"eliminated"!==e.status&&(0===e.c&&s!==a||(e.c>=4-t.state.present.elim_c?(e.c=0,e.status="active"):e.c++))})),c.status="matched",r.push(c),this.setState({past:{past:n,state:i},present:{elim_c:this.state.present.elim_c,players:s,matchHistory:r}})):2===e.buttons&&(s[a].status="eliminated",s.forEach((function(e){"matched"===e.status&&(e.c=0,e.status="active")})),c.status="eliminated",r.push(c),this.setState({past:{past:n,state:i},present:{elim_c:this.state.present.elim_c+1,players:s,matchHistory:r}}))}},{key:"handleUndo",value:function(e){var t=j()(this.state.present),a=j()(this.state.future),s=j()(this.state.past),n=j()(this.state.past.past);this.setState({past:n,present:{elim_c:s.state.elim_c,players:s.state.players,matchHistory:s.state.matchHistory},future:{future:a,state:t}})}},{key:"handleRedo",value:function(e){var t=j()(this.state.past),a=j()(this.state.present),s=j()(this.state.future),n=j()(this.state.future.future);this.setState({past:{past:t,state:a},present:{elim_c:s.state.elim_c,players:s.state.players,matchHistory:s.state.matchHistory},future:n})}},{key:"TabRename",value:function(){if(this.state.rename)return Object(s.jsx)("label",{tabIndex:"0",onFocus:this.renameToggle})}},{key:"render",value:function(){var e=this;console.log(this.state);var t=this.state.present.players.map((function(t){if("eliminated"!=t.status)return Object(s.jsx)(m,{id:t.id,status:t.status,c:t.c,handlePlayerTileClick:e.handlePlayerTileClick,handleEliminate:e.handleEliminate,handleText:e.handleText,name:t.name,rename:e.state.rename})})),a=this.state.present.players.map((function(t){if("eliminated"===t.status)return Object(s.jsx)(m,{id:t.id,status:t.status,handlePlayerTileClick:e.handlePlayerTileClick,handleEliminate:e.handleEliminate,handleText:e.handleText,name:t.name,rename:e.state.rename})})),n=this.state.present.matchHistory.map((function(t){var a="";return a="matched"===t.status?"\u2694\ufe0f":"\u274c",Object(s.jsx)("button",{tabIndex:"-1",class:"match-history-button button-xsmall pure-button",children:a+e.state.present.players[t.id-1].name})}));return Object(s.jsx)("div",{className:"bg "+(this.state.rename?"ahri-good":"ahri-evil"),children:Object(s.jsxs)("div",{onContextMenu:function(e){return e.preventDefault()},className:"app",children:[Object(s.jsxs)("div",{className:"header",children:[Object(s.jsx)("h1",{children:"TFT SCOUTER"}),Object(s.jsx)("p",{children:"\ud83d\udd34 = possible to face them next round"})]}),Object(s.jsxs)("div",{className:"players-list",children:[t,a]}),Object(s.jsxs)("div",{className:"pure-g bottom-buttons-group",children:[Object(s.jsxs)("div",{class:"pure-u-2-5",children:[this.TabRename(),Object(s.jsxs)("button",{className:"rename-button pure-button ",onClick:this.renameToggle,tabindex:"-1",children:[" ","Toggle"]}),Object(s.jsxs)("span",{className:"noselect",children:[this.state.rename?" Rename":" Match"," "]})]}),Object(s.jsx)("div",{class:"pure-u-3-5 ",children:Object(s.jsxs)("div",{class:"pure-button-group undo-rename-group",role:"group","aria-label":"...",children:[Object(s.jsx)("button",{className:"undo-button pure-button",onClick:this.handleUndo,tabindex:"-1",disabled:0===this.state.past.past,children:"Undo"}),Object(s.jsx)("button",{className:"redo-button pure-button",onClick:this.handleRedo,tabindex:"-1",disabled:0===this.state.future.future,children:"Redo"}),Object(s.jsx)("button",{className:"reset-button pure-button red",onClick:this.handleReset,tabindex:"-1",children:"Reset"})]})})]}),Object(s.jsx)("p",{className:"noselect",children:this.state.rename?"\u2328\ufe0f TAB to cycle through and rename":"\ud83d\uddb1\ufe0f CLICK on names when you match with them"}),Object(s.jsx)("p",{className:"noselect",children:this.state.rename?"\u2328\ufe0f TAB again at the end to go to match mode":"\ud83d\uddb1\ufe0f RIGHT-CLICK to eliminate"}),Object(s.jsx)("h2",{children:"Match History"}),0===this.state.present.matchHistory.length?"<empty>":n,Object(s.jsxs)("footer",{children:[" ","Made by Pao Yong with ReactJS \u2022"," ",Object(s.jsx)("a",{href:"https://github.com/paoyong/tftscout",children:"GitHub"})," \u2022 Art by Riot Games"]})]})})}}]),a}(i.a.Component),x=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,127)).then((function(t){var a=t.getCLS,s=t.getFID,n=t.getFCP,i=t.getLCP,r=t.getTTFB;a(e),s(e),n(e),i(e),r(e)}))};c.a.render(Object(s.jsx)(i.a.StrictMode,{children:Object(s.jsx)(y,{})}),document.getElementById("root")),x()}},[[126,1,2]]]);
//# sourceMappingURL=main.690248e6.chunk.js.map