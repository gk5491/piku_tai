import { wishes, type InsertWish, type Wish } from "@shared/schema";

export interface IStorage {
  getWishes(): Promise<Wish[]>;
  createWish(wish: InsertWish): Promise<Wish>;
}

export class MemStorage implements IStorage {
  private wishes: Map<number, Wish>;
  private currentId: number;

  constructor() {
    this.wishes = new Map();
    this.currentId = 1;
  }

  async getWishes(): Promise<Wish[]> {
    return Array.from(this.wishes.values()).sort((a, b) => {
      // Sort by createdAt descending
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return timeB - timeA;
    });
  }

  async createWish(insertWish: InsertWish): Promise<Wish> {
    const id = this.currentId++;
    const wish: Wish = {
      ...insertWish,
      id,
      createdAt: new Date()
    };
    this.wishes.set(id, wish);
    return wish;
  }
}

export const storage = new MemStorage();
