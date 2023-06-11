export function deepCopy(obj, visited = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // 处理特殊对象类型
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }

    if (obj instanceof RegExp) {
        return new RegExp(obj);
    }

    if (obj instanceof Map) {
        const copyMap = new Map();
        obj.forEach((value, key) => {
            copyMap.set(key, deepCopy(value, visited));
        });
        return copyMap;
    }

    if (obj instanceof Set) {
        const copySet = new Set();
        obj.forEach((value) => {
            copySet.add(deepCopy(value, visited));
        });
        return copySet;
    }

    // 处理循环引用
    if (visited.has(obj)) {
        return visited.get(obj);
    }

    let copy;
    if (Array.isArray(obj)) {
        copy = [];
        visited.set(obj, copy);
        obj.forEach((item, index) => {
            copy[index] = deepCopy(item, visited);
        });
    } else {
        copy = {};
        visited.set(obj, copy);
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                copy[key] = deepCopy(obj[key], visited);
            }
        }
    }

    return copy;
}


export function isValidDate(value) {
    return value instanceof Date || (typeof value === 'string' && !isNaN(Date.parse(value)));
}