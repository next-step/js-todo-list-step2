import { setUserCreateEvent } from '../event/AddEvent.js';
import render from './Render/index.js';
const Home = () => {
  render();
  setUserCreateEvent();
};

export default Home;
