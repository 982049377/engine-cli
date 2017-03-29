"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cp = require("child_process");
var fs = require("fs-extra");
var path = require("path");
function buildProject(callback) {
    var projectPath = process.cwd();
    executeCommand("tsc", [" -p ", projectPath], callback);
}
exports.buildProject = buildProject;
function buildEngine(callback) {
    var projectPath = process.cwd(); //当前进程的所在，指的是engine.test的位置
    var configFile = path.join(projectPath, "engine.json");
    var config = fs.readJSONSync(configFile);
    var enginePath = config.engine;
    executeCommand("tsc", [" -p ", enginePath], function () {
        var source = path.join(enginePath, "out");
        var target = path.join(projectPath, 'engine');
        // console.log(enginePath);
        console.log(target);
        fs.copy(source, target, callback);
        // source = path.join(enginePath, "loading.png");
        // console.log(enginePath);
        // console.log(target);
        // fs.copy(source, projectPath, callback);
    });
}
exports.buildEngine = buildEngine;
function executeCommand(command, args, callback) {
    args.forEach(function (element) {
        command += element;
    });
    // command += args;
    var child_process = cp.exec(command);
    console.log(command);
    child_process.stdout.addListener("data", function (data) {
        console.log(data.toString());
    });
    child_process.stderr.addListener("data", function (data) {
        console.log(data.toString());
    });
    child_process.addListener("close", function () {
        callback();
    });
}
function buildAll() {
    buildEngine(function () {
        buildProject(function () {
        });
    });
}
exports.buildAll = buildAll;
//# sourceMappingURL=build.js.map