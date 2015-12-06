window.App = function (app_name) {
    if (typeof app_name !== 'string' || app_name == '') {
        throw 'InvalidAppNameError - you must give a valid name to your lacey app';
    }
    this.app_name = app_name;
    this.modules = [];
    return this;
};

App.prototype.register_module = function (module_name, module) {
    if (typeof module_name !== 'string' || module_name == '') {
        throw 'InvalidModuleNameError - you must give a valid name to your module';
    }
    if (typeof module !== 'function') {
        throw 'InvalidModuleError - your module must be a function';
    }
    this.modules.push(module_name);
    this[module_name] = (function () {
        var create, get_instance, instance;
        instance = null;
        get_instance = function () {
            if (instance == null) {
                instance = new module;
            }
            return instance;
        };
        create = function () {
            if (instance != null) {
                throw 'DuplicateModuleError - this module has been already created';
            }
            var module = get_instance();
            if (typeof module.init == 'function')
                module.init()
            return module;
        };
        return {
            create: create,
            get_instance: get_instance
        };
    })();
    return this[module_name];
};