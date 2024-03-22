


import type Pocketbase from 'pocketbase';
declare global {
  declare namespace App {
    // interface Error {}
    interface Locals {
      pb: PocketBase
      user: User | null | undefined
    }
    interface Error {
			message: string;
		}
    interface PageData {
      forms: {
        explore:Explore
      }
    }
    // interface Platform {}
  }
}