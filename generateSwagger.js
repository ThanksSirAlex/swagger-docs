const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const glob = require("glob");


let docPath = path.join(__dirname, 'docs');
let projects = fs.readdirSync(docPath);

for (let project of projects) {
    let projectPath = path.join(docPath, project);

    // load swagger metafile
    let metaFile = (fs.existsSync(`${projectPath}/metadata.yaml`)) ? (`${projectPath}/metadata.yaml`) : (`${projectPath}/metadata.yml`);
    let swaggerJson = yaml.safeLoad(fs.readFileSync(metaFile));

    // load tags if exists
    if (fs.existsSync(`${projectPath}/tags.yml`) || fs.existsSync(`${projectPath}/tags.yaml`)) {
        let tagsFile = fs.existsSync(`${projectPath}/tags.yml`) ? `${projectPath}/tags.yml` : `${projectPath}/tags.yaml`
        swaggerJson['tags'] = yaml.safeLoad(fs.readFileSync(tagsFile))
    }

    // load paths
    let pathsFiles = glob.sync(`docs/${project}/paths/**/*.@(yml|yaml)`);
    for (let pathsFile of pathsFiles) {
        swaggerJson['paths'] = {...swaggerJson['paths'], ...yaml.safeLoad(fs.readFileSync(pathsFile))};
    }

    // load components if using swagger 3
    if (swaggerJson['openapi']) {
        let componentsFiles = glob.sync(`docs/${project}/components/**/*.@(yml|yaml)`);
        for (let componentsFile of componentsFiles) {
            swaggerJson['components'] = {...swaggerJson['components'], ...yaml.safeLoad(fs.readFileSync(componentsFile))};
        }
    } else if (swaggerJson['swagger']) {
        // load definitions and securityDefinitions if using swagger 2
        let definitionsFiles = glob.sync(`docs/${project}/definitions/**/*.@(yml|yaml)`);
        for (let definitionsFile of definitionsFiles) {
            swaggerJson['definitions'] = {...swaggerJson['definitions'], ...yaml.safeLoad(fs.readFileSync(definitionsFile))};
        }

        // load securityDefinitions if exist
        if (fs.existsSync(projectPath + 'securityDefinitions.yml') || fs.existsSync(projectPath + 'securityDefinitions.yaml')) {
            let securityDefinitionsFile = fs.existsSync(projectPath + 'securityDefinitions.yml') ? (projectPath + 'securityDefinitions.yml') : (projectPath + 'securityDefinitions.yaml')
            swaggerJson['securityDefinitions'] = yaml.safeLoad(fs.readFileSync(securityDefinitionsFile))
        }
    }

    let jsonFilePath = path.join(__dirname, 'public', 'swagger', `${project}.json`);
    fs.writeFileSync(jsonFilePath, JSON.stringify(swaggerJson));
}
