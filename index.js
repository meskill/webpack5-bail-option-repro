let mod;

try {
    mod = require('unknown_module_12432154');
} catch (e) {
    mod = 'not found';
}

console.log(mod);