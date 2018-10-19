; (function () {
    "use strict"
    var _global;
    var easyPie = Object.create(HTMLElement.prototype, {
        /* 元素生命周期的事件 */
        // 实例化时触发
        createdCallback: {
            value: function () {
                // console.log('invoked createCallback!');
            },
        },
        // 元素添加到DOM树时触发
        attachedCallback: {
            value: function () {
                // console.log('invoked attachedCallback!');
            },
        },
        // 元素DOM树上移除时触发
        detachedCallback: {
            value: function () {
                // console.log('invoked detachedCallback!');
            },
        },
        // 元素的attribute发生变化时触发
        attributeChangedCallback: {
            value: function (attrName, oldVal, newVal) {
                // console.log('attributeChangedCallback-change' + attrName + 'from' + oldVal + 'to' + newVal);
                customTag('easy-pie', myElementHandler);
            },
        },
        /* 定义元素的公有方法和属性 */
        // 重写  属性
        width: {
            get: function () { return this.getAttribute('width'); },
            set: function (val) { this.setAttribute('width', val); },
        },
        height: {
            get: function () { return this.getAttribute('height'); },
            set: function (val) { this.setAttribute('height', val); },
        },
        percent: {
            get: function () { return this.getAttribute('percent'); },
            set: function (val) { this.setAttribute('percent', val); },
        },
        backColor: {
            get: function () { return this.getAttribute('backColor'); },
            set: function (val) { this.setAttribute('backColor', val); },
        },
        percentColor: {
            get: function () { return this.getAttribute('percentColor'); },
            set: function (val) { this.setAttribute('percentColor', val); },
        },
    });

    document.registerElement('easy-pie', { prototype: easyPie });

    function customTag(tagName, fn) {
        Array
            .from(document.getElementsByTagName(tagName))
            .forEach(fn);
    }

    function tryToParse(a) {
        var b = a;
        try {
            b = JSON.parse(b);
        } catch (error) { }
        return b;
    }

    function myElementHandler(element) {
        var backColor = tryToParse(element.backColor) || '#655';
        var percentColor = tryToParse(element.percentColor) || 'yellowgreen';
        var width = tryToParse(element.width) || '100px';
        var height = tryToParse(element.height) || '100px';
        var percent = tryToParse(element.percent) || 0;
        var percentBackground = "linear-gradient(to right, rgba(0,0,0,0) 50%, " + backColor + " 50%)";
        if (percent > 180) {
            percentBackground = "linear-gradient(to right, rgba(0,0,0,0) 50%, " + percentColor + " 50%)";
            percent = percent - 180;
        }
        element.style.width = width;
        element.style.height = height;
        element.style['border-radius'] = '50%';
        element.style.background = backColor;
        element.style['background-image'] = "linear-gradient(to right, transparent 50%, " + percentColor + " 0)";
        element.style.overflow = 'hidden';
        element.style.display = 'inline-block';

        var eDom = document.createElement('div');
        eDom.style.width = '100%';
        eDom.style.height = '100%';
        eDom.style['border-radius'] = '50%';
        eDom.style.background = percentBackground;
        eDom.style.transform = 'rotate(' + percent + 'deg)';
        element.innerHTML = '';
        element.appendChild(eDom);
    }

    customTag('easy-pie', myElementHandler);

    var EasyPie = function (props) {
        setTimeout(function () {
            customTag('easy-pie', myElementHandler);
        }, 0);
        props = props || {};
        if (props.createElement) {
            var obj = {};
            for (var key in props) {
                if (key !== 'createElement') {
                    obj[key] = props[key];
                    if (typeof obj[key] === 'object') {
                        obj[key] = JSON.stringify(obj[key]);
                    }
                }
            }
            return props.createElement('easy-pie', obj);
        } else {
            console.error("Can't find createElement.")
            return '';
        }
    };

    _global = (function () { return this || (0, eval)('this'); }());
    if (typeof module !== "undefined" && module.exports) {
        module.exports = EasyPie;
    } else if (typeof define === "function" && define.amd) {
        define(function () { return EasyPie; });
    } else {
        !('EasyPie' in _global) && (_global.EasyPie = EasyPie);
    }
}());