import { deepCopy, isValidDate } from "../utils/tool.js"

class FuncNext {

    out() {
        return this._source
    }

    static of(source) {
        const funcNext = new FuncNext()
        // deep clone
        funcNext._source = deepCopy(source)
        funcNext.excludeKeys = []
        return funcNext
    }

    exclude(...keys) {
        this.excludeKeys = keys
        return this
    }

    isProtected(key) {
        return this.excludeKeys.includes(key)
    }

    /**
     * @description: execute chains for source
     */
    execChains(...funcs) {
        for (let i = 0; i < funcs.length; i++) {
            this._source = funcs[i](this._source)
        }
        return this
    }


    /**
     * @description: cover or append source-value by key
     */
    coverOrAppend(obj) {
        Object.keys(obj).forEach(key => {
            if (this.isProtected(key)) return
            this._source[key] = obj[key]
        })
        return this
    }

    /**
     * @description: pick source-value to new source by keys
     */
    pick(...keys) {
        const newObj = {}
        keys.forEach(key => {
            newObj[key] = this._source[key]
        })
        this._source = newObj
        return this
    }

    /**
     * @description: take out source-value by keys
     */
    takeOut(...keys) {
        keys.forEach(key => {
            if (this.isProtected(key)) {
                console.warn(`key: ${key} is protected, can't be deleted`)
                return
            }
            delete this._source[key]
        })
        return this
    }

    /**
     * @description: date to timestamp
     */
    dateToTimestamp() {
        Object.keys(this._source).forEach(key => {
            if (this.isProtected(key)) return

            if (this._source[key] instanceof Date) {
                this._source[key] = this._source[key].getTime()
                return
            }

            if (isValidDate(this._source[key])) {
                this._source[key] = new Date(this._source[key]).getTime()
                return
            }
        })

        return this
    }

    /**
     * @description: date to any format
     */
    dateToAnyFormat(fn) {
        Object.keys(this._source).forEach(key => {
            if (this.isProtected(key)) return

            if (this._source[key] instanceof Date || isValidDate(this._source[key])) {
                console.log(this._source[key]);
                this._source[key] = fn(this._source[key])
                return
            }
        })

        return this
    }

    /**
     * @description: key-value map
     */
    map(fn) {
        Object.keys(this._source).forEach(key => {
            if (this.isProtected(key)) return
            this._source[key] = fn(this._source[key], key)
        })

        return this
    }

    /**
     * @description: key-value each
     */
    each(fn) {
        Object.keys(this._source).forEach(key => {
            fn(this._source[key], key, this.isProtected(key))
        })

        return this
    }

}
export default FuncNext