import {Event} from '../Event';
import {UIEvent} from './UIEvent';
import {EventEmitter} from '../EventEmitter';

export class UIMouseEvent extends UIEvent {
        public constructor(target:EventEmitter, windowClickEvent:MouseEvent) {

            super(target, {
                type: windowClickEvent.type,
                target: target,
                keys: {
                    ctrl: windowClickEvent.ctrlKey,
                    alt: windowClickEvent.altKey,
                    shift: windowClickEvent.shiftKey,
                    meta: windowClickEvent.metaKey
                },
                position: {
                    x: windowClickEvent.layerX,
                    y: windowClickEvent.layerY
                }

            });
        }
    }