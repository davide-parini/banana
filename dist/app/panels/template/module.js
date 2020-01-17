/*! banana-fusion - v1.6.23 - 2020-01-17
 * https://github.com/LucidWorks/banana/wiki
 * Copyright (c) 2020 Andrew Thanalertvisuti; Licensed Apache-2.0 */

define("panels/template/module",["angular","app","underscore","jquery","d3"],function(a,b,c,d,e){"use strict";var f=a.module("kibana.panels.bar",[]);b.useModule(f),f.controller("bar",["$scope","dashboard","querySrv","filterSrv",function(a,b,d,f){a.panelMeta={modals:[{description:"Inspect",icon:"icon-info-sign",partial:"app/partials/inspector.html",show:a.panel.spyable}],editorTabs:[{title:"Queries",src:"app/partials/querySelect.html"}],status:"Experimental",description:"Bar module for tutorial"};var g={queries:{mode:"all",query:"*:*",custom:""},field:"",max_rows:10,spyable:!0,show_queries:!0};c.defaults(a.panel,g),a.init=function(){a.$on("refresh",function(){a.get_data()}),a.get_data()},a.set_refresh=function(b){a.refresh=b},a.close_edit=function(){a.refresh&&a.get_data(),a.refresh=!1,a.$emit("render")},a.render=function(){a.$emit("render")},a.get_data=function(){a.panelMeta.loading=!0,a.sjs.client.server(b.current.solr.server+b.current.solr.core_name);var g=a.sjs.Request(),h="";f.getSolrFq()&&(h="&"+f.getSolrFq());var i="&wt=csv",j="&fl="+a.panel.field,k="&rows="+a.panel.max_rows;a.panel.queries.query=d.getQuery(0)+h+j+i+k,g=null!=a.panel.queries.custom?g.setQuery(a.panel.queries.query+a.panel.queries.custom):g.setQuery(a.panel.queries.query);var l=g.doSearch();l.then(function(b){a.data={};var d=e.csv.parse(b,function(b){return b[a.panel.field]=+b[a.panel.field],b});a.data=c.pluck(d,a.panel.field),a.render()}),a.panelMeta.loading=!1}}]),f.directive("barChart",function(){return{restrict:"E",link:function(b,c){function d(){c.html("");var a=c.parent().width(),d=parseInt(b.row.height),f=a-20,g=d/b.data.length,h=e.scale.linear().domain([0,e.max(b.data)]).range([0,f]),i=e.select(c[0]).append("svg").attr("width",f).attr("height",d),j=i.selectAll("g").data(b.data).enter().append("g").attr("transform",function(a,b){return"translate(0,"+b*g+")"});j.append("rect").attr("width",h).attr("height",g-1),j.append("text").attr("x",function(a){return h(a)-3}).attr("y",g/2).attr("dy",".35em").text(function(a){return a})}b.$on("render",function(){d()}),a.element(window).bind("resize",function(){d()})}}})});