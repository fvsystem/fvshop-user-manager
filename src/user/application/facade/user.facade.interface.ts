export interface UserFacadeInterface {
  getRolesFromEmail(email: string): Promise<string[]>;
}
