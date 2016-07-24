import {$null} from '../$null';
import {$defined} from '../$defined';

export class Dictionary {
    protected _items:Object = {};
    protected _aliases = {};

    public defaultKey:string = null;

    public get length() : number {
        return Object.keys(this._items).length;
    }


    /**
     * If element exists
     * 
     * @param {any} key
     * @returns
     */
    public exists(key) {
        return $defined(this._items) && this._items.hasOwnProperty(key);
    }

    /**
     * Get item by key name or alias
     * 
     * @param {string} Key key or alias
     * @param {any} [defaultValue=null] Default value (if item doesn't exists)
     * @returns
     */
    public get(key:string, defaultValue=null) {
        
        return this.exists(key) ? this._items[key] : this._getValueFromAlias(key, defaultValue);
    }

    private _linkAlias(alias:string, key: string) {
        this._aliases[alias.trim()] = key.toString();
    }

    private _getValueFromAlias(alias:string, defaultValue:any=null) {
        var aliasValue = this._aliases[alias];
        if( !$defined(aliasValue) || !this.exists(aliasValue) ) {
            if( $null(defaultValue) && !$null(this.defaultKey) ) {
                defaultValue = this.get(this.defaultKey);
            }
            return defaultValue;
        }
        return this._items[aliasValue];
    }

    /**
     * Define an alias(es) for specied key
     * 
     * @param {string} key Target key
     * @param {string} aliases Aliases separated by coma
     * @param {boolean} [force=false] Do not check if key exists
     * @returns {Dictionary}
     */
    public alias(aliases: string, key:string, force:boolean=false) : Dictionary {
        if( !this.exists(key) && !force) throw new ReferenceError(`Item with key '${key}' doesn't exists.`);

        aliases.split(',').forEach( (alias) => {
            this._linkAlias(alias, key);
        });

        return this;
    }

    /**
     * Add item
     * 
     * @param {string} key
     * @param {*} value
     * @param {boolean} [overwrite=false]
     * @returns {Dictionary}
     */
    public add(key:string, value:any, overwrite:boolean=false):Dictionary {
        if( this.exists(key) && !overwrite ) throw new ReferenceError(`Item with key '${key}' already exists.`);
        this._items[key] = value;

        return this;
    }

    public remove(key:string): Dictionary {
        if( !this.exists(key) ) throw new ReferenceError(`Item with key '${key}' doesn't exists.`);
        delete this._items[key];

        return this;
    }

    public forEach(callback:Function) {
        let i = this._items;
        for(let key in i) {
            if( i.hasOwnProperty(key) ) {
                callback(i[key], key, i);
            }
        }
    }
    
}