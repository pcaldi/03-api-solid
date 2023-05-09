import { UsersRepository } from '@/repositories/prisma/users-repository';

import { hash } from 'bcryptjs';

interface RegisterUseCaseProps {
  name: string;
  email: string;
  password: string;
}

// SOLID
// D - Dependencies Inversion Principle.

export class RegisterUseCase {
  constructor(private useRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseProps) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.useRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new Error('E-mail already exists.');
    }

    await this.useRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
