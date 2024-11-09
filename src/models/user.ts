import { IUser, UserInputDTO } from "../interfaces";
import {db} from "../utils/connection";

class UserModel {
  private tableName = "Users";

  async createUser(user: UserInputDTO): Promise<number> {
    const [id] = await db(this.tableName).insert(user);
    return id;
  };

  async findUserById(id: number): Promise<IUser | undefined> {
    return await db(this.tableName).where({ id }).first();
  }

  async findByUserEmail(email: string): Promise<IUser | undefined> {
    return await db(this.tableName).where({ email }).first();
  }

  async findByIdAndUpdate(id: number, user: Partial<IUser>): Promise<void> {
    return await db(this.tableName).where({ id }).update(user);
  }

  async updateUserLastLogin(id: number): Promise<void> {
    await db(this.tableName).where({ id }).update({ last_login: new Date() });
  }

  async updateUser(email: string, user: Partial<IUser>): Promise<void> {
    await db(this.tableName).where({ email }).update({ user });
  }

  async deleteUser(id: number): Promise<void> {
    const deleted = true;
    await db(this.tableName).where({ id }).update({ deleted });
  }
  async find(query: Partial<IUser>): Promise<IUser[]> {
    return await db(this.tableName).where(query);
  }

  async countDocuments(query: Partial<IUser>): Promise<number> {
    const result = await db(this.tableName).where(query).count({ count: '*' }).first();
    return result?.count as number;
  }
}

export { UserModel };
