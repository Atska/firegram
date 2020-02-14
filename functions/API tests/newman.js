const newman = require("newman"); // require newman in your project

// call newman.run to pass `options` object and wait for callback
newman.run(
  {
    collection: require("./collection.json"),
    reporters: "cli"
  },
  err => {
    if (err) {
      throw err;
    }
    console.log("collection run complete!");
  }
);
