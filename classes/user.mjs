import dbManager from "../modules/dbManager.mjs";

class User {
  constructor() {
    this.id;
    this.email;
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
    return response.map(Object.values).flat()[0];
  }
  async findConfirmedUser() {
    const response = await dbManager.executeQuery(
      [this.email],
      "SELECT confirmed FROM public.users WHERE email = $1;"
    );
    return response.map(Object.values).flat()[0];
  }
  async confirmUser(id) {
    await dbManager.executeQuery(
      [id],
      "UPDATE public.users SET confirmed = true WHERE user_id = $1;"
    );
  }
}
export default User;
