# Webpack 5 test repo

Reproduction repo for issue in webpack 5 - https://github.com/webpack/webpack/issues/11594

This repo shows that using option `bail: true` in webpack config fails the build for webpack5 at some cases. Although in webpack4 it works fine.

## How to reproduce

1. Clone this repo
1. Run `cd webpack4 && npm ci && npm run build`

    The output should look smth like this:
    ```
    > webpack4@1.0.0 build /app/webpack5-bail-option-repro/webpack4
    > webpack -c ../webpack.config.js

    Hash: 51b5e6965599e33df53e
    Version: webpack 4.44.2
    Time: 152ms
    Built at: 10/11/2020 6:14:06 PM
    Asset      Size  Chunks             Chunk Names
    main.js  1.07 KiB       0  [emitted]  main
    Entrypoint main = main.js
    [0] ../index.js 119 bytes {0} [built]

    WARNING in ../index.js
    Module not found: Error: Can't resolve 'unknown_module_12432154' in '/app/webpack5-bail-option-repro'
    @ ../index.js
    ```

    And there should be generated dist directory with bundle
1. Run `cd ../webpack5 && npm ci && npm run build`

    The last command will fail:
    ```
    > webpack5@1.0.0 build /app/webpack5-bail-option-repro/webpack5
    > webpack -c ../webpack.config.js

    [webpack-cli] ModuleNotFoundError: Module not found: Error: Can't resolve 'unknown_module_12432154' in '/app/webpack5-bail-option-repro'
        at /app/webpack5-bail-option-repro/webpack5/node_modules/webpack/lib/Compilation.js:1476:28
        at /app/webpack5-bail-option-repro/webpack5/node_modules/webpack/lib/NormalModuleFactory.js:648:13
        at eval (eval at create (/app/webpack5-bail-option-repro/webpack5/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:8:1)
        at /app/webpack5-bail-option-repro/webpack5/node_modules/webpack/lib/NormalModuleFactory.js:233:22
        at eval (eval at create (/app/webpack5-bail-option-repro/webpack5/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:7:1)
        at /app/webpack5-bail-option-repro/webpack5/node_modules/webpack/lib/NormalModuleFactory.js:357:22
        at /app/webpack5-bail-option-repro/webpack5/node_modules/webpack/lib/NormalModuleFactory.js:116:11
        at /app/webpack5-bail-option-repro/webpack5/node_modules/webpack/lib/NormalModuleFactory.js:577:24
        at /app/webpack5-bail-option-repro/webpack5/node_modules/webpack/lib/NormalModuleFactory.js:721:5
        at finishWithoutResolve (/app/webpack5-bail-option-repro/webpack5/node_modules/enhanced-resolve/lib/Resolver.js:287:11)
    npm ERR! code ELIFECYCLE
    npm ERR! errno 1
    npm ERR! webpack5@1.0.0 build: `webpack -c ../webpack.config.js`
    npm ERR! Exit status 1
    npm ERR!
    npm ERR! Failed at the webpack5@1.0.0 build script.
    npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

    npm ERR! A complete log of this run can be found in:
    npm ERR!     /home/node/.npm/_logs/2020-10-11T18_16_45_103Z-debug.log
    ```

    And no bundle will be outputted