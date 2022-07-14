import arg from "arg";
import chalk from "chalk";
import fs from "fs";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--path": String,
      "--deep": Boolean,
      "--ignore": [String],
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    path: args["--path"] || false,
    deep: args["--deep"] || false,
    ignore: args["--ignore"] || ["node_modules"],
  };
}

function mess(options) {
  // TODO:
  const dir = fs.opendirSync(options.path);
  let dirent;
  while ((dirent = dir.readSync()) !== null) {
    console.log(dirent.name);
    // let files = fs.readdirSync(dirent);
    // console.log(files);
    // // filter out options.ignore
    // files = files.filter((name) => name);
    // for (const file of files) {
    //   // Ignore running source files (which are already in memory)
    //   if (!(file.endsWith(".js") || file.endsWith(".mjs"))) {
    //     console.log(file);
    //   }
    // }
  }
  dir.closeSync();
}
export function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  if (!options.path) {
    console.error("%s Invalid --path parameter", chalk.red.bold("ERROR"));
    return;
  }
  mess(options);
  console.log(options);
}
