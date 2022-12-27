import express from "express";
import path from "path";
import bodyParser from "body-parser";
import compiler from "compilex";
import cors from 'cors';


import dotenv from 'dotenv'

dotenv.config({ path: '../.env' })


// SERVICES
const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 8080


var option = { status: true }

// MIDDLEWARE

app.use(cors())
app.use(bodyParser())
app.use(express.json());
compiler.init(option)
//  ROUTES
app.get("/", (req, res) => {
    res.send("Api working");
})


app.post("/compiler", function (req, res) {
    var {
        code, input, inputRatio, lang
    } = req?.body;
    if (lang === "C" || lang === "C++") {
        if (inputRatio === "true") {
            var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
            compiler.compileCPPWithInput(envData, code, input, function (data) {
                if (data.error) {
                    res.send(data?.error)

                }
                else {
                    console.log(data?.output);
                    res.send(data?.output)
                }
            })
        }
        else {
            var envData = { OS: "windows", cmd: "g++", options: { timeout: 1000 } };
            compiler.compileCPP(envData, code, function (data) {
                console.log("here");
                if (data.error) {
                    res.send(data?.error)

                }
                else {
                    console.log(data?.output);

                    res.send(data?.output)
                }
            })
        }
    }

    if (lang === "Python") {
        var envData = { OS: "windows" };
        if (inputRatio === "true") {
            compiler.compilePythonWithInput(envData, code, input, function (data) {
                if (data.error) {
                    res.send(data?.error)

                }
                else {
                    res.send(data)
                }
            })
        }
        else {

            compiler.compilePython(envData, code, function (data) {
                if (data.error) {
                    res.send(data?.error)

                }
                else {
                    res.send(data)
                }
            })
        }
    }


})


app.get("/fullstat", function (res, req) {
    compiler.fullStat(function (data) {
        res.send(data)
    })
})








app.listen(PORT, console.log("listening on port " + PORT))


compiler.flush(function () {
    console.log("All temp file are flushed !!!");
})
