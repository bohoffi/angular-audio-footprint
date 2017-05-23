import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {defaultWrapperOpts} from './consts';
import {WrapperOpts} from './interfaces';

@Injectable()
export class AudioWrapper {

  private _audioContext: AudioContext;
  private _player: HTMLAudioElement;
  private _analyserNode: AnalyserNode;

  private _opts: WrapperOpts;

  private _freqData: Uint8Array;

  private _visualizerIntervalId = 0;
  private _dataSubject: Subject<Array<number>> = new Subject();
  private _stateSubject: Subject<boolean> = new Subject();

  constructor() {
    this._audioContext = this._getAudioContext();
  }

  init(player: HTMLAudioElement, opts?: WrapperOpts): any {
    this._player = player;
    this._opts = opts || defaultWrapperOpts;

    if (this._audioContext) {
      this._init();
    }

    return this._hookUpEvents();
  }

  private _init(): void {
    const audioSrc = this._audioContext.createMediaElementSource(this._player);
    this._analyserNode = this._audioContext.createAnalyser();
    this._analyserNode.fftSize = this._opts.fftSize;
    this._freqData = new Uint8Array(this._analyserNode.frequencyBinCount);

    audioSrc.connect(this._analyserNode);
    audioSrc.connect(this._audioContext.destination);
  }

  private _hookUpEvents(): any {

    const subscriptions: any = {};

    // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events
    subscriptions.playing = Observable.fromEvent(this._player, 'playing')
      .subscribe(e => {
        this._visualizerIntervalId = window.setInterval(() => this._processFreqData(), this._opts.interval);
        this._stateSubject.next(true);
      });
    subscriptions.pausing = Observable.fromEvent(this._player, 'pause')
      .subscribe(e => {
        window.clearInterval(this._visualizerIntervalId);
        this._stateSubject.next(false);
      });
    subscriptions.ended = Observable.fromEvent(this._player, 'ended')
      .subscribe(e => {
        window.clearInterval(this._visualizerIntervalId);
        this._dataSubject.complete();
      });

    return subscriptions;
  }

  update(opts: WrapperOpts): void {
    this._opts = opts || defaultWrapperOpts;
    this._update();
  }

  reset(): void {
    this._player.pause();
    this._player.currentTime = 0;
    window.clearInterval(this._visualizerIntervalId);
  }

  get audioApiSupported(): boolean {
    return this._audioContext !== null;
  }

  get dataStream(): Observable<Array<number>> {
    return this._dataSubject.asObservable().share();
  }

  get stateStream(): Observable<boolean> {
    return this._stateSubject.asObservable().share();
  }

  private _getAudioContext(): any {
    if (typeof (<any>window).AudioContext !== 'undefined') {
      return new (<any>window).AudioContext();
    } else if (typeof (<any>window).webkitAudioContext !== 'undefined') {
      return new (<any>window).webkitAudioContext();
    } else if (typeof (<any>window).mozAudioContext !== 'undefined') {
      return new (<any>window).mozAudioContext();
    } else {
      return null;
    }
  }

  private _update(): void {
    this._analyserNode.fftSize = this._opts.fftSize;
    this._freqData = new Uint8Array(this._analyserNode.frequencyBinCount);
  }

  private _processFreqData(): void {
    this._analyserNode.getByteFrequencyData(this._freqData);
    if (!this._dataSubject || this._dataSubject.isStopped) {
      this._dataSubject = new Subject();
    }
    this._dataSubject.next(Array.from(this._freqData.slice()));
  }
}
