"use strict";(self.webpackChunkdavengo_results=self.webpackChunkdavengo_results||[]).push([["main"],{9554:(r,f,l)=>{var c=l(9594),v=l(5306),t=l(9468),i=l(6593),_=l(349),d=l(2296),s=l(7667),g=l(1274);var p=l(5195),m=l(1370),w=l(6814),C=l(9315),D=l(1631),b=l(7398),Z=l(7416);let y=(()=>{class e{constructor(a){this.http=a,this.urls=["https://www.davengo.com/event/result/6-commerzbank-firmenlauf-2013/","https://www.davengo.com/event/result/7-commerzbank-firmenlauf-2014/","https://www.davengo.com/event/result/commerzbank-firmenlauf-2015/","https://www.davengo.com/event/result/commerzbank-firmenlauf-2016/","https://www.davengo.com/event/result/commerzbank-firmenlauf-2017/","https://www.davengo.com/event/result/schnellestellede-firmenlauf-2018/","https://www.davengo.com/event/result/schnellestellede-firmenlauf-2019/","https://www.davengo.com/event/result/schnellestellede-firmenlauf-2021/","https://www.davengo.com/event/result/schnellestellede-firmenlauf-2022/"]}getRuns(){return(0,C.D)(this.urls.map(a=>this.fetch(a)))}fetch(a){return this.http.post(`${a}search/list`,{category:"Einzelwertung",offset:0,query:{lastName:"",firstName:"Marcel"},type:"extended"}).pipe((0,D.z)(n=>n.results),(0,b.U)(n=>({teamName:n.teamName,firstName:n.firstName,lastName:n.lastName,company:n.firma,rank:n.rankTotal,startNumber:n.startNo})),(0,Z.q)(),(0,b.U)(n=>({year:a.slice(a.length-5,a.length-1),results:n})))}}return e.\u0275fac=function(a){return new(a||e)(t.LFG(v.eN))},e.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();function x(e,o){1&e&&(t.TgZ(0,"mat-header-cell"),t._uU(1,"column1"),t.qZA())}function T(e,o){1&e&&t._UZ(0,"mat-cell")}function N(e,o){1&e&&(t.TgZ(0,"mat-header-cell"),t._uU(1,"column2"),t.qZA())}function U(e,o){1&e&&t._UZ(0,"mat-cell")}function A(e,o){1&e&&(t.TgZ(0,"mat-header-cell"),t._uU(1,"column3"),t.qZA())}function Y(e,o){1&e&&t._UZ(0,"mat-cell")}function k(e,o){1&e&&t._UZ(0,"mat-header-row")}function z(e,o){1&e&&t._UZ(0,"mat-row")}function S(e,o){if(1&e&&(t.TgZ(0,"mat-table",2),t.ynx(1,3),t.YNc(2,x,2,0,"mat-header-cell",4),t.YNc(3,T,1,0,"mat-cell",5),t.BQk(),t.ynx(4,6),t.YNc(5,N,2,0,"mat-header-cell",4),t.YNc(6,U,1,0,"mat-cell",5),t.BQk(),t.ynx(7,7),t.YNc(8,A,2,0,"mat-header-cell",4),t.YNc(9,Y,1,0,"mat-cell",5),t.BQk(),t.YNc(10,k,1,0,"mat-header-row",8),t.YNc(11,z,1,0,"mat-row",9),t.qZA()),2&e){const a=t.oxw();t.Q6J("dataSource",a.dataSource),t.xp6(10),t.Q6J("matHeaderRowDef",a.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",a.displayedColumns)}}let H=(()=>{class e{constructor(a){this.dashboardService=a,this.dataSource=new m.by,this.displayedColumns=["column1","column2","column3"]}ngOnInit(){this.dashboardService.getRuns().subscribe(a=>this.dataSource=new m.by(a))}}return e.\u0275fac=function(a){return new(a||e)(t.Y36(y))},e.\u0275cmp=t.Xpm({type:e,selectors:[["dr-dashboard"]],standalone:!0,features:[t.jDz],decls:3,vars:1,consts:[[1,"w-4/5","mx-auto"],["class","mat-elevation-z8",3,"dataSource",4,"ngIf"],[1,"mat-elevation-z8",3,"dataSource"],["matColumnDef","column1"],[4,"matHeaderCellDef"],[4,"matCellDef"],["matColumnDef","column2"],["matColumnDef","column3"],[4,"matHeaderRowDef"],[4,"matRowDef","matRowDefColumns"]],template:function(a,n){1&a&&(t.TgZ(0,"mat-card",0)(1,"mat-card-content"),t.YNc(2,S,12,3,"mat-table",1),t.qZA()()),2&a&&(t.xp6(2),t.Q6J("ngIf",n.dataSource))},dependencies:[p.QW,p.a8,p.dn,m.p0,m.BZ,m.fO,m.as,m.w1,m.Dz,m.nj,m.ge,m.ev,m.XQ,m.Gk,w.O5],encapsulation:2}),e})();function R(e,o){1&e&&(t.TgZ(0,"h2",6),t._uU(1,"Overview"),t.qZA(),t.TgZ(2,"mat-dialog-content"),t._uU(3," Shows the ranking of 'Firmenlauf Leipzig' for the years 2012-2023. "),t._UZ(4,"br"),t._uU(5," Users can check there results in one search. "),t.qZA(),t.TgZ(6,"mat-dialog-actions",7)(7,"button",8),t._uU(8,"Close"),t.qZA()())}(0,i.Cg)((()=>{class e{constructor(a,n,h){this.dialog=a,this.titleService=n,this.overlayContainer=h,this.class="indigo-pink-theme",this.appname="Davengo results",this.titleService.setTitle(this.appname),this.overlayContainer.getContainerElement().classList.add("indigo-pink-theme")}openDialog(a){this.dialog.open(a,{maxWidth:"800px"})}}return e.\u0275fac=function(a){return new(a||e)(t.Y36(s.uw),t.Y36(i.Dx),t.Y36(c.Xj))},e.\u0275cmp=t.Xpm({type:e,selectors:[["dr-root"]],hostVars:2,hostBindings:function(a,n){2&a&&t.Tol(n.class)},standalone:!0,features:[t.jDz],decls:13,vars:1,consts:[[1,"mat-app-background"],["color","primary",1,"mat-elevation-z4","justify-between"],["mat-button","",3,"click"],["mat-button","","href","https://github.com/inpercima/davengo-results","target","_blank"],["alt","GitHub Repository","src","../assets/github-mark-white.svg",1,"github-link"],["dialog",""],["mat-dialog-title",""],["align","end"],["mat-button","","mat-dialog-close","","cdkFocusInitial",""]],template:function(a,n){if(1&a){const h=t.EpF();t.TgZ(0,"div",0)(1,"mat-toolbar",1),t._uU(2),t.TgZ(3,"div")(4,"button",2),t.NdJ("click",function(){t.CHM(h);const Q=t.MAs(11);return t.KtG(n.openDialog(Q))}),t._uU(5,"APP INFO"),t.qZA(),t._uU(6," | "),t.TgZ(7,"a",3),t._UZ(8,"img",4),t._uU(9," GitHub "),t.qZA()()(),t.YNc(10,R,9,0,"ng-template",null,5,t.W1O),t._UZ(12,"dr-dashboard"),t.qZA()}2&a&&(t.xp6(2),t.hij(" ",n.appname," "))},dependencies:[H,d.ot,d.zs,d.lW,s.Is,s.ZT,s.uh,s.xY,s.H8,g.g0,g.Ye],styles:["body[_ngcontent-%COMP%]{font-family:Roboto,Helvetica Neue Light,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;margin:0;overflow-y:scroll}.mat-card[_ngcontent-%COMP%]{margin-top:20px}"]}),e})(),{providers:[(0,t.RIp)(i.b2,c.U8),(0,_.iQ)(),(0,v.h_)()]}).catch(e=>console.error(e))}},r=>{r.O(0,["vendor"],()=>r(r.s=9554)),r.O()}]);