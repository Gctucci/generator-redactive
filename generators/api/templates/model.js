'use strict';

  <% if (appContext.appDB === 'MongoDB') {%>
      module.exports = function(mongoose) {
        return mongoose.model("<%= modelName.charAt(0).toUpperCase() + modelName.slice(1); %>", new mongoose.Schema({
          <% for(var item of attrConfig.split("@")) { %>
              <% if(item.split(":").length <= 2) { %>
                  <%= item.split(":")[0] %>: <%= item.split(":")[1] %>,
              <% } else {%>
                  <%= item.split(":")[0] %>:{
                    type: <%= item.split(":")[1] %>,
                    <% if( item.split(":")[1].toString() === "String") {%>
                      default: <%= item.split(":")[2].toString()%>
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
        ))
      }
      <% } else { %>

          module.exports = function(sequelize, DataTypes) {
            var Model = sequelize.define("<%= modelName.charAt(0).toUpperCase() + modelName.slice(1); %>", {
              <% for(var item of attrConfig.split("@")) { %>
                  <%= item.split(":")[0] %>: DataTypes.<%= item.split(":")[1].replace(/\s+/g, '').toUpperCase() %>,
                  <% } %>
            })
            return Model;
          }
          <%}%>
