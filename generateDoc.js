const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const readlineSync = require('readline-sync');

let projectName = readlineSync.question("Please input your project name. (use '_' if needed): ", {defaultInput: 'project_name'});
let projectDir = path.join(__dirname, "docs", projectName);

while (fs.existsSync(projectDir)) {
    projectName = readlineSync.question("Project name already exist. Chose another one. (enter n to exit): ", {defaultInput: 'project_name'});
    if (projectName === 'n') {
        console.log(Exiting)
        process.exit();
    }
    projectDir = path.join(__dirname, "docs", projectName);
}

let swaggerVersion = readlineSync.question("Choese the version of swagger to use. (2/3): ", {defaultInput: 3})

while (!['2', '3'].includes(swaggerVersion)) {
    console.log("Invalid version should be either 2 or 3");
    swaggerVersion = readlineSync.question("Invalid version should be either 2 or 3, try again. (enter n to exit): ", {defaultInput: 3})
    if (swaggerVersion === 'n') {
        console.log(Exiting)
        process.exit();
    }
}

swaggerVersion = parseInt(swaggerVersion, 10)

metaJson = {}
if (swaggerVersion === 2) {
    metaJson['swagger'] = "2.0"
    fs.mkdirSync(projectDir);
    fs.writeFileSync(`${projectDir}/metadata.yml`, yaml.safeDump(metaJson));
    fs.writeFileSync(`${projectDir}/tags.yml`, yaml.safeDump({tags: {}}));
    fs.writeFileSync(`${projectDir}/securityDefinitions.yml`, yaml.safeDump({securityDefinitions: {}}));
    fs.mkdirSync(`${projectDir}/paths`);
    fs.mkdirSync(`${projectDir}/definitions`);
} else {
    metaJson['openapi'] = "3.0.0"
    fs.mkdirSync(projectDir);
    fs.writeFileSync(`${projectDir}/metadata.yml`, yaml.safeDump(metaJson));
    fs.writeFileSync(`${projectDir}/tags.yml`, yaml.safeDump({tags: {}}));
    fs.mkdirSync(`${projectDir}/paths`);
    fs.writeFileSync(`${projectDir}/paths/.keep`, '');
    fs.mkdirSync(`${projectDir}/components`);
    fs.writeFileSync(`${projectDir}/components/schemas.yml`, yaml.safeDump({schemas: {}}));
    fs.writeFileSync(`${projectDir}/components/parameters.yml`, yaml.safeDump({parameters: {}}));
    fs.writeFileSync(`${projectDir}/components/securitySchemes.yml`, yaml.safeDump({securitySchemes: {}}));
    fs.writeFileSync(`${projectDir}/components/requestBodies.yml`, yaml.safeDump({requestBodies: {}}));
    fs.writeFileSync(`${projectDir}/components/responses.yml`, yaml.safeDump({responses: {}}));
    fs.writeFileSync(`${projectDir}/components/headers.yml`, yaml.safeDump({headers: {}}));
}

console.log('Done')
