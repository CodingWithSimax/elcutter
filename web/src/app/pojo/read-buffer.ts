export class ReadBuffer {
    private textDecoder: TextDecoder = new TextDecoder();

    constructor(private buffer: ArrayBuffer) {}

    public toBuffer(): ArrayBuffer {
        return this.buffer;
    }
    public toString(): string {
        return this.textDecoder.decode(this.buffer);
    }
}
