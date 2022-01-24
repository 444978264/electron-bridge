import {contextBridge} from 'electron';
import {IPCRenderer} from './ipc.renderer';

contextBridge.exposeInMainWorld('$electron', new IPCRenderer());
