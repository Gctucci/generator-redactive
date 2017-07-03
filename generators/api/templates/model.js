'use strict';

<% if (appContext.appDB === 'MongoDB') {%>
module.exports = function(mongoose) {
  return mongoose.model("<%= modelName.charAt(0).toUpperCase() + modelName.slice(1); %>", new mongoose.Schema({
   <% for(var item of attrConfig.split(",")) { %>
    <%= item.split(":")[0] %>: DataTypes.<%= item.split(":")[1].replace(/\s+/g, '').toUpperCase() %>,
  <% } %>
  })
  )
}
<% } else { %>

module.exports = function(sequelize, DataTypes) {
  var Model = sequelize.define("<%= modelName.charAt(0).toUpperCase() + modelName.slice(1); %>", {
  <% for(var item of attrConfig.split(",")) { %>
    <%= item.split(":")[0] %>: DataTypes.<%= item.split(":")[1].replace(/\s+/g, '').toUpperCase() %>,
  <% } %>
  })
  return Model;
}
<%}%>
