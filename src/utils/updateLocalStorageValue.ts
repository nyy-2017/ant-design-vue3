
// 更新对象的某个值的函数
export function updateLocalStorageObjectValue(key: string, propertyName: string | number, newValue: any) {
    // 从localStorage中获取对象
    var object = getLocalStorageObject(key);
    if (object) {
        // 更新对象的某个属性
        object[propertyName] = newValue;
        // 存回localStorage
        localStorage.setItem(key, JSON.stringify(object));
    }
}
 
// 获取localStorage中对象的函数
function getLocalStorageObject(key: string) {
    var value = localStorage.getItem(key);
    if (value) {
        return JSON.parse(value);
    }
    return null;
}

// 使用示例
// 假设我们有一个对象存储在localStorage中，键名为'myObject'
// var storageKey = 'myObject';
// 假设我们要更新对象的'age'属性
// updateLocalStorageObjectValue(storageKey, 'age', 30);
// 现在，'myObject'在localStorage中的对象的'age'属性已经更新为30