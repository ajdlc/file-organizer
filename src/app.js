const express = require("express");
const fs = require("fs").promises;

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
    const file = await fs.readFile(__dirname + "/file_metadata/test.json");
    res.send(JSON.parse(file.toString()));
});

app.get("/files", async (req, res) => {
    const dirs = await fs.readdir(__dirname + "/file_metadata");
    console.log(dirs);

    res.send(dirs);
})

app.get("/homefolder", async (req, res) => {
    const homeFolder = await fs.readdir(__dirname + "../../..");
    
    res.send(homeFolder);
    
})

app.post("/folders", async (req, res) => {
    const name = req.body.name;

    try {
        await fs.mkdir(__dirname + "/" + name);
        res.send({
            msg: "Directory made successfully!",
            loction: __dirname + "/" + name
        });
    } catch (e) {
        if (e.errno === -4075) {
            res.status(400).send({
                msg: "The directory already exists!",
                e
            })
        }
        res.status(400).send({msg: "Something went wrong and there was an error.", e});
    }
})

app.listen(port, () => {
    console.log(`Listening on ${port}!`);
    
})