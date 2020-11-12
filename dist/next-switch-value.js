/*!
 * name: @feizheng/next-switch-value
 * description: Get value for hooks or default.
 * homepage: https://github.com/afeiship/next-switch-value
 * version: 1.0.0
 * date: 2020-11-12T07:22:17.096Z
 * license: MIT
 */

(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var PRIVATE_DEFAULT = '__$@$__';
  var PUBLIC_DEFAULT = '*';
  var DEFAULT_OPTIONS = {
    separator: '|',
    debug: false
  };

  var NxSwitchValue = nx.declare('nx.SwitchValue', {
    methods: {
      init: function (inHooks, inOptions) {
        var defHooks = {};
        this.options = nx.mix(null, DEFAULT_OPTIONS, inOptions);

        defHooks[PRIVATE_DEFAULT] = this.options.default || inHooks[PUBLIC_DEFAULT];
        this.hooks = this.process(nx.mix(null, inHooks, defHooks));
      },
      get: function (inValue) {
        var value = this.hooks[inValue];
        return typeof value === 'undefined' ? this.hooks[PRIVATE_DEFAULT] : value;
      },
      gets: function () {
        return this.hooks;
      },
      process: function (inHooks) {
        var sap = this.options.separator;
        var clean = !this.options.debug;
        nx.forIn(inHooks, function (key, value) {
          if (key.indexOf(sap) > -1) {
            var keys = key.split(sap);
            keys.forEach(function (newKey) {
              var _key = newKey.trim();
              inHooks[_key] = value;
            });
            clean && delete inHooks[key];
          }
        });
        return inHooks;
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxSwitchValue;
  }
})();