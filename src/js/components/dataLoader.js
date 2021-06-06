class DataLoader {
  constructor($target, dataController) {
    this.$target = $target;
    this.dataController = dataController;
    this.$target.insertAdjacentHTML('beforeend', `<div class="loader"  style="display: none;"></div>`);
  }

  getData = async (url) => {
    let res = {};
    this.show();
    try {
      res = await this.dataController.getData(url);
    } catch (e) {
      console.error(e);
    }
    this.hide();
    return res;
  }

  postData = async (url, body) => {
    let res = {};
    this.show();
    try {
      res = await this.dataController.postData(url, body);
    } catch (e) {
      console.error(e);
    }
    this.hide();
    return res;
  }

  putData = async (url, body) => {
    let res = {};
    this.show();
    try {
      res = await this.dataController.putData(url, body);
    } catch (e) {
      console.error(e);
    }
    this.hide();
    return res;
  }

  deleteData = async (url) => {
    let res = {};
    this.show();
    try {
      res = await this.dataController.deleteData(url);
    } catch (e) {
      console.error(e);
    }
    this.hide();
    return res;
  }

  show = () => {
    this.$target.querySelector('.loader').style.display = 'block';
  }
  hide = () => {
    this.$target.querySelector('.loader').style.display = 'none';
  }
}

export default DataLoader;
