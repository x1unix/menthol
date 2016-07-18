import {isset} from './isset';
import {Domain} from './classes/Domain';

/**
 * Call function asynchronously
 * 
 * @export
 * @param {Function} method Function context
 * @param {Function} [onError=console.error] Error handler
 */
export function $async(method:Function, onError:Function=console.error) {
    let localDomain:Domain = new Domain();
    localDomain.on('error', onError);    
    localDomain.run(method);
}