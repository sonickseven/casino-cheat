export default class AudioApi {
  static #instance: AudioApi;
  #audio: HTMLAudioElement;
  constructor(src?: string, autoplay?: boolean) {
    this.#audio = new Audio(src);
    this.#audio.autoplay = autoplay || false;
    this.#audio.volume = 0.3;
  }

  play(src?: string) {
    if (src) this.#audio.src = src;
    this.#audio.play().catch(() => {
      console.log('Enable the sound in this site');
    });
  }
  pause() {
    this.#audio.pause();
  }

  event<T>(event: string, callBack: () => T | void) {
    if (event === 'ended') {
      this.#audio.addEventListener(event, callBack, false);
      return;
    }
    console.error(event, 'No register in events');
  }
  removeEvent<T>(event: string, callBack: () => T | void) {
    if (event === 'ended') {
      this.#audio.removeEventListener(event, callBack);
      return;
    }
    console.error(event, 'No register in events');
  }

  static getInstance(src?: string, autoplay?: boolean): AudioApi | null {
    if (typeof Audio === 'undefined') return null;
    if (!this.#instance) this.#instance = new AudioApi(src, autoplay);
    return this.#instance;
  }
}
