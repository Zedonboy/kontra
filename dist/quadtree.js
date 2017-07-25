var kontra=function(t,s){"use strict";return t.quadtree=function(s){var h=Object.create(t.quadtree.prototype);return h._init(s),h},t.quadtree.prototype={_init:function(s){s=s||{},this.depth=s.depth||0,this.maxDepth=s.maxDepth||3,this.maxObjects=s.maxObjects||25,this.isBranchNode=!1,this.parentNode=s.parentNode,this.bounds=s.bounds||{x:0,y:0,width:t.canvas.width,height:t.canvas.height},this.objects=[],this.subnodes=[]},clear:function(){if(this.isBranchNode)for(var t=0;t<4;t++)this.subnodes[t].clear();this.isBranchNode=!1,this.objects.length=0},get:function(t){for(var s,h,e=this,i=[];e.subnodes.length&&this.isBranchNode;){s=this._getIndex(t);for(var n=0,o=s.length;n<o;n++)h=s[n],i.push.apply(i,this.subnodes[h].get(t));return i}return e.objects},add:function(){for(var t,s,h,e=0,i=arguments.length;e<i;e++)if(s=arguments[e],Array.isArray(s))this.add.apply(this,s);else if(this.subnodes.length&&this.isBranchNode)this._addToSubnode(s);else if(this.objects.push(s),this.objects.length>this.maxObjects&&this.depth<this.maxDepth){for(this._split(),t=0;h=this.objects[t];t++)this._addToSubnode(h);this.objects.length=0}},_addToSubnode:function(t){for(var s=this._getIndex(t),h=0,e=s.length;h<e;h++)this.subnodes[s[h]].add(t)},_getIndex:function(t){var s=[],h=this.bounds.x+this.bounds.width/2,e=this.bounds.y+this.bounds.height/2,i=t.y<e&&t.y+t.height>=this.bounds.y,n=t.y+t.height>=e&&t.y<this.bounds.y+this.bounds.height;return t.x<h&&t.x+t.width>=this.bounds.x&&(i&&s.push(0),n&&s.push(2)),t.x+t.width>=h&&t.x<this.bounds.x+this.bounds.width&&(i&&s.push(1),n&&s.push(3)),s},_split:function(){if(this.isBranchNode=!0,!this.subnodes.length)for(var s=this.bounds.width/2|0,h=this.bounds.height/2|0,e=0;e<4;e++)this.subnodes[e]=t.quadtree({bounds:{x:this.bounds.x+(e%2===1?s:0),y:this.bounds.y+(e>=2?h:0),width:s,height:h},depth:this.depth+1,maxDepth:this.maxDepth,maxObjects:this.maxObjects,parentNode:this})},render:function(){if((this.objects.length||0===this.depth||this.parentNode&&this.parentNode.isBranchNode)&&(t.context.strokeStyle="red",t.context.strokeRect(this.bounds.x,this.bounds.y,this.bounds.width,this.bounds.height),this.subnodes.length))for(var s=0;s<4;s++)this.subnodes[s].render()}},t}(kontra||{});