/**********************************************************
*
*	Eventful Editor
*
*	Author: Anthony Sparks
*	Version: 1.0.1 b
*	Release Date: February 12th, 2013
*	License: LGPL
*
**/
(function($, _){
	
	var o = {disableDocTypeCheck: false, previewEditOnly: false, editableElement: "<div></div>", customEvents: ""};
	
	var m = {
		init: function(){
		
			//set options
			var options = $.extend({}, o, arguments[0], this.data("options"));
			var editor = $({}), dt = window.document.doctype, elem = $(options.editableElement), postable = this.is("textarea, input[type=\"text\"]"),
			content = postable ? this.val() : this.html(), cEvts = _.String.isEmptyOrWhitespace(options.customEvents) ? [] : options.customEvents.split(",");
			this.data("options", options);		
			
			//preview edits can not be saved using posts, the reason to use
			// this way is if you are using ajax to save the changes
			if(options.previewEditOnly === false && !postable){
				_.Log.error("In order to submit data initial fields should be of type textarea or input with type being text.");
				return;	
			}else{
				editor.data("content", content); this.hide();
				if(!_.Dom.contains(document.documentElement, elem)){ editor.data("prexistant", false); this.after(elem); }
				else{ editor.data("prexistant", true); }
				elem.data("parent", this.get(0));
				elem.html(content).show();
			}
			
			//we require it but if you know what you're doing we'll trust you
			if(options.disableDocTypeCheck === true || !(_.Object.isDocType(dt) && (dt == "<!DOCTYPE html>" || dt.nodeName == "html"))){
				alert("EventfulEditor requires the document to run in HTML Standards mode.");
				return;
			}
			
			//add load function to listener if need be
			if(arguments.length > 1){
				$.fn.on.apply(editor, Array.prototype.concat.call(Array.prototype, ["load"], Array.prototype.slice.call(arguments, 1)));
			}
			
			//register listening events
			for(i in se){
				$.fn.on.call(elem, se[i], this, bh);
				$.fn.on.call(this, se[i], this, bh);
			}
			
			//register listeners for custom events
			if(cEvts.length > 0){
				for(i in cEvts){
					//trim values to eliminate whitespace
					te = cEvts[i] = _.String.trim(cEvts[i]);
					$.fn.on.call(elem, te, this, bh);
					$.fn.on.call(this, te, this, bh);
				}	
			}
			
			//select start and selectionchange event triggers since browsers fail here
			$.fn.on.call(elem, "mousedown", this, oss);
			$.fn.on.call(elem, "mousedown", this, osc);
			$.fn.on.call(this, "mousedown", this, oss);
			$.fn.on.call(this, "mousedown", this, osc);
			
			elem.prop("contentEditable", true);
			editor.data("customEvents", cEvts);
			editor.data("preview", elem);
			this.data("editor", editor);
			
			var evt = $.Event("load");	
			evt.editor = editor;
			evt.target = this.get(0);	
			editor.trigger(evt);
			
		},
		destroy: function(){
			
			var editor = this.data("editor"), options = this.data("options"), elem = editor.data("preview"),
			pe = editor.data("prexistant"), cEvts = editor.data("customEvents");
			
			for(i in se){
				$.fn.off.call(elem, se[i], bh);
				$.fn.off.call(this, se[i], bh);	
			}

			if(cEvts.length > 0){
				for(i in cEvts){
					$.fn.off.call(elem, cEvts[i], bh);
					$.fn.off.call(this, cEvts[i], bh);	
				}
			}
			
			$.fn.off.call(elem, "mousedown", oss);
			$.fn.off.call(elem, "mousedown", osc);
			$.fn.off.call(this, "mousedown", oss);
			$.fn.off.call(this, "mousedown", osc);
			this.html(elem.hide().html()).show();
			
			editor.trigger("unload");
			
			elem.prop("contentEditable", false);
			elem.removeData("parent");
			if(_.Object.asBoolean(pe) !== true){ elem.remove(); }
			if(arguments[0] === true){ this.removeData("options"); }
			this.removeData("editor");
			
		},
		on: function(){

			var editor = this.data("editor");
			if(editor){ $.fn.on.apply(editor, arguments); }
		},
		off: function(){
		
			var editor = this.data("editor");
			if(editor){ $.fn.off.apply(editor, arguments); }
		},
		trigger: function(type){
			
			var editor = this.data("editor");
			//selectstart or selectchanged we'll need to add range data otherwise incomplete
			if(editor){ editor.trigger(type, Array.prototype.slice.call(arguments, 1)); }
		},
		sync: function(){
			
			///need to update editor content data-node
			var elem = $(this.data("options").editableElement);
			//passing true reverses the sync
			if(arguments.length > 0 && arguments[0] === true){
				this.html(elem.html());
			}else{
				elem.html(this.html());
			}
		},
		getSelection: function(){
			return window.getSection();
		},
		createRange: function(){
			
			var r = document.createRange(), l = arguments.length;
			if(l > 1){
				var n = this, m = this, c = arguments[0];
				if(_.Object.isElement(c)){ n = c; }
				else if(isjq(c)){ n = c.get(0); }
				c = arguments[1]; m = n;
				if(_.Object.isNumber(c)){ r.setStart(n, c); c = l > 2 ? arguments[2] : null; }
				else{ r.setStart(n, 0); }
				if(_.Object.isElement(c)){ m = c; }
				else if(isjq(c)){ m = c.get(0); }
				if(l > 3 && _.Object.isNumber(arguments[3])){ r.setEnd(m,arguments[3]); }
				else{ r.setEnd(m,0); }
			}
			return r;
		},
		addRange: function(r){
			window.getSelection().addRange(r);
		},
		
		collapse: function(){
			var n = this, l = arguments.length, c = this, off = 0;
			if(l > 0){
				c = arguments[0];
				if(_.Object.isNumber(c)){ off = c; }
				else if(_.Object.isElement(c)){ n = c; }
				else if(isjq(c)){ n = c.get(0); }
				if(l > 1 && _.Object.isNumber(arguments[1])){ off = arguments[1]; }
			}
			window.getSelection().collapse(n, off);
		},
		collapseToStart: function(){
			window.getSelction().collapseToStart();	
		},
		collapseToEnd: function(){
			window.getSelection().collapseToEnd();	
		},
		getRangeAt: function(i){
			
			var s = window.getSelection();
			if(i < s.rangeCount){ return s.getRangeAt(i); }
			return (void 0);//undefined
		},
		selectAllChildren: function(){
			
			var n = this, l = arguments.length;
			if(l > 0){
				var c = arguments[0];
				if(_.Object.isElement(c)){ n = c; }
				else if(isjq(c)){ n = c.get(0); }
			}
			window.getSelection().selectAllChildren(n);
		},
		removeAllRanges: function(){
			window.getSelection().removeAllRanges();
		},
		removeRange: function(r){
			window.getSelection().removeRange(r);
		},
		deleteFromDocument: function(){
			window.getSelection().deleteFromDocument();
		}
	};
	
	var se = "blur,click,change,dblclick,focus,focusin,focusout,hover,keydown,keypress,keyup,load,mousedown,mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup,resize,scroll,unload".split(",");
	var bh = function(e){
	
		var editor = ge(e);
		if(editor){
			var param = $.extend({}, e, {});
			editor.trigger(e.type);
		}
	};
	//on select start, need changed to work with keyboard commands as well
	var oss = function(){
		var c = false, t = $(arguments[0].target), p = fpe(arguments[0].target), e = p.data("editor"), s = $.extend({}, window.getSelection());
		var f = function(){
			var ns = window.getSelection();
			if(!c && !s.isCollapsed && (ns.anchorOffset != s.anchorOffset || ns.rangeCount != s.rangeCount || ns.focusOffset != s.focusOffset)){
				t.off("mousemove", f); c = true;
				//need to gather data to pass to event
				var evt = $.Event("selectstart");
				evt.editor = p;
				evt.ranges = [];
				evt.efinal = arguments[0];
				for(var x = 0, y = ns.rangeCount; x < y; ++x){
					evt.ranges.push(ns.getRangeAt(x));
				}
				e.trigger(evt);
			}
		};
		t.on("mousemove", f);
	};
	//on select change
	var osc = function(){
		var t = $(arguments[0].target), p = fpe(arguments[0].target), e = p.data("editor"), s = $.extend({}, window.getSelection());
		var f = function(){
			var ns = window.getSelection();
			if(ns.anchorOffset != s.anchorOffset || ns.rangeCount != s.rangeCount || ns.focusOffset != s.focusOffset){
				s = $.extend({}, ns);
				var evt = $.Event("selectionchange");
				evt.editor = p;
				evt.ranges = [];
				evt.efinal = arguments[0];
				for(var x = 0, y = ns.rangeCount; x < y; ++x){
					evt.ranges.push(ns.getRangeAt(x));
				}
				e.trigger(evt);
			}
		};
		t.on("mousemove", f);
		t.one("mouseup", function(){ t.off("mousemove", f); });
	};
	//find parent editor
	var fpe = function(e){
		var p = $(e);
		while(!p.data("editor") && !p.data("parent") && !p.is("body")){
			p = p.parent();
		}
		return p.is("body") ? null : (p.data("editor") ? p : $(p.data("parent")));
	};
	
	var isjq = function(e){
		return e && e.constructor == $;
	};
	
	var ge = function(e){
	
		var editor = void 0;//undefined but in case we aren't in strict mode
		if(!_.Object.isUndefined($(e).data("editor"))){
			editor = $(e).data("editor");
		}else if(!_.Object.isUndefined($(e.data[0]).data("editor"))){
			editor = $(e.data[0]).data("editor");
		}
		return editor;
	};
	
	
	$.fn.EventfulEditor = $.fn.ee = function(){
		var args = arguments;
		if(m[args[0]]){
			return this.each(function(i,e){ m[args[0]].apply($(e), Array.prototype.slice.call(args, 1)); });
		}else if(_.Object.isFunction(args[0])){
			return this.each(function(i,e){ m.init.apply($(e), Array.prototype.concat.call(Array.prototype, [{}], Array.prototype.slice.call(args, 0))); });
		}else if(_.Object.isObject(args[0]) || !args[0]){
			return this.each(function(i,e){ m.init.apply($(e), args); });
		}
	};
	
})(jQuery, Utilities);