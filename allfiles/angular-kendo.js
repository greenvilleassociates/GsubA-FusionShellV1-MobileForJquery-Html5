/*! angular-kendo 0.5.2 2013-07-26 */
"use strict";angular.module("kendo.directives",[]),angular.module("kendo.directives",[],["$provide",function(a){var b=[];angular.forEach([kendo.ui,kendo.dataviz&&kendo.dataviz.ui],function(a){angular.forEach(a,function(a,c){c.match(/^[A-Z]/)&&"Widget"!==c&&b.push("kendo"+c)})}),a.value("kendoWidgets",b)}]),angular.module("kendo.directives").factory("widgetFactory",["$parse","$log",function(a,b){var c={kDataSource:!0,kOptions:!0,kRebind:!0},d=function(d,e,f,g,h){var i=/k(On)?([A-Z].*)/;if(!c[g]){var j,k,l=g.match(i);l&&(j=l[2].charAt(0).toLowerCase()+l[2].slice(1),l[1]?(k=a(h),f[j]=function(a){"$apply"===e.$root.$$phase||"$digest"===e.$root.$$phase?k({kendoEvent:a}):e.$apply(function(){k(e,{kendoEvent:a})})}):(f[j]=angular.copy(e.$eval(h)),void 0===f[j]&&h.match(/^\w*$/)&&b.warn(d+"'s "+g+" attribute resolved to undefined. Maybe you meant to use a string literal like: '"+h+"'?")))}},e=function(a,b,c,e){var f=angular.element.extend(!0,{},a.$eval(c.kOptions));return angular.forEach(c,function(b,c){d(e,a,f,c,b)}),f.dataSource=b.inheritedData("$kendoDataSource")||f.dataSource,f},f=function(a,b,c,d){var f=e(a,b,c,d);return b[d](f).data(d)};return{create:f}}]),angular.module("kendo.directives").factory("directiveFactory",["widgetFactory","$timeout","$parse",function(a,b,c){function d(a,b,d,e){if(d[e]){var f=c(d[e]).assign;if(!f)throw new Error(e+" attribute used but expression in it is not assignable: "+d[e]);f(b,a)}}var e=function(c){return{restrict:"ACE",transclude:!0,require:"?ngModel",scope:!1,controller:["$scope","$attrs","$element","$transclude",function(a,b,c,d){d(function(a){c.append(a)})}],link:function(e,f,g,h){var i;b(function(){if(i=a.create(e,f,g,c),d(i,e,g,c),g.kRebind&&e.$watch(g.kRebind,function(b,h){b!==h&&(i=a.create(e,f,g,c),d(i,e,g,c))},!0),e.$on("$destroy",function(){i.destroy()}),h){if(!i.value)throw new Error("ng-model used but "+c+" does not define a value accessor");h.$render=function(){i.value(h.$viewValue)},void 0!==i.value&&i.value(h.$viewValue||null),i.bind("change",function(){"$apply"===e.$root.$$phase||"$digest"===e.$root.$$phase?h.$setViewValue(i.value()):e.$apply(function(){h.$setViewValue(i.value())})})}})}}};return{create:e}}]),function(a){var b=a.injector(["kendo.directives"]).get("kendoWidgets");a.forEach(b,function(b){a.module("kendo.directives").directive(b,["directiveFactory",function(a){return a.create(b)}])})}(angular),angular.module("kendo.directives").directive("kDataSource",[function(){var a=function(a){return kendo.data.DataSource.create(a)};return{restrict:"A",controller:["$scope","$attrs","$element",function(b,c,d){d.data("$kendoDataSource",a(b.$eval(c.kDataSource))),b.$watch(c.kDataSource,function(b,c){b!==c&&d.data("$kendoDataSource",a(b))})}]}}]);