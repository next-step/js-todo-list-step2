import Model from './model/model.js';
import View from './view/view.js';
import Controller from './controller/controller.js';
import { getUsers } from './utils/api.js';

class App {
  constructor() {
    this.init();
  }

  async init() {
    location.href = '#';
    await this.initUsers();
    this.initModel();
    this.initView();
    this.initController();
  }

  async initUsers() {
    this.users = await getUsers();
  }

  initModel() {
    this.model = new Model();
  }

  initView() {
    this.view = new View(
      this.users.map((user) => {
        return {
          name: user.name,
          _id: user._id,
        };
      })
    );
  }

  initController() {
    this.controller = new Controller(this.model, this.view);
  }
}

new App();
