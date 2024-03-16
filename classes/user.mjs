import dbManager from "../modules/dbManager.mjs";

class User {
  constructor() {
    this.id;
    this.email;
    this.confirmed = false;
  }
  async addUser() {
    const response = await dbManager.executeQuery(
      [this.email],
      'INSERT INTO public.users("email") VALUES($1) RETURNING "user_id";'
    );
    return response.map(Object.values).flat()[0];
  }
  async getUser() {
    const response = await dbManager.executeQuery(
      [this.id],
      "SELECT * FROM public.users WHERE email = $1;"
    );
    return response.map(Object.values).flat();
  }
  async getId() {
    const response = await dbManager.executeQuery(
      [this.email],
      "SELECT user_id FROM public.users WHERE email = $1;"
    );
    this.id = response.map(Object.values).flat()[0];
    return this.id;
  }
  async findConfirmedUser() {
    const response = await dbManager.executeQuery(
      [this.email],
      "SELECT confirmed FROM public.users WHERE email = $1;"
    );
    return response.map(Object.values).flat()[0];
  }
  async confirmUser(email) {
    await dbManager.executeQuery(
      [email],
      "UPDATE public.users SET confirmed = true WHERE email = $1;"
    );
  }
}
export default User;
