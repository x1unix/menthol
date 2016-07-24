export declare class Dictionary {
    protected _items: Object;
    protected _aliases: {};
    defaultKey: string;
    length: number;
    exists(key: any): boolean;
    get(key: string, defaultValue?: any): any;
    private _linkAlias(alias, key);
    private _getValueFromAlias(alias, defaultValue?);
    alias(aliases: string, key: string, force?: boolean): Dictionary;
    add(key: string, value: any, overwrite?: boolean): Dictionary;
    remove(key: string): Dictionary;
    forEach(callback: Function): void;
}
