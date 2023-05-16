import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './check-in';

// sut => System Under Test

let checkInRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe('Get Check-in Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInRepository);
  });

  it('should be able check-in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-02',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
