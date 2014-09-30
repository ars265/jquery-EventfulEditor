<html>
<head>
<title>EventfulEditor {Beta} - Powered by Everyday Events</title>
<style>
h1 { background-color: #505050; padding: 1em 12px; margin: 0; color: white; }
h2 { background-color: #3B5F9B; padding: 7px; color: white; }
dt { background-color: #505050; padding: 4px; color: white; }
dd { padding-bottom: 20px; }
dd code { background-color: #EEEEEE; padding: 0; }
span.info { color: blue; }
</style>
</head>
<body>
<h1>EventfulEditor <code>{</code>Beta<code>}</code> - Powered by Everyday Events</h1>
<p>Eventful Editor adds the flexibility and power of Events with content editing. Ok, so what's different from the other fifty out there? Well, everything. Most editors use the power of contenteditable or designmode to allow you to use browser based triggers to wrap content. Some of them are even nice enough to try to make the browser formats the same. We don't. We say we don't care what the browser can do, we want absolute control. If I want the <strong>B</strong> button to make it italics, I will. In this concept we can provide more functionality and better support for everything. Now if you like the controls the browser has, use them, you have that right, but if you don't, use anything you like. Ok, but seriously, let me guess you guys have the worse UI ever? Nope, we got rid of it. we give you access to events, if you want to make a button to trigger an action, go ahead. We give you, through the power of jQuery, the ability to listen, attach, and trigger events, you don't even need the buttons to start. If you know the user is done selecting you can ask the user what they want to do next! Take charge of the experience and make it the best it's ever been. So where is the catch? We don't support IE version 8 or below, and we only support running in non-quirks mode. Damn shame isn't it, but with growing technologies there is a time and place for older browsers and we had to draw a line to support the future.</p>
<br/>
<h2>Events and Usage</h2>
<dl>
<dt>Initialization:</dt>
<dd>
<p>Getting an editor up and running is extremely simple. Built on jQuery plugin standards we support calling all functions and initialization by calling the plugin. See the examples below.</p>
<h5>Calling the default constructor.</h5>
<code>$("textarea").EventfulEditor();</code>
<h5>Stop Making me Type EventfulEditor!</h5>
<p>Ok, so we got tired of it too, so in typical programmer fashion we made a short hand, you can simply us <code>ee</code> in place of <code>EventfulEditor</code>.</p>
<code>$("textarea").ee();</code>
<h5>Passing options to the constructor. For a complete list of options see the area labelled Options.</h5>
<code>$(".editors").EventfulEditor({editableElement: "&lt;p&gt;&lt;/p&gt;"});</code>
<h5>Calling the constructor with a callback when load has completed.</h5>
<code>$("#my-editor").EventfulEditor(function(){ /* do this on load complete */ });</code>
<p>or with options</p>
<code>$("#my-editor").EventfulEditor({editableElement: "&lt;p&gt;&lt;/p&gt;"}, function(){ /* do this on load complete */ });</code>
</dd>
<dt>Destruction:</dt>
<dd>
<p>We don't know why you would ever want to destroy the wonderful thing we've made but it happens so if you need to destroy the editor you can call the destroy method passing true/false or nothing at all, the default is false. This value indicates whether the options that were used when creating the editor should be left, to be used on the next initialization, or if they should be removed as well.</p>
<h5>Calling the destructor</h5>
<code>$("#my-editor").EventfulEditor("destroy");</code>
<p>or like this to remove the options</p>
<code>$("#my-editor").EventfulEditor("destroy", true);</code>
</dd>
<dt>On:</dt>
<dd>
<p>Attaching events is the reason we are here! Calling the on method works using the same options you are used to with the jQuery <code>.on()</code> method so you can see their documentation for the most up to date options. The difference here is that in order to keep standard plugin style and operation we call the plugin with the event parameters. By doing it this way we are also able to allow custom events of our own, and yours!</p>
<h5>Calling the on method to attach event listeners</h5>
<code>$("#my-editor").EventfulEditor("on", "click", function(){ /* do something on click */ });</code>
</dd>
<dt>Off:</dt>
<dd>
<p>Making events simple but sometimes you just need to turn them off. The off method works in the same relation as the on method above does with jQuery so see the jQuery site for help with off.</p>
<h5>Turning off, unregistering, event listeners</h5>
<code>$("#my-editor").EventfulEditor("off", "click");</code>
<p>or if you have a specific function to turn off</p>
<code>$("#my-editor").EventfulEditor("off", "click", function(){ /* something */ });</code>
</dd>
<dt>Trigger:</dt>
<dd>
<p>Want to trigger events? You're in the right place. As you've seen from on and off we're right on track with jQuery, why why not keep going?</p>
<h5>Triggering events</h5>
<code>$("#my-editor").EventfulEditor("trigger", "click");</code>
<p>or passing additional parameters</p>
<code>$("#my-editor").EventfulEditor("trigger", "click", ["my", "custom", "parameters"]);</code>
</dd>
<dt>Sync:</dt>
<dd>
<p>There are normally two pieces to the editor although being tricky you can make them one. In times when these are separate you need the ability to sync the html area, normally a textarea, and the preview area, normally a contenteditable div. This method allows that functionality with a simple call. Without parameters the function will sync the current content of the preview area to the html area but it times that you need the opposite, such as html editing view, you can pass <code>true</code> and sync the html area to the preview pane.</p>
<h5>Syncing the panes</h5>
<code>$("#my-editor").EventfulEditor("sync");</code>
<p>or in the opposite direction</p>
<code>$("#my-editor").EventfulEditor("sync", true);</code>
</dd>
</dl>
<h2>Selection and Range API</h2>
<p>If you've never used the browsers Range and Selection API's I suggest reading <a href="http://www.quirksmode.org/dom/range_intro.html" target="_blank">this article</a> from quirks mode. In IE 9 and Opera 10 these browsers started catching up with the times and decided to start playing more by the standards and with that came implementation of the Range and Selection API's. This is one reason, and only one of many, we decide to support IE 9+ and Opera 10+. This will make your and our life much easier. Now that being said there is still a ton to learn and when using the browser API's and jQuery together, things get a little hairy. This is where we took a step and tried to provide some easily usable functions that allow you to use jQuery object with some of the more common Range and Selection API's. This in no way means you are restricted to them!
<dl>
<dt>getSelection:</dt>
<dd>
<p>Gets the Selection from the browsers window object.</p>
<code>$("#my-editor").EventfulEditor("getSelection");</code>
</dd>
<dt>createRange:</dt>
<dd>
<p>Creating a Range is fairly straight forward but we also wanted to use jQuery objects so we made the createRange method help by setting up some defaults. There is no guess as to how these methods are named and we do it to make it just like using the native API's.</p>
<h5>Create a Range Using the Default Constructor</h5>
<p>The default constructor will create the same object with the same settings as the browsers default <code>document.createRange()</code> method.</p>
<code>var range = $("#my-editor").EventfulEditor("createRange");</code>
<h5>Passing the initial arguments</h5>
<p>Passing arguments can be extremely useful for setting a default start or end node or both. By passing either Element nodes or jQuery objects, you can set the beginning node in the Range by default, sending the beginning node and ending this node will select from the beginning of the beginning node to the beginning of the ending node.</p>
<code>var beginningNode = $("#my-paragraph"), endNode = $("my-span"), range = $("#my-editor").EventfulEditor("createRange", beginningNode, endNode);</code>
<h5>Setting the Beginning Nodes Offset</h5>
<p>In some situations it may be needed to set the offset of the beginning node, this can be done with or without passing the ending node. In such cases the beginning node is only set and the Range will have no end set.</p>
<code>var beginningNode = $("#my-paragraph"), offset = 5, range = $("#my-editor").EventfulEditor("createRange", beginningNode, offset);</code>
<h5>Using createRange to its Full Potential</h5>
<p>In the majority of cases you will want to set the beginning node, beginning offset, end node, and end offset. This can easily be done by specifying all parameters in that order.</p>
<code>var beginningNode = $("#my-paragraph"), beginOffset = 5, endNode = $("my-span"), endOffset = 2,</code><br/>
<code>range = $("#my-editor").EventfulEditor("createRange", beginningNode, beginOffset, endNode, endOffset);</code>
</dd>
<dt>addRange:</dt>
<dd>
<p>Given a Range you can add it to the window selection natively or use the addRange function.</p>
<code>var beginningNode = $("#my-paragraph"), beginOffset = 5, endNode = $("my-span"), endOffset = 2,</code><br/>
<code>range = $("#my-editor").EventfulEditor("createRange", beginningNode, beginOffset, endNode, endOffset);</code><br/>
<code>$("#my-editor").EventfulEditor("addRange", range);</code>
</dd>
<dt>collapseToStart:</dt>
<dd>
<p>Collapses the Current Selection to it's starting point.</p>
<code>$("#my-editor").EventfulEditor("collapseToStart");</code>
</dd>
<dt>collapseToEnd:</dt>
<dd>
<p>Collapses the Current Selection to it's ending point.</p>
<code>$("#my-editor").EventfulEditor("collapseToEnd");</code>
</dd>
<dt>getRangeAt:</dt>
<dd>
<p>Returns the Range at the passed index, if the index does not exist or is out of bounds undefined is returned. <em><strong>Note:</strong> At time of documentation only Firefox supports multiple ranges for a selection.</em></p>
<code>var range = $("#my-editor").EventfulEditor("getRangeAt", 0);</code>
</dd>
<dt>selectAllChildren:</dt>
<dd>
<p>Creates a new selection, discarding the current selection, by selections all child nodes of the node passed.</p>
<code>$("#my-editor").EventfulEditor("selectAllChildren", $("#right-block"));</code>
</dd>
<dt>removeAllRanges:</dt>
<dd>
<p>Removes all Ranges from the Selection.</p>
<code>$("#my-editor").EventfulEditor("removeAllRanges");</code>
</dd>
<dt>removeRange:</dt>
<dd>
<p>Removes the Range at the passed index from the Selection.</p>
<code>var range = $("#my-editor").EventfulEditor("getRangeAt", 0);</code><br/>
<code>$("#my-editor").EventfulEditor("removeRange", range);</code>
</dd>
<dt>deleteFromDocument:</dt>
<dd>
<p>Deletes the text inside the current selection from the DOM.</p>
<code>$("#my-editor").EventfulEditor("deleteFromDocument");</code>
</dd>
</dl>
<h2>Options</h2>
<dl>
<dt>disableDocTypeCheck(Boolean) -- default: false</dt>
<dd>
<p>We have made our code HTML5 ready and in order to do so we check for DOCTYPE compliance. If for some reason you need to force this behavior to be turned off specify <code>true</code> as we'll assume you know what you're doing.</p>
</dd>
<dt>previewEditOnly(Boolean) -- default: false</dt>
<dd>
<p>In order to allow the eventful editor to be super flexible we actually allow you to not use forms to post data. If you want to cater to only those with JavaScript you can set this setting to <code>true</code> and use Ajax and event listeners to save, load, and control the data in the editor.</p>
</dd>
<dt>editableElement(String | Element | Selector) -- default: "&lt;div&gt;&lt;/div&gt;"</dt>
<dd>
<p>This is the element that will be made editable and displayed as the preview pane to the user. If the string passed is a selector, that item will be used where it is in the DOM, if a string such as "&lt;div/&gt;" the item will be created and appended where the html pane was attached. If an element was passed in it will be used in place like the selector.</p>
</dd>
<dt>customEvents(String) -- default: ""</dt>
<dd>
<p>Eventful Editor is based on events and new events are supported by browsers in partial or full all the time. What we've done is taken the most basic of events and built them in, then made the ability to add custom events. One such event is copy, or paste. Some browsers support these events but not all and so we leave them out by default. Using this option you can easily add them in when they are needed by your application, plugin, or button by passing a string of comma separate values. A list of default events is provided below but be wary, adding custom events that are the same as default events could cause events to fire more than once.</p>
<h5>Default Support Events:</h5>
<ul>
<li>blur</li>
<li>click</li>
<li>change</li>
<li>dblclick</li>
<li>focus</li>
<li>focusin</li>
<li>focusout</li>
<li>hover</li>
<li>keydown</li>
<li>keypress</li>
<li>keyup</li>
<li>load</li>
<li>mousedown</li>
<li>mouseenter</li>
<li>mouseleave</li>
<li>mousemove</li>
<li>mouseout</li>
<li>mouseover</li>
<li>mouseup</li>
<li>selectstart<span class="info">*</span></li>
<li>selectionchange<span class="info">*</span></li>
<li>resize</li>
<li>scroll</li>
<li>unload</li>
</ul>
</dd>
</dl>
<div><span class="info">*</span>: Implementations are custom due to poor/uniform browser native support
</body>
</html>
