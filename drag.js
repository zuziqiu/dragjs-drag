var drag=function(){this.body=document.body;this.zIndex_array=[];this.drag_array=[];this.handle=null;this.limit_drag=null;this.select_lock=false;this.inspect_move_pop_lock=true;this.inspect_handle_lock=true};drag.prototype={on:function(){var b=this,a=null;if(Object.prototype.toString.call(arguments[0])==="[object Array]"){a=arguments[0]}b.fetch(a,function(){b.body.addEventListener("mousedown",function(c){b.mouse_down(b,c)},false)})},fetch:function(b,c){var a=this;if(b.length>0){b.forEach(function(e,d){var f={};if(e.move_pop){f["move_pop"]={};f["move_pop"]["className"]=e.move_pop.className.split(/\s/);f["move_pop"]["idName"]=e.move_pop.id||"";if(e.backgroundColor){f["move_pop"]["bkColor"]=e.backgroundColor}}else{console.error("move_pop illegal =>",e);return false}if(e.handle){f["handle"]={};f["handle"]["className"]=e.handle.className.split(/\s/);f["handle"]["idName"]=e.handle.id||"";if(e.limit_drag){f["handle"]["limit_drag"]=e.limit_drag}e.handle.addEventListener("mouseenter",function(g){a.mouse_enter(a,g)},false)}else{console.error("handle illegal =>",e);return false}a.drag_array.push(f)});if(typeof c=="function"){c()}}},destroy:function(a){},mouse_enter:function(d,c){var d=this,b=null;d.get_handle(c.target);d.handle.style.cursor="move";if(d.handle){var a=document.createElement("div");a.className="hover_div";a.style.width=d.handle.offsetWidth+"px";a.style.height=d.handle.offsetHeight+"px";a.style.position="absolute";a.style.top="0px";a.style.left="0px";a.style.cursor="move";if(document.querySelectorAll(".hover_div").length==0){d.get_parents(c.target).forEach(function(f,e){if(f.tagName=="A"){b=true}});c.target.childNodes.forEach(function(f,e){if(f.tagName=="A"){b=true}});if(b){setTimeout(function(){d.handle.appendChild(a)},1000)}else{}}d.out_shell=function(f){d.mouse_leave(d,f)};d.handle.addEventListener("mouseleave",d.out_shell,false)}},mouse_leave:function(b,a){b.inspect_move_pop_lock=true;b.inspect_handle_lock=true;if(document.querySelector(".hover_div")){document.querySelector(".hover_div").parentNode.removeChild(document.querySelector(".hover_div"))}},mouse_down:function(c,b){c.disX=null;c.disY=null;c.el=null;c.inspect_handle(c,b);c.inspect_move(c,b);if(c.inspect_handle_lock){return false}else{if(c.inspect_move_pop_lock){return false}}c.zIndex_deal(c.zIndex_array,c.el);var a=null;a=b||window.event;c.disX=a.clientX-c.el.offsetLeft;c.disY=a.clientY-c.el.offsetTop;c.move_shell=function(d){c.mouse_move(c,d)},document.addEventListener("mousemove",c.move_shell,false);c.up_shell=function(d){c.mouse_up(c,d)};document.addEventListener("mouseup",c.up_shell,false)},mouse_move:function(e,d){e.select_lock=true;e.ban_select();var b=null;b=d||window.event;var a=b.clientX-e.disX;var c=b.clientY-e.disY;var g=null,f=null;g=0;f=0;e.el.style.left=a+f+"px";e.el.style.top=c+g+"px"},mouse_up:function(b,a){b.inspect_move_pop_lock=true;b.inspect_handle_lock=true;b.select_lock=false;b.ban_select();document.removeEventListener("mousemove",b.move_shell);document.removeEventListener("mouseup",b.up_shell);document.removeEventListener("mouseout",b.out_shell)},bkColor_deal:function(a,b){a.style.backgroundColor=b.bkColor;delete b.bkColor},zIndex_deal:function(a,b){if(a.indexOf(b)>=0){a.splice(a.indexOf(b),1)}a.unshift(b);a.forEach(function(d,c){d.style.zIndex=9999-c})},get_handle:function(d){var c=this;c.limit_drag=true;for(var b in c.drag_array){if(c.drag_array[b]["handle"].idName){if(d==document.querySelector("#"+c.drag_array[b]["handle"].idName)){c.handle=document.querySelector("#"+c.drag_array[b]["handle"].idName)}}else{if(c.drag_array[b]["handle"].className){for(var a=0;a<c.drag_array[b]["handle"].className.length;a++){if(d==document.querySelector("."+c.drag_array[b]["handle"].className[a])){c.handle=document.querySelector("."+c.drag_array[b]["handle"].className[a])}}}else{console.log("handle illegal");return false}}}},inspect_handle:function(c,b){if(c.handle){if(b.target==c.handle){c.inspect_handle_lock=false}else{for(var a=0;a<c.get_parents(b.target).length;a++){if(c.get_parents(b.target)[a]==c.handle){c.inspect_handle_lock=false}}}}},inspect_move:function(c,b){for(var a in c.drag_array){c.get_parents(b.target).forEach(function(e,f){if(c.drag_array[a]["move_pop"].idName&&b.target==document.querySelector("#"+c.drag_array[a]["move_pop"].idName)){c.el=document.querySelector("#"+c.drag_array[a]["move_pop"].idName);c.inspect_move_pop_lock=false}if(c.drag_array[a]["move_pop"].idName&&e==document.querySelector("#"+c.drag_array[a]["move_pop"].idName)){c.el=document.querySelector("#"+c.drag_array[a]["move_pop"].idName);c.inspect_move_pop_lock=false;if(c.drag_array[a]["move_pop"].bkColor){c.bkColor_deal(c.el,c.drag_array[a]["move_pop"])}return false}if(c.drag_array[a]["move_pop"].className[0]!=""){for(var d=0;d<c.drag_array[a]["move_pop"].className.length;d++){if(c.has_class(e,c.drag_array[a]["move_pop"].className[d])){c.el=document.querySelector("."+c.drag_array[a]["move_pop"].className[d]);c.inspect_move_pop_lock=false;if(c.drag_array[a]["move_pop"].bkColor){c.bkColor_deal(c.el,c.drag_array[a]["move_pop"])
}}}}})}},get_parents:function(b,c){var a=c||[];if(b.parentNode){if(b.parentNode==document.body){return[]}a.push(b.parentNode);this.get_parents(b.parentNode,a)}return a},has_class:function(e,c){var d=this;var b=e.className.split(/\s+/);for(var a=0;a<b.length;a++){if(b[a]===c){return true}}return false},ban_select:function(){var b=this,a=null;if(b.select_lock){a="none"}else{a="text"}b.body.style.setProperty("-webkit-user-select",a,"");b.body.style.setProperty("-moz-user-select",a,"");b.body.style.setProperty("-ms-user-select",a,"");b.body.style.setProperty("user-select",a,"")},get_style:function(b,a){if(b.currentStyle){return b.currentStyle[a]}else{return document.defaultView.getComputedStyle(b,null)[a]}}};