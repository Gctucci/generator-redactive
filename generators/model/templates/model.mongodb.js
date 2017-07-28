'use strict';
var restful = require('node-restful')

module.exports = function(mongoose) {
  return restful.model(mongoose.model("<%= modelName.charAt(0).toUpperCase() + modelName.slice(1); %>", new mongoose.Schema({
    <% for(var item of attrConfig.split("@")) { %>
        <% if(item.split(":").length <= 2) { %>
            <%= item.split(":")[0] %>: <%= item.split(":")[1] %>,
            <% } else {%>
                <%= item.split(":")[0] %>:{
                  type: <%= item.split(":")[1] %>,
                  <% if( item.split(":")[3].toString() == "required" ) { %>
                  required: true,
                  <%} else {%>
                  required: false,
                  <%}%>
                  <% if( item.split(":")[1].toString() === "String") {%>
                  default: "<%= item.split(":")[2]%>"
                  <% } else { %>
                  default:  <%= item.split(":")[2] %>
                  <% } %>
                },
                <% } %>
        <% } %>
    // Sets default version of the database, for API handling purposes
    db_version: {type: String, default: "v1.0"}
  },
    {timestamps: true}
  )))
  .methods(['get', 'post', 'put', 'delete'])
}
