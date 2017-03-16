import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/RX";

export interface WrapperOpts {
    fftSize: number;
    interval: number;
}

const _defaultOpts: WrapperOpts = {
    fftSize: 64,
    interval: 2000
};

@Injectable()
export class AudioWrapper {

    private _audioContext: AudioContext;
    private _player: HTMLAudioElement;
    private _analyserNode: AnalyserNode;

    private _opts: WrapperOpts;

    private _freqData: Uint8Array;

    private _visualizerIntervalId: number = 0;
    private _dataSubject: Subject<Array<number>> = new Subject();

    constructor() {
        this._audioContext = new ((<any>window).AudioContext || (<any>window).webkitAudioContext)();
    }

    init(player: HTMLAudioElement, opts?: WrapperOpts): void {
        this._player = player;
        this._opts = opts || _defaultOpts;

        //https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events
        Observable.fromEvent(this._player, 'playing')
            .subscribe(e => {
                console.log('Started playing');
                this._visualizerIntervalId = window.setInterval(() => this._processFreqData(), this._opts.interval);
            });
        Observable.fromEvent(this._player, 'pause')
            .subscribe(e => {
                console.log('Playback has paused');
                window.clearInterval(this._visualizerIntervalId);
            });
        Observable.fromEvent(this._player, 'ended')
            .subscribe(e => {
                console.log('Playback has ended');
                window.clearInterval(this._visualizerIntervalId);
                this._dataSubject.complete();
            });

        const audioSrc = this._audioContext.createMediaElementSource(this._player);
        this._analyserNode = this._audioContext.createAnalyser();
        this._analyserNode.fftSize = this._opts.fftSize;
        this._freqData = new Uint8Array(this._analyserNode.frequencyBinCount);

        audioSrc.connect(this._analyserNode);
        audioSrc.connect(this._audioContext.destination);
    }

    get dataStream(): Observable<Array<number>> {
        return this._dataSubject.asObservable().share();
    }

    private _processFreqData(): void {
        this._analyserNode.getByteFrequencyData(this._freqData);
        this._dataSubject.next(Array.from(this._freqData.slice()));
    }
}