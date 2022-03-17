//
// This is only a SKELETON file for the 'Circular Buffer' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

class CircularBuffer {
  list;
  length;
  tail = -1;
  startIndex;
  head = -1;
  size = 0;
  constructor(length, tailIndex = 0) {
    if (typeof length !== "number" || typeof tailIndex !== 'number') {
      throw new Error(StateShouldBeNumberMessage);
    }
    if (tailIndex > length-1) {
      throw new Error(StartIngexErrorMessage);
    }
    this.length = length;
    this.startIndex = tailIndex;
    this.tail = tailIndex;
    this.list = Array(length).fill(null);
  }
  get isFull() {
    return this.size === this.length;
  }

  get isEmpty() {
    return this.size === 0;
  }
  write(item) {
    if (this.isFull) {
      new BufferFullError();
    }
    if (item === undefined) {
      throw new Error(ItemUndefinedMessage);
    }
    if (this.head === -1) {
      this.head = this.tail;
    }
    this.list[this.tail] = item;
    this.tail = (this.tail + 1) % this.length;
    this.size += 1;
  }

  read() {
    if (this.isEmpty) {
      new BufferEmptyError();
    }
    if (this.tail === 0) {
      return this.list[this.length - 1];
    }
    return this.list[this.tail - 1];
  }

  forceWrite(item) {
    if (!this.isFull) {
      new BufferNotFullError();
    } 
    if (item === undefined) {
      throw new Error(ItemUndefinedMessage);
    }
    else {
      this.list[this.tail] = item;
      this.tail = (this.tail + 1) % this.length;
      this.head = (this.head + 1) % this.length;
    }
  }

  clear() {
    if (this.isEmpty) {
      new BufferEmptyError();
    }
      this.list[this.head] = null;
      this.head = (this.head + 1) % this.length;
      this.size -= 1;
      if (!this.size) {
        this.head = -1;
        this.tail = this.startIndex;
      }
  }
}

export default CircularBuffer;

export const BufferIsEmptyMessage = "The buffer is empty";
export const BufferIsFullMessage =  "The buffer is full.";
export const ItemUndefinedMessage = "Item shoukdn't be undefined";
export const BufferNotFullMessage = "The buffer isn't full";
export const StateShouldBeNumberMessage = "This state should be type of number";
export const StartIngexErrorMessage = "start index can't be bigger than the length of buffer";

export class BufferFullError extends Error {
  constructor() {
    throw new Error(BufferIsFullMessage);
  }
}


export class BufferNotFullError extends Error {
  constructor() {
    throw new Error(BufferNotFullMessage);
  }
}

export class BufferEmptyError extends Error {
  constructor() {
    throw new Error(BufferIsEmptyMessage);
  }
}
