import Model from './model/model.js';
import View from './view/view.js';
import Controller from './controller/controller.js';
import API from './utils/api.js';
import * as UTILS from './utils/utils.js';

class App {
  constructor() {
    this.init();
  }

  async init() {
    location.href = '#';
    UTILS.setLoadingBar();
    await this.initUsers();
    UTILS.deleteLoadingBar();
    this.initModel();
    this.initView();
    this.initController();
  }

  async initUsers() {
    this.users = await API.getUsers();
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
