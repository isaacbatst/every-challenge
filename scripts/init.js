rs.initiate( {
  _id : "every-todo-app-set",
  members: [
      { _id: 0, host: "mongodb:27017" },
  ]
})