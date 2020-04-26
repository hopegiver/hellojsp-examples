function TreeView(config) {
	this.Roots = []; 
	this.Nodes = [];
	this.Children = {};
	this.Tree = null;
	this.Config = config;
}

TreeView.prototype.add = function(id, pid, name) {
	this.Nodes.push({ id:id, pid:pid, name:name });
};

TreeView.prototype.setChildren = function(node) {
	if(this.Children[node.id] !== undefined && this.Children[node.id].length > 0) {
		node.children = this.Children[node.id];
		for(var i=0; i<node.children.length; i++) {
			node.children[i] = this.setChildren(node.children[i]);
		}
	}
	return node;
}

TreeView.prototype.getSelectedNode = function() {
	return this.Tree.tree('getSelectedNode');
}

TreeView.prototype.getSelectedNodes = function() {
	return this.Tree.tree('getSelectedNodes');
}

TreeView.prototype.create = function(id) {
	for(var i=0; i<this.Nodes.length; i++) {
		var node = this.Nodes[i];
		if(node.pid == '') {
			this.Roots.push(node);
			this.Children[node.id] = [];
		} else {
			if(this.Children[node.pid] === undefined) this.Children[node.pid] = []; 
			this.Children[node.pid].push(node);
		}
	}
	var categoryData = [];
	for(var j=0; j<this.Roots.length; j++) {
		var node = this.setChildren(this.Roots[j]);
		categoryData.push(node);
	}
	
	var config = this.Config;
	config.data = categoryData;
	
	if(config.multiSelectable !== undefined && config.multiSelectable == true) {
	    if(config.closedIcon === undefined) config.closedIcon = $('<i class="bgc-white w-2 far fa-plus-square text-grey-l1 text-110"></i>');
	    if(config.openedIcon === undefined) config.openedIcon = $('<i class="bgc-white w-2 far fa-minus-square text-default-d2 text-110"></i>');	
	    if(config.onCreateLi === undefined) config.onCreateLi = function(node, li, is_selected) {
	        // insert the icon
	        var title = li.find('.jqtree-title');
	        if(node.children.length == 0) {
	            title.addClass('text-grey-d2 text-95');
	            if( is_selected ) {
	                $(selectedIcon).insertBefore(title);
	            }
	            else {
	                $(deselectedIcon).insertBefore(title);
	            }
	        }
	        else {
	            title.addClass('text-secondary-d3 font-italic');
	        }
	        li.find('.jqtree-element').addClass('bgc-h-warning-l3 radius-1');
	    }
	} else {
		 if(config.closedIcon === undefined) config.closedIcon = $('<i class="fa fa-caret-right text-muted ml-1 mt-1"></i>');
		 if(config.openedIcon === undefined) config.openedIcon = $('<i class="fa fa-caret-right rotate-45 text-muted ml-1 mt-1"></i>');
		 if(config.onCreateLi === undefined) config.onCreateLi = function(node, li, is_selected) {
	    	li.find('.jqtree-element').addClass('bgc-h-warning-l3');

	    	// insert the icon
	        var title = li.find('.jqtree-title');
	        var folder = $('<i class="node-icon closed-icon fa fa-folder text-orange-d1"></i>');
	        var openFolder = $('<i class="node-icon opened-icon fa fa-folder-open text-orange-d1"></i>');
	        var fileIcon = $('<i class="node-icon far fa-file text-gray"></i>');

	        if(node.children.length == 0) {
	            title.addClass('text-grey-d2 text-95');
	        	title.prepend( fileIcon );
	        }
	        else {
	            title.prepend( folder );
	            title.prepend( openFolder );
	        }
	    }		
	}
	
	var $tree = $(id);
	$tree.tree(config);
	
	if(config.multiSelectable !== undefined && config.multiSelectable == true) {

	    $tree.on('tree.click', function(e) {
	        // Disable single selection
	        e.preventDefault();
	
	        var selectedNode = e.node;
	        if (selectedNode.id === undefined || selectedNode.children.length > 0) {
	        	if(selectedNode.is_open === undefined || selectedNode.is_open == false) $tree.tree('openNode', selectedNode);
	        	else $tree.tree('closeNode', selectedNode);
	        	return;
	        }
	
	        if( $tree.tree('isNodeSelected', selectedNode) ) {
	            //if already selected, deselect it
	            $tree.tree('removeFromSelection', selectedNode);
	
	            //insert deselectedIcon and remove .selected-icon
	            var icon = $(selectedNode.element).find('.selected-icon');
	            $(deselectedIcon).insertAfter(icon);
	            icon.remove();
	        }    
	        else {
	        	$tree.tree('addToSelection', selectedNode);

	            //insert selectedIcon and remove .deselected-icon
	            var icon = $(selectedNode.element).find('.deselected-icon');
	            $(selectedIcon).insertAfter(icon);
	            icon.remove();
	        }
	    });
	} else {
		if(_.isFunction(config.onClick)) $tree.on('tree.click', function(e) { config.onClick(e.node); });
	}
	
	this.Tree = $tree;
	return $tree;
};

var selectedIcon =
	'<span class="selected-icon d-inline-block text-center border-1 bgc-warning px-1px mx-1 text-70 pb-1px radius-2px">\
	    <i class="w-2 fa fa-check text-white"></i>\
	</span>';

var deselectedIcon = 
	'<span class="deselected-icon d-inline-block text-center border-1 bgc-white brc-secondary-m3 px-1px mx-1 text-70 pb-1px radius-2px">\
	    <i class="w-2 fa fa-unchecked text-orange-l4"></i>\
	</span>';