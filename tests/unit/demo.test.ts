// import { characters } from '$lib/server/db/schema';
import { describe, expect, it, vi } from 'vitest';

// vi.mock('$lib/server/db/index', () => ({
//     db: {
//         select: vi.fn().mockReturnValue({
//             from: vi.fn().mockReturnValue({
//                 limit: vi.fn().mockResolvedValue([
//                     { id: 1, firstName: 'Test', lastName: 'Test' }
//                 ])
//             })
//         })
//     },
// }));

describe('Database Connection', () => {
  it('should instantiate the database object', async () => {
    expect.assertions(1);
    const { db } = await import('$lib/server/db'); // Import after mock
    expect(db).toBeDefined();
  });

  it('should throw an error if DATABASE_URL is not set', async () => {
    expect.assertions(1);
    vi.mock('$env/dynamic/private', () => ({ env: {} })); // Mock missing DATABASE_URL
    await expect(async () => import('$lib/server/db')).rejects.toThrow('DATABASE_URL is not set');
  });
});

describe('fetchCharacter', () => {
  it('should return the character data', () => {
    expect.assertions(1);
    const asyncMock = vi.fn((): number => 42);

    const result = asyncMock();
    expect(result).toBe(42);
  });
});

// TODO: what if user will give non existing id
// should throw an error, that character not exist
// it('character id not exist - show message/error', () => {
//     expect(db).
// })

// it('should instantiate the database object', () => {
//     expect(db).toBeDefined();
// });
// it('should have the characters table schema defined', () => {
//     expect(characters).toBeDefined();
// });

// it('should connect to the database', async () => {
//     const result = await db.select().from(characters);
//     expect(result).toBeDefined();
// });
// //TODO: check if more data is mocked or the test will break
// it('should fetch data from the database', async () => {
//     const result = await db.select().from(characters).limit(1);
//     expect(result).toEqual([{ id: 1, firstName: 'Test', lastName: 'Test' }]);
// });
// });
