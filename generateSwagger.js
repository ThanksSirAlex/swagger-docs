const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path');
const yaml = require('js-yaml');
const glob = require("glob");


async function generate() {
    let docPath = path.join(__dirname, 'docs')
    let projects = await fsPromises.readdir(docPath)
        .then(files => files)
        .catch(err => {
            throw err
        });

    for (let project of projects) {
        let projectPath = path.join(docPath, project)
        let swagger = await fsPromises.readFile(path.join(projectPath, 'metadata.yaml'))
            .then(data => yaml.safeLoad(data))
            .catch(
                await fsPromises.readFile(path.join(projectPath, 'metadata.yml'))
                    .then(data => yaml.safeLoad(data))
                    .catch(err => {
                        throw err
                    })
            );

        console.log(swagger)
    }

    // fs.readdir(path.join(docPath), (err, projects) => {
    //     if (err) throw err;
    //     projects.forEach(projectName => {
    //         let projectPath = path.join(docPath, projectName)
    //
    //         // initialize swagger, load metadata}
    //         // fs.readFile(path.join(projectPath, 'metadata.yaml'), (err, data) => {
    //         //     if (err) {
    //         //         fs.readFile(path.join(projectPath, 'metadata.yml'), (err, data) => {
    //         //             if (err) throw err
    //         //             swagger = yaml.safeLoad(data)
    //         //         })
    //         //         return
    //         //     }
    //         //
    //         //     swagger = yaml.safeLoad(data)
    //         // })
    //         let swagger = await (() => {
    //             fsPromises.readFile(path.join(projectPath, 'metadata.yml'))
    //                 .then(data => swagger = yaml.safeLoad(data))
    //                 .catch(err => {
    //                     fsPromises.readFile(path.join(projectPath, 'metadata.yaml'))
    //                         .then(data => swagger = yaml.safeLoad(data))
    //                         .catch(err => {
    //                             throw err
    //                         });
    //                 });
    //         })();
    //
    //         // load tags
    //         fsPromises.readFile(path.join(projectPath, 'tags.yml'))
    //             .then(data => swagger['tags'] = yaml.safeLoad(data))
    //             .catch(err => {
    //                 fsPromises.readFile(path.join(projectPath, 'tags.yaml'))
    //                     .then(data => swagger['tags'] = yaml.safeLoad(data))
    //                     .catch(err => console.log('tags not find. Continuing'))
    //             });
    //
    //         // load paths
    //         swagger['paths'] = {}
    //         glob(docPath + '/paths/*.@(yml|yaml)', {}, function (err, files) {
    //             if (err) throw err
    //             files.forEach((pathFile) => {
    //                 fsPromises.readFile(pathFile)
    //                     .then(data => swagger['paths'] = {...swagger['paths'], ...yaml.safeLoad(data)})
    //                     .catch(err => {
    //                         throw err
    //                     })
    //             });
    //         })
    //
    //         console.log(swagger)
    //     });
    // });
};

generate();
