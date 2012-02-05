// Backbone.Marionette v0.4.1
//
// Copyright (C)2011 Derick Bailey, Muted Solutions, LLC
// Distributed Under MIT License
//
// Documentation and Full License Available at:
// http://github.com/derickbailey/backbone.marionette
Backbone.Marionette=function(e,d,f){var c={version:"0.4.1",RegionManager:function(a){this.options=a||{};if(!this.el)throw a=Error("An 'el' must be specified"),a.name="NoElError",a;this.$el=f(this.el)}};d.extend(c.RegionManager.prototype,e.Events,{show:function(a){var b=this.currentView;this.currentView=a;this._closeView(b);this._openView(a)},_closeView:function(a){a&&a.close&&a.close()},_openView:function(a){a.render();this.$el.html(a.el);if(a.onShow)a.onShow()}});c.ItemView=e.View.extend({constructor:function(){var a=
j.call(arguments);e.View.prototype.constructor.apply(this,a);d.bindAll(this,"render")},serializeData:function(){var a;this.collection&&(a={},a.items=this.collection.toJSON());this.model&&(a=this.model.toJSON());return a},template:function(){return f(this.options.template)},render:function(){var a=this,b=this.serializeData();this.getTemplate(function(c){c=a.renderTemplate(c,b);a.$el.html(c);if(a.onRender)a.onRender()});return this},renderTemplate:function(a,b){if(!a||0===a.length){var c=Error("A template must be specified");
c.name="NoTemplateError";throw c;}return d.template(a.html(),b)},getTemplate:function(a){var b=this.template;d.isFunction(b)?(b=b.call(this),a.call(this,b)):c.TemplateManager.get(b,a)},close:function(){this.unbindAll();this.unbind();this.remove();if(this.onClose)this.onClose()}});c.CollectionView=e.View.extend({modelView:c.ItemView,constructor:function(){e.View.prototype.constructor.apply(this,arguments);d.bindAll(this,"addChildView","render");this.bindTo(this.collection,"add",this.addChildView,this);
this.bindTo(this.collection,"remove",this.removeChildView,this)},render:function(){this.renderModel();this.collection.each(this.addChildView);if(this.onRender)this.onRender();return this},renderModel:function(){if(this.model){var a=new this.modelView({model:this.model,template:this.template});a.render();this.$el.append(a.el)}},addChildView:function(a){this.appendHtml(this.$el,this.renderItem(a))},removeChildView:function(a){var b=this.children[a.cid];b&&(b.close(),delete this.children[a.cid])},appendHtml:function(a,
b){a.append(b)},renderItem:function(a){if(!this.itemView)throw a=Error("An `itemView` must be specified"),a.name="NoItemViewError",a;a=new this.itemView({model:a});a.render();this.storeChild(a);return a.el},storeChild:function(a){this.children||(this.children={});this.children[a.model.cid]=a},close:function(){this.unbind();this.unbindAll();this.remove();this.children&&d.each(this.children,function(a){a.close()});if(this.onClose)this.onClose()}});c.BindTo={bindTo:function(a,b,c,d){d=d||this;a.on(b,
c,d);this.bindings||(this.bindings=[]);this.bindings.push({obj:a,eventName:b,callback:c,context:d})},unbindAll:function(){d.each(this.bindings,function(a){a.obj.off(a.eventName,a.callback)});this.bindings=[]}};c.AppRouter=e.Router.extend({constructor:function(a){e.Router.prototype.constructor.call(this,a);this.appRoutes&&this.processAppRoutes(a.controller,this.appRoutes)},processAppRoutes:function(a,b){var c,d,e,f,g=[];for(e in b)g.unshift([e,b[e]]);f=g.length;for(var h=0;h<f;h++)e=g[h][0],d=g[h][1],
c=a[d],this.route(e,d,c)}});c.Callbacks=function(){this.callbacks=[];this.callbackOptions={}};d.extend(c.Callbacks.prototype,{add:function(a){this.callbacks.push(a);this.isStarted&&this.runCallbacks()},run:function(a){for(var b=this.callbacks.pop();b||0<this.callbacks.length;)b&&b.call(a,this.callbackOptions),b=this.callbacks.pop()},setOptions:function(a){this.callbackOptions=a}});c.Application=function(a){this.initCallbacks=new c.Callbacks;this.vent=d.extend({},e.Events,c.BindTo);d.extend(this,a)};
d.extend(c.Application.prototype,e.Events,{addInitializer:function(a){this.initCallbacks.add(a);this.isStarted&&this.initCallbacks.run(this)},start:function(a){this.isStarted=!0;this.initCallbacks.setOptions(a);this.trigger("initialize:before",a);this.initCallbacks.run(this);this.trigger("initialize:after",a);this.trigger("start",a)},addRegions:function(a){var b,d;for(d in a)a.hasOwnProperty(d)&&(b=a[d],b="string"===typeof b?c.RegionManager.extend({el:b}):b,this[d]=new b)}});c.TemplateManager={templates:{},
get:function(a,b){var c=this.templates[a];if(c)b&&b.call(this,c);else var d=this,c=this.loadTemplate(a,function(c){d.templates[a]=c;b&&b.call(d,c)})},loadTemplate:function(a,b){b.call(this,f(a))},clear:function(){var a=arguments.length;if(1<a)for(var b=0;b<a;b++)delete this.templates[arguments[b]];else this.templates={}}};var j=Array.prototype.slice,i=e.View.extend;c.RegionManager.extend=i;c.Application.extend=i;d.extend(c.ItemView.prototype,c.BindTo);d.extend(c.CollectionView.prototype,c.BindTo);
d.extend(c.Application.prototype,c.BindTo);return c}(Backbone,_,window.jQuery||window.Zepto||window.ender);