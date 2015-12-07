
<script type="text/template" id="itemTemplate">
   {{#.}}
    <div class="itemTemplateWrapper">
        <div><span>Item: </span><span>{{ID}}</span></div>
        <div><span>Description: </span><span>{{content}}</span></div>
        <div><span>Price: </span><span>{{title}}</span></div>
    </div>
    {{/.}}
</script>


<!-- This is the container where the templates will be instantiated -->
        <div id="container"></div>