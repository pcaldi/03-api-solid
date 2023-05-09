import { UsersRepository } from '@/repositories/prisma/users-repository';

import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

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
      throw new UserAlreadyExistsError();
    }

    await this.useRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
