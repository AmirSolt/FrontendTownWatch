


import type Pocketbase from 'pocketbase';
declare global {
  declare namespace App {
    // interface Error {}
    interface Locals {
      pb: PocketBase
      user: User | null | undefined
      customer: Customer | null | undefined
    }
    interface Error {
			message: string;
		}
    // interface Platform {}
  }
}