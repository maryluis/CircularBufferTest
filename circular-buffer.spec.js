import CircularBuffer, 
  { BufferEmptyMessage, 
    BufferIsFullMessage,
    BufferNotFullMessage,
    StateShouldBeNumberMessage,
    StartIngexErrorMessage,
    ItemUndefinedMessage
   } from './circular-buffer';


describe('CircularBuffer', () => {
  test('reading empty buffer should fail', () => {
    const buffer = new CircularBuffer(1);
    expect(() => buffer.read()).toThrow(BufferEmptyMessage);
  });

  test('can read an item just written', () => {
    const buffer = new CircularBuffer(3);
    buffer.write('2');
    buffer.write('4');
    buffer.write('1');
    expect(buffer.read()).toBe('1');
  });

  test("buffer's length should be type of number", () => {
    expect(() => new CircularBuffer('1', 0)).toThrow(StateShouldBeNumberMessage);
  });

  test("start index should be type of number", () => {
    expect(() => new CircularBuffer(3, '1')).toThrow(StateShouldBeNumberMessage);
  });

  test("start index shouldn't be bigger than length of the buffer", () => {
    expect(() => new CircularBuffer(3, 4)).toThrow(StartIngexErrorMessage);
  });
  test("start index shouldn't be the same as the length of the buffer", () => {
    expect(() => new CircularBuffer(3, 3)).toThrow(StartIngexErrorMessage);
  });

  test("check the buffer length", () => {
    const buffer = new CircularBuffer(3);
    expect(buffer.length).toBe(3);
  });

  test('write into full buffer should fail', () => {
    const buffer = new CircularBuffer(2);
    buffer.write(2);
    buffer.write(2);
    expect(() => buffer.write(3)).toThrow(BufferIsFullMessage);
  });

  test('buffe in constructor filled with null', () => {
    const buffer = new CircularBuffer(2);
    expect(buffer.list).toEqual([null, null]);
  });

  test("can't use the forceWrite method if the buffer isn't full", () => {
    const buffer = new CircularBuffer(3);
    buffer.write(3);
    expect(() => buffer.forceWrite(2)).toThrow(BufferNotFullMessage);
  });

  test("the clear method writes null", () => {
    const buffer = new CircularBuffer(3, 2);
    buffer.write(2);
    buffer.write(3);
    buffer.clear();
    expect(buffer.list).toEqual([3, null, null]);
  });

  test("check buffer's structure with write method", () => {
    const buffer = new CircularBuffer(4, 1);
    buffer.write(1);
    buffer.write(2);
    buffer.write(3);
    buffer.write(0);
    expect(buffer.list).toEqual([0, 1, 2, 3]);
  });

  test("check buffer's structure with write and clear methods", () => {
    const buffer = new CircularBuffer(4, 1);
    buffer.write(1);
    buffer.write(2);
    buffer.write(3);
    buffer.write(0);
    buffer.clear();
    buffer.clear();
    buffer.clear();
    buffer.write(4);
    buffer.write(5);
    expect(buffer.list).toEqual([0, 4, 5,null]);
  });
  test("item in the write method shouldn't be undefined", () => {
    const buffer = new CircularBuffer(4, 1);
    expect(() => buffer.write()).toThrow(ItemUndefinedMessage);
  });

  test("item in the forceWrite method shouldn't be undefined", () => {
    const buffer = new CircularBuffer(2, 1);
    buffer.write(2);
    buffer.write(2);
    expect(() => buffer.forceWrite()).toThrow(ItemUndefinedMessage);
  });

  test('can read an item just written after all methods', () => {
    const buffer = new CircularBuffer(3);
    buffer.write('2');
    buffer.write('4');
    buffer.clear();
    buffer.write('1');
    buffer.write('4');
    buffer.forceWrite(3)
    expect(buffer.read()).toBe(3);
  });
  test('check structure after write-forceWrite-clear-write', () => {
    const buffer = new CircularBuffer(4, 2);
    buffer.write('2');
    buffer.write('4');
    buffer.write('1');
    buffer.write('4');
    buffer.forceWrite(3)
    buffer.clear();
    buffer.write('5')
    expect(buffer.list).toEqual(['1' , '4', 3, '5']);
  });
  test('check structure after write-clear-write-forceWrite', () => {
    const buffer = new CircularBuffer(4, 2);
    buffer.write('2');
    buffer.write('4');
    buffer.write('1');
    buffer.clear();
    buffer.write('4');
    buffer.write('4');
    buffer.forceWrite(3)
    expect(buffer.list).toEqual(['1' , '4', '4', 3]);
  });

  test('clearing an empty buffer should fail', () => {
    const buffer = new CircularBuffer(4, 2);
    buffer.write('2');
    buffer.write('1');
    buffer.clear();
    buffer.clear();
    expect(() => buffer.clear()).toThrow();
  });

  test("check buffer's structure after full cleaning and new whiting", () => {
    const buffer = new CircularBuffer(4, 2);
    buffer.write('2');
    buffer.write('1');
    buffer.write('2');
    buffer.clear();
    buffer.clear();
    buffer.clear();
    buffer.write('5');
    expect(buffer.list).toEqual([null, null, '5', null]);
  });
});
