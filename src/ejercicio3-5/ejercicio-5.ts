/**
 * ¿Por qué este diseño dificulta cambiar MySQL por otro almacenamiento y testear UserService sin base de datos?
 * Porque UserService depende directamente de MySqlUserRepository.
 * 
 * Principios SOLID violados:
 * - Dependency Inversion Principle: UserService depende de una implementación concreta (MySqlUserRepository).
 *                                   Si se quiere testear se obliga a tener una implementacion de mySqluserrepository.
 * - Single Responsibility Principle: UserService tiene la responsabilidad de gestionar usuarios con getusername y también de acceder a la base de datos al crear private repo.
 * 
 */

class MySqlUserRepository {
  findById(id: string): { id: string; name: string } | null {
    console.log("Querying MySQL...");
    return { id, name: "Ada" };
  }
}

class UserService {
  private repo = new MySqlUserRepository();

  getUserName(id: string): string {
    const user = this.repo.findById(id);
    if (!user) throw new Error("User not found");
    return user.name.toUpperCase();
  }
}

/**
 * Diseño refactorizado para cumplir con los principios SOLID
 */

interface UserRepository {
  findById(id: string): { id: string; name: string } | null;
}

class MySqlUserRepository2 implements UserRepository {
  findById(id: string): { id: string; name: string } | null {
    console.log("Querying MySQL...");
    return { id, name: "Ada" };
  }
}

class UserService2 {
  constructor(private repo: UserRepository) {}

  getUserName(id: string): string {
    const user = this.repo.findById(id);
    if (!user) throw new Error("User not found");
    return user.name.toUpperCase();
  }
}