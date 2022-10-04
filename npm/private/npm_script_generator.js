'use strict'

const fs = require('fs')

function main(args) {
    const [
        outDir,
        packPath,
        publishPath,
        runNpmTemplatePath,
        packBatPath,
        publishBatPath,
    ] = args
    const cwd = process.cwd()
    if (/[\//]sandbox[\//]/.test(cwd)) {
        console.error('Error: npm_script_generator must be run with no sandbox')
        process.exit(1)
    }

    const npmTemplate = fs.readFileSync(runNpmTemplatePath, {
        encoding: 'utf-8',
    })
    fs.writeFileSync(
        packPath,
        npmTemplate.replace('TMPL_args', `pack "${cwd}/${outDir}"`)
    )
    fs.writeFileSync(
        publishPath,
        npmTemplate.replace('TMPL_args', `publish "${cwd}/${outDir}"`)
    )

    fs.writeFileSync(
        packBatPath,
        npmTemplate.replace('TMPL_args', `pack "${cwd}/${outDir}"`)
    )
    fs.writeFileSync(
        publishBatPath,
        npmTemplate.replace('TMPL_args', `publish "${cwd}/${outDir}"`)
    )
}

if (require.main === module) {
    process.exitCode = main(process.argv.slice(2))
}
